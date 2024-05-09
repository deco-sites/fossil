import Header from "../../components/ui/SectionHeader.tsx";
import Slider from "../../components/ui/Slider.tsx";
import SliderJS from "../../islands/SliderJS.tsx";
import { useId } from "../../sdk/useId.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { clx } from "../../sdk/clx.ts";
import { AppContext } from "../../apps/site.ts";
import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon, { AvailableIcons } from "../../components/ui/Icon.tsx";

/** @title {{{action.title}}} */
export interface Card {
  Image: ImageWidget;
  alt: string;
  action?: {
    href: string;
    title?: string;
    label?: string;
  };
}
export interface Props {
  cards: Card[];
  title?: string;
  layout?: {
    numberOfSliders?: {
      mobile?: 1 | 2 | 3 | 4 | 5 | 6;
      desktop?: 1 | 2 | 3 | 4 | 5 | 6;
    };
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large" | "Small";
    showArrows?: boolean;
  };
}

export default function BannerFossilCoousel({
  cards,
  title,
  layout,
  device,
}: Props & { device?: string }) {
  const id = useId();
  const platform = usePlatform();

  const slideDesktop = {
    1: "md:w-full",
    2: "md:w-1/2",
    3: "md:w-1/3",
    4: "md:w-1/4",
    5: "md:w-1/5",
    6: "md:w-1/6",
  };

  const slideMobile = {
    1: "w-full",
    2: "w-1/2",
    3: "w-1/3",
    4: "w-1/4",
    5: "w-1/5",
    6: "w-1/6",
  };

  return (
    <div class="w-full relative max-w-screen-2xl  m-auto py-8 flex flex-col gap-6 lg:pb-10 pt-20 px-4 lg:px-10">
      <div class="w-full">
        <div
          class={`flex flex-col gap-2 ${
            layout?.headerAlignment === "left"
              ? "text-left lg:pl-20 uppercase"
              : "text-center"
          }`}
        >
          {title &&
            (
              <h2
                class={clx(
                  "text-3xl  lg:text-4xl font-bold  text-primary pb-8",
                )}
              >
                {title}
              </h2>
            )}
        </div>
        <div
          id={id}
          class={clx(
            "grid ",
            (layout?.showArrows && device === "desktop") &&
              "grid-cols-[48px_1fr_48px] sm:grid-cols-[70px_1fr_70px] grid-rows-[1fr_48px_1fr_64px]",
            "px-0 w-full",
          )}
        >
          <Slider class="carousel sm:carousel-end col-span-full row-span-full">
            {cards?.map((card, index) => (
              <Slider.Item
                index={index}
                class={clx(
                  "carousel-item",
                  slideDesktop[layout?.numberOfSliders?.desktop ?? 3],
                  slideMobile[layout?.numberOfSliders?.mobile ?? 1],
                )}
              >
                <a
                  href={card.action?.href}
                  label={card.action?.label}
                  title={card.action?.title}
                  class="flex flex-col text-center items-center w-full  max-w-48"
                >
                  <div class="w-full ">
                    <Image
                      width={190}
                      height={190}
                      src={card.Image}
                      alt={card.alt}
                      class="w-full max-w-48 h-full max-h-48 object-cover"
                      fetchPriority="auto"
                      loading={`lazy`}
                    />
                  </div>
                  <div class="w-full">
                    <h3 class="underline text-primary text-base w-44 text-center">
                      {card.action?.title}
                    </h3>
                  </div>
                </a>
              </Slider.Item>
            ))}
          </Slider>

          {/** Dots */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
            @property --dot-progress {
              syntax: '<percentage>';
              inherits: false;
              initial-value: 0%;
            }
            `,
            }}
          />

          {(layout?.showArrows && device === "desktop") && (
            <>
              <div class="hidden md:flex items-center justify-center z-10 col-start-1 row-start-2">
                <Slider.PrevButton class="absolute w-12 h-12 flex justify-center items-center">
                  <Icon
                    size={25}
                    id="ChevronLeft"
                    strokeWidth={3}
                    class="w-5"
                  />
                </Slider.PrevButton>
              </div>
              <div class="flex items-center justify-center z-10 col-start-3 row-start-2">
                <Slider.NextButton class="absolute w-12 h-12 flex justify-center items-center">
                  <Icon size={25} id="ChevronRight" strokeWidth={3} />
                </Slider.NextButton>
              </div>
            </>
          )}

          {/**buttons bottom */}
          <div class=" absolute-center-buttons lg:hidden w-48 h-4 flex items-center justify-between pr-4">
            <div class=" w-1/2 flex items-center pr-1 justify-between z-10 col-start-1 row-start-2 border-r-2 border-solid border-primary">
              <Slider.Previous class=" w-full flex justify-around items-center">
                <Icon size={20} id="ChevronLeft" strokeWidth={3} />
                <span class="text-base block text-primary font-medium">
                  Anterior
                </span>
              </Slider.Previous>
            </div>

            <div class="flex items-center w-1/2  justify-center z-10 col-start-3 row-start-2">
              <Slider.Next class="w-full pl-1 flex justify-around  items-center">
                <span class="block text-base text-primary font-medium">
                  Próximo
                </span>
                <Icon size={20} id="ChevronRight" strokeWidth={3} />
              </Slider.Next>
            </div>
          </div>

          <SliderJS rootId={id} />
        </div>
      </div>
    </div>
  );
}
