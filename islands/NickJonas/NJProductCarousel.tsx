import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "preact/hooks";
import type { Button } from "../../sections/NickJonas/nj-collection.tsx";
import type { Product } from "apps/commerce/types.ts";
import NJProductCard from "../../components/nick-jonas/NJProductCard.tsx";
import { clx } from "../../sdk/clx.ts";
import CTAButton from "../../components/nick-jonas/CTAButton.tsx";
import {
  type SwiperInstance,
  type SwiperOptions,
  useSwiperCarousel,
} from "../../sdk/useSwiperCarousel.ts";

// Constants for responsive breakpoints
const BREAKPOINTS = {
  sm: 640,
  lg: 1024,
} as const;

// Custom hook for responsive slides per view
const useSlidesPerView = () => {
  const getSlidesPerView = useCallback(() => {
    const width = globalThis.innerWidth;
    if (width >= BREAKPOINTS.lg) return 4;
    if (width >= BREAKPOINTS.sm) return 2;
    return 1;
  }, []);

  return getSlidesPerView;
};

// Custom hook for button state management
const useButtonState = (id: string, getSlidesPerView: () => number) => {
  const updateButtonStates = useCallback(
    (swiper: SwiperInstance) => {
      const currentSlidesPerView = getSlidesPerView();
      const maxIndex = swiper.slides.length - currentSlidesPerView;
      const currentIndex = swiper.activeIndex;

      const nextButtons = document.querySelectorAll(`#${id}-next`);
      const prevButtons = document.querySelectorAll(`#${id}-prev`);

      const updateButton = (button: Element, disabled: boolean) => {
        const htmlButton = button as HTMLButtonElement;
        htmlButton.disabled = disabled;
        htmlButton.classList.toggle("opacity-50", disabled);
      };

      prevButtons.forEach((button) => updateButton(button, currentIndex <= 0));
      nextButtons.forEach((button) =>
        updateButton(button, currentIndex >= maxIndex)
      );
    },
    [id, getSlidesPerView],
  );

  return { updateButtonStates };
};

// Custom hook for pagination management
const usePagination = (id: string) => {
  const updatePagination = useCallback(
    (swiper: SwiperInstance) => {
      const currentView =
        (swiper as SwiperInstance & { params?: { slidesPerView?: number } })
          .params?.slidesPerView || 4;
      const realSlidesPerView = Math.max(1, Math.floor(currentView));
      const endItem = Math.min(
        swiper.activeIndex + realSlidesPerView,
        swiper.slides.length,
      );
      const paginationEl = document.getElementById(`${id}-pagination`);
      if (paginationEl) {
        paginationEl.textContent = `${endItem} de ${swiper.slides.length}`;
      }
    },
    [id],
  );

  return { updatePagination };
};

// Custom hook for swiper configuration
const useSwiperConfig = (
  id: string,
  updatePagination: (swiper: SwiperInstance) => void,
) => {
  return useMemo(
    (): SwiperOptions => ({
      slidesPerView: 1,
      spaceBetween: 20,
      centeredSlides: true,
      scrollbar: {
        el: `#${id}-scrollbar`,
        draggable: true,
      },
      breakpoints: {
        [BREAKPOINTS.sm]: {
          slidesPerView: 2,
          spaceBetween: 15,
          centeredSlides: false,
        },
        [BREAKPOINTS.lg]: {
          slidesPerView: 4,
          spaceBetween: 20,
          centeredSlides: false,
        },
      },
      on: {
        slideChange: function () {
          updatePagination(this);
        },
        init: function () {
          updatePagination(this);
        },
      },
    }),
    [id, updatePagination],
  );
};

// Custom hook for navigation handlers
const useNavigationHandlers = (
  _id: string,
  swiperInstance: SwiperInstance | null,
  getSlidesPerView: () => number,
  updateButtonStates: (swiper: SwiperInstance) => void,
) => {
  const handleNext = useCallback(() => {
    if (!swiperInstance) return;

    const slidesToMove = getSlidesPerView();
    const targetIndex = Math.min(
      swiperInstance.activeIndex + slidesToMove,
      swiperInstance.slides.length - getSlidesPerView(),
    );
    swiperInstance.slideTo(targetIndex);

    // Update button states after navigation
    setTimeout(() => updateButtonStates(swiperInstance), 100);
  }, [swiperInstance, getSlidesPerView, updateButtonStates]);

  const handlePrev = useCallback(() => {
    if (!swiperInstance) return;

    const slidesToMove = getSlidesPerView();
    const targetIndex = Math.max(swiperInstance.activeIndex - slidesToMove, 0);
    swiperInstance.slideTo(targetIndex);

    // Update button states after navigation
    setTimeout(() => updateButtonStates(swiperInstance), 100);
  }, [swiperInstance, getSlidesPerView, updateButtonStates]);

  return { handleNext, handlePrev };
};

// Reusable navigation button component
const NavigationButton = ({
  id,
  direction,
  label,
}: {
  id: string;
  direction: "prev" | "next";
  label: string;
}) => {
  const isPrev = direction === "prev";
  const iconPath = isPrev ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7";

  return (
    <button
      type="button"
      id={`${id}-${direction}`}
      class="w-10 h-10 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center disabled:opacity-50"
      aria-label={label}
    >
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d={iconPath}
        />
      </svg>
    </button>
  );
};

// Reusable scrollbar and pagination component
const CarouselControls = ({ id }: { id: string }) => (
  <>
    <div
      id={`${id}-scrollbar`}
      class="swiper-scrollbar !relative !mt-6 !mb-4 !bg-gray-200 !rounded-full !h-1 !w-full !left-0 !right-0"
    />
    <div class="flex justify-end mt-4">
      <span
        id={`${id}-pagination`}
        class="text-xs font-soleil text-gray-500 opacity-75"
        aria-live="polite"
      />
    </div>
  </>
);

export interface NJProductCarouselProps {
  /** @title Produtos da Coleção */
  products?: Product[];
  /** @title Título da Seção */
  title?: string;
  /** @title Botão "Ver Todos" */
  shopAllButton?: Button;
  /** @title Texto Promocional */
  promotionalText?: string;
}

export default function NJProductCarousel({
  products = [],
  title,
  shopAllButton,
  promotionalText,
}: NJProductCarouselProps) {
  const id = useId();
  const swiperRef = useRef<HTMLDivElement>(null);
  const { isSwiperReady, isLoading, initSwiper } = useSwiperCarousel();
  const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(
    null,
  );

  const getSlidesPerView = useSlidesPerView();
  const { updateButtonStates } = useButtonState(id, getSlidesPerView);
  const { updatePagination } = usePagination(id);
  const swiperOptions = useSwiperConfig(id, updatePagination);
  const { handleNext, handlePrev } = useNavigationHandlers(
    id,
    swiperInstance,
    getSlidesPerView,
    updateButtonStates,
  );

  const fallbackSlideWidth = useMemo(() => `${100 / 1}%`, []);

  useEffect(() => {
    if (!isSwiperReady || !swiperRef.current || swiperInstance) return;

    const updatePaginationAndButtons = (swiper: SwiperInstance) => {
      updatePagination(swiper);
      updateButtonStates(swiper);
    };

    const swiperOptionsWithCallbacks: SwiperOptions = {
      ...swiperOptions,
      on: {
        slideChange: function () {
          updatePaginationAndButtons(this);
        },
        init: function () {
          updatePaginationAndButtons(this);
        },
      },
    };

    try {
      const instance = initSwiper(
        swiperRef.current,
        swiperOptionsWithCallbacks,
      );
      if (instance) {
        setSwiperInstance(instance);
      }
    } catch (error) {
      console.error("Failed to initialize Swiper:", error);
    }
  }, [
    isSwiperReady,
    swiperInstance,
    swiperOptions,
    initSwiper,
    updatePagination,
    updateButtonStates,
  ]);

  useEffect(() => {
    if (!swiperInstance) return;

    const nextButtons = document.querySelectorAll(`#${id}-next`);
    const prevButtons = document.querySelectorAll(`#${id}-prev`);

    updateButtonStates(swiperInstance);

    nextButtons.forEach((button) =>
      button.addEventListener("click", handleNext)
    );
    prevButtons.forEach((button) =>
      button.addEventListener("click", handlePrev)
    );

    const handleResize = () => {
      setTimeout(() => updateButtonStates(swiperInstance), 100);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(globalThis.document.body);

    return () => {
      nextButtons.forEach((button) =>
        button.removeEventListener("click", handleNext)
      );
      prevButtons.forEach((button) =>
        button.removeEventListener("click", handlePrev)
      );
      resizeObserver.disconnect();
    };
  }, [swiperInstance, id, handleNext, handlePrev, updateButtonStates]);

  if (!products.length) {
    return (
      <div class="w-full bg-nj-primary">
        <div class="container mx-auto text-center">
          <p class="text-primary font-soleil text-lg">
            Nenhum produto encontrado na coleção.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          #${id}-scrollbar .swiper-scrollbar-drag {
            background: #262626 !important;
          }
        `}
      </style>
      <div class="w-full bg-nj-primary">
        <div class="container mx-auto">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div class="flex items-center justify-between">
              <h2 class="text-[20px] text-primary font-soleil font-bold">
                {title}
              </h2>
              <div class="lg:hidden flex items-center gap-2">
                <NavigationButton
                  id={id}
                  direction="prev"
                  label="Produto anterior"
                />
                <NavigationButton
                  id={id}
                  direction="next"
                  label="Próximo produto"
                />
              </div>
            </div>
            <div class="hidden lg:flex items-center gap-2">
              {shopAllButton?.name && (
                <CTAButton
                  name={shopAllButton.name}
                  url={shopAllButton.url}
                  variant="secondary"
                />
              )}
              <div class="flex items-center gap-2">
                <NavigationButton
                  id={id}
                  direction="prev"
                  label="Produto anterior"
                />
                <NavigationButton
                  id={id}
                  direction="next"
                  label="Próximo produto"
                />
              </div>
            </div>
          </div>
          <div class="relative">
            <div
              ref={swiperRef}
              class={clx("swiper", "w-full overflow-hidden")}
            >
              <div
                class={clx(
                  "swiper-wrapper",
                  !isSwiperReady && "flex justify-center sm:justify-start",
                )}
                style={!isSwiperReady ? { gap: `20px` } : undefined}
              >
                {products.map((product, index) => (
                  <div
                    key={product.productID}
                    class={clx(
                      "swiper-slide",
                      !isSwiperReady && "flex-shrink-0",
                    )}
                    style={!isSwiperReady
                      ? { width: fallbackSlideWidth }
                      : undefined}
                  >
                    <NJProductCard
                      product={product}
                      itemListName={title}
                      index={index}
                      hideImage={!isSwiperReady || isLoading}
                      promotionalText={promotionalText}
                    />
                  </div>
                ))}
              </div>
            </div>
            <CarouselControls id={id} />
          </div>
        </div>
      </div>
    </>
  );
}
