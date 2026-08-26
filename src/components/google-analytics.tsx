"use client";

import Script from "next/script";

// Loads the Google tag (gtag.js) for Google Analytics. A client component is
// required because the root layout is a server component and React 19 does not
// execute scripts rendered as children there. Using next/script is the
// recommended way to install the tag in the App Router.
const GA_TRACKING_ID = "G-D44DWT4XXR";

export function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}');
        `}
      </Script>
    </>
  );
}