import Head from 'next/head'

function CommonHead() {
  return (
   <>
    <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>Detacloud</title>
        <link rel="icon" href="/images/pages/common/favicon.png" />
      </Head>
   </>
  );
}

export default CommonHead;
