import {
  SendEventOnClick,
  SendEventOnView,
} from "../../components/Analytics.tsx";
import Button from "../../components/ui/Button.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import SliderJS from "../../islands/SliderJS.tsx";
import { useId } from "../../sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";

/**
 * @titleBy alt
 */
export interface Banner {
  /** @description desktop otimized image */
  desktop: ImageWidget;
  /** @description mobile otimized image */
  mobile: ImageWidget;
  /** @description Image's alt text */
  alt: string;
  action?: {
    /** @description when user clicks on the image, go to this link */
    href: string;
    /** @description Image text title */
    title?: string;
    /** @description Image text subtitle */
    subTitle?: string;
    /** @description Button label */
    label?: string;
  };
}

export interface Props {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title Show arrows
   * @description show arrows to navigate through the images
   */
  arrows?: boolean;
  /**
   * @title Show dots
   * @description show dots to navigate through the images
   */
  dots?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

const DEFAULT_PROPS = {
  images: [
    {
      alt: "/feminino",
      action: {
        title: "New collection",
        subTitle: "Main title",
        label: "Explore collection",
        href: "/",
      },
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/c007e481-b1c6-4122-9761-5c3e554512c1",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/d057fc10-5616-4f12-8d4c-201bb47a81f5",
    },
    {
      alt: "/feminino",
      action: {
        title: "New collection",
        subTitle: "Main title",
        label: "Explore collection",
        href: "/",
      },
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/c007e481-b1c6-4122-9761-5c3e554512c1",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/d057fc10-5616-4f12-8d4c-201bb47a81f5",
    },
    {
      alt: "/feminino",
      action: {
        title: "New collection",
        subTitle: "Main title",
        label: "Explore collection",
        href: "/",
      },
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/c007e481-b1c6-4122-9761-5c3e554512c1",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/d057fc10-5616-4f12-8d4c-201bb47a81f5",
    },
  ],
  preload: true,
};

function BannerItem(
  { image, lcp, position, id, is_mobile }: {
    image: Banner;
    lcp?: boolean;
    position: number;
    id: string;
    is_mobile: boolean;
  },
) {
  const {
    alt,
    mobile,
    desktop,
    action,
  } = image;

  const params = {
    promotion_name: alt,
    creative_name: action && action.href ? action.href : "",
    creative_slot: `Slot ${Number(position) + 1}`,
    promotion_id: is_mobile ? mobile : desktop,
  };

  return (
    <>
      <a
        id={`banner-principal-${id}-${position}`}
        href={action?.href ?? "#"}
        aria-label={action?.label}
        class="relative overflow-y-hidden w-full"
      >
        {action && (
          <div class="absolute top-0 md:bottom-0 bottom-1/2 left-0 right-0 sm:right-auto max-w-[407px] flex flex-col justify-end gap-4 px-8 py-12">
            {action.title && (
              <span class="text-2xl  font-light     text-base-100">
                {action.title}
              </span>
            )}

            {action.subTitle && (
              <span class="font-normal text-4xl text-base-100">
                {action.subTitle}
              </span>
            )}

            {action.label && (
              <Button
                class="bg-base-100 text-sm  font-light     py-4 px-6 w-fit"
                aria-label={action.label}
              >
                {action.label}
              </Button>
            )}
          </div>
        )}

        <Picture preload={lcp}>
          <Source
            media="(max-width: 510px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={mobile}
            width={430}
            height={510}
          />
          <Source
            media="(min-width: 768px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={desktop}
            width={1920}
            height={600}
          />
          <img
            class="object-cover w-full md:h-auto lg:max-h-[474.69px] 2/1xl:max-h-[600px]  3xl:max-h-[1000px]"
            loading={lcp ? "eager" : "lazy"}
            src={desktop}
            alt={alt}
            srcset={`${mobile} 480w`}
          />
        </Picture>
      </a>

      <SendEventOnClick
        id={`banner-principal-${id}-${position}`}
        event={{ name: "select_promotion", params }}
      />

      <SendEventOnView
        id={`banner-principal-${id}-${position}`}
        event={{ name: "view_promotion", params }}
      />
    </>
  );
}

function Dots({ images, interval = 0 }: Props) {
  return (
    <>
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
      <ul class="carousel justify-center col-span-full gap-4 z-10 row-start-4 col-span-[1/2] h-5 md:h-auto items-center ">
        {images?.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot index={index}>
              <div class="py-5">
                <div
                  class=" w-[10px] h-[10px] md:w-[14px] md:h-[14px] sm:w-[16px] sm:h-[16px] group-disabled:bg-primary rounded-full bg-transparent border border-[#a4a4a4]"
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

function Buttons() {
  return (
    <>
      <div class="flex items-center justify-center z-10 col-start-1 row-start-2">
        <Slider.PrevButton class=" ">
          <Icon
            class="text-primary font-bold"
            size={45}
            id="ChevronLeft"
            strokeWidth={2}
          />
        </Slider.PrevButton>
      </div>
      <div class="flex items-center justify-center z-10 col-start-3 row-start-2">
        <Slider.NextButton class=" ">
          <Icon
            class="text-primary font-bold"
            size={45}
            id="ChevronRight"
            strokeWidth={2}
          />
        </Slider.NextButton>
      </div>
    </>
  );
}

function BannerCarousel(props: Props) {
  const id = useId();
  const device = useDevice();
  const is_mobile = device !== "desktop";

  const { images, preload, interval } = { ...DEFAULT_PROPS, ...props };

  return (
    <div
      id={id}
      class="grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px]"
    >
      <Slider class="carousel carousel-center w-full col-span-full row-[1/-2] gap-6">
        {images?.map((image, index) => {
          return (
            <Slider.Item index={index} class="carousel-item w-full">
              <BannerItem
                id={id}
                image={image}
                lcp={index === 0 && preload}
                position={index}
                is_mobile={is_mobile}
              />
            </Slider.Item>
          );
        })}
      </Slider>

      {props.arrows && <Buttons />}

      {props.dots && <Dots images={images} interval={interval} />}

      <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
    </div>
  );
}

export default BannerCarousel;
