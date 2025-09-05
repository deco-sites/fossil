export { default as LoadingFallback } from "../../components/LoadingFallback.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import NJPicture from "../../components/nick-jonas/NJPicture.tsx";
import NJEggMascot from "../../components/nick-jonas/collection-highlight/NJEggMascot.tsx";
import { clx } from "../../sdk/clx.ts";

export interface Props {
  /**
   * @title Imagem Desktop
   * @description Imagem de fundo para desktop (recomendado: 2338x620px)
   */
  desktopImage?: ImageWidget;

  /**
   * @title Imagem Mobile
   * @description Imagem de fundo para mobile (recomendado: 654x468px)
   */
  mobileImage?: ImageWidget;

  /**
   * @title Alt da Imagem Mobile
   * @description Texto alternativo para a imagem mobile
   */
  mobileImageAlt?: string;

  /**
   * @title Texto do Rótulo
   * @description Texto pequeno acima do título (ex: "HOT NEWS!")
   */
  label?: string;

  /**
   * @title Título Principal
   * @description Título da promoção (usa fonte Benton Italic)
   */
  title?: string;

  /**
   * @title Descrição
   * @description Texto descritivo da promoção
   */
  description?: string;

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

function Label({ label }: { label: string }) {
  return (
    <p
      class={clx(
        "text-xs font-soleil font-normal tracking-wider uppercase",
        "text-primary mb-2",
      )}
    >
      {label}
    </p>
  );
}

function Title({
  title,
  isMobile = false,
}: {
  title: string;
  isMobile?: boolean;
}) {
  const classes = isMobile
    ? "text-4xl leading-none"
    : "text-6xl leading-none mb-1";

  return (
    <h2 class={clx("font-benton italic text-primary", classes)}>{title}</h2>
  );
}

function Description({
  description,
  isMobile = false,
}: {
  description: string;
  isMobile?: boolean;
}) {
  const classes = clx(
    "text-sm font-soleil font-normal text-primary",
    isMobile ? "mb-4 max-w-xs" : "max-w-xs",
  );

  return <p class={classes}>{description}</p>;
}

function TermsLink({
  termsUrl,
  termsText,
  isMobile = false,
}: {
  termsUrl: string;
  termsText: string;
  isMobile?: boolean;
}) {
  const containerClasses = isMobile ? "" : "absolute bottom-4 right-4";

  const visibilityClasses = isMobile ? "" : "hidden lg:block";

  return (
    <div class={clx(containerClasses, visibilityClasses)}>
      <a
        href={termsUrl}
        class={clx(
          "text-xs font-soleil text-primary underline",
          "hover:text-primary/80 transition-colors",
        )}
      >
        {termsText}
      </a>
    </div>
  );
}

function PromoImage({
  desktopImage,
  mobileImage,
  alt,
}: {
  desktopImage?: ImageWidget;
  mobileImage?: ImageWidget;
  alt: string;
}) {
  return (
    <NJPicture
      desktop={desktopImage}
      mobile={mobileImage}
      alt={alt}
      width={654}
      height={468}
      class="w-full"
      classImage="rounded-3xl"
    />
  );
}

function MobileLayout({
  label,
  title,
  description,
  termsUrl,
  termsText,
}: Props) {
  return (
    <div class="block lg:hidden">
      <div class="mb-1 text-center">
        <div class="flex flex-col items-center">
          {label && <Label label={label} />}
          {title && <Title title={title} isMobile />}
          {description && <Description description={description} isMobile />}
          {termsUrl && termsText && (
            <TermsLink termsUrl={termsUrl} termsText={termsText} isMobile />
          )}
        </div>
      </div>
    </div>
  );
}

function DesktopLayout({
  label,
  title,
  description,
  termsUrl,
  termsText,
}: Props) {
  return (
    <div class="hidden lg:block absolute inset-0 lg:justify-end lg:items-center">
      <div
        class={clx(
          "lg:w-5/12 lg:max-w-2xl h-full flex items-center lg:p-8",
          "lg:text-left lg:justify-center ml-auto",
        )}
      >
        <div class="w-full">
          {label && <Label label={label} />}
          {title && <Title title={title} />}
          {description && <Description description={description} />}
        </div>
      </div>
      {termsUrl && termsText && (
        <TermsLink termsUrl={termsUrl} termsText={termsText} />
      )}
    </div>
  );
}

function NJLPDinerMugPromo(props: Props) {
  return (
    <div class="relative w-full px-4 lg:px-0 bg-nj-primary">
      <div class="container pt-[75px] max-lg:pt-[50px]">
        <MobileLayout {...props} />

        <div class="relative">
          <PromoImage
            desktopImage={props.desktopImage}
            mobileImage={props.mobileImage}
            alt={props.mobileImageAlt || props.title || ""}
          />

          {/* Egg Mascot - Mobile Only */}
          <div class="block lg:hidden absolute -bottom-12 left-3">
            <NJEggMascot class="w-[100px] h-auto" />
          </div>

          <DesktopLayout {...props} />
        </div>
      </div>
    </div>
  );
}

export default NJLPDinerMugPromo;
