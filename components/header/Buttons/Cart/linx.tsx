import { itemToAnalyticsItem, useCart } from "apps/linx/hooks/useCart.ts";
import Button from "./common.tsx";

function CartButton() {
  const { loading, cart } = useCart();
  // Using unknown type assertion to handle unknown CartResponse structure
  const cartData = cart.value as unknown;
  const items = (cartData as Record<string, unknown>)?.items ??
    (cartData as Record<string, unknown>)?.products ?? [];
  const cartSize = Array.isArray(items) ? items.length : 0;
  const coupon = (cartData as Record<string, unknown>)?.coupon;

  return (
    <Button
      currency="BRL"
      loading={loading.value}
      total={cartSize}
      items={Array.isArray(items)
        ? items.map((item, index) => {
          // Cast to unknown then to the expected type to satisfy the function signature
          return itemToAnalyticsItem(
            item as unknown as // deno-lint-ignore no-explicit-any
            any,
            coupon as string | undefined,
            index,
          );
        })
        : []}
    />
  );
}

export default CartButton;
