import Button from "../../../components/ui/Button.tsx";
import Icon from "../../../components/ui/Icon.tsx";
import { useUI } from "../../../sdk/useUI.ts";

export default function MenuButton() {
  const { displayMenu } = useUI();

  return (
    <Button
      class="btn btn-circle lg:btn-sm btn-xs btn-ghost"
      aria-label="open menu"
      onClick={() => {
        displayMenu.value = !displayMenu.value;
      }}
    >
      <Icon id="Hamburguer" size={20} strokeWidth={3} />
    </Button>
  );
}
