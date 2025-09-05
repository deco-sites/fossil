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

export interface Props {
  /** @title Título da Seção */
  title?: string;

  /** @title Descrição */
  description?: string;

  /** @title Linha em Negrito */
  emphasis?: string;

  /** @title Botão de Ação */
  cta?: Button;

  /**
   * @title Imagem Desktop
   * @description 410x538 renderizado
   */
  desktopImage?: ImageWidget;

  /**
   * @title Imagem Mobile
   * @description 335x414 renderizado
   */
  mobileImage?: ImageWidget;

  /** @title Texto Alternativo da Imagem */
  alt?: string;
}

// Reusable text components with responsive variants
function Title({
  title,
  isMobile = false,
}: {
  title: string;
  isMobile?: boolean;
}) {
  const classes = isMobile
    ? "text-4xl text-center leading-[.9em]"
    : "text-6xl leading-[.85em]";

  return <h2 class={`font-benton italic text-black ${classes}`}>{title}</h2>;
}

function Description({
  description,
  isMobile = false,
}: {
  description: string | undefined;
  isMobile?: boolean;
}) {
  if (!description) return null;

  const containerClasses = isMobile
    ? "text-center max-w-[540px] mx-auto"
    : "max-w-[640px]";

  return (
    <div class={containerClasses}>
      <p class="text-sm font-soleil text-primary leading-5">{description}</p>
    </div>
  );
}

function Emphasis({
  emphasis,
  isMobile = false,
}: {
  emphasis: string | undefined;
  isMobile?: boolean;
}) {
  if (!emphasis) return null;

  const containerClasses = isMobile ? "text-center" : "";

  return (
    <div class={containerClasses}>
      <p class="font-soleil font-bold text-sm text-primary">{emphasis}</p>
    </div>
  );
}

function CTA({ cta, isMobile = false }: { cta: Button; isMobile?: boolean }) {
  const containerClasses = isMobile ? "flex justify-center pt-2" : "pt-4";

  const buttonClasses = isMobile ? "w-full max-w-[280px]" : "w-fit";

  return (
    <div class={containerClasses}>
      <CTAButton
        name={cta.name || ""}
        url={cta.url}
        variant="secondary"
        class={buttonClasses}
      />
    </div>
  );
}

function ResponsiveImage({
  desktopImage,
  mobileImage,
  alt,
  isMobile = false,
}: {
  desktopImage?: ImageWidget;
  mobileImage?: ImageWidget;
  alt: string | undefined;
  isMobile?: boolean;
}) {
  if (!desktopImage && !mobileImage) return null;

  if (isMobile) {
    return (
      <div class="w-full flex justify-center">
        <div class="aspect-[335/414] max-w-[335px] w-full">
          <NJPicture
            desktop={desktopImage}
            mobile={mobileImage}
            alt={alt || ""}
            width={335}
            height={414}
            class="w-full h-full object-cover"
            classImage="rounded-2xl"
          />
        </div>
      </div>
    );
  }

  return (
    <div class="flex items-center">
      <div class="aspect-[410/538] w-full max-w-[410px] ml-auto">
        <NJPicture
          desktop={desktopImage}
          mobile={mobileImage}
          alt={alt || ""}
          width={410}
          height={538}
          class="w-full h-full object-cover"
          classImage="rounded-3xl"
        />
      </div>
    </div>
  );
}

function MobileLayout({
  title,
  description,
  emphasis,
  cta,
  desktopImage,
  mobileImage,
  alt,
}: Props) {
  return (
    <div class="lg:hidden space-y-6">
      {title && <Title title={title} isMobile />}

      <ResponsiveImage
        desktopImage={desktopImage}
        mobileImage={mobileImage}
        alt={alt}
        isMobile
      />

      <Description description={description} isMobile />

      <Emphasis emphasis={emphasis} isMobile />

      {cta?.name && <CTA cta={cta} isMobile />}
    </div>
  );
}

function DesktopLayout({
  title,
  description,
  emphasis,
  cta,
  desktopImage,
  mobileImage,
  alt,
}: Props) {
  return (
    <div class="hidden lg:grid lg:grid-cols-12 lg:gap-x-12 lg:gap-y-8">
      <div class="lg:col-span-7 flex flex-col space-y-6">
        {title && <Title title={title} />}

        <div class="lg:ml-[25%] space-y-6">
          <Description description={description} />
          <Emphasis emphasis={emphasis} />
          {cta?.name && <CTA cta={cta} />}
        </div>
      </div>

      <div class="lg:col-span-5">
        <ResponsiveImage
          desktopImage={desktopImage}
          mobileImage={mobileImage}
          alt={alt}
        />
      </div>
    </div>
  );
}

function NJLPCoreClassics(props: Props) {
  return (
    <div class="bg-nj-primary w-full pt-8 lg:pt-16 px-5 pb-10 lg:pb-5">
      <div class="container">
        <MobileLayout {...props} />
        <DesktopLayout {...props} />
      </div>
    </div>
  );
}

export default NJLPCoreClassics;
