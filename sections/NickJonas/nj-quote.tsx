export { default as LoadingFallback } from "../../components/LoadingFallback.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import NJPicture from "../../components/nick-jonas/NJPicture.tsx";
import CTAButton from "../../components/nick-jonas/CTAButton.tsx";

export interface Button {
  /** @title Texto do Botão */
  name?: string;
  /** @title URL do Botão */
  url?: string;
}

export interface SignatureConfig {
  /**
   * @title Imagem da Assinatura
   * @description Imagem da assinatura do Nick Jonas
   */
  image?: ImageWidget;
  /**
   * @title Posição da Assinatura
   * @description Posicionamento da assinatura na seção
   */
  position?: "bottom-right" | "bottom-left";
  /**
   * @title Tamanho da Assinatura
   * @description Tamanho da imagem da assinatura
   */
  size?: "sm" | "md" | "lg";
}

export interface Props {
  /**
   * @title Imagem de Fundo Desktop
   * @description Imagem de fundo para desktop (2560x750px)
   */
  desktopImage?: ImageWidget;

  /**
   * @title Imagem de Fundo Mobile
   * @description Imagem de fundo para mobile (750x750px)
   */
  mobileImage?: ImageWidget;

  /**
   * @title Citação
   * @description Texto da citação principal (usa fonte Benton Italic)
   */
  quote?: string;

  /**
   * @title Botão de Ação
   * @description Botão de call-to-action principal
   */
  cta?: Button;

  /**
   * @title Configuração da Assinatura
   * @description Configurações da assinatura do Nick Jonas
   */
  signature?: SignatureConfig;
}

function QuoteContent({
  quote,
  cta,
  className = "",
}: {
  quote?: string;
  cta?: Button;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Quote Text */}
      {quote && (
        <blockquote className="text-white text-[32px] lg:text-[64px] font-benton italic mb-6 lg:mb-8 max-w-3xl text-center leading-none">
          {quote}
        </blockquote>
      )}

      {/* CTA Button */}
      {cta?.name && (
        <CTAButton
          class="max-lg:w-full"
          name={cta.name}
          url={cta.url}
          variant="primary"
        />
      )}
    </div>
  );
}

function Signature({
  config,
  className = "",
}: {
  config?: SignatureConfig;
  className?: string;
}) {
  if (!config?.image && !config?.image) return null;

  const sizeClasses = {
    sm: "w-8 lg:w-10",
    md: "w-11 lg:w-14",
    lg: "w-14 lg:w-16",
  };

  const positionClasses = {
    "bottom-right": "bottom-4 right-4 lg:bottom-6 lg:right-6",
    "bottom-left": "bottom-4 left-4 lg:bottom-6 lg:left-6",
  };

  return (
    <div
      className={`absolute ${
        positionClasses[config?.position || "bottom-right"]
      } z-20 ${className}`}
    >
      <NJPicture
        desktop={config.image}
        mobile={config.image}
        alt="Nick Jonas Signature"
        width={80}
        height={40}
        class={sizeClasses[config.size || "md"]}
        loading="lazy"
      />
    </div>
  );
}

function MobileLayout({
  desktopImage,
  mobileImage,
  quote,
  cta,
  signature,
}: Props) {
  return (
    <div className="lg:hidden relative w-full">
      {/* Background Image Container */}
      <div className="relative aspect-square overflow-hidden">
        {/* Background Image */}
        {(desktopImage || mobileImage) && (
          <NJPicture
            desktop={desktopImage}
            mobile={mobileImage}
            alt="Quote background"
            width={750}
            height={750}
            class="absolute inset-0 w-full h-full object-cover"
            fetchPriority="high"
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
          <QuoteContent quote={quote} cta={cta} />
        </div>

        {/* Signature */}
        <Signature config={signature} />
      </div>
    </div>
  );
}

function DesktopLayout({
  desktopImage,
  mobileImage,
  quote,
  cta,
  signature,
}: Props) {
  return (
    <div className="hidden lg:block relative w-full">
      {/* Background Image Container */}
      <div className="relative aspect-[1280/375] overflow-hidden">
        {/* Background Image */}
        {(desktopImage || mobileImage) && (
          <NJPicture
            desktop={desktopImage}
            mobile={mobileImage}
            alt="Quote background"
            width={1280}
            height={375}
            class="absolute inset-0 w-full h-full object-cover"
            fetchPriority="high"
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
          <QuoteContent quote={quote} cta={cta} />
        </div>

        {/* Signature */}
        <Signature config={signature} />
      </div>
    </div>
  );
}

function NJQuote(props: Props) {
  return (
    <section
      className="relative w-full overflow-hidden"
      aria-labelledby="quote-heading"
    >
      <div className="sr-only" id="quote-heading">
        Nick Jonas Quote Section
      </div>

      <MobileLayout {...props} />
      <DesktopLayout {...props} />
    </section>
  );
}

export default NJQuote;
