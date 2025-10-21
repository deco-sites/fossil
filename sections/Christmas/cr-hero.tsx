export { default as LoadingFallback } from "../../components/LoadingFallback.tsx";
import { type FnContext } from "@deco/deco";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Button from "../../components/christmas/Button.tsx";
import GoldBorder from "../../components/christmas/GoldBorder.tsx";
import {
  type MediaConfig,
  type VideoControls,
} from "../../components/christmas/MediaBackground.tsx";
import SnowFooter from "../../components/christmas/SnowFooter.tsx";
import { withDevice } from "../../sdk/withDevice.ts";

export interface Button {
  /** @title Texto do Botão */
  name?: string;
  /** @title URL do Botão */
  url?: string;
}

export interface Props {
  /**
   * @title Imagem do Título
   * @description Imagem do título que será exibida (mesma para desktop e mobile)
   */
  titleImage?: ImageWidget;

  /**
   * @title Largura da Imagem do Título
   * @description Largura da imagem do título
   */
  titleImageWidth?: number;

  /**
   * @title Altura da Imagem do Título
   * @description Altura da imagem do título
   */
  titleImageHeight?: number;

  /**
   * @title Texto do Título (H1; apenas para SEO e acessibilidade)
   * @description Texto alternativo e SEO-friendly para o título
   */
  titleText?: string;

  /**
   * @title Subtítulo
   * @description Texto abaixo do título
   */
  subtitle?: string;

  /**
   * @title Botão Esquerdo
   * @description Botão de call-to-action à esquerda
   */
  leftButton?: Button;

  /**
   * @title Botão Direito
   * @description Botão de call-to-action à direita
   */
  rightButton?: Button;

  /**
   * @title Mídia de Fundo do Conteúdo
   * @description Configuração de vídeo ou imagem de fundo dentro da borda dourada
   */
  contentBackground?: MediaConfig;

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
   * @title Imagem do Centro da Borda Inferior
   * @description Imagem posicionada no centro da borda inferior (não será cortada)
   */
  bottomCenterImage?: ImageWidget;

  /**
   * @title Largura da Imagem Central Inferior
   * @description Largura da imagem central inferior
   */
  bottomCenterImageWidth?: number;

  /**
   * @title Altura da Imagem Central Inferior
   * @description Altura da imagem central inferior
   */
  bottomCenterImageHeight?: number;

  /**
   * @title Imagem Neve Desktop
   * @description Imagem decorativa de neve para desktop
   */
  snowFooterDesktop?: ImageWidget;

  /**
   * @title Imagem Neve Mobile
   * @description Imagem decorativa de neve para mobile
   */
  snowFooterMobile?: ImageWidget;

  /**
   * @title Largura da Neve Desktop
   * @description Largura da imagem de neve para desktop
   */
  snowFooterDesktopWidth?: number;

  /**
   * @title Altura da Neve Desktop
   * @description Altura da imagem de neve para desktop
   */
  snowFooterDesktopHeight?: number;

  /**
   * @title Largura da Neve Mobile
   * @description Largura da imagem de neve para mobile
   */
  snowFooterMobileWidth?: number;

  /**
   * @title Altura da Neve Mobile
   * @description Altura da imagem de neve para mobile
   */
  snowFooterMobileHeight?: number;
}

function CRHero({
  titleImage,
  titleImageWidth,
  titleImageHeight,
  titleText,
  subtitle,
  contentBackground,
  posterImage,
  videoControls,
  leftButton,
  rightButton,
  snowFooterDesktop,
  snowFooterMobile,
  snowFooterDesktopWidth,
  snowFooterDesktopHeight,
  snowFooterMobileWidth,
  snowFooterMobileHeight,
  bottomCenterImage,
  bottomCenterImageWidth,
  bottomCenterImageHeight,
  device,
}: ReturnType<Awaited<typeof loader>>) {
  const videoZoom = videoControls?.zoom ?? 1.05;
  const mediaType = contentBackground?.type || "Imagem";
  const isVideo = mediaType === "Vídeo";
  const isDesktop = device === "desktop";

  const renderContent = (isMobile = false) => (
    <div
      class={isMobile
        ? "flex flex-col items-center gap-5 mt-5 mb-5"
        : "flex flex-col items-center justify-center gap-5 relative z-10 h-full"}
    >
      {titleImage && !isMobile && (
        <Image
          src={titleImage}
          alt={titleText || "Christmas Campaign Title"}
          width={titleImageWidth || 600}
          height={titleImageHeight || 200}
          style={{
            width: `${titleImageWidth || 600}px`,
            height: "auto",
            aspectRatio: `${titleImageWidth || 600}/${titleImageHeight || 200}`,
          }}
          loading="eager"
          fetchPriority="high"
          preload
        />
      )}

      {subtitle && (
        <p
          class={`text-white text-center text-sm font-soleil ${
            isMobile ? "max-w-full px-4" : "max-w-2xl"
          }`}
        >
          {subtitle}
        </p>
      )}

      {(leftButton?.name || rightButton?.name) && (
        <div
          class={`flex gap-2 w-auto ${
            isMobile ? "md:flex-col" : "flex-col lg:flex-row"
          }`}
        >
          {leftButton?.name && (
            <Button name={leftButton.name} url={leftButton.url} />
          )}
          {rightButton?.name && (
            <Button name={rightButton.name} url={rightButton.url} />
          )}
        </div>
      )}
    </div>
  );

  return (
    <div class="relative w-full overflow-hidden lg:min-h-screen">
      <div class="relative z-10 flex flex-col items-center lg:min-h-screen lg:px-4 lg:pt-[60px] lg:justify-between">
        {titleText && <h1 class="sr-only">{titleText}</h1>}

        <div class="relative w-full max-w-full lg:mx-0 lg:px-[60px] lg:flex-shrink-0">
          {/* Desktop View */}
          {isDesktop && (
            <div class="hidden lg:block aspect-video">
              <GoldBorder
                class="overflow-hidden w-full h-full"
                variant="desktop"
                backgroundDesktop={!isVideo
                  ? contentBackground?.imageDesktop
                  : undefined}
                backgroundMobile={!isVideo
                  ? contentBackground?.imageMobile
                  : undefined}
                videoDesktop={isVideo ? contentBackground?.video : undefined}
                videoMobile={isVideo
                  ? contentBackground?.videoMobile
                  : undefined}
                posterImage={isVideo ? posterImage : undefined}
                videoZoom={isVideo ? videoZoom : undefined}
              >
                {renderContent(false)}
              </GoldBorder>
            </div>
          )}

          {/* Mobile View */}
          {!isDesktop && (
            <div class="lg:hidden relative z-10">
              <GoldBorder
                class="aspect-square w-full"
                variant="mobile"
                borderPosition="bottom"
                backgroundDesktop={!isVideo
                  ? contentBackground?.imageDesktop
                  : undefined}
                backgroundMobile={!isVideo
                  ? contentBackground?.imageMobile
                  : undefined}
                videoDesktop={isVideo ? contentBackground?.video : undefined}
                videoMobile={isVideo
                  ? contentBackground?.videoMobile
                  : undefined}
                posterImage={isVideo ? posterImage : undefined}
                videoZoom={isVideo ? videoZoom : undefined}
              />

              {titleImage && (
                <div
                  class="flex justify-center relative z-10"
                  style={{
                    marginTop: `-${
                      Math.round(
                        (titleImageHeight || 200) / 2,
                      )
                    }px`,
                  }}
                >
                  <Image
                    src={titleImage}
                    alt={titleText || "Christmas Campaign Title"}
                    width={titleImageWidth || 600}
                    height={titleImageHeight || 200}
                    style={{
                      width: `${titleImageWidth || 600}px`,
                      height: "auto",
                      aspectRatio: `${titleImageWidth || 600}/${
                        titleImageHeight || 200
                      }`,
                    }}
                    loading="eager"
                    fetchPriority="high"
                    preload
                  />
                </div>
              )}

              {renderContent(true)}
            </div>
          )}

          {bottomCenterImage && (
            <div class="hidden lg:block absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20">
              <Image
                src={bottomCenterImage}
                alt="Bottom Center Decoration"
                width={bottomCenterImageWidth || 200}
                height={bottomCenterImageHeight || 200}
                style={{
                  width: `${bottomCenterImageWidth || 200}px`,
                  height: "auto",
                  aspectRatio: `${bottomCenterImageWidth || 200}/${
                    bottomCenterImageHeight || 200
                  }`,
                }}
                loading="eager"
                fetchPriority="high"
                preload
              />
            </div>
          )}
        </div>

        <div class="lg:mt-2 lg:flex-shrink-0 lg:w-full">
          <SnowFooter
            desktopImage={snowFooterDesktop}
            mobileImage={snowFooterMobile}
            desktopWidth={snowFooterDesktopWidth}
            desktopHeight={snowFooterDesktopHeight}
            mobileWidth={snowFooterMobileWidth}
            mobileHeight={snowFooterMobileHeight}
            class="-mx-4 !w-[calc(100%+32px)]"
            preload
          />
        </div>
      </div>
    </div>
  );
}

export const loader = (props: Props, _req: Request, ctx: FnContext) => {
  return withDevice(props, ctx);
};

export default CRHero;
