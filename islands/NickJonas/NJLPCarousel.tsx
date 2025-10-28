import { useId, useMemo } from "preact/hooks";
import type { ProductItem } from "../../sections/NickJonas/nj-lp-collection.tsx";
import type { SwiperOptions } from "../../sdk/useSwiperCarousel.ts";
import { useSwiperCarousel } from "../../sdk/useSwiperCarousel.ts";
import NJLPProductCard from "../../components/nick-jonas/NJLPProductCard.tsx";
import { clx } from "../../sdk/clx.ts";

// Constants for responsive breakpoints
const BREAKPOINTS = {
  xs: 0,
  sm: 480,
  md: 768,
  lg: 1024,
} as const;

interface CarouselSettings {
  speed?: number;
  autoplay?: boolean;
  autoplaySpeed?: number;
}

interface Props {
  products: ProductItem[];
  settings?: CarouselSettings;
}

const defaultSettings = {
  speed: 600,
  autoplay: false,
  autoplaySpeed: 3000,
};

// Custom hook for swiper configuration
const useSwiperConfig = (
  products: ProductItem[],
  settings?: CarouselSettings,
) => {
  return useMemo((): SwiperOptions => {
    // Calculate minimum items needed for smooth infinite loop
    const baseSlidesPerView = 1.2;
    const minItemsForLoop = Math.ceil(baseSlidesPerView * 3);
    const hasEnoughItemsForLoop = products.length >= minItemsForLoop;

    const config = {
      // Core mobile-first settings optimized for infinite loop
      slidesPerView: 1.2,
      centeredSlides: hasEnoughItemsForLoop,
      spaceBetween: 24,
      loop: hasEnoughItemsForLoop,
      speed: settings?.speed || defaultSettings.speed,

      // Enhanced infinite loop settings
      loopFillGroupWithBlank: true,
      watchSlidesProgress: hasEnoughItemsForLoop,
      watchOverflow: true,

      // Enhanced touch settings for smooth mobile infinite loop experience
      grabCursor: true,
      allowTouchMove: true,
      touchRatio: 1,
      touchAngle: 45,
      touchStartPreventDefault: false,
      touchMoveStopPropagation: false,
      simulateTouch: true,
      resistanceRatio: 0.85,
      threshold: 3,
      longSwipes: true,
      longSwipesRatio: 0.5,
      longSwipesMs: 300,

      // Start configuration
      initialSlide: 0,

      // Enhanced loop settings for smooth bidirectional infinite scrolling
      loopAdditionalSlides: hasEnoughItemsForLoop ? 4 : 0,
      loopPreventsSliding: false,

      // Auto-play configuration
      autoplay: settings?.autoplay
        ? {
          delay: settings?.autoplaySpeed || defaultSettings.autoplaySpeed,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }
        : false,

      // Responsive breakpoints
      breakpoints: {
        [BREAKPOINTS.sm]: {
          slidesPerView: 1.4,
          spaceBetween: 20,
          centeredSlides: hasEnoughItemsForLoop,
          loop: hasEnoughItemsForLoop,
          loopAdditionalSlides: hasEnoughItemsForLoop ? 4 : 0,
          watchSlidesProgress: hasEnoughItemsForLoop,
        },
        [BREAKPOINTS.md]: {
          slidesPerView: 2.2,
          spaceBetween: 24,
          centeredSlides: hasEnoughItemsForLoop,
          loop: hasEnoughItemsForLoop,
          loopAdditionalSlides: hasEnoughItemsForLoop ? 4 : 0,
          watchSlidesProgress: hasEnoughItemsForLoop,
        },
        [BREAKPOINTS.lg]: {
          slidesPerView: Math.min(3, products.length),
          spaceBetween: 32,
          centeredSlides: false,
          loop: false,
          initialSlide: 0,
        },
      },
    };

    // `loopFillGroupWithBlank` is supported by Swiper but missing in typings for v12.
    return config as unknown as SwiperOptions;
  }, [products.length, settings]);
};

export default function NJLPCarousel({ products, settings }: Props) {
  const id = useId();
  const swiperOptions = useSwiperConfig(products, settings);
  const { containerRef: carouselRef, isReady: isSwiperReady } =
    useSwiperCarousel({
      enabled: products.length > 0,
      options: swiperOptions,
      deps: [products.length],
    });

  const fallbackSlideWidth = useMemo(() => `${100 / 1.2}%`, []);

  if (!products.length) {
    return (
      <div class="text-center py-8">
        <p class="text-primary font-soleil">
          Nenhum produto disponível para exibir.
        </p>
      </div>
    );
  }

  return (
    <div class="nj-lp-carousel relative">
      {/* Optimized Swiper Styles */}
      <style>
        {`
          .nj-lp-carousel .swiper {
            overflow: visible;
            padding: 0 20px;
          }
          
          .nj-lp-carousel .swiper-wrapper {
            display: flex;
            align-items: stretch;
          }
          
          .nj-lp-carousel .swiper-slide {
            height: auto;
            display: flex;
            align-items: stretch;
            opacity: 0.6;
            transition: opacity 300ms ease, transform 300ms ease;
          }
          
          .nj-lp-carousel .swiper-slide-active {
            opacity: 1;
            transform: scale(1);
          }
          
          .nj-lp-carousel .swiper-slide > div {
            width: 100%;
          }

          /* Prevent flicker during initialization */
          .nj-lp-carousel .swiper:not(.swiper-initialized) {
            opacity: 0;
          }
          
          .nj-lp-carousel .swiper.swiper-initialized {
            opacity: 1;
            transition: opacity 200ms ease;
          }

          /* Hide fallback when Swiper is ready */
          .nj-lp-carousel .swiper-initialized ~ .fallback-grid {
            display: none;
          }
          
          /* Desktop: remove centering effects and padding */
          @media (min-width: 1024px) {
            .nj-lp-carousel .swiper {
              padding: 0;
            }
            
            .nj-lp-carousel .swiper-slide {
              opacity: 1;
              transform: none;
            }
          }

          /* Scrollbar customization */
          #${id}-scrollbar .swiper-scrollbar-drag {
            background: #262626 !important;
          }
        `}
      </style>

      {/* Swiper Carousel */}
      <div ref={carouselRef} class={clx("swiper", "w-full")}>
        <div
          class={clx("swiper-wrapper", !isSwiperReady && "flex justify-center")}
          style={!isSwiperReady ? { gap: `24px` } : undefined}
        >
          {products.map((product, index) => (
            <div
              key={`${id}-slide-${index}`}
              class={clx("swiper-slide", !isSwiperReady && "flex-shrink-0")}
              style={!isSwiperReady ? { width: fallbackSlideWidth } : undefined}
            >
              <NJLPProductCard product={product} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Simplified Fallback Layout */}
      <div class="fallback-grid overflow-x-auto">
        <div class="flex gap-6 pb-4 snap-x snap-mandatory lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:snap-none">
          {products.map((product, index) => (
            <div
              key={`${id}-fallback-${index}`}
              class="flex-none w-[280px] snap-center lg:w-auto lg:flex-auto lg:snap-align-none"
            >
              <NJLPProductCard product={product} index={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
