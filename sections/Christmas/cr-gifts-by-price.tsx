export { default as LoadingFallback } from "../../components/LoadingFallback.tsx";
import type { FnContext } from "@deco/deco";
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
   * @title Padding Bottom
   * @description Preenchimento interno abaixo da seção (em pixels)
   */
  paddingTop?: number;
  /**
   * @ignore true
   */
  device?: "mobile" | "tablet" | "desktop";
}

function CRGiftsByPrice({
  cards,
  title = "Presentes por Desconto",
  backgroundColor = "transparente",
  text,
  paddingTop,
}: ReturnType<Awaited<typeof loader>>) {
  if (!cards || cards.length === 0) return null;

  const bgClass = backgroundColor === "branco"
    ? "bg-cr-bg-primary"
    : "bg-transparent";

  return (
    <div class={`relative w-full ${bgClass}`}>
      <div
        class="container mx-auto px-5 lg:px-16 py-8 lg:py-16"
        style={{
          paddingTop: typeof paddingTop === "number"
            ? `${paddingTop}px`
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
    </div>
  );
}

export const loader = (props: Props, _req: Request, ctx: FnContext) => {
  return withDevice(props, ctx);
};

export default CRGiftsByPrice;
