export { default as LoadingFallback } from "../../components/LoadingFallback.tsx";
import { type FnContext } from "@deco/deco";
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
   * @ignore true
   */
  device?: "mobile" | "tablet" | "desktop";
}

function CRGiftsByPrice({ cards }: ReturnType<Awaited<typeof loader>>) {
  if (!cards || cards.length === 0) return null;

  return (
    <div class="relative w-full">
      <div class="container mx-auto px-5 lg:px-16 py-8 lg:py-16">
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
