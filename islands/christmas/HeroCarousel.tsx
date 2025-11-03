import { useId, useMemo } from "preact/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";
import CarouselArrows from "../../components/christmas/carousel/CarouselArrows.tsx";
import CarouselDots from "../../components/christmas/carousel/CarouselDots.tsx";
import HeroSlideContent from "../../components/christmas/carousel/HeroSlideContent.tsx";
import type { TextSegment } from "../../util/text.ts";
import { useCarouselLogic } from "./carousel/useCarouselLogic.ts";
import GoldFrame from "./carousel/GoldFrame.tsx";
import CarouselContainer from "./carousel/CarouselContainer.tsx";
import CarouselSlide from "./carousel/CarouselSlide.tsx";
import { GOLD_FRAME_STYLES } from "./carousel/constants.ts";

export interface BannerItem {
  desktop?: ImageWidget;
  mobile?: ImageWidget;
  alt?: string;
  title?: string;
  description?: TextSegment[];
  cta?: { label?: string; href?: string };
}

export interface HeroCarouselProps {
  items?: BannerItem[];
  autoplay?: boolean;
  pauseOnHover?: boolean;
  delaySeconds?: number;
  speedMs?: number;
  showArrows?: boolean;
  showDots?: boolean;
  onSlideChange?: (index: number, item: BannerItem) => void;
  /** @title Usar Borda Dourada */
  /** @description Ativa o uso da borda dourada decorativa nos slides */
  useGoldBorder?: boolean;
  /** @ignore true */
  isDesktop?: boolean;
  renderSlide?: (item: BannerItem, index: number) => preact.JSX.Element;
  /** @ignore true */
  controlsOnly?: boolean;
}

function getContentClassName(useGoldBorder: boolean): string {
  return useGoldBorder
    ? "relative z-10 h-full flex flex-col items-center justify-center gap-2 md:gap-4 px-8 py-6 lg:px-12 lg:py-10 text-center text-white"
    : "absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 px-4 text-center text-white";
}

function getTitleClassName(useGoldBorder: boolean): string {
  return useGoldBorder
    ? "text-5xl font-benton italic font-bold md:text-6xl [text-shadow:_2px_2px_10px_rgba(0,0,0,0.8)]"
    : "text-5xl font-benton italic font-bold md:text-6xl";
}

function getDescriptionClassName(useGoldBorder: boolean): string {
  return useGoldBorder
    ? "max-w-2xl text-sm font-soleil md:text-base [text-shadow:_1px_1px_10px_rgba(0,0,0,0.7)]"
    : "max-w-2xl text-sm font-soleil sm:text-base md:text-lg";
}

export default function HeroCarousel({
  items = [],
  autoplay = true,
  pauseOnHover = true,
  delaySeconds = 5,
  speedMs = 500,
  showArrows = false,
  showDots = false,
  onSlideChange,
  useGoldBorder = false,
  isDesktop = false,
  renderSlide,
}: HeroCarouselProps) {
  const validItems = items.filter((item) => item.desktop || item.mobile);
  const hasMultiple = validItems.length > 1;
  const shouldAutoplay = autoplay && hasMultiple;
  const isGoldDesktop = useGoldBorder && isDesktop;

  const generatedId = useId();
  const clipPathId = useMemo(
    () => `goldFrameClip-${generatedId.replaceAll(":", "")}`,
    [generatedId],
  );
  const clipPathUrl = `url(#${clipPathId})`;

  const rootClassName = isGoldDesktop
    ? "relative w-full gold-frame-wrapper"
    : "relative w-full h-full";

  const { swiperInstance, activeIndex, swiperContainerRef } = useCarouselLogic({
    validItems,
    hasMultiple,
    shouldAutoplay,
    delaySeconds,
    speedMs,
    pauseOnHover,
    useGoldBorder,
    onSlideChange,
  });

  if (!validItems.length) {
    return null;
  }

  return (
    <div class={rootClassName}>
      {useGoldBorder && <GoldFrame isDesktop={isDesktop} clipId={clipPathId} />}

      <CarouselContainer
        useGoldBorder={useGoldBorder}
        isDesktop={isDesktop}
        clipPathUrl={clipPathUrl}
        containerRef={swiperContainerRef}
      >
        <div class="swiper-wrapper">
          {validItems.map((item, index) => (
            <CarouselSlide
              key={item.alt || item.title || `Banner ${index + 1}`}
              item={item}
              index={index}
              renderSlide={renderSlide}
            />
          ))}
        </div>
      </CarouselContainer>

      {validItems.map((item, index) => {
        if (activeIndex !== index) return null;

        return (
          <div
            key={`content-${index}`}
            class={`absolute inset-0 pointer-events-none ${
              useGoldBorder ? "z-30" : "z-10"
            }`}
          >
            <HeroSlideContent
              title={item.title}
              description={item.description}
              cta={item.cta}
              className={getContentClassName(useGoldBorder)}
              titleClassName={getTitleClassName(useGoldBorder)}
              descriptionClassName={getDescriptionClassName(useGoldBorder)}
              swiperInstance={swiperInstance}
            />
          </div>
        );
      })}

      {showArrows && (
        <CarouselArrows
          swiperInstance={swiperInstance}
          activeIndex={activeIndex}
          itemsCount={validItems.length}
        />
      )}

      {showDots && (
        <CarouselDots
          swiperInstance={swiperInstance}
          activeIndex={activeIndex}
          itemsCount={validItems.length}
        />
      )}

      <style jsx>{GOLD_FRAME_STYLES}</style>
    </div>
  );
}
