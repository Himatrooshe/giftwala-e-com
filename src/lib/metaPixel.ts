/**
 * Meta Pixel Helper Functions with Facebook Conversion API
 * Uses the professional package for Pixel integration with custom API route
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

// Get user data from localStorage for better tracking
function getUserData() {
  if (typeof window === 'undefined') return {};
  
  try {
    let userData: any = {};
    
    // Get from current session tracking data
    const trackingData = localStorage.getItem('userTrackingData');
    if (trackingData) {
      const data = JSON.parse(trackingData);
      if (data.email) userData.emails = [data.email];
      if (data.phone) userData.phones = [data.phone];
      if (data.name) {
        const nameParts = data.name.split(' ');
        userData.firstName = nameParts[0];
        if (nameParts.length > 1) userData.lastName = nameParts.slice(1).join(' ');
      }
    }
    
    // Fallback to recent orders if no current session data
    if (!userData.emails && !userData.phones) {
      const pendingOrders = localStorage.getItem('pendingOrders');
      if (pendingOrders) {
        const orders = JSON.parse(pendingOrders);
        if (orders.length > 0) {
          const lastOrder = orders[orders.length - 1];
          if (lastOrder.email) userData.emails = [lastOrder.email];
          if (lastOrder.phone) userData.phones = [lastOrder.phone];
          if (lastOrder.fullName) {
            const nameParts = lastOrder.fullName.split(' ');
            userData.firstName = nameParts[0];
            if (nameParts.length > 1) userData.lastName = nameParts.slice(1).join(' ');
          }
        }
      }
    }
    
    return userData;
  } catch {
    return {};
  }
}

/**
 * Track event with both Browser Pixel and Conversions API
 */
async function trackEvent(eventName: string, customData?: Record<string, any>) {
  const eventId = generateEventId();
  const userData = getUserData();
  const fbp = getCookie('_fbp');
  const fbc = getCookie('_fbc');

  // Debug logging
  const isDebug = process.env.NEXT_PUBLIC_FB_DEBUG === 'true';
  if (isDebug && typeof window !== 'undefined') {
    console.log(`📊 Tracking ${eventName}:`, {
      eventId,
      fbp,
      hasUserData: !!(userData.emails || userData.phones),
      customData
    });
  }

  // 1. Track with Browser Pixel (client-side)
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, customData || {}, { eventID: eventId });
  }

  // 2. Track with Conversions API (server-side)
  try {
    const response = await fetch('/api/fb-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName,
        eventId, // Critical: Must match eventID sent to pixel
        sourceUrl: window.location.href,
        fbp,
        fbc,
        ...userData,
        ...customData,
      })
    });

    if (!response.ok) {
      console.error(`Conversions API error for ${eventName}:`, await response.text());
    } else if (isDebug) {
      const result = await response.json();
      console.log(`✅ ${eventName} sent to API:`, result);
    }
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
 * Track ViewContent event
 */
export async function trackViewContent(data: {
  value: number;
  currency?: string;
  contentName?: string;
  contentId?: string;
}) {
  await trackEvent('ViewContent', {
    value: data.value,
    currency: data.currency || 'BDT',
    content_type: 'product',
    ...(data.contentName && { content_name: data.contentName }),
    ...(data.contentId && { content_ids: [data.contentId] })
  });
}

/**
 * Track PageView event
 */
export async function trackPageView() {
  await trackEvent('PageView');
}

/**
 * Track Search event
 */
export async function trackSearch(data: {
  searchString: string;
}) {
  await trackEvent('Search', {
    search_string: data.searchString,
    content_type: 'product'
  });
}

/**
 * Track Lead event (for contact form submissions)
 */
export async function trackLead(data?: {
  value?: number;
  currency?: string;
}) {
  await trackEvent('Lead', {
    value: data?.value || 0,
    currency: data?.currency || 'BDT',
    content_type: 'form_submission'
  });
}
