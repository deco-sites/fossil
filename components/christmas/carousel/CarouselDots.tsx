import { type SwiperInstance } from "../../../sdk/useSwiperCarousel.ts";

export interface CarouselDotsProps {
  /** @ignore true */
  swiperInstance?: SwiperInstance | null;

  /** @ignore true */
  activeIndex?: number;

  /** @ignore true */
  itemsCount?: number;

  /** @ignore true */
  className?: string;

  /** @ignore true */
  onSlideChange?: (index: number) => void;
}

export default function CarouselDots({
  swiperInstance,
  activeIndex = 0,
  itemsCount = 0,
  className = "",
  onSlideChange,
}: CarouselDotsProps) {
  const hasMultiple = itemsCount > 1;

  const handleDotClick = (index: number) => {
    if (!swiperInstance) return;

    if (
      typeof (
        swiperInstance as unknown as {
          slideToLoop?: (i: number) => void;
        }
      ).slideToLoop === "function"
    ) {
      (
        swiperInstance as unknown as { slideToLoop: (i: number) => void }
      ).slideToLoop(index);
    } else {
      swiperInstance.slideTo(index);
    }

    if (onSlideChange) {
      onSlideChange(index);
    }
  };

  if (!hasMultiple) {
    return null;
  }

  return (
    <div
      class={`absolute bottom-4 xl:bottom-6 left-1/2 z-20 -translate-x-1/2 ${className}`}
    >
      <div class="flex items-center">
        {Array.from({ length: itemsCount }).map((_, index) => (
          <button
            key={`dot-${index}`}
            type="button"
            aria-label={`Ir para o banner ${index + 1}`}
            onClick={() => handleDotClick(index)}
            class="p-1"
          >
            <span
              class={`block size-2 xl:size-2.5 rounded-full border border-white transition ${
                activeIndex === index ? "bg-white" : "bg-transparent"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
