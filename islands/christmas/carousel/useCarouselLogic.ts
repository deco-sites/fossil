import { useEffect, useMemo, useState } from "preact/hooks";
import type { SwiperInstance } from "../../../sdk/useSwiperCarousel.ts";
import { useSwiperCarousel } from "../../../sdk/useSwiperCarousel.ts";
import type { BannerItem } from "../HeroCarousel.tsx";

interface CarouselLogicOptions {
  validItems: BannerItem[];
  hasMultiple: boolean;
  shouldAutoplay: boolean;
  delaySeconds: number;
  speedMs: number;
  pauseOnHover: boolean;
  useGoldBorder: boolean;
  onSlideChange?: (index: number, item: BannerItem) => void;
}

export function useCarouselLogic({
  validItems,
  hasMultiple,
  shouldAutoplay,
  delaySeconds,
  speedMs,
  pauseOnHover,
  useGoldBorder,
  onSlideChange,
}: CarouselLogicOptions) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(
    null,
  );
  const [activeIndex, setActiveIndex] = useState(0);

  // Notify initial slide
  useEffect(() => {
    if (onSlideChange && validItems.length > 0) {
      onSlideChange(0, validItems[0]);
    }
  }, [onSlideChange, validItems]);

  // Configure Swiper options
  const swiperOptions = useMemo(
    () => ({
      slidesPerView: 1,
      spaceBetween: useGoldBorder ? 0 : 20,
      loop: hasMultiple,
      loopAdditionalSlides: 1,
      loopPreventsSliding: false,
      speed: speedMs,
      allowTouchMove: hasMultiple,
      autoplay: shouldAutoplay
        ? {
          delay: Math.max(delaySeconds, 1) * 1e3,
          disableOnInteraction: false,
          pauseOnMouseEnter: pauseOnHover,
        }
        : undefined,

      on: {
        slideChange(this: SwiperInstance) {
          const newIndex = this.realIndex ?? this.activeIndex ?? 0;
          setActiveIndex(newIndex);

          if (onSlideChange && validItems[newIndex]) {
            onSlideChange(newIndex, validItems[newIndex]);
          }
        },
      },
    }),
    [
      delaySeconds,
      hasMultiple,
      pauseOnHover,
      speedMs,
      onSlideChange,
      validItems,
      useGoldBorder,
    ],
  );

  // Initialize Swiper
  const {
    containerRef: swiperContainerRef,
    swiperRef: swiperInstanceRef,
    isReady: isSwiperReady,
  } = useSwiperCarousel({
    enabled: validItems.length > 0,
    options: swiperOptions,
    onInit: (instance) => {
      setSwiperInstance(instance);
      setActiveIndex(instance.realIndex ?? instance.activeIndex ?? 0);
    },
    deps: [validItems.length],
  });

  // Sync swiper instance state
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

  return {
    swiperInstance,
    activeIndex,
    swiperContainerRef,
    isSwiperReady,
  };
}
