import type { Props as MenuProps } from "../../components/header/Menu.tsx";
import Cart from "../../components/minicart/Cart.tsx";
import type { Props as SearchbarProps } from "../../components/search/Searchbar.tsx";
import Button from "../../components/ui/Button.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { useUI } from "../../sdk/useUI.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { ComponentChildren } from "preact";
import { lazy, Suspense } from "preact/compat";

const Menu = lazy(() => import("../../components/header/Menu.tsx"));
const Searchbar = lazy(() => import("../../components/search/Searchbar.tsx"));

export interface Props {
  menu: MenuProps;
  searchbar?: SearchbarProps;
  /**
   * @ignore_gen true
   */
  children?: ComponentChildren;
  platform: ReturnType<typeof usePlatform>;
  device?: string;
}

const Aside = (
  { title, onClose, children, className, type }: {
    title: string;
    onClose?: () => void;
    children: ComponentChildren;
    className?: string;
    type: "menu" | "minicart";
  },
) => (
  <div
    class={`${className} bg-base-100 grid grid-rows-[auto_1fr]  divide-y`}
  >
    {type === "menu"
      ? (
        <>
          <div class="flex flex-col">
            <div class="flex justify-between items-center">
              <h1 class="px-4 py-3">
                <span class="font-medium text-2xl">Olá! Seja bem vindo(a)</span>
              </h1>
              {onClose && (
                <Button aria-label="X" class="btn btn-ghost" onClick={onClose}>
                  <Icon id="XMark" size={24} strokeWidth={2} />
                </Button>
              )}
            </div>
            <div class="w-full bg-black flex items-center h-14">
              <span class="text-base text-white uppercase py-2 px-4 ">
                COMPRE POR CATEGORIA
              </span>
            </div>
          </div>
        </>
      )
      : (
        <>
          <div class="flex justify-between items-center bg-black text-white z-10">
            <h1 class="px-4 py-3">
              <span class="font-medium text-2xl uppercase ">
                Meu Carrinho
              </span>
            </h1>
            {onClose && (
              <Button aria-label="X" class="btn btn-ghost" onClick={onClose}>
                <Icon id="XMark" size={24} strokeWidth={2} />
              </Button>
            )}
          </div>
        </>
      )}

    <Suspense
      fallback={
        <div class="w-screen flex items-center justify-center">
          <span class="loading loading-ring" />
        </div>
      }
    >
      {children}
    </Suspense>
  </div>
);

function Drawers(
  { menu, searchbar, children, platform, device }: Props & { device?: string },
) {
  const { displayCart, displayMenu, displaySearchDrawer } = useUI();

  return (
    <>
      {device === "mobile" && (
        <>
          <Drawer // left drawer
            open={displayMenu.value || displaySearchDrawer.value}
            onClose={() => {
              displayMenu.value = false;
              displaySearchDrawer.value = false;
            }}
            aside={
              <Aside
                onClose={() => {
                  displayMenu.value = false;
                  displaySearchDrawer.value = false;
                }}
                title={displayMenu.value ? "Menu" : "Buscar"}
                className="h-full max-w-[100vw]"
                type="menu"
              >
                {displayMenu.value && <Menu {...menu} />}
                {searchbar && displaySearchDrawer.value && (
                  <div class="w-screen">
                    <Searchbar {...searchbar} />
                  </div>
                )}
              </Aside>
            }
          >
            {children}
          </Drawer>
          <Drawer // right drawer
            class="drawer"
            open={displayCart.value !== false}
            onClose={() => displayCart.value = false}
            aside={
              <Aside
                title="Minha sacola"
                onClose={() => displayCart.value = false}
                className={` absolute  top-24 ${
                  displayCart.value !== false ? "" : ""
                } `}
                type="minicart"
              >
                <Cart platform={platform} />
              </Aside>
            }
          >
            {children}
          </Drawer>
        </>
      )}
      {children}
    </>
  );
}

export default Drawers;
