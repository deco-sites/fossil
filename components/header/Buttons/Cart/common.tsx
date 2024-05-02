import { AnalyticsItem } from "apps/commerce/types.ts";
import Button from "../../../../components/ui/Button.tsx";
import Icon from "../../../../components/ui/Icon.tsx";
import { sendEvent } from "../../../../sdk/analytics.tsx";
import { useUI } from "../../../../sdk/useUI.ts";

interface Props {
  loading: boolean;
  currency: string;
  total: number;
  items: AnalyticsItem[];
}

function CartButton({ loading, currency, total, items }: Props) {
  const { displayCart } = useUI();
  const totalItems = items.length;

  const onClick = () => {
    sendEvent({
      name: "view_cart",
      params: { currency, value: total, items },
    });
    displayCart.value = true;
  };

  return (
    <div class="indicator flex items-center md:justify-between text-[#505050]">
      <Button
        class="btn-circle btn-sm btn-ghost indicator outline-none flex items-center"
        aria-label="open cart"
        data-deco={!displayCart.value && "open-cart"}
        loading={loading}
        onClick={onClick}
      >
        <Icon id="Bag" size={24} strokeWidth={2} class="md:w-6" />
      </Button>

      <span class="text-white hidden md:block">{totalItems}</span>
    </div>
  );
}

export default CartButton;
