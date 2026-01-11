/**
 * Meta Pixel Helper Functions
 * Tracks events with both Browser Pixel and Conversions API
 * Includes deduplication with event_id
 */

// Get cookie value
function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

// Generate unique event ID for deduplication
function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Track event with both Browser Pixel and Conversions API
 * @param eventName - Standard event name (PageView, Purchase, etc.)
 * @param customData - Event parameters (value, currency, etc.)
 */
export async function trackEvent(
  eventName: string,
  customData?: Record<string, any>
) {
  const eventId = generateEventId();
  const eventTime = Math.floor(Date.now() / 1000);

  // 1. Track with Browser Pixel (client-side)
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, customData || {}, { eventID: eventId });
  }

  // 2. Track with Conversions API (server-side)
  try {
    await fetch('/api/conversions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: eventName,
        event_id: eventId,
        event_time: eventTime,
        user_data: {
          event_source_url: window.location.href,
          fbp: getCookie('_fbp'),
          fbc: getCookie('_fbc'),
        },
        custom_data: customData,
      })
    });
  } catch (error) {
    console.error('Conversions API error:', error);
  }
}

/**
 * Track Purchase event
 */
export async function trackPurchase(data: {
  value: number;
  currency?: string;
  orderId?: string;
}) {
  await trackEvent('Purchase', {
    value: data.value,
    currency: data.currency || 'BDT',
    content_type: 'product',
    ...(data.orderId && { order_id: data.orderId })
  });
}

/**
 * Track InitiateCheckout event
 */
export async function trackInitiateCheckout(data: {
  value: number;
  currency?: string;
}) {
  await trackEvent('InitiateCheckout', {
    value: data.value,
    currency: data.currency || 'BDT',
    content_type: 'product',
  });
}

/**
 * Track AddToCart event
 */
export async function trackAddToCart(data: {
  value: number;
  currency?: string;
  contentName?: string;
}) {
  await trackEvent('AddToCart', {
    value: data.value,
    currency: data.currency || 'BDT',
    content_type: 'product',
    ...(data.contentName && { content_name: data.contentName })
  });
}

/**
 * Track PageView event
 */
export async function trackPageView() {
  await trackEvent('PageView');
}
