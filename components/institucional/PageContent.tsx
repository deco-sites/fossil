import { ImageWidget } from "apps/admin/widgets.ts";
import { FnContext, SectionProps } from "deco/mod.ts";
import { Head } from "$fresh/runtime.ts";
import { HTML } from "./types.ts";

export interface Props {
  /** @description Tipo que pagina será montada */
  pageType?: "Vertical" | "Horizontal";
  /** @description Banner desktop */
  desktop: ImageWidget;
  /** @description Banner mobile */
  mobile: ImageWidget;
  /**
   * @title Content
   * @description Content will be rendered as HTML.
   */
  content: HTML;
}

function PageContent(props: SectionProps<ReturnType<typeof loader>>) {
  const { device, content, desktop, mobile, pageType = "Horizontal" } = props;

  return (
    <>
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .linha-divs {
                background-color: #c41c17;
                height: 2px;
                width: 60%;
                position: relative;
                right: ${pageType == "Vertical" ? "8%" : "-36%"};
                top: -2%;
            }

            .bloco-text-technos li {
              line-height: 22px;
              padding-left: 20px;
              list-style: disc;
              list-style: disc;
          }

            p.paragf {
              font-family: 'Montserrat', sans-serif;
              font-style: normal;
              font-weight: 400;
              font-size: 16px;
              line-height: 140%;
              color: #2E2E2E;
              padding-bottom: 6px;
            }

            h1.header-text-intitucional {
                font-family: 'Montserrat';
                font-style: normal;
                font-weight: 700;
                font-size: 35px;
                line-height: 100%;
                text-transform: uppercase;
                margin-top: 0;
                color: #2E2E2E;
                margin-bottom: ${pageType == "Vertical" ? "5%" : "4%"};
            }

            h3.head-text {
                font-family: 'Montserrat', sans-serif;
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 140%;
                color: #2E2E2E;
                padding-bottom: 20px;
            }

            strong {
              font-weight: bold;
            }

            .bloco-text-technos ul {
              line-height: 22px;
              padding-left: 20px;
              list-style: disc;
              padding-top: 20px;
            }

            .fundotext {
                background: #EEEEEE;
                border-radius: 5px;
                width: 100%;
                display: flex;
                padding: 2% 5% 2% 3%;
            }

            .head-text-destaque {
                font-family: 'Montserrat', sans-serif;
                font-style: normal;
                font-weight: 700;
                font-size: 18px;
                text-align: center;
                position: relative;
                padding: 0% 20%;
                color: #2E2E2E;
            }

            .destaqueblock {
              margin-top: 5%;
            }


            .linha-divs2 {
              background-color: #c41c17;
              height: 2px;
              width: 33%;
              position: relative;
              right: 10%;
              margin-top: 5%;
              top: -2%;
              margin-bottom: 3%;
          }
            .conteiner-paragraph-intitucional.overflow .bloco-text-technos {
                width: 100%;
                font-size: 14px;
                height: 100vh;
                padding: 2%;
                overflow-y: auto;
                overflow-x: hidden;
            }


            div.bloco-text-technos::-webkit-scrollbar-thumb {
                background: #db0c22;
            }

            ::-webkit-scrollbar-track {
                background-color: #F4F4F4;
                border: 3px solid #fff;
            }

            ::-webkit-scrollbar {
                width: 12px;
                background: #F4F4F4;
            }

            ::-webkit-scrollbar-thumb {
                background: #dad7d7;
            }

            @media (max-width: 1024px) {
                .linha-divs {
                    ${
              pageType == "Vertical"
                ? "left: -8% !important;"
                : "right: -45% !important;"
            }
                    margin-bottom: 20px;
                }

                h1.header-text-intitucional {
                    margin-top: 5%;
                    color: #2E2E2E;
                    font-size: 26px;
                    margin-bottom: 5%;
                }

                .head-text-destaque {
                    font-size: 14px;
                    padding: 6% 4%;
                }

                .fundotext {
                    padding: 0;
                }
            }
          `,
          }}
        />
      </Head>
      <div
        className={`conteiner-text-intitucional flex 
        ${
          pageType == "Vertical"
            ? "flex-col sm:flex-col"
            : "sm:mx-[5%] flex-col sm:flex-row"
        }
      `}
      >
        <div className="content--bloco-img-intitucional flex flex-col">
          <div className="element-img-institucional">
            {device == "desktop"
              ? (
                <img
                  src={desktop}
                  alt=""
                  className={`img-desktop ${
                    pageType == "Vertical" ? "max-w-full mb-[5%]" : "max-w-fit"
                  }`}
                />
              )
              : (
                <img
                  src={mobile}
                  alt=""
                  className="img-mobile w-full object-cover"
                />
              )}
          </div>
        </div>
        <div className="content--bloco-text-intitucional">
          <div className="conteiner-paragraph-intitucional mx-[5%] sm:mx-[10%]">
            <div
              className="element-text-institucional"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export const loader = (props: Props, req: Request, ctx: FnContext) => {
  const url = new URL(req.url).pathname;
  return {
    ...props,
    device: ctx.device,
    path: url,
  };
};

export default PageContent;
