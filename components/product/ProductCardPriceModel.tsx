import { formatPrice } from "../../sdk/format.ts";

export interface Props {
  priceWithPixDiscount: number;
  priceCurrency?: string;
  sellerPrice: number;
  listPrice: number;
  hasDiscount: boolean;
  pixPercentDiscountByDiferenceSellerPrice: number;
  installmentBillingDuration?: number;
  installmentBillingIncrement?: number;
}

export default function ProductCardPriceModel(props: Props) {
  return (
    <div class="w-full min-h-[75px] flex flex-col py-2">
      {props.hasDiscount && (
        <p class="w-full text-left text-black text-[10px] lg:text-xs font-soleil font-normal line-through">
          {formatPrice(props.listPrice, props.priceCurrency)}
        </p>
      )}

      <p class="flex items-center w-full text-left font-soleil text-black leading-none gap-[3px]">
        <span class="text-sm font-bold">
          {formatPrice(
            props.priceWithPixDiscount,
            props.priceCurrency || "BRL",
          )}
        </span>
        <span class="text-[10px] lg:text-xs font-normal">no PIX</span>
      </p>

      {props.installmentBillingDuration &&
        props.installmentBillingIncrement && (
        <p class="flex items-center text-left text-[10px] lg:text-xs text-black font-soleil font-normal gap-[3px]">
          <span>
            {formatPrice(props.sellerPrice, props.priceCurrency || "BRL")}
          </span>
          <span>em até</span>
          <span>{props.installmentBillingDuration}x</span>
          <span>de</span>
          <span>
            {formatPrice(
              props.installmentBillingIncrement,
              props.priceCurrency || "BRL",
            )}
          </span>
        </p>
      )}
    </div>
  );
}
