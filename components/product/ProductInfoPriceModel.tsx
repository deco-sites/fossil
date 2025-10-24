import { formatPrice } from "../../sdk/format.ts";

export interface Props {
  priceWithPixDiscount: number;
  priceCurrency?: string;
  sellerPrice: number;
  listPrice: number;
  pixPercentDiscountByDiferenceSellerPrice: number;
  installmentBillingDuration?: number;
  installmentBillingIncrement?: number;
}

export default function ProductInfoPriceModel(props: Props) {
  return (
    <div class="">
      <p class="w-full text-left text-[#89A290] text-sm font-scoutCond font-normal line-through">
        {formatPrice(props.listPrice, props.priceCurrency)}
      </p>

      <p class="flex items-center w-full text-left text-black leading-none gap-[3px]">
        <span class="text-3xl lg:text-2xl font-bold font-scoutCond">
          {formatPrice(
            props.priceWithPixDiscount,
            props.priceCurrency || "BRL",
          )}
        </span>
        <span class="text-xs lg:text-[13px] font-arial">com</span>
        <span class="text-xs lg:text-[13px] font-bold font-arial">
          {props.pixPercentDiscountByDiferenceSellerPrice}% de desconto
        </span>
        <span class="text-xs lg:text-[13px] font-arial">no PIX</span>
      </p>

      {props.installmentBillingDuration &&
        props.installmentBillingIncrement && (
        <p class="flex items-center text-xs leading-none mt-1 gap-[3px]">
          <span class="font-bold">
            {formatPrice(props.sellerPrice, props.priceCurrency || "BRL")}
          </span>
          <span class="font-normal">em até</span>
          <span class="font-bold">{props.installmentBillingDuration}x</span>
          <span class="font-normal">de</span>
          <span class="font-bold">
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
