/**
 * Meta Pixel Helper Functions
 * Tracks events with both Browser Pixel and Conversions API
 * Includes deduplication with event_id and enhanced user matching
 */

import { 
  validateEventData, 
  getTrackingConfig, 
  formatCurrencyValue, 
  normalizePhoneNumber, 
  normalizeEmail 
} from './trackingConfig';

// Get cookie value
function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

// Get enhanced user data from localStorage and forms
function getEnhancedUserData() {
  if (typeof window === 'undefined') return {};
  
  try {
    let userData: any = {};
    
    // First try to get from current session tracking data
    const trackingData = localStorage.getItem('userTrackingData');
    if (trackingData) {
      const data = JSON.parse(trackingData);
      if (data.email) userData.em = normalizeEmail(data.email);
      if (data.phone) userData.ph = normalizePhoneNumber(data.phone);
      if (data.name) userData.fn = data.name.toLowerCase().trim();
    }
    
    // Fallback to recent orders if no current session data
    if (!userData.em && !userData.ph) {
      const pendingOrders = localStorage.getItem('pendingOrders');
      if (pendingOrders) {
        const orders = JSON.parse(pendingOrders);
        if (orders.length > 0) {
          const lastOrder = orders[orders.length - 1];
          if (lastOrder.email) userData.em = normalizeEmail(lastOrder.email);
          if (lastOrder.phone) userData.ph = normalizePhoneNumber(lastOrder.phone);
          if (lastOrder.fullName) userData.fn = lastOrder.fullName.toLowerCase().trim();
        }
      }
    }
    
    // Generate external_id based on available data for better deduplication
    if (userData.em || userData.ph) {
      userData.external_id = userData.em || userData.ph;
    }
    
    return userData;
  } catch {
    return {};
  }
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
  // Validate event data
  const validation = validateEventData(eventName, customData);
  if (!validation.isValid) {
    console.warn('Event validation failed:', validation.errors);
    // Continue tracking even with warnings, but log the issues
  }

  const eventId = generateEventId();
  const eventTime = Math.floor(Date.now() / 1000);
  const config = getTrackingConfig();

  // Format currency values properly
  const formattedCustomData = customData ? {
    ...customData,
    ...(customData.value && { value: formatCurrencyValue(customData.value) })
  } : {};

  // 1. Track with Browser Pixel (client-side)
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, formattedCustomData, { eventID: eventId });
    
    // Also track as custom event for unattributed traffic
    if (eventName !== 'PageView') {
      (window as any).fbq('trackCustom', `${eventName}_Unattributed`, formattedCustomData, { eventID: `${eventId}_unattributed` });
    }
  }

  // 2. Track with Conversions API (server-side) with retry logic
  const enhancedUserData = getEnhancedUserData();
  
  const sendToConversionsAPI = async (retryCount = 0) => {
    try {
      const response = await fetch('/api/conversions', {
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
            ...enhancedUserData, // Include email, phone, external_id if available
          },
          custom_data: formattedCustomData,
          ...(config.testEventCode && { test_event_code: config.testEventCode })
        })
      });

      if (!response.ok && retryCount < config.retryAttempts - 1) {
        // Retry with exponential backoff
        setTimeout(() => sendToConversionsAPI(retryCount + 1), config.retryDelay * Math.pow(2, retryCount));
      } else if (!response.ok) {
        console.error('Conversions API failed after retries:', await response.text());
      }
    } catch (error) {
      console.error('Conversions API error:', error);
      if (retryCount < config.retryAttempts - 1) {
        // Retry on network errors
        setTimeout(() => sendToConversionsAPI(retryCount + 1), config.retryDelay * Math.pow(2, retryCount));
      }
    }
  };

  sendToConversionsAPI();
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
