import { NextRequest, NextResponse } from 'next/server';

const PIXEL_ID = '834992922921146';
// Using Conversions API Gateway (no token needed!)
const GATEWAY_URL = 'https://mpc-prod-16-s6uit34pua-uk.a.run.app';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event_name, event_id, event_source_url, user_data, custom_data } = body;

    // Get user IP and user agent from request
    const forwardedFor = request.headers.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : 
                     request.headers.get('x-real-ip') || '';
    const userAgent = request.headers.get('user-agent') || '';

    // Prepare event data for Conversions API Gateway
    const eventData = {
      data: [
        {
          event_name,
          event_time: Math.floor(Date.now() / 1000),
          event_id,
          event_source_url,
          action_source: 'website',
          user_data: {
            client_ip_address: clientIp,
            client_user_agent: userAgent,
            fbp: user_data?.fbp,
            fbc: user_data?.fbc,
          },
          ...(custom_data && { custom_data })
        }
      ]
    };

    // Send to Meta Conversions API Gateway (proxies to Meta)
    const response = await fetch(
      `${GATEWAY_URL}/${PIXEL_ID}/events`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('Meta CAPI Gateway Error:', result);
      return NextResponse.json(
        { error: 'Failed to send event', details: result },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Meta CAPI Gateway Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
