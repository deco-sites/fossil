import type { ImageWidget, VideoWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface VideoControls {
  /**
   * @title Zoom do Vídeo
   * @description Aplica um zoom no vídeo (1.0 = sem zoom, 1.05 = zoom leve)
   */
  zoom?: number;
}

export interface MediaConfig {
  /**
   * @title Tipo de Mídia
   * @description Escolha entre vídeo ou imagem como fundo
   */
  type: "Vídeo" | "Imagem";

  /**
   * @title Vídeo de Fundo Desktop
   * @description Vídeo que será reproduzido como fundo da seção em desktop
   */
  video?: VideoWidget;

  /**
   * @title Vídeo de Fundo Mobile (1:1)
   * @description Vídeo otimizado para mobile (formato quadrado). Se não fornecido, usa o vídeo desktop
   */
  videoMobile?: VideoWidget;

  /**
   * @title Imagem de Fundo Desktop
   * @description Imagem de fundo para desktop
   */
  imageDesktop?: ImageWidget;

  /**
   * @title Imagem de Fundo Mobile
   * @description Imagem de fundo para mobile
   */
  imageMobile?: ImageWidget;

  /**
   * @title Largura da Imagem
   * @description Largura da imagem de fundo
   */
  imageWidth?: number;

  /**
   * @title Altura da Imagem
   * @description Altura da imagem de fundo
   */
  imageHeight?: number;
}

export interface MediaBackgroundProps {
  /** @ignore true */
  type: "video" | "image";

  /**
   * @title Vídeo
   * @description Arquivo de vídeo para o fundo
   */
  video?: VideoWidget;

  /**
   * @title Imagem Desktop
   * @description Imagem de fundo para desktop
   */
  imageDesktop?: ImageWidget;

  /**
   * @title Imagem Mobile
   * @description Imagem de fundo para mobile
   */
  imageMobile?: ImageWidget;

  /**
   * @title Imagem Pôster
   * @description Imagem exibida antes do vídeo carregar
   */
  posterImage?: string;

  /**
   * @title Zoom do Vídeo
   * @description Nível de zoom aplicado ao vídeo (1.0 = sem zoom, 1.05 = zoom leve)
   */
  videoZoom?: number;

  /** @ignore true */
  clipPath?: string;

  /**
   * @title Largura da Imagem
   * @description Largura da imagem em pixels
   */
  imageWidth?: number;

  /**
   * @title Altura da Imagem
   * @description Altura da imagem em pixels
   */
  imageHeight?: number;

  /** @ignore true */
  preload?: boolean;
}

export default function MediaBackground({
  type,
  video,
  imageDesktop,
  imageMobile,
  posterImage,
  videoZoom = 1.05,
  clipPath,
  imageWidth = 800,
  imageHeight = 800,
  preload = false,
}: MediaBackgroundProps) {
  if (type === "video" && video) {
    return (
      <video
        class="absolute inset-0 w-full h-full object-cover"
        src={video}
        autoplay
        muted
        loop
        playsInline
        preload="auto"
        poster={posterImage || ""}
        aria-hidden="true"
        tabIndex={-1}
        style={{
          objectPosition: "50% 50%",
          transform: `scale(${videoZoom})`,
          clipPath: clipPath ? `url(#${clipPath})` : undefined,
        }}
      />
    );
  }

  if (type === "image" && (imageDesktop || imageMobile)) {
    const mobileImage = imageMobile || imageDesktop;
    const desktopImage = imageDesktop || imageMobile;

    return (
      <div class="absolute inset-0 w-full h-full">
        <Picture preload={preload} class="w-full h-full">
          <Source
            media="(max-width: 767px)"
            src={mobileImage!}
            width={imageWidth}
            height={imageHeight}
            fetchPriority={preload ? "high" : undefined}
          />
          <Source
            media="(min-width: 768px)"
            src={desktopImage!}
            width={imageWidth}
            height={imageHeight}
            fetchPriority={preload ? "high" : undefined}
          />
          <img
            class="w-full h-full object-cover"
            src={desktopImage}
            alt="Background"
            loading={preload ? "eager" : "lazy"}
          />
        </Picture>
      </div>
    );
  }

  return null;
}
