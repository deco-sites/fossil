import { useEffect, useMemo, useState } from "preact/hooks";
import ProductCard, {
  type Card,
} from "../../components/christmas/ProductCard.tsx";
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

const CHRISTMAS_SLIDES_CONFIG: SlidesConfig = {
  base: {
    slidesPerView: 1,
    spaceBetween: 20,
    centeredSlides: true,
  },
  sm: {
    slidesPerView: 2,
    spaceBetween: 15,
    centeredSlides: false,
  },
  lg: {
    slidesPerView: 3,
    spaceBetween: 20,
    centeredSlides: false,
  },
};

export interface CRProductCarouselProps {
  cards?: Card[];
  device?: "mobile" | "tablet" | "desktop";
  carouselId: string;
}

export default function ProductCarousel({
  cards = [],
  device: _device = "desktop",
  carouselId,
}: CRProductCarouselProps) {
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
    slidesConfig: CHRISTMAS_SLIDES_CONFIG,
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
    enabled: cards.length > 0,
    options: swiperOptions,
    onInit: (instance) => {
      setSwiperInstance(instance);
      updatePagination(instance);
      updateButtonStates(instance);
    },
    deps: [cards.length],
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
    () => `${100 / CHRISTMAS_SLIDES_CONFIG.base.slidesPerView}%`,
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
  }, [swiperInstance, cards.length, updatePagination, updateButtonStates]);

  if (!cards.length) {
    return null;
  }

  const skeletonGap = CHRISTMAS_SLIDES_CONFIG.base.spaceBetween ?? 20;

  return (
    <>
      <style>
        {`
          #${id}-scrollbar .swiper-scrollbar-drag {
            background: #728c44 !important;
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
              {cards.map((card) => (
                <div
                  key={card.name}
                  class={clx("swiper-slide", !isSwiperReady && "flex-shrink-0")}
                  style={!isSwiperReady
                    ? { width: fallbackSlideWidth }
                    : undefined}
                >
                  <ProductCard {...card} />
                </div>
              ))}
            </div>
          </div>
          <CarouselControls
            id={id}
            class="flex gap-[30px] mt-6"
            scrollbarWrapperClass="relative flex flex-1 items-center mt-2"
            scrollbarClass="!relative !bg-[#EDEDED] !rounded-full !h-1 !flex-1 !left-0 !right-0"
            paginationClass="absolute top-5 right-0 text-xs font-soleil text-white whitespace-nowrap"
            buttonsWrapperClass="flex justify-center items-center gap-2"
            buttons={
              <>
                <CarouselNavButton
                  id={id}
                  direction="prev"
                  label="Card anterior"
                  variant="christmas"
                />
                <CarouselNavButton
                  id={id}
                  direction="next"
                  label="Próximo card"
                  variant="christmas"
                />
              </>
            }
          />
        </div>
      </div>
    </>
  );
}
