import { useCallback, useId, useMemo } from "preact/hooks";
import type { Product } from "apps/commerce/types.ts";
import ProductCard from "../../components/product/ProductCard.tsx";
import { clx } from "../../sdk/clx.ts";
import CTAButton from "./CTAButton.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import {
  type SwiperInstance,
  useSwiperCarousel,
} from "../../sdk/useSwiperCarousel.ts";

export interface NJProductCarouselProps {
  /** @title Produtos da Coleção */
  products?: Product[];
  /** @title Título da Seção */
  title?: string;
  /** @title Botão "Ver Todos" */
  shopAllButton?: {
    /** @title Texto do Botão */
    text?: string;
    /** @title URL do Botão */
    url?: string;
  };
  /** @title Configurações do Carrossel */
  carousel?: {
    /** @title Produtos Visíveis (Desktop) */
    slidesPerView?: 3 | 4 | 5;
    /** @title Produtos Visíveis (Mobile) */
    slidesPerViewMobile?: 1 | 2 | 3;
    /** @title Espaçamento entre Produtos */
    spaceBetween?: number;
  };
}

function NJProductCarousel({
  products = [],
  title = "The Nick Jonas Collection",
  shopAllButton = {
    text: "Shop All",
    url: "/nick-jonas",
  },
  carousel = {
    slidesPerView: 4,
    slidesPerViewMobile: 1,
    spaceBetween: 20,
  },
}: NJProductCarouselProps) {
  const id = useId();
  const platform = usePlatform();
  const updatePagination = useCallback((swiper: SwiperInstance) => {
    const currentSlide = swiper.activeIndex + 1;
    const totalSlides = swiper.slides.length;
    const paginationEl = document.getElementById(`${id}-pagination`);
    if (paginationEl) {
      paginationEl.textContent = `${currentSlide} de ${totalSlides}`;
    }
  }, [id]);

  const swiperOptions = useMemo(
    () => ({
      slidesPerView: carousel.slidesPerView ?? 4,
      spaceBetween: carousel.spaceBetween ?? 20,
      slidesOffsetAfter: 50,
      navigation: {
        nextEl: `#${id}-next`,
        prevEl: `#${id}-prev`,
      },
      scrollbar: {
        el: `#${id}-scrollbar`,
        draggable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: carousel.slidesPerView ?? 4,
          spaceBetween: carousel.spaceBetween ?? 20,
        },
      },
      on: {
        slideChange(this: SwiperInstance) {
          updatePagination(this);
        },
        init(this: SwiperInstance) {
          updatePagination(this);
        },
      },
    }),
    [
      carousel.slidesPerView,
      carousel.spaceBetween,
      id,
      updatePagination,
    ],
  );

  const { containerRef: swiperContainerRef } = useSwiperCarousel({
    enabled: products.length > 0,
    options: swiperOptions,
    onInit: updatePagination,
    deps: [products.length],
  });

  if (!products.length) {
    return (
      <div class="w-full bg-nj-primary py-16 px-4">
        <div class="container mx-auto max-w-6xl text-center">
          <p class="text-primary font-soleil text-lg">
            Nenhum produto encontrado na coleção.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div class="w-full bg-nj-primary py-12 px-4 lg:py-16 lg:px-8">
      <div class="container mx-auto max-w-6xl">
        {/* Header with Title and Shop All Button */}
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 lg:mb-12">
          <h2 class="text-2xl lg:text-4xl text-primary font-benton italic uppercase tracking-wide mb-4 lg:mb-0">
            {title}
          </h2>

          {/* Desktop: Shop All + Navigation in top-right */}
          <div class="hidden lg:flex items-center gap-4">
            {shopAllButton?.text && (
              <CTAButton
                name={shopAllButton.text}
                url={shopAllButton.url}
                variant="primary"
                class="mr-4"
              />
            )}

            {/* Navigation Arrows */}
            <div class="flex items-center gap-2">
              <button
                type="button"
                id={`${id}-prev`}
                class="w-10 h-10 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center disabled:opacity-50"
                aria-label="Produto anterior"
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                type="button"
                id={`${id}-next`}
                class="w-10 h-10 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center disabled:opacity-50"
                aria-label="Próximo produto"
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile: Shop All Button */}
          <div class="lg:hidden">
            {shopAllButton?.text && (
              <CTAButton
                name={shopAllButton.text}
                url={shopAllButton.url}
                variant="primary"
              />
            )}
          </div>
        </div>

        {/* Swiper Carousel */}
        <div class="relative">
          <div
            ref={swiperContainerRef}
            class={clx("swiper", "w-full overflow-hidden")}
          >
            <div class="swiper-wrapper">
              {products.map((product, index) => (
                <div key={product.productID} class="swiper-slide">
                  <ProductCard
                    product={product}
                    itemListName={title}
                    platform={platform}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Scrollbar */}
          <div
            id={`${id}-scrollbar`}
            class="swiper-scrollbar !relative !mt-6 !mb-4 !bg-gray-200 !rounded-full !h-1"
          />

          {/* Pagination Counter */}
          <div class="flex justify-end mt-4">
            <span
              id={`${id}-pagination`}
              class="text-sm font-soleil text-primary opacity-75"
              aria-live="polite"
            >
              1 de {products.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NJProductCarousel;
