'use client';
import Script from 'next/script';
import { useEffect } from 'react';

const PIXEL_ID = '834992922921146';

// Helper to get cookies
function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

// Track PageView with both pixel and server
function trackPageView() {
  const eventId = `pv-${Date.now()}-${Math.random().toString(36).substring(7)}`;
  
  // 1. Track with browser pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'PageView', {}, { eventID: eventId });
  }
  
  // 2. Send to server for Conversions API
  fetch('/api/meta-pixel', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event_name: 'PageView',
      event_id: eventId,
      event_source_url: window.location.href,
      user_data: {
        client_user_agent: navigator.userAgent,
        fbp: getCookie('_fbp'),
        fbc: getCookie('_fbc'),
      }
    })
  }).catch(err => console.error('Meta CAPI error:', err));
}

const FacebookPixel = () => {
  const handlePixelLoad = () => {
    // Track PageView after pixel script loads
    trackPageView();
  };

  return (
    <>
      {/* Meta Pixel Script */}
      <Script
        strategy="afterInteractive"
        id="facebook-pixel"
        onLoad={handlePixelLoad}
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s) {
              if(f.fbq) return;
              n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq) f._fbq=n;
              n.push=n;
              n.loaded=!0;
              n.version='2.0';
              n.queue=[];
              t=b.createElement(e);
              t.async=!0;
              t.src=v;
              s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)
            }(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '${PIXEL_ID}');
          `
        }}
      />
      <noscript>
        <img
          alt="facebook-pixel"
          height={1}
          width={1}
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
};

export default FacebookPixel;