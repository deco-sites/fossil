import { useEffect, useState } from "preact/hooks";
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
    slidesPerView: 2,
    spaceBetween: 16,
    centeredSlides: false,
  },
  sm: {
    slidesPerView: 2,
    spaceBetween: 16,
    centeredSlides: false,
  },
  lg: {
    slidesPerView: 4,
    spaceBetween: 24,
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

// Skeleton card component for loading state
function SkeletonCard() {
  return (
    <div class="flex flex-col font-soleil space-y-1">
      <div
        class="relative overflow-hidden bg-white"
        style={{ aspectRatio: "1" }}
      >
        <div class="absolute inset-0 bg-gray-200 animate-pulse" />
        <div class="absolute bottom-2 left-2 right-2">
          <div class="h-3 bg-gray-200 animate-pulse rounded w-3/4 mb-2" />
          <div class="h-3 bg-gray-200 animate-pulse rounded w-1/2" />
        </div>
      </div>
      <div class="text-left space-y-1">
        <div class="h-4 bg-gray-200 animate-pulse rounded w-full" />
        <div class="h-4 bg-gray-200 animate-pulse rounded w-2/3" />
      </div>
    </div>
  );
}

export default function NJProductCarousel({
  products = [],
  title,
  shopAllButton,
  promotionalText,
  carouselId,
}: NJProductCarouselProps) {
  const id = useCarouselId(carouselId);
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

  const {
    containerRef: swiperContainerRef,
    swiperRef: swiperInstanceRef,
    isReady: isSwiperReady,
  } = useSwiperCarousel({
    enabled: products.length > 0,
    options: swiperOptions,
    onInit: (instance) => {
      setSwiperInstance(instance);
      updatePagination(instance);
      updateButtonStates(instance);
    },
    deps: [products.length],
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
    if (!swiperInstance || !isSwiperReady) {
      return;
    }

    swiperInstance.updateSlides();
    swiperInstance.updateProgress();
    swiperInstance.updateSlidesClasses();
    updatePagination(swiperInstance);
    updateButtonStates(swiperInstance);
  }, [
    swiperInstance,
    isSwiperReady,
    products.length,
    updatePagination,
    updateButtonStates,
  ]);

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
                  class={!isSwiperReady ? "pointer-events-none opacity-50" : ""}
                  disabled={!isSwiperReady}
                />
                <CarouselNavButton
                  id={id}
                  direction="next"
                  label="Próximo produto"
                  variant="nick-jonas"
                  class={!isSwiperReady ? "pointer-events-none opacity-50" : ""}
                  disabled={!isSwiperReady}
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
                  class={!isSwiperReady ? "pointer-events-none opacity-50" : ""}
                  disabled={!isSwiperReady}
                />
                <CarouselNavButton
                  id={id}
                  direction="next"
                  label="Próximo produto"
                  variant="nick-jonas"
                  class={!isSwiperReady ? "pointer-events-none opacity-50" : ""}
                  disabled={!isSwiperReady}
                />
              </div>
            </div>
          </div>
          <div class="relative">
            <div
              ref={swiperContainerRef}
              class={clx("swiper", "w-full overflow-hidden")}
            >
              <div
                class={clx(
                  "swiper-wrapper",
                  !isSwiperReady &&
                    "flex justify-center sm:justify-start gap-5 sm:gap-[15px] lg:gap-5",
                )}
              >
                {!isSwiperReady
                  // Render skeleton cards matching the responsive layout exactly
                  ? <>
                    {/* Mobile: 1 centered skeleton */}
                    <div class="flex-shrink-0 w-full sm:hidden lg:hidden">
                      <SkeletonCard />
                    </div>
                    {/* Tablet: 2 skeletons side by side */}
                    <div class="hidden sm:flex-shrink-0 sm:block lg:hidden sm:w-[calc(50%-7.5px)]">
                      <SkeletonCard />
                    </div>
                    <div class="hidden sm:flex-shrink-0 sm:block lg:hidden sm:w-[calc(50%-7.5px)]">
                      <SkeletonCard />
                    </div>
                    {/* Desktop: 4 skeletons side by side */}
                    <div class="hidden lg:flex-shrink-0 lg:block lg:w-[calc(25%-15px)]">
                      <SkeletonCard />
                    </div>
                    <div class="hidden lg:flex-shrink-0 lg:block lg:w-[calc(25%-15px)]">
                      <SkeletonCard />
                    </div>
                    <div class="hidden lg:flex-shrink-0 lg:block lg:w-[calc(25%-15px)]">
                      <SkeletonCard />
                    </div>
                    <div class="hidden lg:flex-shrink-0 lg:block lg:w-[calc(25%-15px)]">
                      <SkeletonCard />
                    </div>
                  </>
                  // Render actual product cards
                  : products.map((product, index) => (
                    <div key={product.productID} class="swiper-slide">
                      <NJProductCard
                        product={product}
                        itemListName={title}
                        index={index}
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
