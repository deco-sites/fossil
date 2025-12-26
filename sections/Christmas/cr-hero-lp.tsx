export { default as LoadingFallback } from "../../components/LoadingFallback.tsx";
import type { FnContext } from "@deco/deco";
import type { ImageWidget, VideoWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import GoldBorder from "../../components/christmas/GoldBorder.tsx";
import SnowFooter from "../../components/christmas/SnowFooter.tsx";
import Button from "../../components/christmas/Button.tsx";

import type { TextSegment } from "../../util/text.ts";
import { toStrongHTML } from "../../util/text.ts";
import { withDevice } from "../../sdk/withDevice.ts";

const segmentsToHTML = (segments: TextSegment[]): string =>
  segments
    .map((seg) => (seg.bold ? `<strong>${seg.text}</strong>` : seg.text))
    .join("");

interface HeroCTA {
  /** @title Texto do Botão */
  /** @description Texto exibido no botão */
  label?: string;
  /** @title URL do Botão */
  /** @description Link de destino do botão */
  href?: string;
}

/**
 * @title Imagem
 */
interface ContentImage {
  /** @hide true */
  type?: "image";

  /** @title Imagem Desktop */
  /** @description Imagem para telas desktop */
  desktop?: ImageWidget;

  /** @title Imagem Mobile */
  /** @description Imagem para telas mobile */
  mobile?: ImageWidget;

  /** @title Texto Alternativo */
  /** @description Descrição da imagem para acessibilidade (alt) */
  alt?: string;

  /** @title Label (Texto acima do título) */
  /** @description Pequeno texto em caixa alta acima do título */
  label?: string;

  /** @title Título (H2) */
  /** @description Título exibido sobre a imagem */
  title?: string;

  /** @title Descrição */
  /** @description Texto exibido abaixo do título */
  description?: string;

  /** @title Lista de CTAs */
  /** @description Lista de botões */
  ctas?: HeroCTA[];
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

  /** @title Label (Texto acima do título) */
  /** @description Pequeno texto em caixa alta acima do título */
  label?: string;

  /** @title Título do Vídeo */
  /** @description Título exibido sobre o vídeo */
  title?: string;

  /** @title Descrição do Vídeo */
  /** @description Texto exibido abaixo do título */
  description?: string;

  /** @title Lista de CTAs */
  /** @description Lista de botões exibidos sobre o vídeo */
  ctas?: HeroCTA[];
}

type ContentType = ContentImage | ContentVideo;

export interface Props {
  /** @title Título (H1 - somente leitores de tela) */
  /** @description Título principal da página (renderizado como sr-only) */
  titleText?: string;

  /** @title Conteúdo */
  /** @description Escolha entre imagem ou vídeo */
  content?: ContentType;

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

interface ContentOverlayProps {
  label?: string;
  title?: string;
  description?: string;
  ctas?: HeroCTA[];
  snowFooterOffset?: boolean;
}

function ContentOverlay(
  { label, title, description, ctas, snowFooterOffset }: ContentOverlayProps,
) {
  return (
    <div
      class={`absolute inset-0 z-10 flex flex-col items-center justify-end px-4 text-center text-white ${
        snowFooterOffset ? "pb-[120px]" : "pb-5"
      } md:justify-center md:pb-0`}
    >
      {label && (
        <span class="font-soleil text-xs tracking-[0.05em] uppercase text-cr-primary [text-shadow:_2px_2px_10px_rgba(0,0,0,0.8)]">
          {label}
        </span>
      )}
      {title && (
        <h2
          class="font-benton text-4xl lg:text-6xl leading-none text-white mb-2 lg:mb-4 [text-shadow:_2px_2px_10px_rgba(0,0,0,0.8)]"
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: title }}
        />
      )}
      {description && (
        <p
          class="font-soleil text-sm lg:text-base text-white mb-4 lg:mb-6 [text-shadow:_1px_1px_5px_rgba(0,0,0,0.8)]"
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{
            __html: segmentsToHTML(toStrongHTML(description)),
          }}
        />
      )}
      {ctas && ctas.length > 0 && (
        <div class="flex flex-row gap-[10px] items-center justify-center">
          {ctas.map(
            (btn, idx) =>
              btn?.label &&
              btn?.href && <Button key={idx} name={btn.label} url={btn.href} />,
          )}
        </div>
      )}
    </div>
  );
}

interface VideoContentProps {
  content: ContentVideo;
  isDesktop: boolean;
}

function VideoContent({ content, isDesktop }: VideoContentProps) {
  if (isDesktop) {
    return (
      <GoldBorder
        class="w-full h-full"
        videoDesktop={content.desktop}
        videoMobile={content.mobile || content.desktop}
        posterImage={content.posterImage}
        videoZoom={content.videoZoom}
        noPadding
      >
        <ContentOverlay
          label={content.label}
          title={content.title}
          description={content.description}
          ctas={content.ctas}
        />
      </GoldBorder>
    );
  }

  const videoSrc = content.mobile || content.desktop;

  return (
    <div class="relative w-full h-full overflow-hidden">
      <video
        class="absolute inset-0 w-full h-full object-cover"
        src={videoSrc}
        autoPlay={content.autoplay ?? true}
        muted={content.muted ?? true}
        loop={content.loop ?? true}
        playsInline
        preload="auto"
        poster={content.posterImage || ""}
        style={{
          objectPosition: "50% 50%",
          transform: `scale(${content.videoZoom ?? 1})`,
        }}
      />
      <ContentOverlay
        label={content.label}
        title={content.title}
        description={content.description}
        ctas={content.ctas}
        snowFooterOffset={!isDesktop}
      />
    </div>
  );
}

interface ImageContentProps {
  content: ContentImage;
  isDesktop: boolean;
}

function ImageContent({ content, isDesktop }: ImageContentProps) {
  if (isDesktop) {
    return (
      <GoldBorder
        class="w-full h-full"
        backgroundDesktop={content.desktop}
        backgroundMobile={content.mobile}
        noPadding
      >
        <ContentOverlay
          label={content.label}
          title={content.title}
          description={content.description}
          ctas={content.ctas}
        />
      </GoldBorder>
    );
  }

  const imageSrc = content.mobile || content.desktop;

  return (
    <div class="relative w-full overflow-hidden">
      <Image
        src={imageSrc || ""}
        alt={content.alt || content.title || "Hero Image"}
        width={375}
        height={525}
        class="w-full h-auto object-cover"
        loading="eager"
        fetchPriority="high"
        preload
      />
      <ContentOverlay
        label={content.label}
        title={content.title}
        description={content.description}
        ctas={content.ctas}
        snowFooterOffset={!isDesktop}
      />
    </div>
  );
}

interface LoaderReturn extends Props {
  device: "mobile" | "tablet" | "desktop";
}

function CRHero({
  titleText,
  content,
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
    type: "image",
  };

  const isVideo = normalizedContent.type === "video";

  const srTitle = titleText ||
    (isVideo
      ? (normalizedContent as ContentVideo).title
      : (normalizedContent as ContentImage).title) ||
    "Campanha de Natal";

  return (
    <div class="relative w-full overflow-hidden">
      <div class="relative z-10 flex flex-col items-center lg:pt-[60px] lg:justify-between">
        <h1 class="sr-only">{srTitle}</h1>

        <div class="relative w-full max-w-full lg:px-[60px] lg:flex-shrink-0">
          <div
            class={`relative ${
              isDesktop
                ? "aspect-video"
                : isVideo
                ? "w-full mb-8"
                : "w-full aspect-[375/525]"
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
                <ImageContent
                  content={normalizedContent as ContentImage}
                  isDesktop={isDesktop}
                />
              )}
          </div>
        </div>

        <div class="absolute bottom-0 lg:relative lg:mt-2 lg:flex-shrink-0 w-full z-20 pointer-events-none">
          <SnowFooter
            desktopImage={snowFooterDesktop}
            mobileImage={snowFooterMobile}
            desktopWidth={snowFooterDesktopWidth}
            desktopHeight={snowFooterDesktopHeight}
            mobileWidth={snowFooterMobileWidth}
            mobileHeight={snowFooterMobileHeight}
            class="w-full lg:-mx-4 lg:!w-[calc(100%+32px)]"
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
