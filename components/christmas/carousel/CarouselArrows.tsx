import { type SwiperInstance } from "../../../sdk/useSwiperCarousel.ts";
import { useId } from "../../../sdk/useId.ts";

export interface CarouselArrowsProps {
  /** @ignore true */
  swiperInstance?: SwiperInstance | null;

  /** @ignore true */
  activeIndex?: number;

  /** @ignore true */
  itemsCount?: number;

  /** @ignore true */
  className?: string;

  /** @ignore true */
  prevButtonId?: string;

  /** @ignore true */
  nextButtonId?: string;

  /** @ignore true */
  onSlideChange?: (index: number) => void;
}

export default function CarouselArrows({
  swiperInstance,
  itemsCount = 0,
  className = "",
  prevButtonId,
  nextButtonId,
}: CarouselArrowsProps) {
  const hasMultiple = itemsCount > 1;
  const id = useId();
  const prevId = prevButtonId || `${id}-prev`;
  const nextId = nextButtonId || `${id}-next`;

  const handlePrevClick = () => {
    if (!swiperInstance) return;

    if (
      typeof (
        swiperInstance as unknown as {
          slidePrevLoop?: () => void;
        }
      ).slidePrevLoop === "function"
    ) {
      (
        swiperInstance as unknown as { slidePrevLoop: () => void }
      ).slidePrevLoop();
    } else {
      swiperInstance.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (!swiperInstance) return;

    if (
      typeof (
        swiperInstance as unknown as {
          slideNextLoop?: () => void;
        }
      ).slideNextLoop === "function"
    ) {
      (
        swiperInstance as unknown as { slideNextLoop: () => void }
      ).slideNextLoop();
    } else {
      swiperInstance.slideNext();
    }
  };

  if (!hasMultiple) {
    return null;
  }

  return (
    <div
      class={`pointer-events-none absolute inset-0 flex items-center justify-between px-4 ${className}`}
    >
      <button
        id={prevId}
        type="button"
        aria-label="Banner anterior"
        class="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/20 text-white transition hover:bg-white/40"
        onClick={handlePrevClick}
      >
        <span class="sr-only">Anterior</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        id={nextId}
        type="button"
        aria-label="Próximo banner"
        class="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/20 text-white transition hover:bg-white/40"
        onClick={handleNextClick}
      >
        <span class="sr-only">Próximo</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
