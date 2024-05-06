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

        <link
          rel="preload"
          type="text/css"
          href={asset("/fonts/SoleilRegular.ttf")}
        />

        <link
          rel="preload"
          type="text/css"
          href={asset("/fonts/Soleil-Black.ttf")}
        />

        <link
          rel="preload"
          type="text/css"
          href={asset("/fonts/SoleilBook.ttf")}
        />

        <link
          rel="preload"
          type="text/css"
          href={asset("/fonts/SoleilBold.ttf")}
        />

        <link
          rel="preload"
          type="text/css"
          href={asset("/fonts/SoleilLight.ttf")}
        />

        <link
          rel="preload"
          type="text/css"
          href={asset("/fonts/Soleil-Extrabold.ttf")}
        />

        <link
          rel="preload"
          type="text/css"
          href={asset("/fonts/Soleil-Semibold.ttf")}
        />

        <link
          rel="preload"
          type="text/css"
          href={asset("/fonts/Soleil-Black.ttf")}
        />

        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html: `
            @font-face{
              font-family: soleil-regular;
              src: url(${asset("/fonts/SoleilRegular.ttf")} format("truetype");
              font-weight: 400;
              font-display: swap;
              font-style: normal;
            }; 

            @font-face{
              font-family: soleil-black;
              src: url(${asset("/fonts/Soleil-Black.ttf")} format("truetype");
              font-weight: 900;
              font-display: swap;
              font-style: normal;
            }; 

            @font-face{
              font-family: soleil-book;
              src: url(${asset("/fonts/SoleilBook.ttf")} format("truetype");
              font-weight: 500;
              font-display: swap;
              font-style: normal;
            }; 


            @font-face{
              font-family: soleil-bold;
              src: url(${asset("/fonts/SoleilBold.ttf")} format("truetype");
              font-weight: 700;
              font-display: swap;
              font-style: normal;
            }; 
           
            @font-face{
              font-family:soleil-light;
              src: url(${asset("/fonts/SoleilLight.ttf")}) format("truetype");
              font-weight: 300;
              font-display: swap;
              font-style: normal;
            }; 
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
