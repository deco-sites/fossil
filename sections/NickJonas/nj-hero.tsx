export { default as LoadingFallback } from "../../components/LoadingFallback.tsx";
import type { ImageWidget, VideoWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import CTAButton from "../../components/nick-jonas/CTAButton.tsx";
import ScrollIndicator from "../../components/ui/ScrollIndicator.tsx";

export interface Button {
  /** @title Texto do Botão */
  name?: string;
  /** @title URL do Botão */
  url?: string;
}

export interface VideoControls {
  /**
   * @title Zoom do Vídeo
   * @description Aplica um zoom no vídeo (1.0 = sem zoom, 1.05 = zoom leve)
   */
  zoom?: number;
}

export interface Props {
  /**
   * @title Logo
   * @description Logo da Nick Jonas que será exibido no centro da seção
   */
  logo?: ImageWidget;

  /**
   * @title Título Principal (H1; apenas para SEO e acessibilidade)
   * @description Texto principal exibido sobre o vídeo
   */
  mainTitle?: string;

  /**
   * @title Descrição (apenas para SEO e acessibilidade)
   * @description Descrição exibido abaixo do título principal
   */
  description?: string;

  /**
   * @title Botão de Ação
   * @description Botão de call-to-action principal
   */
  cta?: Button;

  /**
   * @title Vídeo de Fundo
   * @description Vídeo que será reproduzido como fundo da seção
   */
  backgroundVideo?: VideoWidget;

  /**
   * @title Imagem de Pôster do Vídeo
   * @description Imagem estática exibida enquanto o vídeo carrega
   */
  posterImage?: ImageWidget;

  /**
   * @title Configurações de Viewport do Vídeo
   * @description Controles para ajustar como o vídeo é exibido
   */
  videoControls?: VideoControls;

  /**
   * @title Exibir Indicador de Rolagem
   * @description Mostra uma seta animada na parte inferior indicando para rolar a página
   */
  showScrollIndicator?: boolean;
}

function NJHero({
  backgroundVideo,
  posterImage,
  logo,
  mainTitle,
  description,
  cta,
  videoControls,
  showScrollIndicator,
}: Props) {
  const videoZoom = videoControls?.zoom ?? 1.05;

  return (
    <div class="relative w-full overflow-hidden h-screen">
      {/* Video Background Layer */}
      {backgroundVideo && (
        <video
          class="absolute inset-0 w-full h-full object-cover"
          src={backgroundVideo}
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
          }}
        />
      )}

      {/* Dark Overlay for better text contrast */}
      <div class="absolute inset-0 bg-black/30" />

      {/* Main Content Container */}
      <div class="relative z-10 flex flex-col items-center justify-center h-full px-4">
        {/* Brand Logo */}
        {logo && (
          <div class="mb-8 lg:mb-12">
            <Image
              src={logo}
              alt={mainTitle || "Nick Jonas Logo"}
              width={300}
              height={120}
              class="w-64 h-auto lg:w-80"
              fetchPriority="high"
              loading="eager"
              preload
            />
          </div>
        )}

        {/* SEO-friendly text content (hidden visually but available for screen readers) */}
        {mainTitle && <h1 class="sr-only">{mainTitle}</h1>}
        {description && <p class="sr-only">{description}</p>}

        {/* Call-to-Action Button */}
        {cta?.name && (
          <CTAButton name={cta.name} url={cta.url} variant="primary" />
        )}
      </div>

      {/* Scroll Indicator (shows at bottom to encourage scrolling) */}
      {showScrollIndicator && (
        <ScrollIndicator theme="white" positioning="relative" />
      )}
    </div>
  );
}

export default NJHero;
