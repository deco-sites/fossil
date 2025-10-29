export { default as LoadingFallback } from "../../components/LoadingFallback.tsx";
import { type FnContext } from "@deco/deco";
import type { ImageWidget } from "apps/admin/widgets.ts";
import ProductCarousel from "../../islands/christmas/ProductCarousel.tsx";
import type { Card } from "../../components/christmas/ProductCard.tsx";
import Stars, { type StarsProps } from "../../components/christmas/Stars.tsx";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../sdk/clx.ts";
import { withDevice } from "../../sdk/withDevice.ts";
import { useId } from "../../sdk/useId.ts";

export interface Props {
  /**
   * @title Subtítulo
   * @description Texto acima do título (ex: "WANTS & NEEDS")
   */
  subtitle?: string;

  /**
   * @title Título
   * @description Título principal (ex: "The Watch Guide")
   */
  title?: string;

  /**
   * @title Cards
   * @description Lista de cards exibidos no carrossel
   */
  cards: Card[];

  /**
   * @title Estrelas Decorativas (esquerda - apenas desktop)
   */
  starLeft?: StarsProps;

  /**
   * @title Estrelas Decorativas (direita - apenas desktop)
   */
  starRight?: StarsProps;

  /**
   * @title Imagem Divisória
   */
  dividerImage?: ImageWidget;

  /**
   * @title Largura da Imagem Divisória
   */
  dividerImageWidth?: number;

  /**
   * @title Altura da Imagem Divisória
   */
  dividerImageHeight?: number;

  /**
   * @title Preenchimento Inferior
   * @description Preenchimento interno abaixo da seção (em pixels)
   */
  paddingBottom?: number;

  /**
   * @ignore true
   */
  device?: "mobile" | "tablet" | "desktop";
}

function CRWatchGuide({
  subtitle,
  title,
  cards,
  starLeft,
  starRight,
  dividerImage,
  dividerImageWidth = 1280,
  dividerImageHeight = 100,
  paddingBottom,
  device,
}: ReturnType<Awaited<typeof loader>>) {
  const isDesktop = device === "desktop";
  const id = useId();

  if (!cards || cards.length === 0) return null;

  return (
    <div
      class="relative w-full"
      style={{
        paddingBottom: paddingBottom ? `${paddingBottom}px` : undefined,
      }}
    >
      {isDesktop && dividerImage && (
        <div class="hidden lg:block absolute top-0 left-0 right-0 z-10 -translate-y-1/2">
          <Image
            class="w-full h-auto object-none"
            src={dividerImage}
            alt="Divisor"
            width={dividerImageWidth}
            height={dividerImageHeight}
          />
        </div>
      )}

      <div
        class={clx(
          "container mx-auto px-5 lg:px-16",
          dividerImage && "pt-8 lg:pt-20",
        )}
      >
        <div class="w-fit mx-auto flex flex-col items-center relative lg:mb-8">
          {subtitle && (
            <p class="font-soleil text-xs text-cr-primary text-center uppercase tracking-wide">
              {subtitle}
            </p>
          )}

          {title && (
            <h2 class="font-benton italic text-5xl lg:text-6xl xl:text-7xl text-white text-center leading-none tracking-tight">
              {title}
            </h2>
          )}

          {isDesktop && (
            <>
              {starLeft?.image && (
                <Stars
                  {...starLeft}
                  class="absolute top-1/2 -left-8 text-cr-primary hidden lg:block z-20 -translate-x-full -translate-y-1/2"
                />
              )}
              {starRight?.image && (
                <Stars
                  {...starRight}
                  class="absolute top-0 -right-8 text-cr-primary hidden lg:block z-20 translate-x-full"
                />
              )}
            </>
          )}
        </div>

        <div class="max-w-7xl mx-auto mt-5 lg:mt-0">
          <ProductCarousel
            cards={cards ?? []}
            device={device}
            carouselId={id}
          />
        </div>
      </div>
    </div>
  );
}

export const loader = (props: Props, _req: Request, ctx: FnContext) => {
  return withDevice(props, ctx);
};

export default CRWatchGuide;
