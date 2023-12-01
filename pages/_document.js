import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
export default class MyDocument extends Document { 
  
  static async getInitialProps(ctx) {    
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  
  render() {
    return (
      <Html lang="en">
        <Head>
          
        
        
        <Script
            src="/js/jquery-3.4.1.min.js"
            type="text/javascript"
            strategy="beforeInteractive"
          />

          
          <Script
            src="/js/jquery-ui.js"
            type="text/javascript"
            strategy="beforeInteractive"
          />

          

          
          <Script  id="inline-script"
   >
            {`
              jQuery.noConflict();
              (function ($) {
                // Use the $ symbol within this scope, if needed by wmks.min.js
                // For example:
                $(document).ready(function () {
                  // Your code using $ here
                  
                });
              })(jQuery);
            `}
          </Script>
          <Script src="/js/wmks.min.js" strategy="afterInteractive"></Script>
          
        
            

          {/*

          <script
            src="https://code.jquery.com/jquery-3.4.1.min.js"
            type="text/javascript"
          />

          
          <script
            src="https://code.jquery.com/ui/1.8.16/jquery-ui.js"
            type="text/javascript"
          />

          

          
          <script>
            {`
              jQuery.noConflict();
              (function ($) {
                // Use the $ symbol within this scope, if needed by wmks.min.js
                // For example:
                $(document).ready(function () {
                  // Your code using $ here
                  
                });
              })(jQuery);
            `}
          </script>
          <script src="/js/wmks.min.js"></script>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          */}
          <meta charSet="utf-8" />          
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
