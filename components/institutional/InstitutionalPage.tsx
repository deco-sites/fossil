import { Head } from "$fresh/runtime.ts";
import { ImageWidget } from "apps/admin/widgets.ts";
import { HTML } from "./types.ts";
import { useId } from "../../sdk/useId.ts";
import Slider from "../ui/Slider.tsx";
import SliderJS from "../../islands/SliderJS.tsx";
import { type FnContext, type SectionProps } from "@deco/deco";
interface Block {
  backgroundImage?: ImageWidget;
  text?: HTML;
}
interface Timeline {
  image?: ImageWidget;
  text?: HTML;
}
interface DotsProps {
  images?: Timeline[];
  interval?: number;
  className: string;
}
export interface Hide {
  /** @default false */
  block1?: boolean;
  /** @default false */
  block2?: boolean;
  /** @default false */
  block3?: boolean;
  /** @default false */
  timeline?: boolean;
}
export interface Props {
  title?: HTML;
  backgroundImage: ImageWidget;
  block1?: Block;
  block2?: Block;
  block3?: Block;
  timelineTitle?: HTML;
  timeline?: Timeline[];
  hide?: Hide;
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
function InstitutionalPage(props: SectionProps<typeof loader>) {
  const {
    backgroundImage,
    title,
    block1,
    block2,
    block3,
    timelineTitle,
    timeline,
    device,
    hide = {
      block1: false,
      block2: false,
      block3: false,
      timeline: false,
    },
  } = props;
  const id = useId();
  return (
    <>
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
                .institucionalBanner>.content {
                  width: 100%;
                  max-width: 1150px;
                  margin-left: auto;
                  margin-right: auto;
                  display: table;
                  font-family: "soleil" , "sans-serif";
                  color: #FFF;
                  padding: 100px 0 72px
               }
                .content {
                    padding-bottom: 40px
                }
                .slick-dots {
                  position: absolute;
                  bottom: 27px;
                  left: 259px;
                  width: auto;
                  margin-top: 0;
                }
                .institucionalBanner>.content h1 {
                  font-size: 2em;
                  margin: .67em 0
                }
                .institucionalBanner>.content p {
                    display: block;
                    margin-top: 36px;
                    font-size: 18px;
                    font-weight: 400;
                    line-height: 24px
                }

                .institucionalBanner>.content h1,
                .institucionalBanner>.content h2 {
                  font-size: 30px;
                  font-weight: 700;
                  margin: 0
                }
                .institucionalBanner>.content p strong {
                    font-weight: 700
                }
                .institucionalInfo__1-texts h2 {
                    font-size: 24px;
                    font-weight: 700
                }
                .institucionalInfo__1-texts p {
                    display: block;
                    margin-top: 10px;
                    font-size: 18px;
                    font-weight: 500;
                    line-height: 24px
                }
                .institucionalInfo__2-texts h2 {
                    font-size: 24px;
                    font-weight: 700
                }
                .institucionalInfo__2-texts p {
                    display: block;
                    margin-top: 10px;
                    font-size: 18px;
                    font-weight: 500;
                    line-height: 24px
                }
                .institucionallab>.content {
                    display: block;
                    width: 100%;
                    max-width: 1150px;
                    margin-left: auto;
                    margin-right: auto;
                    font-family: "soleil" , "sans-serif";
                    color: #000
                }
                .institucionallab>.content h2 {
                    display: block;
                    width: 45%;
                    font-size: 22px;
                    font-weight: 700
                }
                .institucionallab>.content p {
                    display: block;
                    width: 45%;
                    margin-top: 32px;
                    font-size: 18px;
                    line-height: 24px;
                    color: #000
                }
                .institucionaltimeline {
                    display: table;
                    width: 100%;
                    font-family: "soleil" , "sans-serif";
                    color: #000;
                    margin-top: 72px
                }
                .institucionaltimeline>.content {
                    display: block;
                    width: 100%;
                    max-width: 1150px;
                    margin-left: auto;
                    margin-right: auto
                }
                .institucionaltimeline>.content>h2 {
                    display: block;
                    width: 50%;
                    font-size: 30px;
                    font-weight: 700
                }
                .institucionaltimeline>.content>p {
                    display: block;
                    width: 50%;
                    margin-top: 16px;
                    font-size: 18px;
                    font-weight: 500;
                    line-height: 24px
                }
                .institucionaltimeline__slide {
                    display: table;
                    width: 100%;
                    height: 448px;
                    font-family: "soleil" , "sans-serif";
                    margin-top: 72px;
                    background-image: url(https://technos.vteximg.com.br/arquivos/slideinstitucional-lines.png);
                    background-repeat: no-repeat;
                    background-position: center
                }
                .institucionaltimeline__slide .content {
                    position: relative;
                    display: block;
                    max-width: 1150px;
                    margin-left: auto;
                    margin-right: auto;
                    width: 100%;
                    height: 448px
                }
                .institucionaltimeline__slide-content {
                  width: 1150px;
                  height: 340px;
                  margin: 64px auto 0;
                  margin-left: 0;
                }
                .institucionaltimeline__slide-content--texts {
                  float: left;
                  width: calc(100% - 624px)
                }
                .institucionaltimeline__slide-content--img {
                  float: right
                }
                .institucionaltimeline__slide-content--img img {
                    border: 4px solid #c41c17
                }
                .institucionaltimeline__slide-content--texts p strong {
                    display: block;
                    margin-top: 32px;
                    font-size: 22px;
                    font-weight: 700
                }
                .institucionaltimeline__slide-content--texts p {
                    display: block;
                    margin-top: 20px;
                    font-size: 18px;
                    font-weight: 400;
                    line-height: 24px
                }

                .institucionaltimeline__slide .slick-arrow {
                    position: absolute;
                    height: 29px;
                    font-size: 14px;
                    font-weight: 400;
                    text-align: center;
                    line-height: 29px;
                    border: 0;
                    background: #c41c17;
                    color: #FFF;
                    z-index: 18
                }
                .institucionaltimeline__slide .slick-arrow:after {
                    content: "";
                    width: 8px;
                    height: 8px;
                    margin-top: 10px;
                    border-top: 2px solid #FFF;
                    border-right: 2px solid #FFF
                }
                .institucionaltimeline__slide .slick-arrow.slick-prev:after {
                    float: left;
                    margin-left: 14px;
                    transform: rotate(225deg);
                    -webkit-transform: rotate(225deg);
                    -ms-transform: rotate(225deg);
                    -moz-transform: rotate(225deg)
                }
                
                .institucionaltimeline__slide .slick-arrow.slick-prev {
                    top: -12px;
                    left: 0;
                    width: 87px
                }
                .institucionaltimeline__slide .slick-arrow.slick-next:hover {
                    background: #ad1e1a
                }
                .institucionaltimeline__slide .slick-arrow.slick-next {
                    position: absolute;
                    right: 0;
                    bottom: -13px;
                    width: 103px
                }
                .institucionaltimeline__slide .slick-arrow.slick-next:after {
                    float: right;
                    margin-right: 14px;
                    transform: rotate(45deg);
                    -webkit-transform: rotate(45deg);
                    -ms-transform: rotate(45deg);
                    -moz-transform: rotate(45deg)
                }
                .institucionaltimeline__slide .slick-arrow:after {
                    content: "";
                    width: 8px;
                    height: 8px;
                    margin-top: 10px;
                    border-top: 2px solid #FFF;
                    border-right: 2px solid #FFF
                }

                @media screen and (max-width: 1149px) {

                    .institucionaltimeline__slide .slick-arrow.slick-prev {
                      top:initial;
                      bottom: -48px;
                      left: 14px
                    }

                    .institucionaltimeline__slide .slick-arrow.slick-next {
                      bottom: -48px;
                      right: 14px;
                    }

                    .institucionallab {
                      padding:40px 0 32px
                    }
                
                    .institucionallab>.content {
                      box-sizing: border-box;
                      padding: 0 14px
                    }
                
                    .institucionallab>.content h2 {
                      width: 100%
                    }


                    .institucionalInfo__2-texts h2 {
                      font-size: 18px;
                      font-weight: 700;
                      box-sizing: border-box;
                      padding: 0 14px;
                    }

                    .institucionalInfo__1 h2 {
                      font-size:18px;
                      font-weight: 700;
                      box-sizing: border-box;
                      padding: 0 14px
                    }

                    .institucionallab>.content p {
                      width:100%;
                      margin-top: 16px;
                      font-size: 14px
                    }

                    .institucionalInfo__2-texts {
                      width:100%;
                      margin-top: 16px
                    }
                    institucionalInfo__1>h2 {
                      font-size:18px;
                      font-weight: 700;
                      box-sizing: border-box;
                      padding: 0 14px
                    }
                    .institucionalInfo__2-texts p {
                      font-size:13px;
                      box-sizing: border-box;
                      padding: 0 14px
                    }
                    .institucionalInfo__1-img {
                        float: right;
                        width: 94%;
                        margin-top: 16px
                    }
                
                    .institucionalInfo__1-img img {
                        width: 100%;
                        height: auto
                    }
                    .institucionalInfo__1-texts {
                        width:100%;
                        margin-top: 12px
                    }
                    .institucionalBanner>.content h1,.institucionalBanner>.content h2 {
                        font-size:22px;
                        box-sizing: border-box;
                        padding: 0 14px
                    }
                    .institucionalBanner__texts {
                        width:100%
                    }
                    .institucionalBanner>.content p {
                        width:100%;
                        font-size: 16px;
                        line-height: 20px;
                        margin-top: 24px;
                        box-sizing: border-box;
                        padding: 0 14px
                    }
                    .institucionalInfo__1-img img {
                        width: 100%;
                        height: auto
                    }
                    .institucionalInfo__1-texts p {
                        font-size:14px;
                        box-sizing: border-box;
                        padding: 0 14px
                    }

                    .institucionaltimeline__slide-content {
                      margin:24px auto 0
                    }
                    .institucionaltimeline__slide {
                      display:block;
                      width: 100vw;
                      height: auto;
                      margin-top: 0;
                      background-image: url(https://technos.vteximg.com.br/arquivos/slideinstitucional-lines-mobile.png?v=5);
                      background-position: top right
                    }

                    .institucionaltimeline__slide .content {
                      height:auto
                    }
                
                    .institucionaltimeline__slide-content--texts {
                      float: right;
                      width: 100%
                    }

                    .institucionaltimeline__slide-content--texts p {
                      width: 80%;
                      font-size: 14px;
                      padding-left: 14px
                    }
                
                    .institucionaltimeline__slide-content--texts p strong {
                      font-size: 22px 
                    }
                }
                
                
            `,
          }}
        />
      </Head>
      {device == "desktop"
        ? (
          <div className="content pb-[40px] overflow-x-hidden">
            <div
              class="institucionalBanner relative block z-[18] "
              style={{
                background: `url(${backgroundImage}) center no-repeat`,
                backgroundSize: "cover",
              }}
            >
              <div class="content font-Gotham w-full max-w-[1150px] pt-[100px] pr-0 pb-[72px] pl-0 mr-auto ml-auto table rounded-none font-[Gotham] text-white ">
                <span class="institucionalBanner__texts float-left w-2/4">
                  <div dangerouslySetInnerHTML={{ __html: title || "" }} />
                </span>
                <span class="institucionalBanner__video">
                  <span class="institucionalBanner__video-id"></span>
                </span>
              </div>
            </div>
            {!hide.block1 && (
              <div class="institucionalInfo__1 w-full max-w-[1150px] ml-auto mr-auto table rounded-none mt-[56px]">
                <span class="institucionalInfo__1-img float-left">
                  {block1 && <img src={block1?.backgroundImage} />}
                </span>
                <span class="institucionalInfo__1-texts w-[calc(100%-680px)] float-right mt-[74px] text-black">
                  {block1 && (
                    <div
                      dangerouslySetInnerHTML={{ __html: block1?.text || "" }}
                    />
                  )}
                </span>
              </div>
            )}
            {!hide.block2 && (
              <div class="institucionalInfo__2 table rounded-none w-full py-9 px-0 mt-[56px] bg-[#efefef]">
                <div class="content block w-full max-w-[1150px] ml-auto mr-auto pb-[40px]">
                  <span class="institucionalInfo__2-img float-right">
                    {block2 && <img src={block2?.backgroundImage} />}
                  </span>
                  <span class="institucionalInfo__2-texts float-left text-black mt-[94px] w-[calc(100%-660px)]">
                    {block2 && (
                      <div
                        dangerouslySetInnerHTML={{ __html: block2?.text || "" }}
                      />
                    )}
                  </span>
                </div>
              </div>
            )}
            {!hide.block3 && (
              <div
                class="institucionallab table rounded-none w-full pt-[120px] pr-0 pb-[80px] pl-0"
                style={{
                  background: block3?.backgroundImage
                    ? `url(${block3?.backgroundImage}) center no-repeat`
                    : "none",
                  backgroundSize: "cover",
                }}
              >
                <div class="content block w-full max-w-[1150px] ml-auto mr-auto">
                  {block3 && (
                    <div
                      dangerouslySetInnerHTML={{ __html: block3?.text || "" }}
                    />
                  )}
                </div>
              </div>
            )}
            {!hide.timeline && (
              <div className="institucionaltimeline">
                <div
                  class="content"
                  dangerouslySetInnerHTML={{ __html: timelineTitle || "" }}
                />
                <div className="institucionaltimeline__slide">
                  <div id={id} className="content">
                    <Slider class="carousel carousel-center w-screen gap-6 h-auto">
                      {timeline?.map(({ image, text }, index) => (
                        <Slider.Item
                          index={index}
                          class="carousel-item h-full justify-center items-center"
                        >
                          <div
                            class="institucionaltimeline__slide-content"
                            data-slick-index="0"
                            aria-hidden="false"
                            tabIndex={0}
                            role="tabpanel"
                            id="slick-slide00"
                            aria-describedby="slick-slide-control00"
                            style="width: 1150px;"
                          >
                            <span
                              class="institucionaltimeline__slide-content--texts"
                              dangerouslySetInnerHTML={{ __html: text || "" }}
                            />
                            <span class="institucionaltimeline__slide-content--img">
                              <img className="block" src={image} />
                            </span>
                          </div>
                        </Slider.Item>
                      ))}
                    </Slider>

                    {timeline && <Buttons />}
                    <Dots images={timeline} className="flex" />
                    <SliderJS rootId={id} interval={0 * 1e3} infinite />
                  </div>
                </div>
              </div>
            )}
          </div>
        )
        : (
          <div className="content pb-[40px]">
            <div
              class="institucionalBanner relative block z-[18] "
              style={{
                background: `url(${backgroundImage}) center no-repeat`,
                backgroundSize: "cover",
              }}
            >
              <div class="content font-Gotham w-full max-w-[1150px] pt-[100px] pr-0 pb-[72px] pl-0 mr-auto ml-auto table rounded-none font-[Gotham] text-white ">
                <span class="institucionalBanner__texts float-left w-2/4">
                  <div dangerouslySetInnerHTML={{ __html: title || "" }} />
                </span>
                <span class="institucionalBanner__video">
                  <span class="institucionalBanner__video-id"></span>
                </span>
              </div>
            </div>
            {!hide.block1 && (
              <div class="institucionalInfo__1 w-full max-w-[1150px] ml-auto mr-auto table rounded-none mt-[56px]">
                <span class="institucionalInfo__1-img float-left">
                  {block1 && <img src={block1?.backgroundImage} />}
                </span>
                <span class="institucionalInfo__1-texts w-[calc(100%-680px)] float-right mt-[74px] text-black">
                  {block1 && (
                    <div
                      dangerouslySetInnerHTML={{ __html: block1?.text || "" }}
                    />
                  )}
                </span>
              </div>
            )}
            {!hide.block2 && (
              <div class="institucionalInfo__2 table rounded-none w-full py-9 px-0 mt-[56px] bg-[#efefef]">
                <div class="content block w-full max-w-[1150px] ml-auto mr-auto pb-[40px]">
                  <span class="institucionalInfo__2-img float-right">
                    {block2 && <img src={block2?.backgroundImage} />}
                  </span>
                  <span class="institucionalInfo__2-texts float-left text-black mt-[94px] w-[calc(100%-660px)]">
                    {block2 && (
                      <div
                        dangerouslySetInnerHTML={{ __html: block2?.text || "" }}
                      />
                    )}
                  </span>
                </div>
              </div>
            )}
            {!hide.block3 && (
              <div
                class="institucionallab table rounded-none w-full pt-[120px] pr-0 pb-[80px] pl-0"
                style={{
                  background: block3?.backgroundImage
                    ? `url(${block3?.backgroundImage}) center no-repeat`
                    : "none",
                  backgroundSize: "cover",
                }}
              >
                <div class="content block w-full max-w-[1150px] ml-auto mr-auto">
                  {block3 && (
                    <div
                      dangerouslySetInnerHTML={{ __html: block3?.text || "" }}
                    />
                  )}
                </div>
              </div>
            )}
            {!hide.timeline && (
              <div className="institucionaltimeline">
                <div className="institucionaltimeline__slide">
                  <div id={id} className="content">
                    <Slider class="carousel carousel-center w-screen gap-6 h-auto min-h-[630px]">
                      {timeline?.map(({ image, text }, index) => (
                        <Slider.Item
                          index={index}
                          class="carousel-item h-full justify-center items-center"
                        >
                          <div
                            class="institucionaltimeline__slide-content"
                            data-slick-index="0"
                            aria-hidden="false"
                            tabIndex={0}
                            role="tabpanel"
                            id="slick-slide00"
                            aria-describedby="slick-slide-control00"
                            style="width: 1150px;"
                          >
                            <span class="institucionaltimeline__slide-content--img">
                              <img className="block" src={image} />
                            </span>
                            <span
                              class="institucionaltimeline__slide-content--texts"
                              dangerouslySetInnerHTML={{ __html: text || "" }}
                            />
                          </div>
                        </Slider.Item>
                      ))}
                    </Slider>

                    {timeline && <Buttons />}
                    <SliderJS rootId={id} interval={0 * 1e3} infinite />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
    </>
  );
}
function Buttons() {
  return (
    <>
      <Slider.PrevButton class="slick-arrow slick-prev">
        Voltar
      </Slider.PrevButton>

      <Slider.NextButton class="slick-arrow slick-next">
        Avançar
      </Slider.NextButton>
    </>
  );
}
function Dots({ images, interval = 0, className }: DotsProps) {
  return (
    <>
      <ul
        class={`carousel slick-dots relative justify-center col-span-full gap-2 z-10 order-3 mt-10 ${className}`}
      >
        {images?.map((_, index) => (
          <li class={`carousel-item`}>
            <Slider.Dot index={index}>
              <div>
                <div
                  class="w-[13px] h-[13px] sm:w-[13px] sm:h-[13px] group-disabled:bg-[#d2d2d2] group-disabled:border-[#d2d2d2] rounded-full bg-transparent border border-[#d2d2d2]"
                  style={{ animationDuration: `${interval}s` }}
                />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}
export default InstitutionalPage;
