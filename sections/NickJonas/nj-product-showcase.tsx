export { default as LoadingFallback } from "../../components/LoadingFallback.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import CTAButton from "../../components/nick-jonas/CTAButton.tsx";
import NJPicture from "../../components/nick-jonas/NJPicture.tsx";
import ScrollTriggeredCarousel from "../../islands/NickJonas/ScrollTriggeredCarousel.tsx";
import type { CarouselImage } from "../../components/nick-jonas/ScrollTriggeredCarousel.tsx";

export interface Button {
  /** @title Texto do Botão */
  name?: string;
  /** @title URL do Botão */
  url?: string;
}

export interface OverlayText {
  /**
   * @title Texto de Horário
   * @description Ex: "Time: 7:20AM"
   */
  timeText?: string;

  /**
   * @title Texto de Local
   * @description Ex: "Location: Fossil Diner"
   */
  locationText?: string;
}

export interface SecondaryImageConfig {
  /** @title Largura */
  width?: number;

  /** @title Altura */
  height?: number;

  /** @title Posição */
  position?: "left" | "right" | "top" | "bottom";

  /** @title Deslocamento Horizontal */
  offsetX?: number;

  /** @title Deslocamento Vertical */
  offsetY?: number;
}

export interface Props {
  /**
   * @title Etiqueta Superior
   * @description Texto pequeno acima do título
   */
  eyebrowText?: string;

  /**
   * @title Título Principal
   * @description Título principal da seção
   */
  title?: string;

  /**
   * @title Descrição
   * @description Texto descritivo do conteúdo
   */
  description?: string;

  /**
   * @title Botão de Ação
   * @description Botão principal da seção
   */
  cta?: Button;

  /**
   * @title Texto de Sobreposição
   * @description Textos que aparecem sobre a imagem principal
   */
  overlayText?: OverlayText;

  /**
   * @title Imagem Principal Desktop
   * @description Imagem principal para desktop
   */
  heroImageDesktop?: ImageWidget;

  /**
   * @title Imagem Principal Mobile
   * @description Imagem principal para mobile
   */
  heroImageMobile?: ImageWidget;

  /**
   * @title Imagem Secundária Desktop
   * @description Imagem secundária para desktop
   */
  secondaryImageDesktop?: ImageWidget;

  /**
   * @title Imagem Secundária Mobile
   * @description Imagem secundária para mobile
   */
  secondaryImageMobile?: ImageWidget;

  /**
   * @title Configuração da Imagem Secundária Desktop
   * @description Configurações de tamanho e posição da imagem secundária no desktop
   */
  secondaryImageDesktopConfig?: SecondaryImageConfig;

  /**
   * @title Configuração da Imagem Secundária Mobile
   * @description Configurações de tamanho e posição da imagem secundária no mobile
   */
  secondaryImageMobileConfig?: SecondaryImageConfig;

  /**
   * @title Imagens do Produto
   * @description Adicione de 1 a 3 imagens do produto. Com 1 imagem, será renderizada estaticamente. Com 2-3 imagens, será ativado o carrossel com scroll.
   * @maxItems 3
   * @minItems 1
   */
  productImages?: CarouselImage[];

  /**
   * @title URL da Imagem Principal
   * @description Link para onde a imagem principal deve direcionar (URL relativa)
   */
  heroImageUrl?: string;

  /**
   * @title URL das Imagens do Produto
   * @description Link para onde as imagens do produto devem direcionar (URL relativa)
   */
  productImagesUrl?: string;
}

function getSecondaryImageStyles(
  config?: SecondaryImageConfig,
  isMobile = false,
) {
  const defaultConfig = isMobile
    ? {
      width: 158,
      height: 246,
      position: "bottom" as const,
      offsetX: 0,
      offsetY: 32,
    }
    : {
      width: 414,
      height: 532,
      position: "left" as const,
      offsetX: 48,
      offsetY: 0,
    };

  const finalConfig = { ...defaultConfig, ...config };

  const getPositionStyles = (
    position: string,
    offsetX: number,
    offsetY: number,
  ) => {
    const offsetXInRem = offsetX / 16;
    const offsetYInRem = offsetY / 16;

    switch (position) {
      case "left":
        return {
          left: "0",
          transform: `translate(-${offsetXInRem}rem, ${offsetYInRem}rem)`,
        };
      case "right":
        return {
          right: "0",
          transform: `translate(${offsetXInRem}rem, ${offsetYInRem}rem)`,
        };
      case "top":
        return {
          top: "0",
          transform: `translate(${offsetXInRem}rem, -${offsetYInRem}rem)`,
        };
      case "bottom":
        return {
          bottom: "0",
          transform: `translate(${offsetXInRem}rem, ${offsetYInRem}rem)`,
        };
      default:
        return {
          bottom: "0",
          transform: `translate(${offsetXInRem}rem, ${offsetYInRem}rem)`,
        };
    }
  };

  const positionStyles = getPositionStyles(
    finalConfig.position,
    finalConfig.offsetX,
    finalConfig.offsetY,
  );

  return {
    containerClasses: "absolute",
    width: finalConfig.width,
    height: finalConfig.height,
    containerStyle: {
      width: `${finalConfig.width}px`,
      height: `${finalConfig.height}px`,
      ...positionStyles,
    },
  };
}

function ContentSection({
  eyebrowText,
  title,
  description,
  cta,
  isMobile = false,
}: {
  eyebrowText?: string;
  title?: string;
  description?: string;
  cta?: Button;
  isMobile?: boolean;
}) {
  const containerClasses = isMobile
    ? "text-center space-y-2 pt-[50px] px-[30px]"
    : "space-y-2 mt-[75px]";

  const titleClasses = isMobile
    ? "text-[36px] font-benton italic text-primary leading-none"
    : "text-6xl font-benton italic text-primary leading-none";

  const eyebrowClasses = isMobile
    ? "text-xs font-soleil tracking-widest uppercase text-primary"
    : "text-xs font-soleil tracking-wider uppercase text-primary";

  const descriptionClasses = isMobile
    ? "text-sm font-soleil text-primary leading-5 max-w-sm mx-auto"
    : "text-sm font-soleil text-primary leading-relaxed max-w-md";

  const buttonClasses = isMobile ? "w-full max-w-xs !mt-8" : "w-fit !mt-6";

  return (
    <div class={containerClasses}>
      {eyebrowText && <p class={eyebrowClasses}>{eyebrowText}</p>}

      {title && <h2 class={titleClasses}>{title}</h2>}

      {description && <p class={descriptionClasses}>{description}</p>}

      {cta?.name && (
        <CTAButton
          name={cta.name}
          url={cta.url}
          variant="secondary"
          class={buttonClasses}
        />
      )}
    </div>
  );
}

function OverlayTextComponent({ overlayText }: { overlayText?: OverlayText }) {
  if (!overlayText?.timeText && !overlayText?.locationText) {
    return null;
  }

  return (
    <div class="absolute top-8 left-8 space-y-2 pointer-events-none">
      {overlayText?.timeText && (
        <p class="text-sm font-soleil text-white">{overlayText.timeText}</p>
      )}
      {overlayText?.locationText && (
        <p class="text-sm font-soleil text-white">{overlayText.locationText}</p>
      )}
    </div>
  );
}

function MobileHeroImage({
  heroImageDesktop,
  heroImageMobile,
  secondaryImageDesktop,
  secondaryImageMobile,
  secondaryImageMobileConfig,
  title,
  heroImageUrl,
}: {
  heroImageDesktop?: ImageWidget;
  heroImageMobile?: ImageWidget;
  secondaryImageDesktop?: ImageWidget;
  secondaryImageMobile?: ImageWidget;
  secondaryImageMobileConfig?: SecondaryImageConfig;
  title?: string;
  heroImageUrl?: string;
}) {
  const heroContent = (
    <div class="relative">
      <NJPicture
        desktop={heroImageDesktop}
        mobile={heroImageMobile}
        alt={title || "Personagem principal"}
        width={375}
        height={419}
        class="rounded-3xl w-full"
        fetchPriority="high"
      />

      {/* Secondary Image */}
      {secondaryImageDesktop &&
        (() => {
          const styles = getSecondaryImageStyles(
            secondaryImageMobileConfig,
            true,
          );
          return (
            <div class={styles.containerClasses} style={styles.containerStyle}>
              <NJPicture
                desktop={secondaryImageDesktop}
                mobile={secondaryImageMobile}
                alt="Imagem secundária"
                width={styles.width}
                height={styles.height}
                class="w-full h-full"
              />
            </div>
          );
        })()}
    </div>
  );

  return heroImageUrl
    ? (
      <a href={heroImageUrl} className="block">
        {heroContent}
      </a>
    )
    : heroContent;
}

function DesktopHeroImage({
  heroImageDesktop,
  heroImageMobile,
  secondaryImageDesktop,
  secondaryImageMobile,
  secondaryImageDesktopConfig,
  title,
  overlayText,
  heroImageUrl,
}: {
  heroImageDesktop?: ImageWidget;
  heroImageMobile?: ImageWidget;
  secondaryImageDesktop?: ImageWidget;
  secondaryImageMobile?: ImageWidget;
  secondaryImageDesktopConfig?: SecondaryImageConfig;
  title?: string;
  overlayText?: OverlayText;
  heroImageUrl?: string;
}) {
  const heroContent = (
    <div class="relative overflow-visible">
      <NJPicture
        desktop={heroImageDesktop}
        mobile={heroImageMobile}
        alt={title || "Personagem principal"}
        width={732}
        height={819}
        class="w-full"
        classImage="rounded-3xl"
      />

      <OverlayTextComponent overlayText={overlayText} />

      {/* Secondary Image */}
      {secondaryImageDesktop &&
        (() => {
          const styles = getSecondaryImageStyles(
            secondaryImageDesktopConfig,
            false,
          );
          return (
            <div class={styles.containerClasses} style={styles.containerStyle}>
              <NJPicture
                desktop={secondaryImageDesktop}
                mobile={secondaryImageMobile}
                alt="Imagem secundária"
                width={styles.width}
                height={styles.height}
                class="w-full h-full"
              />
            </div>
          );
        })()}
    </div>
  );

  return heroImageUrl
    ? (
      <a href={heroImageUrl} className="block">
        {heroContent}
      </a>
    )
    : heroContent;
}

function ProductImage({ productImages, productImagesUrl }: {
  productImages?: CarouselImage[];
  productImagesUrl?: string;
}) {
  if (!productImages || productImages.length === 0) return null;

  const processedImages = productImages.map((image) => ({
    ...image,
    mobileImage: image.mobileImage || image.desktopImage,
  }));

  const carouselElement = (
    <ScrollTriggeredCarousel images={processedImages} isMobile={false} />
  );

  return (
    <div class="w-full mt-[75px]">
      {productImagesUrl
        ? (
          <a href={productImagesUrl} className="block">
            {carouselElement}
          </a>
        )
        : carouselElement}
    </div>
  );
}

function MobileLayout({
  eyebrowText,
  title,
  description,
  cta,
  heroImageDesktop,
  heroImageMobile,
  secondaryImageDesktop,
  secondaryImageMobile,
  secondaryImageMobileConfig,
  heroImageUrl,
}: Props) {
  return (
    <div class="lg:hidden lg:px-5 py-8">
      <MobileHeroImage
        heroImageDesktop={heroImageDesktop}
        heroImageMobile={heroImageMobile}
        secondaryImageDesktop={secondaryImageDesktop}
        secondaryImageMobile={secondaryImageMobile}
        secondaryImageMobileConfig={secondaryImageMobileConfig}
        title={title}
        heroImageUrl={heroImageUrl}
      />

      <ContentSection
        eyebrowText={eyebrowText}
        title={title}
        description={description}
        cta={cta}
        isMobile
      />
    </div>
  );
}

function DesktopLayout({
  eyebrowText,
  title,
  description,
  cta,
  overlayText,
  heroImageDesktop,
  heroImageMobile,
  secondaryImageDesktop,
  secondaryImageMobile,
  secondaryImageDesktopConfig,
  productImages,
  heroImageUrl,
  productImagesUrl,
}: Props) {
  return (
    <div class="hidden lg:block relative px-8 py-16">
      <div class="container max-w-7xl mx-auto overflow-visible">
        <div class="grid grid-cols-12 gap-5 items-stretch">
          {/* Left Column - Images */}
          <div class="col-span-7 space-y-6">
            <DesktopHeroImage
              heroImageDesktop={heroImageDesktop}
              heroImageMobile={heroImageMobile}
              secondaryImageDesktop={secondaryImageDesktop}
              secondaryImageMobile={secondaryImageMobile}
              secondaryImageDesktopConfig={secondaryImageDesktopConfig}
              title={title}
              overlayText={overlayText}
              heroImageUrl={heroImageUrl}
            />
          </div>

          {/* Right Column - Content and Product Image */}
          <div class="col-span-5 flex flex-col justify-center">
            <ContentSection
              eyebrowText={eyebrowText}
              title={title}
              description={description}
              cta={cta}
            />

            <ProductImage
              productImages={productImages}
              productImagesUrl={productImagesUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function NJProductShowcase(props: Props) {
  return (
    <div class="relative w-full bg-nj-primary">
      <MobileLayout {...props} />
      <DesktopLayout {...props} />
    </div>
  );
}

export default NJProductShowcase;
