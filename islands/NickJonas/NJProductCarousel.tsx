import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import type { Button } from "../../sections/NickJonas/nj-collection.tsx";
import type { Product } from "apps/commerce/types.ts";
import NJProductCard from "../../components/nick-jonas/NJProductCard.tsx";
import CTAButton from "../../components/nick-jonas/CTAButton.tsx";
import CarouselNavButton from "../../components/common/CarouselNavButton.tsx";
import CarouselControls from "../../components/common/CarouselControls.tsx";
import { clx } from "../../sdk/clx.ts";
import {
  type SlidesConfig,
  useCarouselControls,
  useCarouselId,
  useNavigationButtons,
  useNavigationHandlers,
} from "../../sdk/carouselUtils.ts";
import {
  type SwiperInstance,
  useSwiperCarousel,
} from "../../sdk/useSwiperCarousel.ts";

const NICK_SLIDES_CONFIG: SlidesConfig = {
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
    slidesPerView: 4,
    spaceBetween: 20,
    centeredSlides: false,
  },
};

export interface NJProductCarouselProps {
  /** @title Produtos da Coleção */
  products?: Product[];
  /** @title Título da Seção */
  title?: string;
  /** @title Botão "Ver Todos" */
  shopAllButton?: Button;
  /** @title Texto Promocional */
  promotionalText?: string;
  /** @ignore true */
  carouselId: string;
}

export default function NJProductCarousel({
  products = [],
  title,
  shopAllButton,
  promotionalText,
  carouselId,
}: NJProductCarouselProps) {
  const id = useCarouselId(carouselId);
  const swiperRef = useRef<HTMLDivElement>(null);
  const { isSwiperReady, isLoading, initSwiper } = useSwiperCarousel();
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
    slidesConfig: NICK_SLIDES_CONFIG,
    options: {
      scrollbar: {
        el: `#${id}-scrollbar`,
        draggable: true,
      },
    },
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
    () => `${100 / NICK_SLIDES_CONFIG.base.slidesPerView}%`,
    [],
  );

  useEffect(() => {
    if (!isSwiperReady || !swiperRef.current || swiperInstance) {
      return;
    }

    try {
      const instance = initSwiper(swiperRef.current, swiperOptions);
      if (instance) {
        setSwiperInstance(instance);
      }
    } catch (error) {
      console.error("Failed to initialize Swiper:", error);
    }
  }, [isSwiperReady, swiperInstance, swiperOptions, initSwiper]);

  useEffect(() => {
    if (!swiperInstance) {
      return;
    }

    updatePagination(swiperInstance);
    updateButtonStates(swiperInstance);
  }, [swiperInstance, products.length, updatePagination, updateButtonStates]);

  if (!products.length) {
    return (
      <div class="w-full">
        <div class="container mx-auto text-center">
          <p class="text-primary font-soleil text-lg">
            Nenhum produto encontrado na coleção.
          </p>
        </div>
      </div>
    );
  }

  const skeletonGap = NICK_SLIDES_CONFIG.base.spaceBetween ?? 20;

  return (
    <>
      <style>
        {`
          #${id}-scrollbar .swiper-scrollbar-drag {
            background: #242424 !important;
          }
        `}
      </style>
      <div class="w-full">
        <div class="container mx-auto">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div class="flex items-center justify-between">
              <h2 class="text-[20px] text-primary font-soleil font-bold">
                {title}
              </h2>
              <div class="lg:hidden flex items-center gap-2">
                <CarouselNavButton
                  id={id}
                  direction="prev"
                  label="Produto anterior"
                  variant="nick-jonas"
                />
                <CarouselNavButton
                  id={id}
                  direction="next"
                  label="Próximo produto"
                  variant="nick-jonas"
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
                <CarouselNavButton
                  id={id}
                  direction="prev"
                  label="Produto anterior"
                  variant="nick-jonas"
                />
                <CarouselNavButton
                  id={id}
                  direction="next"
                  label="Próximo produto"
                  variant="nick-jonas"
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
                style={!isSwiperReady ? { gap: `${skeletonGap}px` } : undefined}
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
            <CarouselControls
              id={id}
              layout="stacked"
              scrollbarClass="!relative !mt-6 !mb-4 !bg-gray-200 !rounded-full !h-1 !w-full !left-0 !right-0"
              paginationClass="text-xs font-soleil text-gray-500 opacity-75"
            />
          </div>
        </div>
      </div>
    </>
  );
}
