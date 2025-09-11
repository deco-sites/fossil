import type { ComponentChildren, VNode } from "preact";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";
import NJPicture from "../../components/nick-jonas/NJPicture.tsx";
import {
  type SwiperInstance,
  type SwiperOptions,
  useSwiperCarousel,
} from "../../sdk/useSwiperCarousel.ts";
import { flattenChildren } from "../../util/preact.ts";

/**
 * @titleBy alt
 */
export interface Item {
  desktopImage?: ImageWidget;
  mobileImage?: ImageWidget;
  alt?: string;
  href?: string;
  caption?: string;
  /** @title Loading priority */
  loading?: "eager" | "lazy";
  /** @title Fetch priority */
  fetchPriority?: "high" | "low" | "auto";
}

export interface Props {
  children?: ComponentChildren;
  slides?: VNode[];
  items?: Item[];
  perPage: number;
  perPageMobile?: number;
  autoplaySeconds?: number;
  totalItems?: number;
  /** @title Enable autoplay pause on hover */
  pauseOnHover?: boolean;
  /** @title Custom slide width */
  slideWidth?: string;
  /** @title Space between slides */
  spaceBetween?: number;
}

export function NJCarouselItem({
  item,
  index,
  className = "",
  style = {},
}: {
  item: Item;
  index: number;
  className?: string;
  style?: Record<string, string | number>;
}) {
  const imageAlt = item.alt || item.caption || `Item ${index + 1}`;
  const linkLabel = item.caption || item.alt || `Ver item ${index + 1}`;

  const ItemContent = (
    <div
      class="relative group w-full aspect-square overflow-hidden bg-gray-100"
      role="img"
      aria-label={imageAlt}
    >
      <NJPicture
        desktop={item.desktopImage}
        mobile={item.mobileImage}
        alt={imageAlt}
        width={400}
        height={400}
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
        loading={item.loading || "lazy"}
        fetchPriority={item.fetchPriority || "auto"}
      />
      {item.caption && (
        <div
          class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-300 bg-black/60 backdrop-blur-sm"
          aria-hidden="true"
        >
          <p class="font-benton text-white text-3xl p-4 text-center transform translate-y-8 group-hover:translate-y-0 transition-all duration-300 tracking-wider">
            {item.caption}
          </p>
        </div>
      )}
    </div>
  );

  const content = item.href
    ? (
      <a
        href={item.href}
        class="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
        aria-label={linkLabel}
        tabIndex={0}
      >
        {ItemContent}
      </a>
    )
    : (
      <div class="block" role="img" aria-label={imageAlt}>
        {ItemContent}
      </div>
    );

  return (
    <div
      className={`w-full h-full ${className}`}
      style={style}
      role="group"
      aria-roledescription="slide"
    >
      {content}
    </div>
  );
}

export default function NJSimpleCarousel({
  children,
  slides,
  items,
  perPage,
  perPageMobile = 2,
  autoplaySeconds = 0,
  pauseOnHover = true,
  spaceBetween = 0,
}: Props) {
  const swiperRef = useRef<HTMLDivElement>(null);
  const { isSwiperReady, initSwiper, isLoading } = useSwiperCarousel();
  const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(
    null,
  );
  const [hasError, setHasError] = useState(false);

  // Validate props
  const hasValidItems = items && items.length > 0;
  const hasValidSlides = slides && slides.length > 0;
  const hasValidChildren = children;
  const shouldShowCarousel = hasValidItems || hasValidSlides ||
    hasValidChildren;

  // Calculate fallback dimensions for loading state
  const fallbackSlideWidth = useMemo(
    () => `${100 / Math.min(perPageMobile, 2)}%`,
    [perPageMobile],
  );

  // Enhanced swiper configuration with better defaults
  const swiperOptions = useMemo(
    (): SwiperOptions => ({
      slidesPerView: Math.min(perPageMobile, 2),
      spaceBetween,
      loop: shouldShowCarousel
        ? hasValidItems
          ? items.length > perPage
          : hasValidSlides
          ? slides.length > perPage
          : true
        : false,
      autoplay: autoplaySeconds > 0
        ? {
          delay: autoplaySeconds * 1000,
          disableOnInteraction: false,
          pauseOnMouseEnter: pauseOnHover,
        }
        : undefined,
      speed: 500,
      grabCursor: true,
      centeredSlides: false,
      watchSlidesProgress: true,
      watchOverflow: true,
      breakpoints: {
        640: {
          slidesPerView: Math.min(perPageMobile + 1, perPage),
          spaceBetween,
        },
        1024: {
          slidesPerView: perPage,
          spaceBetween,
        },
      },
    }),
    [
      perPage,
      perPageMobile,
      autoplaySeconds,
      pauseOnHover,
      spaceBetween,
      shouldShowCarousel,
      hasValidItems,
      hasValidSlides,
      items,
      slides,
    ],
  );

  useEffect(() => {
    if (
      !isSwiperReady ||
      !swiperRef.current ||
      swiperInstance ||
      hasError ||
      !shouldShowCarousel
    ) {
      return;
    }

    try {
      const instance = initSwiper(swiperRef.current, swiperOptions);
      if (instance) {
        setSwiperInstance(instance);
        setHasError(false);
      }
    } catch (error) {
      console.error("Failed to initialize Swiper:", error);
      setHasError(true);
    }
  }, [
    isSwiperReady,
    swiperInstance,
    swiperOptions,
    initSwiper,
    hasError,
    shouldShowCarousel,
  ]);

  const slidesToRender: VNode[] = useMemo(() => {
    if (hasValidItems) {
      return items.map((item, index) => (
        <NJCarouselItem
          key={`item-${index}`}
          item={item}
          index={index}
          className=""
          style={{ width: "100%", height: "100%" }}
        />
      ));
    }

    if (hasValidSlides) {
      return slides.map((slide, index) => (
        <div key={`slide-${index}`} className="w-full h-full">
          {slide}
        </div>
      ));
    }

    return flattenChildren(children).map((child, index) => (
      <div key={`child-${index}`} className="w-full h-full">
        {child}
      </div>
    ));
  }, [
    hasValidItems,
    hasValidSlides,
    hasValidChildren,
    items,
    slides,
    children,
  ]);

  // Show empty state
  if (!shouldShowCarousel) {
    return (
      <div class="w-full h-64 flex items-center justify-center bg-gray-100 rounded-lg">
        <p class="text-gray-500">Nenhum item para exibir</p>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div class="w-full h-64 flex items-center justify-center bg-gray-100 rounded-lg">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary">
        </div>
      </div>
    );
  }

  // Show error state
  if (hasError) {
    return (
      <div class="w-full h-64 flex items-center justify-center bg-red-50 rounded-lg">
        <p class="text-red-600">Erro ao carregar o carrossel</p>
      </div>
    );
  }

  return (
    <div
      class="nj-simple-carousel w-full overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label="Carrossel de imagens"
    >
      <div
        ref={swiperRef}
        class="swiper w-full overflow-hidden"
        aria-live="polite"
      >
        <div
          class={`swiper-wrapper ${
            !isSwiperReady ? "flex justify-center" : ""
          }`}
          style={!isSwiperReady ? { gap: `${spaceBetween}px` } : undefined}
        >
          {slidesToRender.map((child, index) => (
            <div
              key={index}
              class={`swiper-slide ${!isSwiperReady ? "flex-shrink-0" : ""}`}
              style={!isSwiperReady ? { width: fallbackSlideWidth } : undefined}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} de ${slidesToRender.length}`}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
