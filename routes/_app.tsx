import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import { Context } from "deco/deco.ts";
import Theme from "../sections/Theme/Theme.tsx";

const sw = () =>
  addEventListener("load", () =>
    navigator && navigator.serviceWorker &&
    navigator.serviceWorker.register("/sw.js"));

export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();

  return (
    <>
      {/* Include default fonts and css vars */}
      <Theme />

      {/* Include Icons and manifest */}
      <Head>
        {/* Enable View Transitions API */}
        <meta name="view-transition" content="same-origin" />

        {/* Tailwind v3 CSS file */}
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />

        <link
          rel="preload"
          type="text/css"
          href={asset("/fonts/SoleilRegular.woff")}
        />

        <link
          rel="preload"
          type="text/css"
          href={asset("/fonts/SoleilBlack.woff")}
        />

        <link
          rel="preload"
          type="text/css"
          href={asset("/fonts/SoleilBook.woff")}
        />

        <link
          rel="preload"
          type="text/css"
          href={asset("/fonts/SoleilBold.woff")}
        />

        <link
          rel="preload"
          type="text/css"
          href={asset("/fonts/SoleilLight.woff")}
        />

        <link
          rel="preload"
          type="text/css"
          href={asset("/fonts/SoleilExtrabold.woff")}
        />

        <link
          rel="preload"
          type="text/css"
          href={asset("/fonts/SoleilSemibold.woff")}
        />

        <link
          rel="preload"
          type="text/css"
          href={asset("/fonts/SoleilBlack.woff")}
        />

        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html: `
            @font-face {
              font-family: "soleil";
              src: url(${asset("/fonts/SoleilRegular.woff")}) format('woff');
              font-weight: 400;
              font-display: swap;
              font-style: normal;
            }
            
            @font-face {
              font-family: "soleil"; 
              src: url(${asset("/fonts/SoleilBlack.woff")}) format('woff');
              font-weight: 900;
              font-display: swap;
              font-style: normal;
            }
            
            @font-face {
              font-family: "soleil";
              src: url(${asset("/fonts/SoleilBook.woff")}) format('woff');
              font-weight: 500;
              font-display: swap;
              font-style: normal;
            }
            
            @font-face {
              font-family: "soleil";
              src: url(${asset("/fonts/SoleilBold.woff")}) format('woff');
              font-weight: 700;
              font-display: swap;
              font-style: normal;
            }
            
            @font-face {
              font-family: "soleil";
              src: url(${asset("/fonts/SoleilLight.woff")}) format('woff');
              font-weight: 300;
              font-display: swap;
              font-style: normal;
            }

            @font-face {
              font-family: "soleil";
              src: url(${asset("/fonts/SoleilSemibold.woff")}) format('woff');
              font-weight: 600;
              font-display: swap;
              font-style: normal;
            }
        `,
          }}
        />
      </Head>

      {/* Rest of Preact tree */}
      <ctx.Component />

      {/* Include service worker */}
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: `(${sw})();` }}
      />
    </>
  );
});
