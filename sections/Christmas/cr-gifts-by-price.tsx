export { default as LoadingFallback } from "../../components/LoadingFallback.tsx";
import type { FnContext } from "@deco/deco";
import type { ImageWidget } from "apps/admin/widgets.ts";
import SnowFooter from "../../components/christmas/SnowFooter.tsx";
import PriceCard, {
  type PriceCard as PriceCardType,
} from "../../components/christmas/PriceCard.tsx";
import { withDevice } from "../../sdk/withDevice.ts";

export interface Props {
  /**
   * @title Cards de Preço
   * @description Lista de cards exibidos na grade
   */
  cards: PriceCardType[];
  /**
   * @title Título
   * @description Oculto visualmente, usado para SEO
   * @default "Presentes por Desconto"
   */
  title?: string;
  /**
   * @title Cor de Fundo
   * @default transparente
   */
  backgroundColor?: "transparente" | "branco";
  /**
   * @title Texto
   * @format textarea
   */
  text?: string;
  /**
   * @title Padding Top
   * @description Preenchimento interno acima da seção (em pixels)
   */
  paddingTop?: number;
  /**
   * @title Padding Bottom
   * @description Preenchimento interno abaixo da seção (em pixels)
   */
  paddingBottom?: number;
  /**
   * @ignore true
   */
  device?: "mobile" | "tablet" | "desktop";

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

function CRGiftsByPrice({
  cards,
  title = "Presentes por Desconto",
  backgroundColor = "transparente",
  text,
  paddingTop,
  paddingBottom,
  snowFooterDesktop,
  snowFooterMobile,
  snowFooterDesktopWidth,
  snowFooterDesktopHeight,
  snowFooterMobileWidth,
  snowFooterMobileHeight,
}: ReturnType<Awaited<typeof loader>>) {
  if (!cards || cards.length === 0) return null;

  const bgClass = backgroundColor === "branco"
    ? "bg-cr-bg-primary"
    : "bg-transparent";

  const snowFooterClass = (snowFooterDesktop && snowFooterMobile)
    ? "-mt-4 lg:-mt-12 xl:-mt-16 2xl:-mt-20"
    : "";

  return (
    <div class={`relative w-full ${bgClass}`}>
      <div
        class="container mx-auto px-5 lg:px-16 py-8 lg:py-16"
        style={{
          paddingTop: typeof paddingTop === "number"
            ? `${paddingTop}px`
            : undefined,
          paddingBottom: typeof paddingBottom === "number"
            ? `${paddingBottom}px`
            : undefined,
        }}
      >
        <h2 class="sr-only">{title}</h2>
        {text && (
          <p class="font-soleil text-sm text-center mx-auto max-w-[570px] mb-6 lg:mb-16 whitespace-pre-line">
            {text}
          </p>
        )}
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 max-w-7xl mx-auto">
          {cards.map((card, index) => (
            <PriceCard key={`price-card-${index}`} {...card} />
          ))}
        </div>
      </div>
      <div class={snowFooterClass}>
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
  );
}

export const loader = (props: Props, _req: Request, ctx: FnContext) => {
  return withDevice(props, ctx);
};

export default CRGiftsByPrice;
