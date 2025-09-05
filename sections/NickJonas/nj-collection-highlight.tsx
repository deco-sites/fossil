export { default as LoadingFallback } from "../../components/LoadingFallback.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import CTAButton from "../../components/nick-jonas/CTAButton.tsx";
import NJPicture from "../../components/nick-jonas/NJPicture.tsx";
import NJStars from "../../components/nick-jonas/collection-highlight/NJStars.tsx";
import NJEggMascot from "../../components/nick-jonas/collection-highlight/NJEggMascot.tsx";
import NJOrderTicket from "../../components/nick-jonas/collection-highlight/NJOrderTicket.tsx";

export interface Button {
  /** @title Texto do Botão */
  name?: string;
  /** @title URL do Botão */
  url?: string;
}

export interface SecondaryCard {
  /**
   * @title Etiqueta Superior
   * @description Texto pequeno acima do título
   */
  label?: string;

  /**
   * @title Título do Card
   * @description Título principal do card secundário
   */
  title?: string;

  /**
   * @title Descrição do Card
   * @description Descrição do produto/conteúdo
   */
  description?: string;

  /**
   * @title Imagem Desktop
   * @description 950x1090
   */
  desktopImage?: ImageWidget;

  /**
   * @title Imagem Mobile
   * @description 660x470
   */
  mobileImage?: ImageWidget;

  /**
   * @title URL dos Termos
   * @description Link para a página de termos e condições
   */
  termsUrl?: string;

  /**
   * @title Texto dos Termos
   * @description Texto do link dos termos (ex: "Terms and conditions apply.*")
   */
  termsText?: string;
}

export interface Props {
  /**
   * @title Etiqueta Superior
   * @description Texto pequeno no topo da seção
   */
  topLabel?: string;

  /**
   * @title Título Principal
   * @description Título principal da seção (usa fonte Benton Italic)
   */
  title?: string;

  /**
   * @title Descrição
   * @description Texto de descrição da seção
   */
  description?: string;

  /**
   * @title Botão Principal
   * @description Botão de call-to-action principal
   */
  cta?: Button;

  /**
   * @title Imagem Principal Desktop
   * @description 1340x1500
   */
  heroDesktopImage?: ImageWidget;

  /**
   * @title Imagem Principal Mobile
   * @description 660x800
   */
  heroMobileImage?: ImageWidget;

  /**
   * @title Card Secundário
   * @description Configurações do card secundário
   */
  secondaryCard?: SecondaryCard;
}

function HeaderSection({
  topLabel,
  title,
  description,
  cta,
  className = "",
}: {
  topLabel?: string;
  title?: string;
  description?: string;
  cta?: Button;
  className?: string;
}) {
  return (
    <div class={className}>
      {topLabel && (
        <p className="text-xs font-soleil tracking-wider uppercase text-primary">
          {topLabel}
        </p>
      )}
      {title && (
        <h2 className="text-[36px] lg:text-6xl font-benton italic text-primary leading-none">
          {title}
        </h2>
      )}
      {description && (
        <div className="text-sm font-soleil text-primary leading-5 text-center lg:text-left lg:max-w-md">
          {description}
        </div>
      )}
      {cta?.name && (
        <div className="pt-2 lg:pt-0">
          <CTAButton
            name={cta.name}
            url={cta.url}
            variant="secondary"
            class="w-full lg:w-fit"
          />
        </div>
      )}
    </div>
  );
}

function TermsLink({
  termsUrl,
  termsText,
}: {
  termsUrl?: string;
  termsText?: string;
}) {
  if (!termsUrl || !termsText) return null;

  return (
    <a
      href={termsUrl}
      className="text-xs font-soleil text-primary underline hover:text-primary/80 transition-colors"
      onClick={(e) => e.stopPropagation()}
    >
      {termsText}
    </a>
  );
}

function SecondaryCardContent({
  card,
  isDesktop = false,
}: {
  card: SecondaryCard;
  isDesktop?: boolean;
}) {
  const imageWidth = isDesktop ? 475 : 330;
  const imageHeight = isDesktop ? 300 : 235;
  const mascotSize = isDesktop ? "size-[135px]" : "size-20";
  const mascotPosition = isDesktop ? "-bottom-10 left-0" : "-bottom-8 left-2";

  if (isDesktop) {
    return (
      <div className="bg-white/95 rounded-2xl relative w-full overflow-hidden">
        <div className="relative">
          <NJPicture
            desktop={card.desktopImage}
            mobile={card.mobileImage}
            alt={card.title || ""}
            width={imageWidth}
            height={imageHeight}
            class="w-full h-auto"
            classImage="rounded-3xl"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="space-y-1">
              {card.label && (
                <span className="text-xs font-soleil tracking-wider text-primary uppercase block">
                  {card.label}
                </span>
              )}
              {card.title && (
                <h3 className="text-32 font-benton italic text-primary leading-none">
                  {card.title}
                </h3>
              )}
              {card.description && (
                <p className="text-sm font-soleil text-primary leading-5">
                  {card.description}
                </p>
              )}
              <TermsLink termsUrl={card.termsUrl} termsText={card.termsText} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl space-y-3 !mt-12">
      <div className="w-full relative">
        <NJPicture
          desktop={card.desktopImage}
          mobile={card.mobileImage}
          alt={card.title || ""}
          width={imageWidth}
          height={imageHeight}
          class="w-full h-auto"
          classImage="rounded-3xl"
        />
        <div className={`absolute ${mascotPosition}`}>
          <NJEggMascot class={mascotSize} />
        </div>
      </div>
      <div className="space-y-1 text-center !mt-10">
        {card.label && (
          <span className="text-xs font-soleil tracking-wider text-primary uppercase">
            {card.label}
          </span>
        )}
        {card.title && (
          <h3 className="text-32 font-benton italic text-primary leading-none">
            {card.title}
          </h3>
        )}
        {card.description && (
          <p className="text-sm font-soleil text-primary leading-5">
            {card.description}
          </p>
        )}
        <TermsLink termsUrl={card.termsUrl} termsText={card.termsText} />
      </div>
    </div>
  );
}

function MobileLayout({
  topLabel,
  title,
  description,
  cta,
  heroDesktopImage,
  heroMobileImage,
  secondaryCard,
}: Props) {
  return (
    <div className="lg:hidden px-5 space-y-6 pb-12 container">
      <div className="absolute top-3 right-3">
        <NJStars variant="mobile" class="text-primary" />
      </div>

      <div className="text-center space-y-2">
        {topLabel && (
          <p className="text-xs font-soleil tracking-wider uppercase text-primary">
            {topLabel}
          </p>
        )}
        {title && (
          <h2 className="text-[36px] font-benton italic text-primary leading-none">
            {title}
          </h2>
        )}
      </div>

      <div className="relative !mt-8">
        <NJPicture
          desktop={heroDesktopImage}
          mobile={heroMobileImage}
          alt={title}
          width={330}
          height={400}
          class="overflow-hidden"
          classImage="rounded-3xl"
        />
      </div>

      <div className="text-center">
        {description && (
          <div className="text-sm font-soleil text-primary leading-5">
            {description}
          </div>
        )}
        {cta?.name && (
          <div className="mt-6">
            <CTAButton
              name={cta.name}
              url={cta.url}
              variant="secondary"
              class="w-full"
            />
          </div>
        )}
      </div>

      {secondaryCard && (
        <SecondaryCardContent card={secondaryCard} isDesktop={false} />
      )}
    </div>
  );
}

function DesktopLayout({
  topLabel,
  title,
  description,
  cta,
  heroDesktopImage,
  heroMobileImage,
  secondaryCard,
}: Props) {
  return (
    <div className="hidden lg:block relative px-8 py-16 container">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-6 justify-between items-start">
          <div className="w-[475px] max-w-[475px] flex-shrink-0 space-y-8 flex flex-col gap-16">
            <div className="relative flex flex-col gap-4">
              <div className="hidden lg:block absolute -top-12 -left-12">
                <NJStars variant="desktop-1" class="text-primary" />
              </div>
              <div className="hidden lg:block absolute bottom-0 right-12">
                <NJStars variant="desktop-2" class="text-primary" />
              </div>

              <HeaderSection
                topLabel={topLabel}
                title={title}
                description={description}
                cta={cta}
                className="flex flex-col gap-4"
              />
            </div>

            {secondaryCard && (
              <SecondaryCardContent card={secondaryCard} isDesktop />
            )}
          </div>

          <div className="flex-1 max-w-[670px] min-w-0 relative">
            <div className="relative">
              <NJPicture
                desktop={heroDesktopImage}
                mobile={heroMobileImage}
                alt={title}
                width={670}
                height={750}
                class="overflow-hidden w-full h-auto max-w-full"
                classImage="rounded-3xl"
              />
              <div className="absolute -top-20 -left-20">
                <NJOrderTicket />
              </div>
              <div className="absolute -bottom-10 left-0">
                <NJEggMascot class="size-[135px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NJCollectionHighlight(props: Props) {
  return (
    <div className="relative w-full overflow-hidden bg-nj-primary">
      <MobileLayout {...props} />
      <DesktopLayout {...props} />
    </div>
  );
}

export default NJCollectionHighlight;
