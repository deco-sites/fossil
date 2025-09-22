import React from "preact/compat";
import type { ImageWidget } from "apps/admin/widgets.ts";

/**
 * @titleBy alt
 */
export interface CarouselImage {
  /**
   * @title Imagem Desktop
   * @description 410x538 renderizado
   */
  desktopImage?: ImageWidget;

  /**
   * @title Imagem Mobile
   * @description 335x414 renderizado
   */
  mobileImage?: ImageWidget;

  /** @title Texto Alternativo da Imagem */
  alt?: string;

  /** @title Loading priority */
  loading?: "eager" | "lazy";

  /** @title Fetch priority */
  fetchPriority?: "high" | "low" | "auto";
}

export interface ScrollTriggeredCarouselProps {
  /**
   * @title Imagens do Carrossel
   * @description Adicione de 1 a 3 imagens. Com 1 imagem, será renderizada estaticamente. Com 2-3 imagens, será ativado o carrossel com scroll.
   * @maxItems 3
   * @minItems 1
   */
  images?: CarouselImage[];
}

export interface ImageDimensions {
  mobile: {
    width: number;
    height: number;
    aspectRatio: string;
  };
  desktop: {
    width: number;
    height: number;
    aspectRatio: string;
  };
}

export const IMAGE_DIMENSIONS: ImageDimensions = {
  mobile: {
    width: 335,
    height: 414,
    aspectRatio: "335/414",
  },
  desktop: {
    width: 410,
    height: 538,
    aspectRatio: "410/538",
  },
};

export interface ImageContainerProps {
  isMobile: boolean;
  children: React.ReactNode;
  isCarousel?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

export const ImageContainer = React.forwardRef<
  HTMLDivElement,
  ImageContainerProps
>(
  ({ isMobile, children, isCarousel = false }, ref) => {
    const dimensions = IMAGE_DIMENSIONS[isMobile ? "mobile" : "desktop"];

    const containerClasses = isMobile
      ? "w-full flex justify-center"
      : "flex items-center";

    const imageContainerClasses = isCarousel
      ? "w-full relative overflow-hidden rounded-3xl"
      : isMobile
      ? "w-full"
      : "w-full mr-auto";

    const imageContainerStyle = {
      aspectRatio: dimensions.aspectRatio,
      maxWidth: `${dimensions.width}px`,
    };

    return (
      <div ref={ref} class={containerClasses}>
        <div class={imageContainerClasses} style={imageContainerStyle}>
          {children}
        </div>
      </div>
    );
  },
);

export function getImageProps(image: CarouselImage, index: number = 0) {
  return {
    desktopImage: image.desktopImage,
    mobileImage: image.mobileImage,
    alt: image.alt,
    loading: index === 0 ? image.loading || "eager" : "lazy",
    fetchPriority: index === 0 ? image.fetchPriority || "high" : "low",
  };
}
