
import { Head } from "$fresh/runtime.ts";
import Icon, { AvailableIcons } from "../ui/Icon.tsx";
import { HTML } from "./types.ts";


export interface Props {
  title: string;
  cards: {
    icon: AvailableIcons;
    iconWidth?: number;
    iconHeight?: number;
    label: HTML;
    href: string;
  }[];
}

function HelpHomePage({ title, cards }: Props) {
  return (
    <>
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html: `

            .assistencia-tecnica__icon svg {
                width: 45%;
                fill: white
            }
            `,
          }}
        />
      </Head>
      <div className="assistencia-tecnica-home">
        <section
          className="assistencia-tecnica__container relative w-full h-full md:h-[700px] lg:mt-0 xl:h-[1000px] py-4 px-0 bg-cover bg-no-repeat bg-[url('https://technos.vteximg.com.br/arquivos/back_pag_manuais.jpg')]"
          style={{ backgroundPosition: "50%" }}
        >
          <article className="assistencia-tecnica__intro max-w-[600px] w-[90%] mx-auto mt-[80px] mb-[70px]">
            <h1 className="text-[32px] mt-5 uppercase text-white font-bold text-center">
              {title}
            </h1>
          </article>
          <ul className="assistencia-tecnica__list mx-auto my-0 max-w-[900px] w-4/5 flex flex-row flex-wrap items-start md:relative md:top-auto md:left-auto lg:justify-center lg:mx-auto lg:my-0">
            {cards?.map((card, index) => (
              <li
                key={index}
                class="assistencia-tecnica__item is-active max-w-[50%] basis-[50%] md:max-w-[33.3%] md:basis-[33.3%] lg:basis-[24%] xl:h-[200px] my-5 mx-0 xl:my-[30px] xl:mx-0"
                title={card?.label}
              >
                <a
                  class="assistencia-tecnica__anchor flex flex-col items-center  mx-auto my-0 w-full text-center cursor-pointer xl:max-w-[171px]"
                  title={card?.label}
                  href={card?.href}
                >
                  <i class="assistencia-tecnica__icon flex items-center justify-center w-[60px] h-[60px] xl:w-[90px] xl:h-[90px] lg:hover:w-[125px] lg:hover:h-[125px] lg:hover:bg-[#c41c17] rounded-[50%] bg-[#ffffff33] hover: transition-all duration-[.3s]">
                    <Icon
                      id={card?.icon}
                      width={card?.iconWidth ?? 50}
                      height={card?.iconHeight ?? 50}
                      strokeWidth={2}
                      viewBox={`0 0 ${card?.iconWidth} ${card?.iconHeight}`}
                    />
                  </i>

                  <span
                    class="assistencia-tecnica__span uppercase text-xs xl:text-base xl:hover:text-[22px] text-white font-light mt-3 transition-all duration-[.3s]"
                    data-page="ordem-de-servico"
                    dangerouslySetInnerHTML={{ __html: card?.label }}
                  >
                    {card?.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export default HelpHomePage;
