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

        <link rel="stylesheet" href="https://use.typekit.net/ndp1dcv.css" />
        
      </Head>

      {/* Rest of Preact tree */}
      <ctx.Component />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @font-face{
              font-family: 'Soleil-Regular';
              src: url("/fonts/Soleil-Regular.ttf") format("truetype");
              font-weight: 400;
              font-display: swap;
              font-style: normal;
            }; 

            @font-face{
              font-family: 'Soleil-Black';
              src: url("/fonts/Soleil-Black.ttf") format("truetype");
              font-weight: 900;
              font-display: swap;
              font-style: normal;
            }; 

            @font-face{
              font-family: 'Soleil-Medium';
              src: url("/fonts/Soleil-Semibold.ttf") format("truetype");
              font-weight: 500;
              font-display: swap;
              font-style: normal;
            }; 


            @font-face{
              font-family: 'Soleil-Bold';
              src: url("/fonts/Soleil-Bold.ttf") format("truetype");
              font-weight: 700;
              font-display: swap;
              font-style: normal;
            }; 
           
            @font-face{
              font-family: 'Soleil-Light';
              src: url("/fonts/Soleil-Light.ttf") format("truetype");
              font-weight: 300;
              font-display: swap;
              font-style: normal;
            }; 
        `,
        }}
      />

      {/* Include service worker */}
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: `(${sw})();` }}
      />
    </>
  );
});
