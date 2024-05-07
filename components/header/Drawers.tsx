import type { Props as MenuProps } from "../../components/header/Menu.tsx";
import Cart from "../../components/minicart/Cart.tsx";
import type { Props as SearchbarProps } from "../../components/search/Searchbar.tsx";
import Button from "../../components/ui/Button.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
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
    type: "menu" | "minicart" | "searchbar";
  },
) => (
  <div
    class={`${className} grid grid-rows-[auto_1fr]  divide-y !transition-none`}
  >
    {type === "menu" && (
      <>
        <div class="flex flex-col">
          <div class="flex justify-between items-center">
            <h3 class="px-4 py-3">
              <span class="font-medium text-2xl">Olá! Seja bem vindo(a)</span>
            </h3>
          </div>
          <div class="w-full bg-black flex items-center h-14">
            <span class="text-base text-white uppercase py-2 px-4 ">
              COMPRE POR CATEGORIA
            </span>
          </div>
        </div>
      </>
    )}
    {type === "minicart" && (
      <>
        <div class="flex justify-between items-center bg-primary text-white z-10">
          <h3 class=" pl-6 md:px-4 py-1 md:py-3">
            <span class="font-medium text-2xl uppercase ">
              Meu Carrinho
            </span>
          </h3>
          {onClose && (
            <Button aria-label="X" class="btn btn-ghost" onClick={onClose}>
              <span class="text-sm text-white font-bold mr-6">X</span>
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
      {device !== "desktop"
        ? (
          <>
            <Drawer // left drawer
              open={displayMenu.value || displaySearchDrawer.value}
              onClose={() => {
                displayMenu.value = false;
                displaySearchDrawer.value = false;
              }}
              class={displayMenu.value ? "" : "mt-24"}
              aside={
                <Aside
                  onClose={() => {
                    displayMenu.value = false;
                    displaySearchDrawer.value = false;
                  }}
                  title={displayMenu.value ? "Menu" : "Buscar"}
                  className={`${
                    displayMenu.value
                      ? "h-full max-w-[100vw] bg-base-100"
                      : "bg-transparent absolute top-24 w-full"
                  }`}
                  type={`${displayMenu.value ? "menu" : "searchbar"}`}
                >
                  {displayMenu.value && <Menu {...menu} />}
                  {searchbar && displaySearchDrawer.value && (
                    <div class="">
                      <Searchbar {...searchbar} device={device} />
                    </div>
                  )}
                </Aside>
              }
            >
              {children}
            </Drawer>
            <Drawer // right drawer
              class="mt-24 "
              open={displayCart.value !== false}
              onClose={() => displayCart.value = false}
              aside={
                <Aside
                  title="Minha sacola"
                  onClose={() => displayCart.value = false}
                  className={`w-[97%] absolute top-24 bg-white ${
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
        )
        : <>{children}</>}
    </>
  );
}

export default Drawers;
