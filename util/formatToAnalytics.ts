import type { OrderForm, OrderFormItem } from "apps/vtex/utils/types.ts";
import {
  mapCategoriesToAnalyticsCategories,
  mapProductCategoryToAnalyticsCategories,
} from "apps/commerce/utils/productToAnalyticsItem.ts";
import { AnalyticsItem, BreadcrumbList, Product } from "apps/commerce/types.ts";

const mapItemCategoriesToAnalyticsCategories = (
  item: OrderFormItem,
): Record<`item_category${number | ""}`, string> => {
  return mapCategoriesToAnalyticsCategories(
    Object.values(item.productCategories),
  );
};

export const itemToAnalyticsItem = (
  item: OrderForm["items"][number] & { coupon?: string },
  index: number,
) => {
  return ({
    affiliation: item.seller,
    item_id: item.productId,
    // item_group_id: item.productId,
    quantity: item.quantity,
    coupon: item.coupon ?? "",
    price: item.sellingPrice / 100,
    index,
    discount: Number(
      ((item.listPrice - item.sellingPrice) / 100).toFixed(2),
    ),
    item_name: item.name ?? item.skuName ?? "",
    // item_variant: item.skuName,
    item_variant: item.id,
    item_brand: item.additionalInfo.brandName ?? "",
    item_url:
      (typeof globalThis.location !== "undefined" && globalThis.location?.href)
        ? new URL(item.detailUrl, globalThis.location.href).href
        : item.detailUrl,
    ...(mapItemCategoriesToAnalyticsCategories(item)),
  });
};

export const mapProductToAnalyticsItem = (
  {
    product,
    breadcrumbList,
    price,
    listPrice,
    index = 0,
    quantity = 1,
    coupon = "",
  }: {
    product: Product;
    breadcrumbList?: BreadcrumbList;
    price?: number;
    listPrice?: number;
    index?: number;
    quantity?: number;
    coupon?: string;
  },
): AnalyticsItem => {
  const { name, inProductGroupWithID, isVariantOf, url, sku } = product;
  const categories = breadcrumbList?.itemListElement
    ? mapCategoriesToAnalyticsCategories(
      breadcrumbList?.itemListElement.map(({ name: _name }) => _name ?? "")
        .filter(Boolean) ??
        [],
    )
    : mapProductCategoryToAnalyticsCategories(product.category ?? "");

  return {
    item_id: inProductGroupWithID,
    // item_group_id: inProductGroupWithID,
    quantity,
    coupon,
    price,
    index,
    discount: Number(
      (price && listPrice ? listPrice - price : 0).toFixed(2),
    ),
    item_name: isVariantOf?.name ?? name ?? "",
    // item_variant: name,
    item_variant: sku,
    item_brand: product.brand?.name ?? "",
    item_url: url,
    ...categories,
  };
};
