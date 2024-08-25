import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <title>Oscar</title>
        <meta name="description" content="Created by samyarth" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/Oscar Logo with Text.svg" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Spectral:400,700&display=swap"
        />
        <link
        href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
         <script src="https://apis.google.com/js/api.js" async defer></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
