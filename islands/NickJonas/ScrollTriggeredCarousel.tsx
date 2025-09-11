import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import type { CarouselImage } from "../../components/nick-jonas/ScrollTriggeredCarousel.tsx";
import StaticResponsiveImage from "../../components/nick-jonas/StaticResponsiveImage.tsx";
import {
  getImageProps,
  ImageContainer,
} from "../../components/nick-jonas/ScrollTriggeredCarousel.tsx";

export interface ScrollTriggeredCarouselProps {
  images: CarouselImage[];
  isMobile?: boolean;
}

export default function ScrollTriggeredCarousel({
  images,
  isMobile = false,
}: ScrollTriggeredCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollStateRef = useRef({
    progress: 0,
    isListening: false,
    isNearViewport: false,
    previousScrollY: 0,
    wasBottomAlignedWithViewportBottom: false,
    wasTopAlignedWithHeaderLine: false,
    hasAppliedDownwardKick: false,
    hasAppliedUpwardKick: false,
    lastUpdateTime: 0,
    cachedRect: null as DOMRect | null,
    cachedRectTime: 0,
  });

  const scrollConfig = useMemo(() => {
    const prefersReducedMotion = typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stepCount = prefersReducedMotion ? 24 : 64;
    const stepSize = 1 / stepCount;
    const initialKick = prefersReducedMotion ? stepSize : stepSize * 1.25;
    const fixedHeaderHeight = 125;

    return {
      prefersReducedMotion,
      stepCount,
      stepSize,
      initialKick,
      fixedHeaderHeight,
      transformTransition: prefersReducedMotion
        ? "none"
        : "transform 220ms cubic-bezier(0.16, 1, 0.3, 1)",
    };
  }, []);

  const imageCount = images.length;

  const imageTransforms = useMemo(() => {
    return images.map((_, index) => {
      const translateY = index * 100 - scrollProgress * 100 * (imageCount - 1);
      return {
        transform: `translate3d(0, ${translateY}%, 0)`,
        transition: scrollConfig.transformTransition,
      };
    });
  }, [scrollProgress, imageCount, scrollConfig.transformTransition]);

  useEffect(() => {
    if (!containerRef.current || imageCount <= 1) return;

    const container = containerRef.current;
    const state = scrollStateRef.current;
    const { fixedHeaderHeight, stepSize, initialKick } = scrollConfig;

    state.previousScrollY = globalThis.scrollY || 0;

    const updateProgressFromScroll = () => {
      if (!container) return;

      const now = performance.now();

      let rect = state.cachedRect;
      if (!rect || now - state.cachedRectTime > 16) {
        rect = container.getBoundingClientRect();
        state.cachedRect = rect;
        state.cachedRectTime = now;
      }

      const viewportHeight = globalThis.innerHeight ||
        document.documentElement.clientHeight || 0;
      const viewTop = fixedHeaderHeight;
      const viewHeight = Math.max(1, viewportHeight - fixedHeaderHeight);

      const currentScrollY = globalThis.scrollY || 0;
      const scrollDirection = currentScrollY > state.previousScrollY
        ? 1
        : currentScrollY < state.previousScrollY
        ? -1
        : 0;
      state.previousScrollY = currentScrollY;

      const isBottomAlignedWithViewportBottom = rect.bottom <= viewportHeight;
      const isTopAlignedWithHeaderLine = rect.top <= viewTop;

      const travelRange = Math.max(1, viewHeight - rect.height);
      const distanceSinceBottomAlign = viewportHeight - rect.bottom;
      const rawProgress = Math.max(
        0,
        Math.min(1, distanceSinceBottomAlign / travelRange),
      );

      let nextProgress = state.progress;

      if (scrollDirection >= 0) {
        if (!isBottomAlignedWithViewportBottom) {
          nextProgress = 0;
          state.hasAppliedDownwardKick = false;
        } else if (isTopAlignedWithHeaderLine) {
          nextProgress = 1;
          state.hasAppliedDownwardKick = false;
        } else {
          if (
            !state.wasBottomAlignedWithViewportBottom &&
            isBottomAlignedWithViewportBottom &&
            nextProgress <= 0
          ) {
            nextProgress = Math.min(1, initialKick);
            state.hasAppliedDownwardKick = true;
          } else {
            const stepped = Math.floor(rawProgress / stepSize) * stepSize;
            nextProgress = Math.max(nextProgress, stepped);
          }
        }
      } else if (scrollDirection < 0) {
        if (isTopAlignedWithHeaderLine) {
          nextProgress = 1;
          state.hasAppliedUpwardKick = false;
        } else if (!isBottomAlignedWithViewportBottom) {
          nextProgress = 0;
          state.hasAppliedUpwardKick = false;
        } else {
          if (
            state.wasTopAlignedWithHeaderLine &&
            !isTopAlignedWithHeaderLine &&
            nextProgress >= 1
          ) {
            nextProgress = Math.max(0, 1 - initialKick);
            state.hasAppliedUpwardKick = true;
          } else {
            const stepped = Math.ceil(rawProgress / stepSize) * stepSize;
            nextProgress = Math.min(
              nextProgress,
              Math.min(1, Math.max(0, stepped)),
            );
          }
        }
      }

      state.wasBottomAlignedWithViewportBottom =
        isBottomAlignedWithViewportBottom;
      state.wasTopAlignedWithHeaderLine = isTopAlignedWithHeaderLine;

      nextProgress = Math.max(0, Math.min(1, nextProgress));

      const epsilon = 0.0001;
      if (Math.abs(nextProgress - state.progress) > epsilon) {
        state.progress = nextProgress;
        state.lastUpdateTime = now;
        setScrollProgress(nextProgress);
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!state.isNearViewport) return;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateProgressFromScroll();
        ticking = false;
      });
    };

    let resizeTimeout: number;
    const onResize = () => {
      if (!state.isNearViewport) return;

      state.cachedRect = null;

      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateProgressFromScroll();
      }, 100);
    };

    const startListening = () => {
      if (state.isListening) return;
      state.isListening = true;
      addEventListener("scroll", onScroll, { passive: true });
      addEventListener("resize", onResize, { passive: true });
      addEventListener("orientationchange", onResize, { passive: true });
    };

    const stopListening = () => {
      if (!state.isListening) return;
      state.isListening = false;
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onResize);
      removeEventListener("orientationchange", onResize);
      clearTimeout(resizeTimeout);
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        state.isNearViewport = entry.isIntersecting;
        if (entry.isIntersecting) {
          startListening();
          updateProgressFromScroll();
        } else {
          stopListening();
          state.cachedRect = null;
        }
      },
      {
        root: null,
        rootMargin: "100% 0px 100% 0px",
        threshold: 0,
      },
    );
    intersectionObserver.observe(container);

    updateProgressFromScroll();
    startListening();

    return () => {
      intersectionObserver.disconnect();
      stopListening();
      clearTimeout(resizeTimeout);
    };
  }, [imageCount, scrollConfig]);

  if (!images || images.length === 0) {
    return null;
  }

  if (images.length === 1) {
    const image = images[0];
    const imageProps = getImageProps(image);
    return <StaticResponsiveImage {...imageProps} isMobile={isMobile} />;
  }

  return (
    <ImageContainer ref={containerRef} isMobile={isMobile} isCarousel>
      {images.map((image, index) => {
        const style = imageTransforms[index];
        const imageProps = getImageProps(image, index);

        return (
          <div
            key={index}
            class="absolute inset-0 will-change-transform"
            style={style}
          >
            <StaticResponsiveImage {...imageProps} isMobile={isMobile} nested />
          </div>
        );
      })}
    </ImageContainer>
  );
}
