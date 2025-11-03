import { itemToAnalyticsItem, useCart } from "apps/linx/hooks/useCart.ts";
import BaseCart from "../common/Cart.tsx";

function Cart() {
  const { cart, loading, updateItem, addCoupon } = useCart();
  // Using unknown type assertion to handle unknown CartResponse structure
  const cartData = cart.value as unknown;
  const items = (cartData as Record<string, unknown>)?.items ??
    (cartData as Record<string, unknown>)?.products ?? [];

  const total = Number((cartData as Record<string, unknown>)?.total ?? 0);
  const subtotal = Number((cartData as Record<string, unknown>)?.subtotal ?? 0);
  const locale = "pt-BR";
  const currency = "BRL";
  const coupon = (cartData as Record<string, unknown>)?.coupon;

  return (
    <BaseCart
      items={Array.isArray(items)
        ? items.map((item) => {
          const itemRecord = item as Record<string, unknown>;
          return {
            image: {
              src: String(itemRecord.ImagePath || ""),
              alt: "product image",
            },
            quantity: Number(itemRecord.Quantity ?? 1),
            name: String(itemRecord.Name || ""),
            price: {
              sale: Number(itemRecord.RetailPrice ?? 0),
              list: Number(itemRecord.ListPrice ?? 0),
            },
          };
        })
        : []}
      total={total}
      subtotal={subtotal}
      discounts={0}
      locale={locale}
      currency={currency}
      loading={loading.value}
      freeShippingTarget={1000}
      coupon={coupon?.toString()}
      checkoutHref="/carrinho"
      onAddCoupon={(CouponCode) => addCoupon({ CouponCode })}
      onUpdateQuantity={async (quantity: number, index: number) => {
        const itemsArray = items as unknown[];
        const item = itemsArray[index] as Record<string, unknown>;
        await updateItem({
          Quantity: quantity,
          BasketItemID: Number(item?.BasketItemID ?? 0),
        });
      }}
      itemToAnalyticsItem={(index) => {
        const itemsArray = items as unknown[];
        const item = itemsArray[index] as Record<string, unknown>;

        return item &&
          itemToAnalyticsItem(
            item as unknown as // deno-lint-ignore no-explicit-any
            any,
            coupon as string | undefined,
            index,
          );
      }}
    />
  );
}

export default Cart;
