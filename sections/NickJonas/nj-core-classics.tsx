export { default as LoadingFallback } from "../../components/LoadingFallback.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import CTAButton from "../../components/nick-jonas/CTAButton.tsx";
import NJPicture from "../../components/nick-jonas/NJPicture.tsx";

export interface Button {
  /** @title Texto do Botão */
  name?: string;
  /** @title URL do Botão */
  url?: string;
}

export interface Card {
  /**
   * @title Etiqueta Superior
   * @description Texto pequeno acima do título
   */
  label?: string;

  /**
   * @title Título
   * @description Título principal do card (usa fonte Benton Italic)
   */
  title?: string;

  /**
   * @title Descrição
   * @description Texto de descrição do card
   */
  description?: string;

  /**
   * @title Botão de Ação
   * @description Botão de call-to-action do card
   */
  cta?: Button;

  /**
   * @title Posição do Conteúdo
   * @description Escolha se o conteúdo aparece à esquerda ou direita da imagem (apenas desktop)
   */
  contentPosition?: "esquerda" | "direita";

  /**
   * @title Imagem Desktop
   * @description 1170x520
   */
  desktopImage?: ImageWidget;

  /**
   * @title Imagem Mobile
   * @description 330x400
   */
  mobileImage?: ImageWidget;
}

export interface Props {
  /**
   * @title Cards
   * @description Cards de conteúdo (espera 2 itens: "For Him" e "For Her")
   */
  cards?: Card[];
}

interface CardHeaderProps {
  card: Card;
  variant: "mobile" | "desktop";
}

function CardHeader({ card, variant }: CardHeaderProps) {
  const isDesktop = variant === "desktop";
  const textColor = isDesktop ? "text-white" : "text-primary";
  const textAlign = isDesktop ? "text-left" : "text-center";
  const titleSize = isDesktop ? "text-6xl" : "text-4xl";

  return (
    <div class={`space-y-1 lg:space-y-4 ${textAlign}`}>
      {card.label && (
        <p class={`text-xs font-soleil tracking-wider uppercase ${textColor}`}>
          {card.label}
        </p>
      )}

      {card.title && (
        <h2 class={`font-benton italic ${textColor} leading-none ${titleSize}`}>
          {card.title}
        </h2>
      )}
    </div>
  );
}

interface CardFooterProps {
  card: Card;
  variant: "mobile" | "desktop";
}

function CardFooter({ card, variant }: CardFooterProps) {
  const isDesktop = variant === "desktop";
  const textColor = isDesktop ? "text-white" : "text-primary";
  const textAlign = isDesktop ? "text-left" : "text-center";
  const buttonVariant = isDesktop ? "primary" : "secondary";
  const buttonWidth = isDesktop ? "w-fit" : "w-full";

  return (
    <div class={`space-y-4 ${textAlign}`}>
      {card.description && (
        <p class={`text-sm font-soleil ${textColor} leading-relaxed`}>
          {card.description}
        </p>
      )}

      {card.cta?.name && (
        <CTAButton
          name={card.cta.name}
          url={card.cta.url}
          variant={buttonVariant}
          class={buttonWidth}
        />
      )}
    </div>
  );
}

interface CardImageProps {
  card: Card;
  variant: "mobile" | "desktop";
}

function CardImage({ card, variant }: CardImageProps) {
  const dimensions = variant === "mobile"
    ? { width: 330, height: 400 }
    : { width: 1170, height: 520 };

  if (!card.desktopImage && !card.mobileImage) {
    return null;
  }

  return (
    <div class="w-full">
      <NJPicture
        desktop={card.desktopImage}
        mobile={card.mobileImage}
        alt={card.title || card.label || ""}
        width={dimensions.width}
        height={dimensions.height}
        class="rounded-3xl overflow-hidden w-full"
      />
    </div>
  );
}

interface ContentPositionerProps {
  children: import("preact").ComponentChildren;
  position?: "esquerda" | "direita";
}

function ContentPositioner({ children, position }: ContentPositionerProps) {
  const positionClass = position === "direita" ? "right-16" : "left-16";

  return (
    <div
      class={`absolute top-1/2 -translate-y-1/2 space-y-4 max-w-md ${positionClass}`}
    >
      {children}
    </div>
  );
}

function MobileCard({ card }: { card: Card }) {
  return (
    <div class="space-y-6">
      <CardHeader card={card} variant="mobile" />
      <CardImage card={card} variant="mobile" />
      <CardFooter card={card} variant="mobile" />
    </div>
  );
}

function DesktopCard({ card }: { card: Card }) {
  return (
    <div class="relative">
      <CardImage card={card} variant="desktop" />
      <ContentPositioner position={card.contentPosition}>
        <div class="space-y-4">
          <CardHeader card={card} variant="desktop" />
          <CardFooter card={card} variant="desktop" />
        </div>
      </ContentPositioner>
    </div>
  );
}

function NJCoreClassics({ cards = [] }: Props) {
  return (
    <div class="w-full bg-nj-primary pt-6 lg:pt-16 px-5">
      {/* Mobile Layout */}
      <div class="lg:hidden space-y-10">
        {cards.map((card, index) => <MobileCard key={index} card={card} />)}
      </div>

      {/* Desktop Layout */}
      <div class="hidden lg:block">
        <div class="max-w-7xl mx-auto flex flex-col gap-7">
          {cards.map((card, index) => <DesktopCard key={index} card={card} />)}
        </div>
      </div>
    </div>
  );
}

export default NJCoreClassics;
