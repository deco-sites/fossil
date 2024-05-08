import type { Props as SearchbarProps } from "../../components/search/Searchbar.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { MenuButton, SearchButton } from "../../islands/Header/Buttons.tsx";
import CartButtonLinx from "../../islands/Header/Cart/linx.tsx";
import CartButtonShopify from "../../islands/Header/Cart/shopify.tsx";
import CartButtonVDNA from "../../islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "../../islands/Header/Cart/vtex.tsx";
import CartButtonWake from "../../islands/Header/Cart/wake.tsx";
import CartButtonNuvemshop from "../../islands/Header/Cart/nuvemshop.tsx";
import Searchbar from "../../islands/Header/Searchbar.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import NavItem from "./NavItem.tsx";
import { Buttons, Logo } from "../../components/header/Header.tsx";

// Make it sure to render it on the server only. DO NOT render it on an island
function Navbar(
  { items, searchbar, logo, buttons, logoPosition = "left", device }: {
    items: SiteNavigationElement[];
    searchbar?: SearchbarProps;
    logo?: Logo;
    buttons?: Buttons;
    logoPosition?: "left" | "center";
    device: "mobile" | "desktop" | "tablet";
  },
) {
  const platform = usePlatform();
  return (
    <>
      {device === "desktop"
        ? (
          // Header desktop
          <div class="hidden sm:flex items-center justify-between border-base-200 w-full max-w-screen-2xl m-auto px-6 relative">
            <div
              class={`flex ${
                logoPosition === "left"
                  ? "justify-start -order-1"
                  : "justify-center"
              }`}
            >
              {logo && (
                <a
                  href="/"
                  aria-label="Store logo"
                  class="block"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width || 190}
                    height={logo.height || 37}
                    class={`w-48`}
                  />
                </a>
              )}
            </div>
            <div class="flex-none grid n1-custom-grid-navbar items-center justif-center gap-6  w-full max-w-[1104px]">
              <div class="flex">
                <ul
                  class={`flex items-center gap-9 col-span-1 ${
                    logoPosition === "left" ? "justify-center" : "justify-start"
                  }`}
                >
                  {items.map((item) => <NavItem item={item} />)}
                </ul>
              </div>

              <Searchbar searchbar={searchbar} device={"desktop"} />

              {!buttons?.hideWishlistButton && (
                <a
                  class="items-center text-xs font-thin hidden"
                  href="/wishlist"
                  aria-label="Wishlist"
                >
                  <button
                    class="flex btn btn-circle btn-sm btn-ghost gap-1"
                    aria-label="Wishlist"
                  >
                    <Icon id="Heart" size={24} strokeWidth={0.4} />
                  </button>
                  WISHLIST
                </a>
              )}
            </div>
          </div>
        )
        : (
          //Header Mobile
          <div class="lg:hidden flex  justify-between items-center w-full px-4 py-4 gap-2">
            {logo && (
              <a
                href="/"
                class="flex-grow inline-flex items-center md:justify-center"
                aria-label="Store logo"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width || 100}
                  height={logo.height || 13}
                />
              </a>
            )}

            <div class="flex  items-center justify-center  gap-1">
              <SearchButton />
              {platform === "vtex" && <CartButtonVTEX />}
              {platform === "vnda" && <CartButtonVDNA />}
              {platform === "wake" && <CartButtonWake />}
              {platform === "linx" && <CartButtonLinx />}
              {platform === "shopify" && <CartButtonShopify />}
              {platform === "nuvemshop" && <CartButtonNuvemshop />}

              <MenuButton />
            </div>
          </div>
        )}
    </>
  );
}

export default Navbar;
