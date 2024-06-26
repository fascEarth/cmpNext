import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document { 
  
  static async getInitialProps(ctx) {    
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />          
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
  
}
