import { NextRequest, NextResponse } from 'next/server';

const PIXEL_ID = '834992922921146';
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const API_VERSION = 'v21.0';

/**
 * Meta Conversions API Route
 * Sends server-side events to Meta for better tracking and deduplication
 */
export async function POST(request: NextRequest) {
  try {
    if (!ACCESS_TOKEN) {
      console.error('META_ACCESS_TOKEN not found in environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { event_name, event_id, event_time, user_data, custom_data } = body;

    // Validate required fields
    if (!event_name) {
      return NextResponse.json(
        { error: 'event_name is required' },
        { status: 400 }
      );
    }

    // Get user IP and user agent
    const forwardedFor = request.headers.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : 
                     request.headers.get('x-real-ip') || '';
    const userAgent = request.headers.get('user-agent') || '';

    // Build the payload according to Meta's specification
    const payload = {
      data: [
        {
          event_name,
          event_time: event_time || Math.floor(Date.now() / 1000),
          event_id: event_id || undefined,
          action_source: 'website',
          event_source_url: user_data?.event_source_url || '',
          user_data: {
            client_ip_address: clientIp,
            client_user_agent: userAgent,
            fbp: user_data?.fbp || undefined,
            fbc: user_data?.fbc || undefined,
          },
          custom_data: custom_data || undefined,
        }
      ]
    };

    // Make POST request to Meta Conversions API
    const response = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('Meta Conversions API Error:', result);
      return NextResponse.json(
        { error: 'Failed to send event to Meta', details: result },
        { status: response.status }
      );
    }

    return NextResponse.json({ 
      success: true, 
      events_received: result.events_received,
      messages: result.messages || []
    });

  } catch (error) {
    console.error('Conversions API Exception:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
