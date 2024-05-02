import CartButtonVTEX from "../../islands/Header/Cart/vtex.tsx";
import { useUI } from "../../sdk/useUI.ts";
import Cart from "../minicart/Cart.tsx";
import { Suspense, useId, lazy } from "preact/compat";
import { useEffect } from "preact/hooks";
import Button from "../ui/Button.tsx";

export default function MiniCart() {
  const { displayCart } = useUI();
  const id = useId();

  const open = displayCart.value !== false;

  const onClose = () => {
    displayCart.value = false;
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.keyCode === 27) {
        displayCart.value = false;
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const cartContainer = document.getElementById(id);
      if (cartContainer && !cartContainer.contains(e.target as Node)) {
        displayCart.value = false;
      }
    };

    document.addEventListener("keydown", handler);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handler);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [id, displayCart]);

  return (
    <>
          <div id={id} class={`${open ? 'grid' : 'hidden'} absolute top-11 right-2 z-[99] !transition-none before:absolute before:-top-2 before:right-3 before:w-4 before:h-4 before:bg-white before:rotate-[135deg] bg-base-100 grid-rows-[auto_1fr]  divide-y dropdown-conten`}>
            <>
              <div class="flex justify-between items-center bg-black text-white z-10">
                <h2 class="px-4 py-3">
                  <span class="font-medium text-2xl uppercase ">
                    Meu Carrinho
                  </span>
                </h2>
                <Button aria-label="X" class="btn btn-ghost" onClick={onClose}>
                    <span class="text-sm text-white font-bold">X</span>
                </Button>
              </div>
              <Suspense
                fallback={
                  <div class="w-screen flex items-center justify-center">
                    <span class="loading loading-ring" />
                  </div>
                }
              >
                 <Cart platform={"vtex"} />
              </Suspense>
            </>
          </div>
    </>
  );
}
