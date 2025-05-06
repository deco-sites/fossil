import { Head } from "$fresh/runtime.ts";
import Icon, { AvailableIcons } from "../ui/Icon.tsx";
import { type Section } from "@deco/deco/blocks";
export interface Props {
  title: string;
  /**
   * @description Icon
   */
  icon: {
    image: AvailableIcons;
    iconWidth?: number;
    iconHeight?: number;
  };
  asideMenu: Section;
  /**
   * @title Content
   * @description Content will be rendered as HTML.
   */
  content: Section;
}
function HelpPage(
  {
    asideMenu: { Component: AsideComponent, props: asideProps },
    content: { Component: ContentComponent, props: contentProps },
    title,
    icon,
  }: Props,
) {
  return (
    <>
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .institucional-content__header-title {
                background: url(http://technos.vteximg.com.br/arquivos/institucional-bg.png) 50% no-repeat;
                background-size: cover
            }

            table {
              border-collapse: collapse;
              border-spacing: 0;
            } 

            .institucional-nav__icon svg {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                display: inline-block;
                width: 40%;
                height: auto;
                fill:  black;
            }

            .institucional-nav__icon.active svg {
                fill:  white;
            }


            .institucional-nav__icon svg.shine {
                filter: brightness(20%);
            }

            .institucional-nav__icon.active svg.shine {
                filter: brightness(100%);
            }

            .institucional-content__subtitle {
                font-size: 18px;
                text-transform: uppercase;
                letter-spacing: .1em;
                font-weight: 700;
                margin: 30px 0 40px;
            }

            .institucional-content__text-list {
                font-size: 14px;
                width: 80%
            }

            .institucional-content__list {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -ms-flex-wrap: wrap;
                flex-wrap: wrap;
                -webkit-box-pack: start;
                -ms-flex-pack: start;
                justify-content: flex-start;
                -webkit-box-align: start;
                -ms-flex-align: start;
                align-items: flex-start;
                list-style: none
            }


            .institucional-content__list-image {
                display: block;
                padding-top: 6px;
                margin-top: 12px;
                height: 26px;
                width: 20%;
                background: url(http://technos.vteximg.com.br/arquivos/list.png) 50% no-repeat;
                text-align: center;
                color: #fff;
                font-size: 14px
            }


            .institucional-content__consult-anchor {
                display: inline-block;
                padding: 0 10px;
                width: 230px;
                height: 55px;
                background: #c41c17;
                border: none
            }

            .institucional-content__consult-text {
                font-size: 12px;
                color: #fff;
                letter-spacing: .2em;
                text-transform: uppercase;
                text-align: left
            }

            .institucional-content__consult-icon {
                position: relative;
                display: inline-block;
                vertical-align: middle;
                width: 30px;
                height: 22px;
                top: 4px;
                margin-left: 10px
            }

            .institucional-content__consult-button {
              background-color: #c41c17;
              color: #fff;
              padding: 0 20px;
              line-height: 50px;
              display: inline-block
            }

            .institucional-content__consult-button p {
              display: inline-block;
              vertical-align: middle;
            }

            .institucional-content__consult-icon:after {
              content: "";
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 76 58'%3E%3Cpath d='M46.42 56.756c-1.113-.723-1.286-2.077-.345-3.03 1.871-1.895 3.762-3.77 5.645-5.653 4.929-4.928 14.928-14.897 16.97-16.932a.215.215 0 0 0-.153-.368l-39.65-.002-26.651.003A1.733 1.733 0 0 1 .5 29.043v-.041c0-.956.777-1.731 1.736-1.731l66.286-.002c.193 0 .29-.232.154-.368-2.379-2.377-15.7-15.687-22.515-22.459-.882-.876-1.06-2.505.515-3.335.477-.252 1.423-.051 1.961.475 1.069 1.043 21.535 21.489 26.429 26.379.578.578.579 1.511.002 2.09a12951.195 12951.195 0 0 1-20.186 20.212c-2.006 2-4.014 3.998-6.022 5.996-.257.255-1.296 1.174-2.44.497z' fill='%23ffffff'/%3E%3C/svg%3E");              
              display: block;
              width: 24px;
              height: 18.31px;
              position: absolute;
              top: 0;
              left: 0;
            }

            .institucional-content__anchor {
                display: inline-block;
                padding: 0 3px;
                text-decoration: underline;
                color: #c41c17;
            }

            .institucional-content__faq-text {
                font-size: 12px;
                padding-left: 10px;
                line-height: 1.5;
            }

            .icon-ordem-servico svg {
              position: relative;
              left: auto;
              top: auto;
              transform: none;
              -webkit-transform: none;
              -ms-transform: none;
              width: 20px;
              height: 20px;
              display: block;
              fill: white
            }

            .institucional-nav__close.mobile {
              width: calc(100vw - 40px);
            }

            .institucional-content__td {
              font-size: 12px;
              padding: 10px;
              border: 1px solid #000;
              font-weight: 400;
              text-align: center;
              text-transform: uppercase
            }

            .institucional-content__td--titulo {
              font-size: 12px;
              border: 1px solid #000;
              font-weight: 700;
              text-align: center;
              text-transform: uppercase
            }

            .institucional-content__tabela:not(.responsive) {
              display: none;
            }

            .institucional-content__tabela.responsive {
              display: block;
              overflow: hidden;
              overflow-x: scroll;
              width: calc(100vw - 40px);
            }

            .assistencia-tecnica-conteudo .institucional-content {
              max-width: 100%;
            }

            .assistencia-tecnica-conteudo .destaque {
              max-width: 100%;
              margin: 50px auto 0;
            }

            .assistencia-tecnica-conteudo .destaque li { 
              display: flex;
              justify-content: space-between;
              margin: 25px 0;
            }

            @media (min-width: 768px) {

             .institucional-content__text {
                  font-size:16px;
                  margin-bottom: 30px
              }

              .institucional-content__tabela:not(.responsive) {
                display: block;
              }

              .institucional-content__tabela.responsive {
                display: none;
              }

              .institucional-content__td {
                font-size: 13px;
              }

              .institucional-content__td--titulo {
                font-size: 13px;
              }

                .institucional-content__faq-text {
                    font-size: 14px;
                    padding-left: 15px;
                }

                .institucional-content__consult-anchor {
                    display:-webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    -ms-flex-wrap: nowrap;
                    flex-wrap: nowrap;
                    -ms-flex-pack: distribute;
                    justify-content: space-around;
                    -webkit-box-align: center;
                    -ms-flex-align: center;
                    align-items: center;
                    margin-left: 0;
                    width: 400px
                }
                .institucional-content__text-list {
                    font-size:16px;
                    margin: 15px 0;
                    line-height: 1.5
                }

                .institucional-content__list-image {
                    width: 40px;
                }
            }

            @media (min-width: 992px) {
                .institucional-content__subtitle {
                    font-size:30px
                }

                .icon-ordem-servico svg {
                  width: 30px;
                  height: 30px;
                }

                .assistencia-tecnica-conteudo .institucional-content__main-content {
                  padding-right: 100px;
                }

                .assistencia-tecnica-conteudo .destaque {
                  max-width: 100%;
                }
            }

            @media screen and (min-width: 1024px) { 
              .assistencia-tecnica-conteudo .destaque {
                display: flex;
                justify-content: space-between;
              }

              .assistencia-tecnica-conteudo .destaque li { 
                flex-direction: column;
              }
            }

            @media (min-width: 1200px) {
                .institucional-content__list {
                    -webkit-box-align:center;
                    -ms-flex-align: center;
                    align-items: center
                }

                .institucional-content__subtitle--table {
                    margin-top: 40px
                }
            }
          
          }
            `,
          }}
        />
      </Head>
      <div className="assistencia-tecnica-conteudo">
        <div className="container--institucional flex flex-wrap content-end md:content-between lg:mt-6">
          <div className="institucional-content__header-title z-10 flex justify-start items-center m-0 pl-4 w-full h-auto md:content-center p-5 md:py-8 md:px-5">
            <div className="icon flex flex-[.5] md:flex-1 lg:justify-end">
              <i className="icon-ordem-servico relative mr-5 md:mr-7 bg-[#c41c17] rounded-[50%] w-auto h-auto p-5 text-center">
                <Icon
                  id={icon.image}
                  width={icon?.iconWidth}
                  height={icon?.iconHeight}
                  strokeWidth={2}
                  viewBox={`0 0 ${icon?.iconWidth} ${icon?.iconHeight}`}
                />
              </i>
            </div>
            <div className="intro w-4/5">
              <h1 className="institucional-content__title mt-4 text-2xl md:text-base m-0 uppercase text-left md:text-center text-[#eee] font-semibold  md:font-normal tracking-widest lg:text-3xl lg:font-semibold lg:block lg:relative lg:left-0 lg:text-left lg:text-white">
                {title}
              </h1>
            </div>
          </div>

          <nav className="institucional-nav w-full flex md:justify-center lg:max-w-[25%] pl-4 pr-4">
            <AsideComponent {...asideProps} />
          </nav>
          <div className="institucional-content py-10 px-5  w-full lg:max-w-[75%] lg:w-[75%]">
            <div className="institucional-content__block"></div>
            <ContentComponent {...contentProps} />
          </div>
        </div>
      </div>
    </>
  );
}
export default HelpPage;
