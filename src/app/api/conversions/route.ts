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

    // Hash sensitive user data for privacy compliance
    const hashUserData = (data: any) => {
      const crypto = require('crypto');
      if (data.em) data.em = crypto.createHash('sha256').update(data.em).digest('hex');
      if (data.ph) data.ph = crypto.createHash('sha256').update(data.ph).digest('hex');
      if (data.fn) data.fn = crypto.createHash('sha256').update(data.fn).digest('hex');
      if (data.external_id) data.external_id = crypto.createHash('sha256').update(data.external_id).digest('hex');
      return data;
    };

    // Build enhanced user data
    const enhancedUserData = {
      client_ip_address: clientIp,
      client_user_agent: userAgent,
      fbp: user_data?.fbp || undefined,
      fbc: user_data?.fbc || undefined,
    };

    // Add hashed user data if available
    if (user_data?.em || user_data?.ph || user_data?.fn || user_data?.external_id) {
      const hashedData = hashUserData({
        em: user_data.em,
        ph: user_data.ph,
        fn: user_data.fn,
        external_id: user_data.external_id
      });
      Object.assign(enhancedUserData, hashedData);
    }

    // Build the payload according to Meta's specification
    const payload = {
      data: [
        {
          event_name,
          event_time: event_time || Math.floor(Date.now() / 1000),
          event_id: event_id || `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
          action_source: 'website',
          event_source_url: user_data?.event_source_url || '',
          user_data: enhancedUserData,
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
