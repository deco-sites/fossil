export { default as LoadingFallback } from "../../components/LoadingFallback.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import NJPicture from "../../components/nick-jonas/NJPicture.tsx";
import NJYouTubeModal from "../../islands/NJYouTubeModal.tsx";

const DIMENSIONS = {
  desktop: { width: 1290, height: 542 },
  mobile: { width: 412, height: 302 },
} as const;

const TYPOGRAPHY = {
  quote: {
    mobile: "text-[36px]",
    desktop: "lg:text-[60px]",
    lineHeight: "leading-[.9em]",
    maxWidth: "max-w-[740px]",
  },
  author: {
    size: "text-sm",
    spacing: {
      mobile: "mb-2",
      desktop: "lg:mb-3",
    },
  },
} as const;

const LAYOUT = {
  aspectRatio: {
    mobile: "aspect-[412/302]",
    desktop: "lg:aspect-[1290/542]",
  },
  borderRadius: {
    mobile: "rounded-none",
    desktop: "lg:rounded-3xl",
  },
  overlay: "bg-black/20",
  contentPadding: "px-4",
} as const;

export interface Props {
  /**
   * @title Imagem de Fundo Desktop
   * @description Imagem de fundo para desktop (1290x542px)
   */
  desktopImage?: ImageWidget;

  /**
   * @title Imagem de Fundo Mobile
   * @description Imagem de fundo para mobile (412x302px)
   */
  mobileImage?: ImageWidget;

  /**
   * @title Citação
   * @description Texto da citação principal (usa fonte Benton Italic)
   */
  quote?: string;

  /**
   * @title Autor
   * @description Nome do autor da citação
   */
  author?: string;

  /**
   * @title URL do Vídeo YouTube
   * @description URL completa do vídeo do YouTube para o modal
   */
  videoUrl?: string;

  /**
   * @title Texto do Link
   * @description Texto do link para assistir o vídeo (ex: "ASSISTA AO FILME")
   */
  linkText?: string;
}

function QuoteContent({ quote, author }: { quote?: string; author?: string }) {
  if (!quote && !author) return null;

  return (
    <div class="flex flex-col items-center text-center">
      {/* Quote Text */}
      {quote && (
        <blockquote
          class={`text-white ${TYPOGRAPHY.quote.mobile} ${TYPOGRAPHY.quote.desktop} font-benton italic mb-4 lg:mb-6 ${TYPOGRAPHY.quote.maxWidth} ${TYPOGRAPHY.quote.lineHeight}`}
          aria-label="Citação"
        >
          {quote}
        </blockquote>
      )}

      {/* Author Name */}
      {author && (
        <cite
          class={`text-white ${TYPOGRAPHY.author.size} font-soleil ${TYPOGRAPHY.author.spacing.mobile} ${TYPOGRAPHY.author.spacing.desktop} not-italic`}
        >
          - {author}
        </cite>
      )}
    </div>
  );
}

function BackgroundContainer({
  desktopImage,
  mobileImage,
}: {
  desktopImage?: ImageWidget;
  mobileImage?: ImageWidget;
}) {
  const hasImages = desktopImage || mobileImage;

  return (
    <>
      {/* Background Image */}
      {hasImages && (
        <NJPicture
          desktop={desktopImage}
          mobile={mobileImage}
          alt="Background da citação"
          width={DIMENSIONS.desktop.width}
          height={DIMENSIONS.desktop.height}
          class="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
        />
      )}

      {/* Black Overlay */}
      <div class={`absolute inset-0 ${LAYOUT.overlay}`} aria-hidden="true" />
    </>
  );
}

function NJLPQuote({
  desktopImage,
  mobileImage,
  quote,
  author,
  videoUrl,
  linkText,
}: Props) {
  const hasVideoContent = videoUrl && linkText;

  return (
    <div class="bg-nj-primary relative w-full overflow-hidden">
      <div class="container max-w-7xl">
        <div class="sr-only" id="quote-heading">
          Seção de Citação Nick Jonas
        </div>

        {/* Background Image Container with responsive aspect ratios */}
        <div
          class={`relative ${LAYOUT.aspectRatio.mobile} ${LAYOUT.aspectRatio.desktop} container overflow-hidden ${LAYOUT.borderRadius.mobile} ${LAYOUT.borderRadius.desktop}`}
        >
          <BackgroundContainer
            desktopImage={desktopImage}
            mobileImage={mobileImage}
          />

          {/* Content */}
          <div
            class={`relative z-10 flex flex-col items-center justify-center h-full ${LAYOUT.contentPadding} text-center`}
          >
            <QuoteContent quote={quote} author={author} />

            {/* YouTube Link */}
            {hasVideoContent && (
              <div class="mt-4 lg:mt-6">
                <NJYouTubeModal videoUrl={videoUrl} linkText={linkText} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NJLPQuote;
