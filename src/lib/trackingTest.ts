/**
 * Meta Pixel & Conversions API Testing Utilities
 * 
 * Use these functions to test and verify your tracking implementation
 */

import { 
  trackEvent, 
  trackPageView, 
  trackViewContent, 
  trackAddToCart, 
  trackInitiateCheckout, 
  trackPurchase, 
  trackLead, 
  trackSearch 
} from './metaPixel';

/**
 * Test all tracking events with sample data
 */
export async function testAllEvents() {
  console.log('🧪 Testing Meta Pixel & Conversions API events...');
  
  try {
    // Test PageView
    console.log('📄 Testing PageView...');
    await trackPageView();
    
    // Test ViewContent
    console.log('👁️ Testing ViewContent...');
    await trackViewContent({
      value: 260,
      currency: 'BDT',
      contentName: 'Smart Nasal Cleaner',
      contentId: 'nasal-cleaner-1'
    });
    
    // Test AddToCart
    console.log('🛒 Testing AddToCart...');
    await trackAddToCart({
      value: 260,
      currency: 'BDT',
      contentName: 'Smart Nasal Cleaner'
    });
    
    // Test InitiateCheckout
    console.log('💳 Testing InitiateCheckout...');
    await trackInitiateCheckout({
      value: 340,
      currency: 'BDT'
    });
    
    // Test Purchase
    console.log('💰 Testing Purchase...');
    await trackPurchase({
      value: 340,
      currency: 'BDT',
      orderId: 'test-order-' + Date.now()
    });
    
    // Test Lead
    console.log('📝 Testing Lead...');
    await trackLead();
    
    // Test Search
    console.log('🔍 Testing Search...');
    await trackSearch({
      searchString: 'nasal cleaner'
    });
    
    console.log('✅ All events tested successfully!');
    
  } catch (error) {
    console.error('❌ Error testing events:', error);
  }
}

/**
 * Test user data collection
 */
export function testUserDataCollection() {
  console.log('👤 Testing user data collection...');
  
  // Simulate user data
  const testUserData = {
    email: 'test@example.com',
    phone: '01712345678',
    name: 'Test User',
    timestamp: Date.now()
  };
  
  localStorage.setItem('userTrackingData', JSON.stringify(testUserData));
  console.log('✅ Test user data stored');
  
  // Test order data
  const testOrderData = [{
    email: 'order@example.com',
    phone: '01787654321',
    fullName: 'Order User',
    totalPrice: 340
  }];
  
  localStorage.setItem('pendingOrders', JSON.stringify(testOrderData));
  console.log('✅ Test order data stored');
}

/**
 * Check if Meta Pixel is loaded
 */
export function checkPixelStatus() {
  console.log('🔍 Checking Meta Pixel status...');
  
  if (typeof window === 'undefined') {
    console.log('❌ Not in browser environment');
    return false;
  }
  
  if (!(window as any).fbq) {
    console.log('❌ Meta Pixel not loaded');
    return false;
  }
  
  console.log('✅ Meta Pixel loaded successfully');
  return true;
}

/**
 * Test Conversions API connectivity
 */
export async function testConversionsAPI() {
  console.log('🔌 Testing Conversions API connectivity...');
  
  try {
    const response = await fetch('/api/conversions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: 'Test',
        event_id: 'test-' + Date.now(),
        event_time: Math.floor(Date.now() / 1000),
        user_data: {
          event_source_url: window.location.href,
        },
        custom_data: {
          test: true
        }
      })
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Conversions API connected:', result);
      return true;
    } else {
      console.log('❌ Conversions API error:', response.status, response.statusText);
      return false;
    }
  } catch (error) {
    console.log('❌ Conversions API connection failed:', error);
    return false;
  }
}

/**
 * Run comprehensive tracking diagnostics
 */
export async function runTrackingDiagnostics() {
  console.log('🔧 Running comprehensive tracking diagnostics...');
  
  const results = {
    pixelLoaded: checkPixelStatus(),
    conversionsAPIConnected: false,
    userDataCollected: false,
    eventsWorking: false
  };
  
  // Test Conversions API
  results.conversionsAPIConnected = await testConversionsAPI();
  
  // Test user data
  testUserDataCollection();
  results.userDataCollected = true;
  
  // Test events (only if pixel is loaded)
  if (results.pixelLoaded) {
    await testAllEvents();
    results.eventsWorking = true;
  }
  
  console.log('📊 Diagnostics Results:', results);
  
  // Overall health check
  const allWorking = Object.values(results).every(Boolean);
  console.log(allWorking ? '🎉 All systems working!' : '⚠️ Some issues detected');
  
  return results;
}

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).trackingTest = {
    testAllEvents,
    testUserDataCollection,
    checkPixelStatus,
    testConversionsAPI,
    runTrackingDiagnostics
  };
}