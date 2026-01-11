// Utility to track Meta Pixel events with deduplication

declare global {
  interface Window {
    fbq?: any;
  }
}

// Helper to get cookies
function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

// Generate unique event ID for deduplication
function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(7)}`;
}

interface TrackEventParams {
  eventName: string;
  customData?: Record<string, any>;
}

// Wait for fbq to be available
function waitForFbq(timeout = 5000): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.fbq) {
      resolve(true);
      return;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      if (typeof window !== 'undefined' && window.fbq) {
        clearInterval(interval);
        resolve(true);
      } else if (Date.now() - startTime > timeout) {
        clearInterval(interval);
        resolve(false);
      }
    }, 100);
  });
}

// Track event with both Browser Pixel and Conversions API
export async function trackMetaEvent({ eventName, customData }: TrackEventParams) {
  if (!eventName) {
    console.error('trackMetaEvent: eventName is required');
    return;
  }

  const eventId = generateEventId();

  // 1. Track with Browser Pixel (client-side)
  const fbqReady = await waitForFbq();
  if (fbqReady && typeof window !== 'undefined' && window.fbq) {
    try {
      window.fbq('track', eventName, customData || {}, { eventID: eventId });
      console.log('Meta Pixel tracked:', eventName, eventId);
    } catch (error) {
      console.error('Meta Pixel error:', error);
    }
  } else {
    console.warn('Meta Pixel (fbq) not available for:', eventName);
  }

  // 2. Track with Conversions API (server-side)
  try {
    const response = await fetch('/api/meta-pixel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: eventName,
        event_id: eventId,
        event_source_url: typeof window !== 'undefined' ? window.location.href : '',
        user_data: {
          client_user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
          fbp: getCookie('_fbp'),
          fbc: getCookie('_fbc'),
        },
        custom_data: customData,
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Meta CAPI error:', error);
    } else {
      console.log('Meta CAPI tracked:', eventName, eventId);
    }
  } catch (error) {
    console.error('Meta CAPI tracking error:', error);
  }
}

// Track Purchase event
export async function trackPurchase(orderData: {
  value: number;
  currency?: string;
  orderId?: string;
}) {
  await trackMetaEvent({
    eventName: 'Purchase',
    customData: {
      value: orderData.value,
      currency: orderData.currency || 'BDT',
      content_type: 'product',
      ...(orderData.orderId && { order_id: orderData.orderId })
    }
  });
}

// Track AddToCart event
export async function trackAddToCart(productData: {
  value: number;
  currency?: string;
  contentName?: string;
}) {
  await trackMetaEvent({
    eventName: 'AddToCart',
    customData: {
      value: productData.value,
      currency: productData.currency || 'BDT',
      content_type: 'product',
      ...(productData.contentName && { content_name: productData.contentName })
    }
  });
}

// Track InitiateCheckout event
export async function trackInitiateCheckout(checkoutData: {
  value: number;
  currency?: string;
}) {
  await trackMetaEvent({
    eventName: 'InitiateCheckout',
    customData: {
      value: checkoutData.value,
      currency: checkoutData.currency || 'BDT',
      content_type: 'product',
    }
  });
}
