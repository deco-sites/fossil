import { ImageWidget } from "apps/admin/widgets.ts";
import { Head } from "$fresh/runtime.ts";
import type { HTML } from "./types.ts";
import { FnContext, SectionProps } from "deco/mod.ts";

export interface Props {
  backgroundImage?: ImageWidget;
  backgroundImageMobile?: ImageWidget;
  text?: HTML;
}

export function loader(props: Props, req: Request, ctx: FnContext) {
  const url = new URL(req.url);
  const { pathname } = url;

  return {
    ...props,
    pathname,
    device: ctx.device,
  };
}

function PolicyPage(props: SectionProps<typeof loader>) {
  const { backgroundImage, backgroundImageMobile, text, device } = props;
  return (
    <>
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html: `

                .containerInfo {
                    font-family: "soleil" , "sans-serif";
                }

                .containerInfo h2{
                    display: block;
                    font-weight: 700;
                    font-size: 18px;
                }

                .containerInfo strong i{
                    font-style: italic;
                }

                .containerInfo p {
                    line-height: 1.5;
                    margin: 20px 0
                }

                .containerInfo ul{
                    list-style: disc;
                    padding-left: 15px;
                }
                .containerInfo .listUm{
                    line-height: 22px;
                    padding-left: 20px;
                } 

                .containerInfo table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .containerInfo table, .containerInfo td, .containerInfo th {
                    border: 1px solid black;
                }

                .containerInfo td{
                    padding: 5px;
                }

                .containerInfo::-webkit-scrollbar {
                    width: 6px
                }

                .containerInfo::-webkit-scrollbar-track {
                    background: #505050
                }

                .containerInfo::-webkit-scrollbar-thumb {
                    background-color: #c41c17
                }

                @media only screen and (min-width: 100px) and (max-width: 764px) {
                    .content__institucional {
                        display:block
                    }
                    .content__institucional--left-mobile {
                        display: block
                    }
                    .content__institucional--left {
                        width:100%;
                        position: relative
                    }
                    .containerInfo{
                        width: 86%;
                    }
                    .content__institucional--right {
                        width:100%;
                        position: relative
                    }
                }
            `,
          }}
        />
      </Head>
      <section className="content__institucional w-full relative flex items-center justify-between  py-4 sm:py-16">
        <div className="content__institucional--left w-[45%]">
          {(device == "desktop")
            ? (
              <div className="content__institucional--left-desktop">
                <a>
                  <img src={backgroundImage} alt="" />
                </a>
              </div>
            )
            : (
              <div className="content__institucional--left-mobile">
                <a>
                  <img src={backgroundImageMobile} alt="" />
                </a>
              </div>
            )}
        </div>
        <div className="content__institucional--right w-[55%]">
          <div className="content__institucional--right-texto">
            <div
              className="containerInfo text-sm w-[75%] h-[70vh] mx-auto my-[30px] pr-[15%] pb-[5%] overflow-y-auto overflow-x-hidden"
              dangerouslySetInnerHTML={{ __html: text || "" }}
            >
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PolicyPage;
