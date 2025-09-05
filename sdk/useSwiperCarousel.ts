import { useEffect, useState } from "preact/hooks";

export interface SwiperOptions {
  slidesPerView?: number | "auto";
  spaceBetween?: number;
  loop?: boolean;
  centeredSlides?: boolean;
  centeredSlidesBounds?: boolean;
  loopAdditionalSlides?: number;
  loopFillGroupWithBlank?: boolean;
  loopPreventsSliding?: boolean;
  watchSlidesProgress?: boolean;
  watchOverflow?: boolean;
  slidesOffsetBefore?: number;
  slidesOffsetAfter?: number;
  initialSlide?: number;
  autoplay?: {
    delay: number;
    disableOnInteraction?: boolean;
    pauseOnMouseEnter?: boolean;
  } | boolean;
  speed?: number;
  grabCursor?: boolean;
  allowTouchMove?: boolean;
  touchRatio?: number;
  touchAngle?: number;
  touchEventsTarget?: string;
  touchMoveStopPropagation?: boolean;
  touchStartPreventDefault?: boolean;
  simulateTouch?: boolean;
  resistanceRatio?: number;
  threshold?: number;
  longSwipes?: boolean;
  longSwipesRatio?: number;
  longSwipesMs?: number;
  navigation?: {
    nextEl?: string;
    prevEl?: string;
  };
  scrollbar?: {
    el?: string;
    draggable?: boolean;
  };
  breakpoints?: Record<number, {
    slidesPerView?: number | "auto";
    spaceBetween?: number;
    centeredSlides?: boolean;
    loop?: boolean;
    loopAdditionalSlides?: number;
    watchSlidesProgress?: boolean;
    initialSlide?: number;
  }>;
  on?: {
    init?: (this: SwiperInstance) => void;
    slideChange?: (this: SwiperInstance) => void;
  };
}

export interface SwiperInstance {
  activeIndex: number;
  realIndex: number;
  slides: HTMLElement[];
  slideNext(): void;
  slidePrev(): void;
  slideTo(index: number, speed?: number): void;
  update(): void;
  destroy(): void;
  params: {
    slidesPerView?: number;
  };
}

interface SwiperConstructor {
  new (element: HTMLElement, options: SwiperOptions): SwiperInstance;
}

export function useSwiperCarousel() {
  const [isSwiperReady, setIsSwiperReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isSwiperReady || isLoading) return;

    const loadSwiper = async () => {
      setIsLoading(true);

      try {
        if (!document.querySelector('link[href*="swiper-bundle.css"]')) {
          const swiperCss = document.createElement("link");
          swiperCss.rel = "stylesheet";
          swiperCss.href =
            "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css";
          document.head.appendChild(swiperCss);
        }

        if (!(globalThis as typeof globalThis & { Swiper?: unknown }).Swiper) {
          const swiperScript = document.createElement("script");
          swiperScript.src =
            "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
          document.head.appendChild(swiperScript);

          await new Promise((resolve, reject) => {
            swiperScript.onload = resolve;
            swiperScript.onerror = reject;
          });
        }

        setIsSwiperReady(true);
      } catch (error) {
        console.error("Failed to load Swiper:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSwiper();
  }, [isSwiperReady, isLoading]);

  const initSwiper = (
    element: HTMLElement,
    options: SwiperOptions,
  ): SwiperInstance | null => {
    if (
      !isSwiperReady ||
      !(globalThis as typeof globalThis & { Swiper?: unknown }).Swiper ||
      !element
    ) return null;

    try {
      const enhancedOptions: SwiperOptions = {
        ...options,
        touchEventsTarget: "container",
        touchStartPreventDefault: options.touchStartPreventDefault ?? false,
        touchMoveStopPropagation: options.touchMoveStopPropagation ?? false,
        simulateTouch: true,
        touchAngle: 45,
        resistanceRatio: 0.85,
        threshold: 5,
        on: {
          ...options.on,
          init: function (this: SwiperInstance) {
            element.classList.add("swiper-initialized");
            setTimeout(() => {
              this.update();
            }, 100);
            options.on?.init?.call(this);
          },
          slideChange: function (this: SwiperInstance) {
            options.on?.slideChange?.call(this);
          },
        },
      };

      return new (globalThis as typeof globalThis & {
        Swiper: SwiperConstructor;
      }).Swiper(element, enhancedOptions);
    } catch (error) {
      console.error("Failed to initialize Swiper:", error);
      return null;
    }
  };

  return {
    isSwiperReady,
    isLoading,
    initSwiper,
  };
}
