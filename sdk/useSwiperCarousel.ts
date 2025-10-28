import type { RefObject } from "preact";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import type {
  SwiperModule,
  SwiperOptions as SwiperOptionsType,
} from "npm:swiper@12.0.1/types";

export type SwiperInstance = import("npm:swiper@12.0.1").default;
export type SwiperConstructor = typeof import("npm:swiper@12.0.1").default;
export type SwiperOptions = SwiperOptionsType;

export interface UseSwiperCarouselParams {
  /** Enable or disable swiper initialization */
  enabled?: boolean;
  /** Swiper configuration object */
  options?: SwiperOptions;
  /** Custom modules resolver. Defaults to Autoplay, Pagination, Navigation, A11y and EffectFade. */
  resolveModules?: () => Promise<SwiperModule[]>;
  /** Invoked once the swiper instance is created */
  onInit?: (swiper: SwiperInstance) => void;
  /** Invoked when swiper initialization fails */
  onError?: (error: unknown) => void;
  /** Additional dependencies that should recreate the swiper on change */
  deps?: readonly unknown[];
}

export interface UseSwiperCarouselResult {
  containerRef: RefObject<HTMLDivElement>;
  swiperRef: RefObject<SwiperInstance | null>;
  isReady: boolean;
}

const getDefaultModules = async () => {
  const {
    Autoplay,
    Pagination,
    Navigation,
    Scrollbar,
    A11y,
    EffectFade,
  } = await import("npm:swiper@12.0.1/modules");

  return [
    Autoplay,
    Pagination,
    Navigation,
    Scrollbar,
    A11y,
    EffectFade,
  ].filter(Boolean) as SwiperModule[];
};

const normalizeNavigationOption = (
  navigation: SwiperOptions["navigation"] | undefined,
) => {
  if (navigation === undefined) return undefined;
  if (navigation === false) return false;
  if (navigation === true) {
    return { enabled: true };
  }
  if (typeof navigation === "object" && navigation) {
    return {
      ...navigation,
      enabled: navigation.enabled ?? true,
    };
  }
  return undefined;
};

const normalizeAutoplayOption = (
  autoplay: SwiperOptions["autoplay"] | undefined,
) => {
  if (autoplay === undefined) return undefined;
  if (autoplay === false) return false;
  if (autoplay === true) {
    return { enabled: true } as unknown as SwiperOptions["autoplay"];
  }
  if (typeof autoplay === "object" && autoplay) {
    const autoplayRecord = autoplay as Record<string, unknown>;
    const enabled = typeof autoplayRecord.enabled === "boolean"
      ? autoplayRecord.enabled
      : true;
    return {
      ...autoplay,
      enabled,
    } as unknown as SwiperOptions["autoplay"];
  }
  return undefined;
};

export const useSwiperCarousel = ({
  enabled = true,
  options = {},
  resolveModules,
  onInit,
  onError,
  deps = [],
}: UseSwiperCarouselParams = {}): UseSwiperCarouselResult => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [isReady, setIsReady] = useState(false);
  const onInitRef = useRef(onInit);
  const onErrorRef = useRef(onError);
  const optionsRef = useRef(options);

  useEffect(() => {
    onInitRef.current = onInit;
  }, [onInit]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  const optionsSignature = useMemo(() => {
    const replacer = (_key: string, value: unknown) =>
      typeof value === "function" ? undefined : value;
    return JSON.stringify(options ?? {}, replacer);
  }, [options]);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    if (typeof window === "undefined") {
      setIsReady(false);
      return;
    }

    if (!enabled) {
      if (swiperRef.current) {
        swiperRef.current.destroy(true, true);
        swiperRef.current = null;
      }
      setIsReady(false);
      return;
    }

    let cancelled = false;
    let createdInstance: SwiperInstance | null = null;

    const initialize = async () => {
      if (!containerRef.current) return;

      const [coreModule, loadedModules] = await Promise.all([
        import("npm:swiper@12.0.1"),
        (resolveModules ?? getDefaultModules)(),
      ]);

      if (cancelled || !containerRef.current) {
        return;
      }

      const SwiperCtor = (coreModule.Swiper ??
        coreModule.default) as unknown as SwiperConstructor;
      const availableModules = (loadedModules ?? []) as SwiperModule[];

      const currentOptions = optionsRef.current ?? {};

      const computedOptions: SwiperOptions = {
        observer: true,
        observeParents: true,
        watchOverflow: true,
        ...currentOptions,
      };

      if ("navigation" in computedOptions) {
        const navigationOption = normalizeNavigationOption(
          computedOptions.navigation,
        );
        if (navigationOption === undefined) {
          delete (computedOptions as Record<string, unknown>).navigation;
        } else {
          computedOptions.navigation = navigationOption;
        }
      }

      if ("autoplay" in computedOptions) {
        const autoplayOption = normalizeAutoplayOption(
          computedOptions.autoplay,
        );
        if (autoplayOption === undefined) {
          delete (computedOptions as Record<string, unknown>).autoplay;
        } else {
          computedOptions.autoplay = autoplayOption;
        }
      }

      const navigationOption = computedOptions.navigation;
      const shouldEnableNavigation = typeof navigationOption === "boolean"
        ? navigationOption
        : Boolean(navigationOption);

      const modules = availableModules.filter((module) => {
        if (!module) return false;
        if (!shouldEnableNavigation && module.name === "Navigation") {
          return false;
        }
        return true;
      });

      if (swiperRef.current) {
        swiperRef.current.destroy(true, true);
        swiperRef.current = null;
      }

      try {
        createdInstance = new SwiperCtor(containerRef.current, {
          modules,
          ...computedOptions,
        });
      } catch (error) {
        console.error("Failed to initialize Swiper:", error);
        onErrorRef.current?.(error);
        return;
      }

      swiperRef.current = createdInstance;
      createdInstance.updateSize();
      createdInstance.updateSlides();
      createdInstance.updateProgress();
      createdInstance.updateSlidesClasses();
      setIsReady(true);
      onInitRef.current?.(createdInstance);
    };

    setIsReady(false);
    initialize().catch((error) => {
      console.error("Failed to initialize Swiper:", error);
      onErrorRef.current?.(error);
    });

    return () => {
      cancelled = true;
      setIsReady(false);
      if (createdInstance) {
        createdInstance.destroy(true, true);
        createdInstance = null;
      }

      if (swiperRef.current) {
        swiperRef.current.destroy(true, true);
        swiperRef.current = null;
      }
    };
  }, [enabled, optionsSignature, resolveModules, ...deps]);

  return { containerRef, swiperRef, isReady };
};
