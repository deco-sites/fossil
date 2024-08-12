import type {
  AggregateOffer,
  UnitPriceSpecification,
} from "apps/commerce/types.ts";

const bestInstallment = (
  accumulator: UnitPriceSpecification | null,
  current: UnitPriceSpecification,
) => {
  if (current.priceComponentType !== "https://schema.org/Installment") {
    return accumulator;
  }

  if (!accumulator) {
    return current;
  }

  if ((current.billingDuration || 0) > (accumulator.billingDuration || 0)) {
    return current;
  }

  return accumulator;
};

const installmentToString = (installment: UnitPriceSpecification) => {
  const { billingDuration, billingIncrement } = installment;

  if (!billingDuration || !billingIncrement) {
    return "";
  }

  return `${billingDuration}x de R$ ${
    billingIncrement
      .toFixed(2)
      .replace(".", ",")
  }`;
};

export const useOffer = (aggregateOffer?: AggregateOffer) => {
  const offer = aggregateOffer?.offers[0];

  const sellerPrice = offer?.priceSpecification.find(
    ({ priceType }) => priceType === "https://schema.org/SalePrice",
  );

  const listPrice = offer?.priceSpecification.find(
    ({ priceType }) => priceType === "https://schema.org/ListPrice",
  );

  const priceWithPixPayment = offer?.priceSpecification.find(
    ({ name }) => name?.toLowerCase() === "pix",
  );

  const installment = offer?.priceSpecification.reduce(bestInstallment, null);
  const seller = offer?.seller;
  const availability = (offer?.inventoryLevel.value || 0) > 0;
  const price = sellerPrice?.price || 0;

  const priceWithPixDiscount = (priceWithPixPayment?.price || price) < price
    ? priceWithPixPayment?.price || price
    : price * 0.95;

  return {
    price,
    priceWithPixDiscount,
    listPrice: listPrice?.price || price,
    has_discount: (listPrice?.price || price) > price,
    availability,
    seller,
    installment_text: installment ? installmentToString(installment) : null,
    installment,
  };
};
