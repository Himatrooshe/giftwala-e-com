/**
 * Meta Pixel & Conversions API Tracking Configuration
 * 
 * This file contains configuration and utilities to ensure:
 * 1. All events are tracked with both Pixel and Conversions API
 * 2. Proper deduplication keys are used
 * 3. Both attributed and unattributed events are sent
 * 4. Enhanced user data is collected for better matching
 */

export const PIXEL_ID = '834992922921146';

// Standard events that should be tracked
export const STANDARD_EVENTS = {
  PAGE_VIEW: 'PageView',
  VIEW_CONTENT: 'ViewContent',
  ADD_TO_CART: 'AddToCart',
  INITIATE_CHECKOUT: 'InitiateCheckout',
  PURCHASE: 'Purchase',
  LEAD: 'Lead',
  SEARCH: 'Search'
} as const;

// Event parameters mapping for consistency
export const EVENT_PARAMETERS = {
  VALUE: 'value',
  CURRENCY: 'currency',
  CONTENT_TYPE: 'content_type',
  CONTENT_NAME: 'content_name',
  CONTENT_IDS: 'content_ids',
  ORDER_ID: 'order_id',
  SEARCH_STRING: 'search_string'
} as const;

// User data fields for enhanced matching
export const USER_DATA_FIELDS = {
  EMAIL: 'em',
  PHONE: 'ph',
  FIRST_NAME: 'fn',
  LAST_NAME: 'ln',
  EXTERNAL_ID: 'external_id',
  CLIENT_IP: 'client_ip_address',
  CLIENT_USER_AGENT: 'client_user_agent',
  FBP: 'fbp',
  FBC: 'fbc'
} as const;

/**
 * Validate event data before sending
 */
export function validateEventData(eventName: string, customData?: Record<string, any>) {
  const errors: string[] = [];
  
  // Check required fields for specific events
  switch (eventName) {
    case STANDARD_EVENTS.PURCHASE:
      if (!customData?.value || customData.value <= 0) {
        errors.push('Purchase events must have a positive value');
      }
      if (!customData?.currency) {
        errors.push('Purchase events must specify currency');
      }
      break;
      
    case STANDARD_EVENTS.ADD_TO_CART:
    case STANDARD_EVENTS.INITIATE_CHECKOUT:
      if (!customData?.value || customData.value <= 0) {
        errors.push(`${eventName} events should have a positive value`);
      }
      break;
      
    case STANDARD_EVENTS.SEARCH:
      if (!customData?.search_string) {
        errors.push('Search events must include search_string');
      }
      break;
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Get tracking configuration for current environment
 */
export function getTrackingConfig() {
  return {
    pixelId: PIXEL_ID,
    apiVersion: 'v21.0',
    testEventCode: process.env.NODE_ENV === 'development' ? 'TEST12345' : undefined,
    enableDebugMode: process.env.NODE_ENV === 'development',
    retryAttempts: 3,
    retryDelay: 1000 // milliseconds
  };
}

/**
 * Format currency value for Meta
 */
export function formatCurrencyValue(value: number): number {
  // Meta expects currency values as numbers (not strings)
  // Round to 2 decimal places for currency precision
  return Math.round(value * 100) / 100;
}

/**
 * Normalize phone number for better matching
 */
export function normalizePhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // Add country code if missing (assuming Bangladesh +880)
  if (digits.length === 11 && digits.startsWith('01')) {
    return '880' + digits;
  }
  
  return digits;
}

/**
 * Normalize email for better matching
 */
export function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}