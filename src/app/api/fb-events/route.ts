import { NextRequest, NextResponse } from 'next/server';

const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;
const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
const API_VERSION = 'v21.0';

export async function POST(request: NextRequest) {
  try {
    if (!FB_ACCESS_TOKEN) {
      console.error('FB_ACCESS_TOKEN not found in environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    if (!PIXEL_ID) {
      console.error('NEXT_PUBLIC_FB_PIXEL_ID not found in environment variables');
      return NextResponse.json(
        { error: 'Pixel ID configuration error' },
        { status: 500 }
      );
    }

    const body = await request.json();
    
    // Get user IP and user agent
    const forwardedFor = request.headers.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : 
                     request.headers.get('x-real-ip') || '';
    const userAgent = request.headers.get('user-agent') || '';

    // Build the payload for Facebook Conversions API
    const payload = {
      data: [
        {
          event_name: body.eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: body.eventId || `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
          action_source: 'website',
          event_source_url: body.sourceUrl || '',
          user_data: {
            client_ip_address: clientIp,
            client_user_agent: userAgent,
            ...(body.fbp && { fbp: body.fbp }),
            ...(body.fbc && { fbc: body.fbc }),
            ...(body.emails && { em: body.emails.map((email: string) => email.toLowerCase().trim()) }),
            ...(body.phones && { ph: body.phones.map((phone: string) => phone.replace(/\D/g, '')) }),
            ...(body.firstName && { fn: body.firstName.toLowerCase().trim() }),
            ...(body.lastName && { ln: body.lastName.toLowerCase().trim() }),
          },
          custom_data: {
            ...(body.value && { value: body.value }),
            ...(body.currency && { currency: body.currency }),
            ...(body.products && { contents: body.products }),
          }
        }
      ],
      ...(process.env.NEXT_PUBLIC_FB_DEBUG === 'true' && { test_event_code: 'TEST12345' })
    };

    // Send to Facebook Conversions API
    const response = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${FB_ACCESS_TOKEN}`,
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
      console.error('Facebook Conversions API Error:', result);
      return NextResponse.json(
        { error: 'Failed to send event to Facebook', details: result },
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