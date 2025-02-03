import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import { Context } from "deco/deco.ts";
import Theme from "../sections/Theme/Theme.tsx";

const sw = () =>
  addEventListener("load", () => {
    if (navigator && navigator.serviceWorker) {
      navigator.serviceWorker.register("/sw.js");
      navigator.serviceWorker.register("/insider-sw-sdk.js");
    }
  });

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
        <link
          rel="preload"
          type="text/css"
          href={asset("/fonts/SackersGothicStdHeavy.woff")}
        />
        <link
          rel="preload"
          type="text/css"
          href={asset("/fonts/SackersGothicStdLight.woff")}
        />
        <link
          rel="preload"
          type="text/css"
          href={asset("/fonts/SackersGothicStdMedium.woff")}
        />

        <link
          rel="preload"
          type="text/css"
          href={asset("/fonts/RobotoCondensed-Regular.woff")}
        />

        <link
          rel="preload"
          type="text/css"
          href={asset("/fonts/RobotoCondensed-Bold.woff")}
        />
        <link
          rel="preload"
          type="text/css"
          href={asset("/fonts/RobotoCondensed-Medium.woff")}
        />

        <link
          rel="preload"
          type="text/css"
          href={asset("/fonts/ Montserrat-Regular.woff")}
        />

        <link
          rel="preload"
          type="text/css"
          href="https://fossil.vteximg.com.br/arquivos/museosans_300-webfont.woff2.css"
        />

        <link
          rel="preload"
          type="text/css"
          href="https://fossil.vteximg.com.br/arquivos/museosans_500-webfont.woff2.css"
        />

        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html: `
            @font-face {
              font-family: "Sacker Gothics";
              src: url(${asset(
                "/fonts/SackersGothicStdLight.woff"
              )}) format('woff');
              font-weight: 400;
              font-display: swap;
              font-style: normal;
            }
            @font-face {
              font-family: "Sacker Gothics";
              src: url(${asset(
                "/fonts/SackersGothicStdMedium.woff"
              )}) format('woff');
              font-weight: 500;
              font-display: swap;
              font-style: normal;
            }
            @font-face {
              font-family: "Sacker Gothics";
              src: url(${asset(
                "/fonts/SackersGothicStdHeavy.woff"
              )}) format('woff');
              font-weight: 700;
              font-display: swap;
              font-style: normal;
            }
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

            @font-face {
              font-family: "Roboto Condensed"; 
              src: url(${asset(
                "/fonts/RobotoCondensed-Regular.woff"
              )}) format('woff');
              ont-weight: 400; 
              font-display: swap;
              font-style: normal;
            }

            
            @font-face {
              font-family: "Roboto Condensed"; 
              src: url(${asset(
                "/fonts/RobotoCondensed-Bold.woff"
              )}) format('woff');
              ont-weight: 700; 
              font-display: swap;
              font-style: normal;
            }

            @font-face {
              font-family: "Roboto Condensed"; 
              src: url(${asset(
                "/fonts/RobotoCondensed-Medium.woff"
              )}) format('woff');
              ont-weight: 500; 
              font-display: swap;
              font-style: normal;
            }

            @font-face {
              font-family: "Montserrat"; 
              src: url(${asset(
                "/fonts/Montserrat-Regular.woff"
              )}) format('woff');
              font-weight: 400; 
              font-display: swap;
              font-style: normal;
            }

                           
            @font-face {
              font-family: 'Scout Condensed';
              src: url('https://timecenter.vteximg.com.br/arquivos/scout-condensed-regular.eot.css?#iefix') format('embedded-opentype'),  url('https://timecenter.vteximg.com.br/arquivos/scout-condensed-regular.woff.css') format('woff'), url('https://timecenter.vteximg.com.br/arquivos/scout-condensed-regular.ttf.css')  format('truetype'), url('https://timecenter.vteximg.com.br/arquivos/scout-condensed-regular.svg.css#https://timecenter.vteximg.com.br/arquivos/scout-condensed-regular') format('svg');
              font-weight: normal;
              font-style: normal;
            }

            @font-face {
              font-family: 'Scout Cond';
              src: url('https://timecenter.vteximg.com.br/arquivos/ScoutCond-Bold.otf.css');
              src: url('https://timecenter.vteximg.com.br/arquivos/ScoutCond-Bold.otf.css?#iefix') format('opentype');
              font-weight: 600;
              font-style: bold;
            }

            @font-face {
              font-family: 'Scout Cond';
              src: url('https://timecenter.vteximg.com.br/arquivos/ScoutCond-Light.otf.css');
              src: url('https://timecenter.vteximg.com.br/arquivos/ScoutCond-Light.otf.css?#iefix') format('opentype');
              font-weight: 200;
              font-style: normal;
            }

            @font-face {
              font-family: 'Scout Cond';
              src: url('https://timecenter.vteximg.com.br/arquivos/ScoutCond-Regular.otf.css');
              src: url('https://timecenter.vteximg.com.br/arquivos/ScoutCond-Regular.otf.css?#iefix') format('opentype');
              font-weight: 300;
              font-style: normal;
            }

            @font-face {
              src: url('https://timecenter.vteximg.com.br/arquivos/Scout-Regular.otf.css');
              src: url('https://timecenter.vteximg.com.br/arquivos/Scout-Regular.otf.css?#iefix') format('opentype');
              font-family: 'Scout';
              font-weight: 300;
              font-style: normal;
            }


            @font-face {
              font-family: 'Soleil';
              src: url('https://fossil.vteximg.com.br/arquivos/Soleil-Light.otf.css');
              font-weight: 300;
              font-style: normal;
            }

            @font-face {
              font-family: 'Soleil';
              src: url('https://fossil.vteximg.com.br/arquivos/Soleil-LightItalic.otf.css');
              font-weight: 300;
              font-style: italic;
            }

            @font-face {
              font-family: 'Soleil';
              src: url('https://fossil.vteximg.com.br/arquivos/Soleil-Regular.otf.css');
              font-weight: normal;
              font-style: normal;
            }

            @font-face {
              font-family: 'Soleil';
              src: url('https://fossil.vteximg.com.br/arquivos/Soleil-Italic.otf.css');
              font-weight: normal;
              font-style: italic;
            }

            @font-face {
              font-family: 'Soleil';
              src: url('https://fossil.vteximg.com.br/arquivos/Soleil-Book.otf.css');
              font-weight: 500;
              font-style: normal;
            }

            @font-face {
              font-family: 'Soleil';
              src: url('https://fossil.vteximg.com.br/arquivos/Soleil-BookItalic.otf.css');
              font-weight: 500;
              font-style: italic;
            }

            @font-face {
              font-family: 'Soleil';
              src: url('https://fossil.vteximg.com.br/arquivos/Soleil-Semibold.otf.css');
              font-weight: 600;
              font-style: normal;
            }

            @font-face {
              font-family: 'Soleil';
              src: url('https://fossil.vteximg.com.br/arquivos/Soleil-SemiboldItalic.otf.css');
              font-weight: 600;
              font-style: italic;
            }

            @font-face {
              font-family: 'Soleil';
              src: url('https://fossil.vteximg.com.br/arquivos/Soleil-Bold.otf.css');
              font-weight: 700;
              font-style: normal;
            }

            @font-face {
              font-family: 'Soleil';
              src: url('https://fossil.vteximg.com.br/arquivos/Soleil-BoldItalic.otf.css');
              font-weight: 700;
              font-style: italic;
            }

            @font-face {
              font-family: 'Soleil';
              src: url('https://fossil.vteximg.com.br/arquivos/Soleil-Black.otf.css');
              font-weight: 900;
              font-style: normal;
            }

            @font-face {
              font-family: 'Soleil';
              src: url('https://fossil.vteximg.com.br/arquivos/Soleil-BlackItalic.otf.css');
              font-weight: 900;
              font-style: italic;
            }

            @font-face {
              font-family: 'Gotham';
              src: url('https://fossil.vteximg.com.br/arquivos/Gotham-Light2.eot.css');
              src: url('https://fossil.vteximg.com.br/arquivos/Gotham-Light2.eot.css?#iefix') format('embedded-opentype'),
              url('https://fossil.vteximg.com.br/arquivos/Gotham-Light2.woff2.css') format('woff2'),
              url('https://fossil.vteximg.com.br/arquivos/Gotham-Light2.woff.css') format('woff'),
              url('https://fossil.vteximg.com.br/arquivos/Gotham-Light2.ttf.css') format('truetype'),
              url('https://fossil.vteximg.com.br/arquivos/Gotham-Light2.svg.css#Gotham-Light') format('svg');
              font-weight: 300;
              font-style: normal;
            }

            @font-face {
              font-family: 'Gotham Book';
              src: url('https://fossil.vteximg.com.br/arquivos/Gotham-Book2.eot.css');
              src: url('https://fossil.vteximg.com.br/arquivos/Gotham-Book2.eot.css?#iefix') format('embedded-opentype'),
              url('https://fossil.vteximg.com.br/arquivos/Gotham-Book2.woff2.css') format('woff2'),
              url('https://fossil.vteximg.com.br/arquivos/Gotham-Book2.woff.css') format('woff'),
              url('https://fossil.vteximg.com.br/arquivos/Gotham-Book2.ttf.css') format('truetype'),
              url('https://fossil.vteximg.com.br/arquivos/Gotham-Book2.svg.css#Gotham-Book') format('svg');
              font-weight: normal;
              font-style: normal;
            }

            @font-face {
              font-family: 'Gotham';
              src: url('https://fossil.vteximg.com.br/arquivos/Gotham-Bold2.eot.css');
              src: url('https://fossil.vteximg.com.br/arquivos/Gotham-Bold2.eot.css?#iefix') format('embedded-opentype'),
              url('https://fossil.vteximg.com.br/arquivos/Gotham-Bold2.woff2.css') format('woff2'),
              url('https://fossil.vteximg.com.br/arquivos/Gotham-Bold2.woff.css') format('woff'),
              url('https://fossil.vteximg.com.br/arquivos/Gotham-Bold2.ttf.css') format('truetype'),
              url('https://fossil.vteximg.com.br/arquivos/Gotham-Bold2.svg.css#Gotham-Bold') format('svg');
              font-weight: bold;
              font-style: normal;
            }

            @font-face {
              font-family: "Museo Sans";
              src: url("https://fossil.vteximg.com.br/arquivos/museosans_300-webfont.woff2.css") format("woff2"),
              url("https://fossil.vteximg.com.br/arquivos/museosans_300-webfont.woff.css") format("woff");
              font-weight: 300;
            }
        
            @font-face {
              font-family: "Museo Sans";
              src: url("https://fossil.vteximg.com.br/arquivos/museosans_500-webfont.woff2.css") format("woff2"),
              url("https://fossil.vteximg.com.br/arquivos/museosans_500-webfont.woff.css") format("woff");
              font-weight: 500;
            }

            
            @font-face {
              font-family: 'Gotham Bold';
              src: url('https://fossil.vteximg.com.br/arquivos/GothamBold.eot.css?#iefix') format("embedded-opentype"), url('https://fossil.vteximg.com.br/arquivos/GothamBold.woff.css') format("woff"), url('https://fossil.vteximg.com.br/arquivos/GothamBold.ttf.css') format("truetype"), url('https://fossil.vteximg.com.br/arquivos/GothamBold.svg.css#/arquivos/GothamBold') format("svg");
              font-weight: normal;
              font-style: normal;
            }

            @font-face {
              font-family: 'Gotham Medium';
              src: url('https://fossil.vteximg.com.br/arquivos/TimeCenter2017GothamMK3Medium.eot.css?#iefix') format("embedded-opentype"), url('https://fossil.vteximg.com.br/arquivos/TimeCenter2017GothamMK3Medium.woff.css') format("woff"), url('https://fossil.vteximg.com.br/arquivos/TimeCenter2017GothamMK3Medium.ttf.css') format("truetype"), url('https://fossil.vteximg.com.br/arquivos/TimeCenter2017GothamMK3Medium.svg.css#/arquivos/TimeCenter2017GothamMK3Medium') format("svg");
              font-weight: normal;
              font-style: normal;
            }

            @font-face {
              font-family: 'icomoon';
              src:    url('https://fossil.vteximg.com.br/arquivos/smartwatch-icomoon.eot.css?uk4201');
              src:    url('https://fossil.vteximg.com.br/arquivos/smartwatch-icomoon.eot.css?uk4201#iefix') format('embedded-opentype'),
                      url('https://fossil.vteximg.com.br/arquivos/smartwatch-icomoon.ttf.css?uk4201') format('truetype'),
                      url('https://fossil.vteximg.com.br/arquivos/smartwatch-icomoon.woff.css?uk4201') format('woff'),
                      url('https://fossil.vteximg.com.br/arquivos/smartwatch-icomoon.svg.css?uk4201#icomoon') format('svg');
              font-weight: normal;
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
