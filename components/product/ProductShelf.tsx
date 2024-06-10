import { SendEventOnView } from "../../components/Analytics.tsx";
import ProductCard from "../../components/product/ProductCard.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import SliderJS from "../../islands/SliderJS.tsx";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { clx } from "../../sdk/clx.ts";
import { AppContext } from "../../apps/site.ts";

export interface Props {
  products: Product[] | null;
  title?: string;
  layout?: {
    numberOfSliders?: {
      mobile?: 1 | 2 | 3 | 4 | 5;
      desktop?: 1 | 2 | 3 | 4 | 5;
    };
    headerAlignment?: "center" | "left";
    headerStyle?: "variante1" | "variante2";
    headerfontSize?: "Normal" | "Large" | "Small";
    showArrows?: boolean;
  };
}

function ProductShelf({
  products,
  title,
  layout,
  device,
}: Props & { device?: string }) {
  const id = useId();
  const platform = usePlatform();

  if (!products || products.length === 0) {
    return null;
  }
  const slideDesktop = {
    1: "md:w-full",
    2: "md:w-1/2",
    3: "md:w-1/3",
    4: "md:w-1/4",
    5: "md:w-1/5",
  };

  const slideMobile = {
    1: "w-full",
    2: "w-1/2",
    3: "w-1/3",
    4: "w-1/4",
    5: "w-1/5",
  };

  const styleTitle = {
    variante1:
      "text-[1.3rem] tracking-one lg:text-xl font-arial font-bold uppercase leading-8 lg:leading-10 text-primary pb-5 lg:pb-6",
    variante2:
      "text-28 font-black tracking-one font-scoutCond lg:text-42 lg:font-bold uppercase leading-8 lg:leading-10 text-primary pb-5 lg:pb-6",
  };

  return (
    <div class="w-full    m-auto mt-8 flex flex-col gap-6 lg:my-8 px-3 font-soleil lg:px-4">
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
                  `${styleTitle[layout?.headerStyle ?? "variante1"]}`,
                )}
              >
                {title}
              </h2>
            )}
        </div>
        <div
          id={id}
          class={clx(
            "grid relative  ",
            (layout?.showArrows && device === "desktop") &&
              "grid-cols-[48px_1fr_48px] sm:grid-cols-[70px_1fr_70px] grid-rows-[1fr_48px_1fr_64px]",
            "px-0 w-full",
          )}
        >
          <Slider class="carousel sm:carousel-end row-[1/-2] ">
            {products?.map((product, index) => (
              <Slider.Item
                index={index}
                class={clx(
                  "carousel-item",
                  slideDesktop[layout?.numberOfSliders?.desktop ?? 3],
                  slideMobile[layout?.numberOfSliders?.mobile ?? 1],
                )}
              >
                <ProductCard
                  product={product}
                  itemListName={title}
                  platform={platform}
                  index={index}
                  device={device}
                />
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
          <ul class="carousel justify-center col-span-full gap-4 z-10 row-start-4 col-span-[1/2]">
            {products?.map((_, index) => (
              <li
                class={`carousel-item   md:${
                  ((index === 0) || (index % 4 === 0)) ? "" : "hidden"
                } ${((index === 0) || (index % 2 === 0)) ? "" : "hidden"}`}
              >
                <Slider.Dot index={index}>
                  <div class="py-5">
                    <div class=" w-[10px] h-[10px] md:w-[14px] md:h-[14px] sm:w-[16px] sm:h-[16px] group-disabled:bg-primary rounded-full bg-transparent border border-[#a4a4a4]" />
                  </div>
                </Slider.Dot>
              </li>
            ))}
          </ul>

          {(layout?.showArrows && device === "desktop") && (
            <>
              <div class="hidden md:flex items-center justify-center z-10 col-start-1 row-start-2">
                <Slider.PrevButton class="absolute w-12 h-12 flex justify-center items-center">
                  <div class="text-base hidden md:flex items-center justify-center gap-1 text-primary font-medium before:bg-arrow-left before:bg-no-repeat before:bg-center before:bg-14 before:w-6 before:h-6 before:block after:mb-2px">
                  </div>
                </Slider.PrevButton>
              </div>
              <div class="flex items-center justify-center z-10 col-start-3 row-start-2">
                <Slider.NextButton class="absolute w-12 h-12 flex justify-center items-center">
                  <div class=" hidden md:flex items-center justify-center ga-1 text-base text-primary font-medium after:bg-arrow-right after:bg-no-repeat after:bg-center after:bg-14 after:w-6 after:h-6 after:block after:mb-2px">
                  </div>
                </Slider.NextButton>
              </div>
            </>
          )}

          {/**buttons top */}
          <div class="absolute  -top-8 right-0 lg:right-10 w-20 lg:w-48 h-4 flex items-center justify-between lg:pr-4 ">
            <div class=" w-1/2 flex items-center  py-1 lg:py-2 lg:pr-1 justify-between z-10 col-start-1 row-start-2 border-r  lg:border-r-2 border-solid border-[#262626]">
              <Slider.Previous class=" w-full flex justify-around items-center ">
                <div class="text-base flex items-center justify-center gap-1 text-primary font-medium before:bg-arrow-left before:bg-no-repeat before:bg-center before:bg-14 before:w-4 before:h-4 before:block after:mb-2px">
                  <span class="hidden lg:block">Anterior</span>
                </div>
              </Slider.Previous>
            </div>

            <div class="flex items-center w-1/2  justify-center z-10 col-start-3 row-start-2">
              <Slider.Next class="w-full pl-1 flex justify-around  items-center">
                <div class="flex items-center justify-center ga-1 text-base gap-1 text-primary font-medium after:bg-arrow-right after:mt-1 after:bg-no-repeat after:bg-center after:bg-14 after:w-4 after:h-4 after:block after:mb-2px">
                  <span class="hidden lg:block mt-[1px]">Próximo</span>
                </div>
              </Slider.Next>
            </div>
          </div>

          <SliderJS rootId={id} />
          <SendEventOnView
            id={id}
            event={{
              name: "view_item_list",
              params: {
                item_list_name: title,
                items: products.map((product, index) =>
                  mapProductToAnalyticsItem({
                    index,
                    product,
                    ...(useOffer(product.offers)),
                  })
                ),
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, device: ctx.device };
};

export default ProductShelf;
