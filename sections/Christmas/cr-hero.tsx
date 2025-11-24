export { default as LoadingFallback } from "../../components/LoadingFallback.tsx";
import type { FnContext } from "@deco/deco";
import type { ImageWidget, VideoWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import SnowFooter from "../../components/christmas/SnowFooter.tsx";
import HeroCarousel from "../../islands/christmas/HeroCarousel.tsx";
import GoldBorder from "../../components/christmas/GoldBorder.tsx";
import Button from "../../components/christmas/Button.tsx";

import type { BannerItem } from "../../islands/christmas/HeroCarousel.tsx";
import type { TextSegment } from "../../util/text.ts";
import { toStrongHTML } from "../../util/text.ts";
import { withDevice } from "../../sdk/withDevice.ts";

const segmentsToHTML = (segments: TextSegment[]): string =>
  segments
    .map((seg) => (seg.bold ? `<strong>${seg.text}</strong>` : seg.text))
    .join("");

interface BannerCTA {
  /** @title Texto do Botão */
  /** @description Texto exibido no botão do banner */
  label?: string;
  /** @title URL do Botão */
  /** @description Link de destino do botão */
  href?: string;
}

/**
 * @titleBy title
 */
interface Banner {
  /** @title Imagem Desktop */
  /** @description Imagem do banner para telas desktop */
  desktop?: ImageWidget;

  /** @title Imagem Mobile */
  /** @description Imagem do banner para telas mobile */
  mobile?: ImageWidget;

  /** @title Texto Alternativo */
  /** @description Descrição da imagem para acessibilidade (alt) */
  alt?: string;

  /** @title Título do Banner (H2) */
  /** @description Título exibido sobre a imagem do banner */
  title?: string;

  /** @title Descrição do Banner */
  /** @description Texto exibido abaixo do título do banner */
  description?: string;

  /** @title CTA do Banner */
  /** @description Botão único do banner */
  cta?: BannerCTA;
}

interface CarouselConfig {
  /** @title Autoplay habilitado */
  /** @description Ativa/desativa o avanço automático dos slides */
  autoplay?: boolean;

  /** @title Pausar ao passar o mouse */
  /** @description Pausa o autoplay quando o mouse estiver sobre o carrossel */
  pauseOnHover?: boolean;

  /** @title Atraso do autoplay (segundos) */
  /** @description Tempo entre as trocas automáticas dos slides */
  delaySeconds?: number;

  /** @title Velocidade da transição (ms) */
  /** @description Duração da animação de transição entre slides */
  speedMs?: number;

  /** @title Mostrar setas */
  /** @description Exibe botões de navegação anterior/próximo */
  showArrows?: boolean;

  /** @title Mostrar pontos */
  /** @description Exibe indicadores (bolinhas) de navegação */
  showDots?: boolean;
}

/**
 * @title Carrossel de Imagens
 */
interface ContentCarousel {
  /** @hide true */
  type: "carousel";

  /** @title Banners */
  /** @description Lista de banners exibidos no carrossel */
  banners?: Banner[];

  /** @title Configurações do carrossel */
  /** @description Controle de autoplay, velocidade e navegação */
  carousel?: CarouselConfig;
}

/**
 * @title Vídeo
 */
interface ContentVideo {
  /** @hide true */
  type: "video";

  /** @title Vídeo Desktop */
  /** @description Vídeo exibido em telas desktop */
  desktop: VideoWidget;

  /** @title Vídeo Mobile */
  /** @description Vídeo exibido em telas mobile (opcional, usa desktop se não definido) */
  mobile?: VideoWidget;

  /** @title Imagem de Pôster */
  /** @description Imagem exibida enquanto o vídeo carrega (importante para performance) */
  posterImage?: ImageWidget;

  /** @title Zoom do Vídeo */
  /** @description Fator de zoom para cortar parte do vídeo (1.0 = normal, 1.1 = 10% de zoom) */
  videoZoom?: number;

  /** @title Reprodução Automática */
  /** @description Inicia o vídeo automaticamente */
  autoplay?: boolean;

  /** @title Loop */
  /** @description Repete o vídeo continuamente */
  loop?: boolean;

  /** @title Mudo */
  /** @description Reproduz o vídeo sem som */
  muted?: boolean;

  /** @title Título do Vídeo */
  /** @description Título exibido sobre o vídeo */
  title?: string;

  /** @title Descrição do Vídeo */
  /** @description Texto exibido abaixo do título */
  description?: string;

  /** @title CTA do Vídeo */
  /** @description Botão exibido sobre o vídeo */
  cta?: BannerCTA;
}

type ContentType = ContentCarousel | ContentVideo;

export interface Props {
  /** @title Título (H1 - somente leitores de tela) */
  /** @description Título principal da página (renderizado como sr-only) */
  titleText?: string;

  /** @title Conteúdo */
  /** @description Escolha entre carrossel de imagens ou vídeo */
  content?: ContentType;

  /** @title Imagem do Centro da Borda Inferior */
  /** @description Imagem posicionada no centro da borda inferior (não será cortada) */
  bottomCenterImage?: ImageWidget;

  /** @title Largura da Imagem Central Inferior */
  /** @description Largura da imagem central inferior */
  bottomCenterImageWidth?: number;

  /** @title Altura da Imagem Central Inferior */
  /** @description Altura da imagem central inferior */
  bottomCenterImageHeight?: number;

  /** @title Imagem Neve Desktop */
  /** @description Imagem decorativa de neve para desktop */
  snowFooterDesktop?: ImageWidget;

  /** @title Imagem Neve Mobile */
  /** @description Imagem decorativa de neve para mobile */
  snowFooterMobile?: ImageWidget;

  /** @title Largura da Neve Desktop */
  /** @description Largura da imagem de neve para desktop */
  snowFooterDesktopWidth?: number;

  /** @title Altura da Neve Desktop */
  /** @description Altura da imagem de neve para desktop */
  snowFooterDesktopHeight?: number;

  /** @title Largura da Neve Mobile */
  /** @description Largura da imagem de neve para mobile */
  snowFooterMobileWidth?: number;

  /** @title Altura da Neve Mobile */
  /** @description Altura da imagem de neve para mobile */
  snowFooterMobileHeight?: number;
}

const DEFAULT_CAROUSEL: Required<CarouselConfig> = {
  autoplay: true,
  pauseOnHover: true,
  delaySeconds: 5,
  speedMs: 500,
  showArrows: false,
  showDots: false,
};

const toHeroCarouselItems = (banners?: Banner[]): BannerItem[] =>
  (banners ?? []).map((banner) => ({
    desktop: banner.desktop,
    mobile: banner.mobile,
    alt: banner.alt,
    title: banner.title,
    description: toStrongHTML(banner.description),
    cta: banner.cta,
  }));

interface VideoContentProps {
  content: ContentVideo;
  isDesktop: boolean;
}

function VideoContent({ content, isDesktop }: VideoContentProps) {
  return (
    <GoldBorder
      class="w-full h-full overflow-hidden"
      videoDesktop={content.desktop}
      videoMobile={content.mobile || content.desktop}
      posterImage={content.posterImage}
      videoZoom={content.videoZoom ?? 1}
      noPadding
      variant={isDesktop ? "desktop" : "mobile"}
      borderPosition={isDesktop ? "both" : "bottom"}
    >
      <div class="w-full h-full flex flex-col items-center justify-center text-center p-4">
        {content.title && (
          <h2
            class="font-benton text-[32px] lg:text-[60px] leading-none text-white mb-2 lg:mb-4 [text-shadow:_2px_2px_10px_rgba(0,0,0,0.8)]"
            // deno-lint-ignore react-no-danger
            dangerouslySetInnerHTML={{ __html: content.title }}
          />
        )}
        {content.description && (
          <p
            class="font-soleil text-[14px] lg:text-[18px] text-white mb-4 lg:mb-6 [text-shadow:_1px_1px_5px_rgba(0,0,0,0.8)]"
            // deno-lint-ignore react-no-danger
            dangerouslySetInnerHTML={{
              __html: segmentsToHTML(toStrongHTML(content.description)),
            }}
          />
        )}
        {content.cta?.href && content.cta?.label && (
          <Button name={content.cta.label} url={content.cta.href} />
        )}
      </div>
    </GoldBorder>
  );
}

interface CarouselContentProps {
  content: ContentCarousel;
  isDesktop: boolean;
}

function CarouselContent({ content, isDesktop }: CarouselContentProps) {
  const carouselConfig = { ...DEFAULT_CAROUSEL, ...content.carousel };
  const heroItems = toHeroCarouselItems(content.banners);

  return (
    <HeroCarousel
      items={heroItems}
      autoplay={carouselConfig.autoplay}
      pauseOnHover={carouselConfig.pauseOnHover}
      delaySeconds={carouselConfig.delaySeconds}
      speedMs={carouselConfig.speedMs}
      showArrows={carouselConfig.showArrows}
      showDots={carouselConfig.showDots}
      useGoldBorder
      isDesktop={isDesktop}
    />
  );
}

interface LoaderReturn extends Props {
  device: "mobile" | "tablet" | "desktop";
}

function CRHero({
  titleText,
  content,
  bottomCenterImage,
  bottomCenterImageWidth,
  bottomCenterImageHeight,
  snowFooterDesktop,
  snowFooterMobile,
  snowFooterDesktopWidth,
  snowFooterDesktopHeight,
  snowFooterMobileWidth,
  snowFooterMobileHeight,
  device,
}: LoaderReturn) {
  const isDesktop = device === "desktop";

  const normalizedContent: ContentType = content ?? {
    type: "carousel",
    banners: [],
    carousel: DEFAULT_CAROUSEL,
  };

  const isVideo = normalizedContent.type === "video";

  const srTitle = titleText ||
    (isVideo
      ? (normalizedContent as ContentVideo).title
      : toHeroCarouselItems((normalizedContent as ContentCarousel).banners)[0]
        ?.title) ||
    "Campanha de Natal";

  return (
    <div class="relative w-full overflow-hidden">
      <div class="relative z-10 flex flex-col items-center md:px-4 lg:pt-[60px] lg:justify-between">
        <h1 class="sr-only">{srTitle}</h1>

        <div class="relative w-full max-w-full lg:px-[60px] lg:flex-shrink-0">
          <div
            class={`relative ${
              isDesktop ? "aspect-video" : "aspect-square w-full"
            }`}
          >
            {isVideo
              ? (
                <VideoContent
                  content={normalizedContent as ContentVideo}
                  isDesktop={isDesktop}
                />
              )
              : (
                <CarouselContent
                  content={normalizedContent as ContentCarousel}
                  isDesktop={isDesktop}
                />
              )}
          </div>

          {bottomCenterImage && (
            <div class="hidden lg:block absolute bottom-0 left-1/2 z-20 -translate-x-1/2 translate-y-1/2">
              <Image
                src={bottomCenterImage}
                alt="Decoração inferior"
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

export const loader = (props: Props, _req: Request, ctx: FnContext) =>
  withDevice(props, ctx);

export default CRHero;
