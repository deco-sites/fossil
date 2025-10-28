import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface SnowFooterProps {
  /**
   * @title Imagem Desktop
   * @description Imagem decorativa de neve para desktop
   */
  desktopImage?: ImageWidget;

  /**
   * @title Imagem Mobile
   * @description Imagem decorativa de neve para mobile
   */
  mobileImage?: ImageWidget;

  /**
   * @title Largura Desktop
   * @description Largura da imagem de neve para desktop em pixels
   */
  desktopWidth?: number;

  /**
   * @title Altura Desktop
   * @description Altura da imagem de neve para desktop em pixels
   */
  desktopHeight?: number;

  /**
   * @title Largura Mobile
   * @description Largura da imagem de neve para mobile em pixels
   */
  mobileWidth?: number;

  /**
   * @title Altura Mobile
   * @description Altura da imagem de neve para mobile em pixels
   */
  mobileHeight?: number;

  /** @ignore true */
  alt?: string;

  /** @ignore true */
  class?: string;

  /** @ignore true */
  preload?: boolean;
}

export default function SnowFooter({
  desktopImage,
  mobileImage,
  desktopWidth = 1920,
  desktopHeight = 200,
  mobileWidth = 768,
  mobileHeight = 200,
  alt = "Decoração de neve",
  class: className = "",
  preload = false,
}: SnowFooterProps) {
  if (!desktopImage && !mobileImage) {
    return null;
  }

  const mobileImg = mobileImage || desktopImage!;
  const desktopImg = desktopImage || mobileImage!;

  return (
    <div class={`relative w-full z-5 ${className}`}>
      <Picture preload={preload} class="block max-w-full w-full">
        <Source
          media="(max-width: 767px)"
          src={mobileImg}
          width={mobileWidth}
          height={mobileHeight}
          fetchPriority={preload ? "high" : undefined}
        />
        <Source
          media="(min-width: 768px)"
          src={desktopImg}
          width={desktopWidth}
          height={desktopHeight}
          fetchPriority={preload ? "high" : undefined}
        />
        <img
          class="w-full h-auto object-cover"
          src={desktopImg}
          alt={alt}
          loading={preload ? "eager" : "lazy"}
        />
      </Picture>
    </div>
  );
}
