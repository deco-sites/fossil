import Icon from "../../ui/Icon.tsx";
import Slider from "../../ui/Slider.tsx";
import ImageZoom from "../../../islands/ImageZoom.tsx";
import SliderJS from "../../../islands/SliderJS.tsx";
import ProductSliderDotsHandler from "../../../islands/ProductSliderDotsHandler.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import ProductHighlights, {
  DEFAULT_HIGHLIGHTS,
  HighLight,
} from "../ProductHighlights.tsx";
import { useOffer } from "../../../sdk/useOffer.ts";
import { useId } from "../../../sdk/useId.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;

  highlights?: HighLight[];

  device?: string;
}

const width = 500;
const height = 500;

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function GallerySlider(props: Props) {
  const id = useId();

  if (props.page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    page: {
      product,
    },
    highlights,
  } = props;
  const aspectRatio = `${width} / ${height}`;
  const { image: images = [], offers } = product;
  const { isVariantOf } = product!;

  const { listPrice, price } = useOffer(offers);
  const discount = price != listPrice;

  return (
    <div class="float-left w-[48%] relative max-sm:w-auto max-lg:flex max-lg:flex-col max-lg:items-center max-lg:justify-center max-lg:w-full">
      <section class="w-full block px-4 lg:px-0">
        <ul class="flex flex-col lg:block max-lg:font-scoutCond font-arial">
          <li class="inline-block pb-1 mr-1  text-[#252525] font-arial font-semibold text-xs  leading-4">
            <a href="/" class="">Fossil/</a>
          </li>
          <li class="inline-block leading-8 text-[#252525]  pb-2 text-28 lg:px-0 lg:pb-1 mr-1 font-medium lg:font-semibold lg:text-xs  lg:leading-4">
            {isVariantOf?.name}
          </li>
        </ul>
      </section>
      {(listPrice && price &&
        (Math.round(((listPrice - price) / listPrice) * 100) > 0)) && (
        <span class="w-10 h-10 flex absolute  top-1/4 right-0  font-scoutCond z-20 items-center group-hover/discount:z-0 justify-center text-center text-2xl font-medium bg-[#d20d17] text-white rounded-[100px]">
          OFF
        </span>
      )}
      <div
        id={id}
        class="grid grid-flow-row sm:grid-flow-col max-md:grid-cols-[25px_1fr_25px] relative"
      >
        {/* Image Slider */}
        <Slider class="carousel carousel-center max-lg:col-span-full max-lg:row-[1/-2] lg:gap-6 order-1 sm:order-2 h-[600px]  max-lg:w-full max-2xl:h-[500px] max-xl:h-[300px] max-lg:h-[50vh] max-lg:mb-5">
          {images.map((img, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-full relative max-lg:items-center max-lg:justify-center"
            >
              <ImageZoom
                aspectRatio={aspectRatio}
                src={img.url || ""}
                alt={img.alternateName || ""}
                width={width}
                height={height}
                index={index}
              />
            </Slider.Item>
          ))}
        </Slider>

        {/** Arrows slider Mobile */}
        {props.device !== "desktop" && (
          <>
            <div class="relative block lg:hidden col-start-1  row-start-2 z-20">
              <Slider.PrevButton class="absolute top-[-150px] lg:top-[-150px] left-[10px] lg:left-[140px] rounded-full h-[20px] w-[20px] flex items-center justify-center">
                <div class="text-base md:flex items-center justify-center gap-1 text-primary font-medium before:bg-arrow-left before:bg-no-repeat before:bg-center before:bg-14 before:w-3 before:h-4 before:block after:mb-2px">
                </div>
              </Slider.PrevButton>
            </div>
            <div class="relative block lg:hidden col-start-3 row-start-2 z-20">
              <Slider.NextButton class="absolute top-[-150px] lg:top-[-150px] right-[10px] rounded-full h-[20px] w-[20px] flex items-center justify-center">
                <div class="  md:flex items-center justify-center ga-1 text-base text-primary font-medium after:bg-arrow-right after:bg-no-repeat after:bg-center after:bg-14 after:w-3 after:h-4 after:block after:mb-2px">
                </div>
              </Slider.NextButton>
            </div>
          </>
        )}

        {props.device !== "desktop"
          ? (
            <>
              {/** Dotz Mobile */}
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
              <ul class="carousel flex lg:hidden justify-center col-span-full gap-4 z-10 row-start-4 col-span-[1/2]">
                {images?.map((_, index) => (
                  <li class="carousel-item">
                    <Slider.Dot index={index}>
                      <div class="py-5">
                        <div class=" w-[10px] h-[10px] md:w-[14px] md:h-[14px] sm:w-[16px] sm:h-[16px] group-disabled:bg-primary rounded-full bg-transparent border border-[#a4a4a4]" />
                      </div>
                    </Slider.Dot>
                  </li>
                ))}
              </ul>
            </>
          )
          : (
            <>
              {/** Dotz  */}
              <ul
                id="product-slider-dots"
                class="carousel hidden lg:flex snap-both relative col-span-full gap-1 sm:flex-col order-3 sm:order-1 max-h-[595px] max-2xl:max-h-[500px] max-lg:max-w-[270px] max-lg:mx-auto max-lg:my-[10px]"
              >
                {images.map((img, index) => (
                  <li class="carousel-item sm:min-w-[130px]">
                    <Slider.Dot index={index}>
                      <Image
                        class="max-xl:h-[58px] w-auto h-[130px] object-cover lg:p-1"
                        style={{ aspectRatio }}
                        width={130}
                        height={130}
                        src={img.url!}
                        alt={img.alternateName}
                      />
                    </Slider.Dot>
                  </li>
                ))}
              </ul>

              <div
                id="product-slider-dots-to-left"
                class="absolute hidden lg:flex max-lg:left-4 rounded-full lg:z-10  h-[20px] w-[20px]  items-center justify-center max-lg:bottom-7 lg:-top-6 lg:left-[55px] lg:rotate-90"
              >
                <Icon
                  width={22}
                  height={15}
                  id="ChevronLeft"
                  class=""
                />
              </div>
              <div
                id="product-slider-dots-to-right"
                class="absolute hidden lg:flex max-lg:right-4 rounded-full lg:z-10 h-[20px] w-[20px] items-center justify-center bottom-7 lg:-bottom-6 lg:rotate-90 lg:left-[55px]"
              >
                <Icon
                  width={22}
                  height={15}
                  id="ChevronRight"
                  class=""
                />
              </div>
            </>
          )}

        <SliderJS rootId={id} />
      </div>
      <ProductSliderDotsHandler rootId="product-slider-dots" />
    </div>
  );
}
