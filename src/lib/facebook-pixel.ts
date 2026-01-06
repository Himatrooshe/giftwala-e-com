/**
 * Facebook Pixel Event Tracking Utility
 * 
 * This utility provides functions to track custom events with Facebook Pixel
 * Use these functions throughout the app to track user actions
 */

// Extend the Window interface to include fbq
declare global {
  interface Window {
    fbq?: (
      action: string,
      event: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Track a custom Facebook Pixel event
 */
export function trackFacebookEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
}

/**
 * Track AddToCart event
 */
export function trackAddToCart(product: {
  content_name: string;
  content_ids?: string[];
  value?: number;
  currency?: string;
}): void {
  trackFacebookEvent('AddToCart', {
    content_name: product.content_name,
    content_ids: product.content_ids || [],
    value: product.value || 0,
    currency: product.currency || 'BDT',
  });
}

/**
 * Track InitiateCheckout event
 */
export function trackInitiateCheckout(value: number, currency: string = 'BDT'): void {
  trackFacebookEvent('InitiateCheckout', {
    value,
    currency,
  });
}

/**
 * Track Purchase event
 */
export function trackPurchase(
  value: number,
  currency: string = 'BDT',
  contentIds?: string[]
): void {
  trackFacebookEvent('Purchase', {
    value,
    currency,
    content_ids: contentIds || [],
  });
}

/**
 * Track ViewContent event (for product pages)
 */
export function trackViewContent(product: {
  content_name: string;
  content_ids?: string[];
  value?: number;
  currency?: string;
}): void {
  trackFacebookEvent('ViewContent', {
    content_name: product.content_name,
    content_ids: product.content_ids || [],
    value: product.value || 0,
    currency: product.currency || 'BDT',
  });
}

/**
 * Track Search event
 */
export function trackSearch(searchString: string): void {
  trackFacebookEvent('Search', {
    search_string: searchString,
  });
}

/**
 * Track Contact event
 */
export function trackContact(): void {
  trackFacebookEvent('Contact');
}

