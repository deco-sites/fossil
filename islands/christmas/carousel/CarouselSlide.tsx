import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { BannerItem } from "../HeroCarousel.tsx";
import { FALLBACK_HEIGHT, FALLBACK_WIDTH } from "./constants.ts";

interface CarouselSlideProps {
  item: BannerItem;
  index: number;
  renderSlide?: (item: BannerItem, index: number) => preact.JSX.Element;
}

export default function CarouselSlide({
  item,
  index,
  renderSlide,
}: CarouselSlideProps) {
  const alt = item.alt || item.title || `Banner ${index + 1}`;
  const isFirstSlide = index === 0;

  if (renderSlide) {
    return (
      <div key={alt + index} class="swiper-slide relative h-full">
        {renderSlide(item, index)}
      </div>
    );
  }

  return (
    <div key={alt + index} class="swiper-slide relative h-full">
      <Picture class="block h-full w-full" preload={isFirstSlide}>
        {item.mobile && (
          <Source
            media="(max-width: 767px)"
            src={item.mobile}
            width={750}
            height={FALLBACK_HEIGHT}
            fetchPriority={isFirstSlide ? "high" : "auto"}
          />
        )}
        {item.desktop && (
          <Source
            media="(min-width: 768px)"
            src={item.desktop}
            width={FALLBACK_WIDTH}
            height={FALLBACK_HEIGHT}
            fetchPriority={isFirstSlide ? "high" : "auto"}
          />
        )}
        <img
          class="h-full w-full object-cover"
          loading={isFirstSlide ? "eager" : "lazy"}
          src={item.desktop || item.mobile || ""}
          alt={alt}
        />
      </Picture>
    </div>
  );
}
