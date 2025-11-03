import { useCallback, useEffect, useId, useMemo } from "preact/hooks";
import type { SwiperInstance, SwiperOptions } from "./useSwiperCarousel.ts";

export const BREAKPOINTS = {
  sm: 640,
  lg: 1024,
} as const;

export interface SlidesConfigEntry {
  slidesPerView: number;
  spaceBetween?: number;
  centeredSlides?: boolean;
}

export interface SlidesConfig {
  base: SlidesConfigEntry;
  sm?: SlidesConfigEntry;
  lg?: SlidesConfigEntry;
}

interface CarouselControlsOptions {
  id: string;
  slidesConfig: SlidesConfig;
  options?: SwiperOptions;
  paginationFormatter?: (params: { end: number; total: number }) => string;
}

interface NavigationButtonsOptions {
  id: string;
  swiperInstance: SwiperInstance | null;
  handleNext: () => void;
  handlePrev: () => void;
  updateButtonStates: (swiper: SwiperInstance) => void;
}

export const sanitizeDomId = (rawId: string, fallback: string): string => {
  const cleaned = rawId.replace(/[^A-Za-z0-9_-]/g, "");
  const base = cleaned || fallback.replace(/[^A-Za-z0-9_-]/g, "");
  if (!base) return "carousel";
  return /^[A-Za-z_]/.test(base) ? base : `cr-${base}`;
};

export const useCarouselId = (providedId?: string) => {
  const generatedId = useId();

  return useMemo(
    () => sanitizeDomId(providedId ?? generatedId, generatedId),
    [providedId, generatedId],
  );
};

export const buildSwiperBreakpoints = (slidesConfig: SlidesConfig) => {
  const breakpoints: Record<number, Partial<SwiperOptions>> = {};

  if (slidesConfig.sm) {
    breakpoints[BREAKPOINTS.sm] = {
      slidesPerView: slidesConfig.sm.slidesPerView,
      spaceBetween: slidesConfig.sm.spaceBetween,
      centeredSlides: slidesConfig.sm.centeredSlides,
    };
  }

  if (slidesConfig.lg) {
    breakpoints[BREAKPOINTS.lg] = {
      slidesPerView: slidesConfig.lg.slidesPerView,
      spaceBetween: slidesConfig.lg.spaceBetween,
      centeredSlides: slidesConfig.lg.centeredSlides,
    };
  }

  return breakpoints;
};

const resolveSlidesPerView = (slidesConfig: SlidesConfig, width: number) => {
  if (width >= BREAKPOINTS.lg && slidesConfig.lg) {
    return slidesConfig.lg.slidesPerView;
  }

  if (width >= BREAKPOINTS.sm && slidesConfig.sm) {
    return slidesConfig.sm.slidesPerView;
  }

  return slidesConfig.base.slidesPerView;
};

export const useCarouselControls = ({
  id,
  slidesConfig,
  options = {},
  paginationFormatter,
}: CarouselControlsOptions) => {
  const getSlidesPerView = useCallback(() => {
    const width = globalThis.innerWidth;
    return resolveSlidesPerView(slidesConfig, width);
  }, [slidesConfig]);

  const updateButtonStates = useCallback((swiper: SwiperInstance) => {
    const currentSlidesPerView = getSlidesPerView();
    const slideCount = swiper.slides?.length ?? 0;
    const maxIndex = Math.max(0, slideCount - currentSlidesPerView);
    const currentIndex = Math.max(
      0,
      Math.min(swiper.activeIndex ?? 0, maxIndex),
    );

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
  }, [id, getSlidesPerView]);

  const updatePagination = useCallback((swiper: SwiperInstance) => {
    const currentView = swiper.params?.slidesPerView ??
      slidesConfig.base.slidesPerView;
    const realSlidesPerView = Math.max(1, Math.floor(Number(currentView) || 1));
    const slideCount = swiper.slides?.length ?? 0;
    const currentIndex = swiper.activeIndex ?? 0;
    const end = Math.min(
      currentIndex + realSlidesPerView,
      slideCount,
    );
    const paginationEl = document.getElementById(`${id}-pagination`);
    if (paginationEl) {
      paginationEl.textContent = paginationFormatter
        ? paginationFormatter({ end, total: slideCount })
        : `${end} de ${slideCount}`;
    }
  }, [id, paginationFormatter, slidesConfig.base.slidesPerView]);

  const breakpoints = useMemo(
    () => buildSwiperBreakpoints(slidesConfig),
    [slidesConfig],
  );

  const swiperOptions = useMemo(() => {
    const mergedBreakpoints = {
      ...(options.breakpoints ?? {}),
      ...breakpoints,
    };

    const baseOptions: SwiperOptions = {
      slidesPerView: slidesConfig.base.slidesPerView,
      spaceBetween: slidesConfig.base.spaceBetween,
      centeredSlides: slidesConfig.base.centeredSlides,
      ...options,
      breakpoints: mergedBreakpoints,
      on: {
        ...options.on,
        slideChange(this: SwiperInstance) {
          options.on?.slideChange?.call(this, this);
          updatePagination(this);
        },
        init(this: SwiperInstance) {
          options.on?.init?.call(this, this);
          updatePagination(this);
          updateButtonStates(this);
        },
      },
    };

    return baseOptions;
  }, [
    breakpoints,
    options,
    slidesConfig.base.centeredSlides,
    slidesConfig.base.slidesPerView,
    slidesConfig.base.spaceBetween,
    updatePagination,
    updateButtonStates,
  ]);

  return {
    swiperOptions,
    getSlidesPerView,
    updateButtonStates,
    updatePagination,
  };
};

export const useNavigationHandlers = (
  swiperInstance: SwiperInstance | null,
  getSlidesPerView: () => number,
  updateButtonStates: (swiper: SwiperInstance) => void,
) => {
  const handleNext = useCallback(() => {
    if (!swiperInstance) return;

    const slidesToMove = getSlidesPerView();
    const slideCount = swiperInstance.slides?.length ?? 0;
    if (slideCount === 0) return;
    const targetIndex = Math.min(
      (swiperInstance.activeIndex ?? 0) + slidesToMove,
      Math.max(0, slideCount - slidesToMove),
    );
    swiperInstance.slideTo(targetIndex);

    setTimeout(() => updateButtonStates(swiperInstance), 100);
  }, [swiperInstance, getSlidesPerView, updateButtonStates]);

  const handlePrev = useCallback(() => {
    if (!swiperInstance) return;

    const slidesToMove = getSlidesPerView();
    const currentIndex = swiperInstance.activeIndex ?? 0;
    const targetIndex = Math.max(currentIndex - slidesToMove, 0);
    swiperInstance.slideTo(targetIndex);

    setTimeout(() => updateButtonStates(swiperInstance), 100);
  }, [swiperInstance, getSlidesPerView, updateButtonStates]);

  return { handleNext, handlePrev };
};

export const useNavigationButtons = ({
  id,
  swiperInstance,
  handleNext,
  handlePrev,
  updateButtonStates,
}: NavigationButtonsOptions) => {
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
    resizeObserver.observe(document.body);

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
};
