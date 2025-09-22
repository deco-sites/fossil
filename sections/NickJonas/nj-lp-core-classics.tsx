export { default as LoadingFallback } from "../../components/LoadingFallback.tsx";
import CTAButton from "../../components/nick-jonas/CTAButton.tsx";
import ScrollTriggeredCarousel from "../../islands/NickJonas/ScrollTriggeredCarousel.tsx";
import type { CarouselImage } from "../../components/nick-jonas/ScrollTriggeredCarousel.tsx";

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
   * @title Imagens do Carrossel
   * @description Adicione de 1 a 3 imagens. Com 1 imagem, será renderizada estaticamente. Com 2-3 imagens, será ativado o carrossel com scroll.
   * @maxItems 3
   * @minItems 1
   */
  images?: CarouselImage[];

  /**
   * @title URL das Imagens
   * @description Link para onde as imagens devem direcionar (URL relativa)
   */
  imageUrl?: string;
}

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

function ResponsiveImageComponent({
  images,
  imageUrl,
  isMobile = false,
}: {
  images?: CarouselImage[];
  imageUrl?: string;
  isMobile?: boolean;
}) {
  if (!images || images.length === 0) return null;

  const processedImages = images.map((image) => ({
    ...image,
    mobileImage: image.mobileImage || image.desktopImage,
  }));

  const carouselElement = (
    <ScrollTriggeredCarousel images={processedImages} isMobile={isMobile} />
  );

  return imageUrl
    ? (
      <a href={imageUrl} className="block">
        {carouselElement}
      </a>
    )
    : carouselElement;
}

function MobileLayout(
  { title, description, emphasis, cta, images, imageUrl }: Props,
) {
  return (
    <div class="lg:hidden space-y-6">
      {title && <Title title={title} isMobile />}

      <ResponsiveImageComponent images={images} imageUrl={imageUrl} isMobile />

      <Description description={description} isMobile />

      <Emphasis emphasis={emphasis} isMobile />

      {cta?.name && <CTA cta={cta} isMobile />}
    </div>
  );
}

function DesktopLayout(
  { title, description, emphasis, cta, images, imageUrl }: Props,
) {
  return (
    <div class="hidden lg:grid lg:grid-cols-12 lg:gap-x-12 lg:gap-y-8">
      <div class="lg:col-span-7 flex flex-col space-y-6">
        {title && <Title title={title} />}

        <div class="lg:ml-[25%] space-y-6 !mt-10">
          <Description description={description} />
          <Emphasis emphasis={emphasis} />
          {cta?.name && <CTA cta={cta} />}
        </div>
      </div>

      <div class="lg:col-span-4">
        <ResponsiveImageComponent images={images} imageUrl={imageUrl} />
      </div>
    </div>
  );
}

function NJLPCoreClassics(props: Props) {
  return (
    <div class="bg-nj-primary w-full pt-8 lg:pt-16 px-5 pb-10 lg:pb-5">
      <div class="container max-w-7xl">
        <MobileLayout {...props} />
        <DesktopLayout {...props} />
      </div>
    </div>
  );
}

export default NJLPCoreClassics;
