import { useEffect, useMemo, useState } from "preact/hooks";
import type { Category } from "./CategoryTabs.tsx";
import CarouselControls from "../../components/common/CarouselControls.tsx";
import CarouselNavButton from "../../components/common/CarouselNavButton.tsx";
import { clx } from "../../sdk/clx.ts";
import {
  type SlidesConfig,
  useCarouselControls,
  useNavigationButtons,
  useNavigationHandlers,
} from "../../sdk/carouselUtils.ts";
import {
  type SwiperInstance,
  useSwiperCarousel,
} from "../../sdk/useSwiperCarousel.ts";
import Image from "apps/website/components/Image.tsx";

const CATEGORY_SLIDES_CONFIG: SlidesConfig = {
  base: {
    slidesPerView: 1.4,
    spaceBetween: 12,
    centeredSlides: false,
  },
  sm: {
    slidesPerView: 1.4,
    spaceBetween: 12,
    centeredSlides: false,
  },
  lg: {
    slidesPerView: 4,
    spaceBetween: 12,
    centeredSlides: false,
  },
};

export interface CategoryCarouselProps {
  list?: Category[];
  device?: "mobile" | "tablet" | "desktop";
  carouselId: string;
}

export default function CategoryCarousel({
  list = [],
  device: _device = "desktop",
  carouselId,
}: CategoryCarouselProps) {
  const id = carouselId;
  const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(
    null,
  );

  const {
    swiperOptions,
    getSlidesPerView,
    updateButtonStates,
    updatePagination,
  } = useCarouselControls({
    id,
    slidesConfig: CATEGORY_SLIDES_CONFIG,
    options: {
      scrollbar: {
        el: `#${id}-scrollbar`,
        draggable: true,
      },
    },
  });

  const {
    containerRef: swiperContainerRef,
    swiperRef: swiperInstanceRef,
    isReady: isSwiperReady,
  } = useSwiperCarousel({
    enabled: list.length > 0,
    options: swiperOptions,
    onInit: (instance) => {
      setSwiperInstance(instance);
      updatePagination(instance);
      updateButtonStates(instance);
    },
    deps: [list.length],
  });

  const { handleNext, handlePrev } = useNavigationHandlers(
    swiperInstance,
    getSlidesPerView,
    updateButtonStates,
  );

  useNavigationButtons({
    id,
    swiperInstance,
    handleNext,
    handlePrev,
    updateButtonStates,
  });

  const fallbackSlideWidth = useMemo(
    () => `${100 / CATEGORY_SLIDES_CONFIG.base.slidesPerView}%`,
    [],
  );

  useEffect(() => {
    if (!isSwiperReady) {
      setSwiperInstance(null);
    }
  }, [isSwiperReady]);

  useEffect(() => {
    if (!swiperInstance && swiperInstanceRef.current) {
      setSwiperInstance(swiperInstanceRef.current);
    }
  }, [swiperInstance, swiperInstanceRef]);

  useEffect(() => {
    if (!swiperInstance) {
      return;
    }

    updatePagination(swiperInstance);
    updateButtonStates(swiperInstance);
  }, [swiperInstance, list.length, updatePagination, updateButtonStates]);

  if (!list.length) {
    return null;
  }

  const skeletonGap = CATEGORY_SLIDES_CONFIG.base.spaceBetween ?? 20;

  return (
    <>
      <style>
        {`
          #${id}-scrollbar .swiper-scrollbar-drag {
            background: #000 !important;
            border-radius: 9999px;
          }
        `}
      </style>
      <div class="w-full">
        <div class="relative">
          <div
            ref={swiperContainerRef}
            class={clx("swiper", "w-full overflow-hidden")}
          >
            <div
              class={clx(
                "swiper-wrapper",
                !isSwiperReady && "flex justify-center sm:justify-start",
              )}
              style={!isSwiperReady ? { gap: `${skeletonGap}px` } : undefined}
            >
              {list.map(({ image, href, label }) => (
                <div
                  key={label}
                  class={clx("swiper-slide", !isSwiperReady && "flex-shrink-0")}
                  style={!isSwiperReady
                    ? { width: fallbackSlideWidth }
                    : undefined}
                >
                  <div class="flex flex-col gap-4">
                    <a
                      href={href}
                      class={` flex items-center w-full `}
                    >
                      {image &&
                        (
                          <figure className={`w-full`}>
                            <Image
                              class="w-full h-auto object-cover"
                              src={image}
                              alt={label}
                              width={284}
                              height={348}
                              loading="lazy"
                              fetchPriority="auto"
                            />
                          </figure>
                        )}
                    </a>
                    <a
                      class="text-xs lg:text-base lg:font-bold max-lg:uppercase"
                      aria-label={label}
                      href={href}
                    >
                      {label}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
