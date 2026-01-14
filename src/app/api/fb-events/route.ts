import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;
const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
const API_VERSION = 'v21.0';

// Hash sensitive data for privacy
function hashData(data: string): string {
  return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
}

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

    // Build user data with hashing for privacy
    const userData: any = {
      client_ip_address: clientIp,
      client_user_agent: userAgent,
    };

    // Add fbp and fbc cookies (NOT hashed - Meta uses these for matching)
    if (body.fbp) userData.fbp = body.fbp;
    if (body.fbc) userData.fbc = body.fbc;

    // Hash sensitive user data
    if (body.emails && body.emails.length > 0) {
      userData.em = body.emails.map((email: string) => hashData(email));
    }
    if (body.phones && body.phones.length > 0) {
      userData.ph = body.phones.map((phone: string) => hashData(phone.replace(/\D/g, '')));
    }
    if (body.firstName) {
      userData.fn = hashData(body.firstName);
    }
    if (body.lastName) {
      userData.ln = hashData(body.lastName);
    }

    // Generate external_id for better deduplication (use email or phone if available)
    if (body.emails && body.emails.length > 0) {
      userData.external_id = hashData(body.emails[0]);
    } else if (body.phones && body.phones.length > 0) {
      userData.external_id = hashData(body.phones[0]);
    } else if (body.fbp) {
      userData.external_id = body.fbp; // Use fbp as fallback
    }

    // Build the payload for Facebook Conversions API
    const payload = {
      data: [
        {
          event_name: body.eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: body.eventId || `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
          action_source: 'website',
          event_source_url: body.sourceUrl || '',
          user_data: userData,
          custom_data: {
            ...(body.value && { value: body.value }),
            ...(body.currency && { currency: body.currency }),
            ...(body.content_type && { content_type: body.content_type }),
            ...(body.content_name && { content_name: body.content_name }),
            ...(body.content_ids && { content_ids: body.content_ids }),
            ...(body.order_id && { order_id: body.order_id }),
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

    // Log successful events for debugging
    if (process.env.NEXT_PUBLIC_FB_DEBUG === 'true') {
      console.log('✅ Event sent successfully:', {
        event_name: body.eventName,
        event_id: body.eventId,
        has_fbp: !!body.fbp,
        has_external_id: !!userData.external_id,
        events_received: result.events_received
      });
    }

    return NextResponse.json({ 
      success: true, 
      event_id: body.eventId,
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