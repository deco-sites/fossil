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

  /** @title Imagem de Título */
  /** @description Imagem que funciona como título (opcional) */
  titleImage?: ImageWidget;

  /** @title Largura da Imagem de Título */
  /** @description Largura da imagem de título (renderizada) */
  titleImageWidth?: number;

  /** @title Altura da Imagem de Título */
  /** @description Altura da imagem de título (renderizada) */
  titleImageHeight?: number;

  /** @title Título Apenas Leitura de Tela */
  /** @description Se ativo, oculta visualmente o texto do título (útil quando usar imagem de título) */
  titleSrOnly?: boolean;

  /** @title Título do Banner (H2) */
  /** @description Título exibido sobre a imagem do banner */
  title?: string;

  /** @title Descrição do Banner */
  /** @description Texto exibido abaixo do título do banner */
  description?: string;

  /** @title Lista de CTAs */
  /** @description Lista de botões para o banner */
  ctas?: BannerCTA[];
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
  type?: "carousel";

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
  type?: "video";

  /** @title Vídeo Desktop */
  /** @description Vídeo exibido em telas desktop */
  desktop: VideoWidget;

  /** @title Vídeo Mobile */
  /** @description Vídeo exibido em telas mobile (opcional, usa desktop se não definido) */
  mobile?: VideoWidget;

  /** @title Imagem de Pôster Desktop */
  /** @description Imagem estática exibida enquanto o vídeo carrega no desktop */
  posterImageDesktop?: ImageWidget;

  /** @title Imagem de Pôster Mobile */
  /** @description Imagem exibida enquanto o vídeo carrega no mobile */
  posterImageMobile?: ImageWidget;

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

  /** @title Título Apenas Leitura de Tela */
  /** @description Se ativo, oculta visualmente o texto do título (útil quando usar imagem de título) */
  titleSrOnly?: boolean;

  /** @title Descrição do Vídeo */
  /** @description Texto exibido abaixo do título */
  description?: string;

  /** @title Lista de CTAs */
  /** @description Lista de botões para o banner */
  ctas?: BannerCTA[];

  /** @title Imagem de Título */
  /** @description Imagem que funciona como título (opcional) */
  titleImage?: ImageWidget;

  /** @title Largura da Imagem de Título */
  /** @description Largura da imagem de título (renderizada) */
  titleImageWidth?: number;

  /** @title Altura da Imagem de Título */
  /** @description Altura da imagem de título (renderizada) */
  titleImageHeight?: number;
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
  /** @description Imagem posicionada no centro da borda inferior */
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
    ctas: banner.ctas,
    titleImage: banner.titleImage,
    titleImageWidth: banner.titleImageWidth,
    titleImageHeight: banner.titleImageHeight,
    titleSrOnly: banner.titleSrOnly,
  }));

interface VideoContentProps {
  content: ContentVideo;
  isDesktop: boolean;
}

function VideoContent({ content, isDesktop }: VideoContentProps) {
  const buttons = content.ctas || [];
  const imageHeight = content.titleImageHeight || 100;
  const paddingTop = imageHeight / 2 + 16;

  return (
    <div class={`relative w-full ${!isDesktop ? "pb-0" : "h-full"}`}>
      <div
        class={`relative h-full ${!isDesktop ? "aspect-square" : "h-full"}`}
      >
        <GoldBorder
          class="w-full h-full overflow-hidden"
          videoDesktop={content.desktop}
          videoMobile={content.mobile || content.desktop}
          posterImage={isDesktop
            ? content.posterImageDesktop
            : (content.posterImageMobile || content.posterImageDesktop)}
          videoZoom={content.videoZoom ?? 1}
          noPadding
          variant={isDesktop ? "desktop" : "mobile"}
          borderPosition={isDesktop ? "both" : "bottom"}
        >
          <div
            class={`w-full h-full flex flex-col items-center justify-center text-center p-4 ${
              !isDesktop ? "hidden" : ""
            }`}
          >
            {content.titleImage && isDesktop && (
              <Image
                src={content.titleImage}
                width={content.titleImageWidth || 200}
                height={content.titleImageHeight || 100}
                alt={content.title || "Banner Title"}
                class="mb-4 object-contain"
                style={{
                  width: content.titleImageWidth
                    ? `${content.titleImageWidth}px`
                    : "auto",
                  height: content.titleImageHeight
                    ? `${content.titleImageHeight}px`
                    : "auto",
                }}
              />
            )}

            {content.title && (
              <h2
                class={`${
                  content.titleSrOnly && content.titleImage
                    ? "sr-only"
                    : "font-benton text-[32px] lg:text-[60px] leading-none text-white mb-2 lg:mb-4 [text-shadow:_2px_2px_10px_rgba(0,0,0,0.8)]"
                }`}
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
            {buttons && buttons.length > 0 && (
              <div class="flex flex-row gap-[10px] items-center justify-center">
                {buttons.map(
                  (btn, idx) =>
                    btn?.label &&
                    btn?.href && (
                      <Button key={idx} name={btn.label} url={btn.href} />
                    ),
                )}
              </div>
            )}
          </div>
        </GoldBorder>

        {content.titleImage && !isDesktop && (
          <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-30 pointer-events-none w-full flex justify-center">
            <Image
              src={content.titleImage}
              width={content.titleImageWidth || 200}
              height={content.titleImageHeight || 100}
              alt={content.title || "Banner Title"}
              class="object-contain"
              style={{
                width: content.titleImageWidth
                  ? `${content.titleImageWidth}px`
                  : "auto",
                height: content.titleImageHeight
                  ? `${content.titleImageHeight}px`
                  : "auto",
              }}
            />
          </div>
        )}
      </div>

      {/* Mobile content (below video) */}
      {!isDesktop && (
        <div
          class="flex flex-col items-center text-center px-4 relative z-20 -mt-0.5"
          style={{ paddingTop: `${paddingTop}px` }}
        >
          {content.title && (
            <h2
              class={`${
                content.titleSrOnly && content.titleImage
                  ? "sr-only"
                  : "font-benton text-[32px] leading-none text-white mb-2 [text-shadow:_2px_2px_10px_rgba(0,0,0,0.8)]"
              }`}
              // deno-lint-ignore react-no-danger
              dangerouslySetInnerHTML={{ __html: content.title }}
            />
          )}

          {content.description && (
            <p
              class="font-soleil text-[14px] text-white mb-4 [text-shadow:_1px_1px_5px_rgba(0,0,0,0.8)]"
              // deno-lint-ignore react-no-danger
              dangerouslySetInnerHTML={{
                __html: segmentsToHTML(toStrongHTML(content.description)),
              }}
            />
          )}

          {buttons && buttons.length > 0 && (
            <div class="flex flex-row gap-[10px] items-center justify-center">
              {buttons.map(
                (btn, idx) =>
                  btn?.label &&
                  btn?.href && (
                    <Button key={idx} name={btn.label} url={btn.href} />
                  ),
              )}
            </div>
          )}
        </div>
      )}
    </div>
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

  const isVideoFile = (url?: string) =>
    /\.(mp4|webm|mov|ogg)(\?|$)/i.test(url ?? "");

  const isVideo = normalizedContent.type === "video" ||
    (!normalizedContent.type && "desktop" in normalizedContent &&
      typeof (normalizedContent as ContentVideo).desktop === "string" &&
      isVideoFile((normalizedContent as ContentVideo).desktop));

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
              isDesktop
                ? "aspect-video"
                : isVideo
                ? "w-full mb-8"
                : "aspect-square w-full"
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
