import Slider from "../../ui/Slider.tsx";
import ImageZoom from "../../../islands/ImageZoom.tsx";
import SliderJS from "../../../islands/SliderJS.tsx";
import ProductSliderDotsHandler from "../../../islands/ProductSliderDotsHandler.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { HighLight } from "../ProductHighlights.tsx";
import { useId } from "../../../sdk/useId.ts";
import Button from "../../ui/Button.tsx";
import { useCheckCluster } from "../../../util/useCheckCluster.ts";
import { DiscountLayout } from "../ProductCard.tsx";
import { useOffer } from "../../../util/useOffer.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
  highlights?: HighLight[];
  device?: string;
  /** @title Discount Layout */
  /** @description Layout options for discount display */
  discountLayout?: DiscountLayout;
}

const width = 495.35;
const height = 497.85;

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on desktop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function GallerySlider(props: Props) {
  const id = useId();

  if (props.page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    page: { product },
    discountLayout,
  } = props;
  const aspectRatio = `${width} / ${height}`;
  const { image: images = [], additionalProperty, offers } = product;

  const {
    listPrice,
    price,
    installment,
    availability,
    priceWithPixDiscount,
    pixPercentDiscountByDiferenceSellerPrice,
    has_discount,
  } = useOffer(offers);

  const {
    showBadge = true,
    type = "percentage",
    customText = "OFF",
  } = discountLayout ?? {};

  // Calcular porcentagem de desconto baseada no listPrice e price
  const discountPercentage =
    listPrice && price && listPrice > price
      ? Math.round(((listPrice - price) / listPrice) * 100)
      : 0;

  // const isOffCluster = useCheckCluster(additionalProperty || [], "2166");

  return (
    <div class="float-left w-[48%] relative max-sm:w-auto max-lg:flex max-lg:flex-col max-lg:items-center max-lg:justify-center max-lg:w-full">
      {has_discount && showBadge && (
        <span class="w-10 h-10 flex absolute top-0 right-0 font-scoutCond z-20 items-center group-hover/discount:z-0 justify-center text-center text-2xl font-medium bg-[#d20d17] text-white rounded-[100px]">
          {type === "percentage" && discountPercentage > 0
            ? `${discountPercentage}%`
            : customText || "OFF"}
        </span>
      )}
      <div
        id={id}
        class="grid grid-flow-row sm:grid-flow-col max-md:grid-cols-[25px_1fr_25px] relative"
      >
        {/* Image Slider */}
        <Slider class="carousel carousel-center max-lg:col-span-full max-lg:row-[1/-2] lg:gap-6 order-1 sm:order-2 max-lg:w-full image-hero max-lg:mb-5">
          {(images ?? []).map((img, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-full relative max-lg:items-center max-lg:justify-center"
            >
              <ImageZoom
                aspectRatio={aspectRatio}
                src={img?.url || ""}
                alt={img?.alternateName || ""}
                width={width}
                height={height}
                index={index}
              />
            </Slider.Item>
          ))}
        </Slider>

        {/* Arrows slider Mobile */}
        {props.device !== "desktop" && (
          <div class="">
            <div class=" block lg:hidden  ">
              <Slider.PrevButton class="absolute top-1/2 left-[10px] transform -translate-y-1/2 rounded-full h-[20px] w-[20px] flex items-center justify-center">
                <div class="items-center justify-center ga-1 text-base text-primary font-medium after:bg-arrow-down after:bg-no-repeat after:bg-center after:bg-contain after:w-[22px] after:h-6 after:block after:mb-2px transform rotate-90"></div>
              </Slider.PrevButton>
            </div>
            <div class=" block lg:hidden ">
              <Slider.NextButton class="absolute top-1/2 right-[10px] transform -translate-y-1/2 rounded-full h-[20px] w-[20px] flex items-center justify-center">
                <div class="text-base  items-center justify-center gap-1 text-primary font-medium before:bg-arrow-up before:bg-no-repeat before:bg-center before:bg-contain before:w-[22px] before:h-6 before:block after:mb-2px transform rotate-90"></div>
              </Slider.NextButton>
            </div>
          </div>
        )}

        {props.device !== "desktop" ? (
          <>
            {/* Dots Mobile */}
            <style
              // deno-lint-ignore react-no-danger
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
                      <div class="w-[10px] h-[10px] md:w-[14px] md:h-[14px] sm:w-[16px] sm:h-[16px] group-disabled:bg-primary rounded-full bg-transparent border border-[#a4a4a4]" />
                    </div>
                  </Slider.Dot>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            {/* Dots Desktop */}
            <ul
              id="product-slider-dots"
              class="carousel hidden lg:flex snap-both relative col-span-full gap-1 sm:flex-col order-3 sm:order-1 max-h-[455px] max-2xl:max-h-[455px] max-lg:max-w-[270px] max-lg:mx-auto max-lg:my-[10px]"
            >
              {(images ?? []).map((img, index) => (
                <li class="carousel-item sm:min-w-[110px]">
                  <Slider.Dot index={index}>
                    <Image
                      class="max-xl:h-[110px] w-auto h-[110px] object-cover lg:p-1"
                      style={{ aspectRatio }}
                      width={110}
                      height={110}
                      src={img?.url || ""}
                      alt={img?.alternateName || ""}
                      fetchPriority="high"
                    />
                  </Slider.Dot>
                </li>
              ))}
            </ul>
            {/** Arrow dots */}
            <Button
              id="product-slider-dots-to-left"
              aria-label="dots-to-left"
              class="absolute cursor-pointer flex max-lg:left-4 rounded-full lg:z-10 h-[15px] w-[22px] items-center justify-center max-lg:bottom-7 lg:-top-4 lg:left-11"
            >
              <span class="text-base flex items-center justify-center gap-1 text-primary font-medium before:bg-arrow-up before:bg-no-repeat before:bg-center before:bg-contain before:w-[22px] before:h-6 before:block after:mb-2px"></span>
            </Button>
            <Button
              id="product-slider-dots-to-right"
              aria-label="dots-to-right"
              class="absolute max-lg:right-4 flex curso pointer rounded-full lg:z-10 h-[15px] w-[22px] items-center justify-center bottom-4 lg:bottom-4 lg:left-11"
            >
              <span class="flex items-center justify-center ga-1 text-base text-primary font-medium after:bg-arrow-down after:bg-no-repeat after:bg-center after:bg-contain after:w-[22px] after:h-6 after:block after:mb-2px"></span>
            </Button>
          </>
        )}

        <SliderJS rootId={id} />
      </div>
      <ProductSliderDotsHandler rootId="product-slider-dots" />
    </div>
  );
}
