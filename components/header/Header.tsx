import { AppContext } from "../../apps/site.ts";
import type { Props as SearchbarProps } from "../../components/search/Searchbar.tsx";
import Drawers from "../../islands/Header/Drawers.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import type { SectionProps } from "deco/types.ts";
import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight, headerHeightMobile } from "./constants.ts";
import UTMSaveController from "../../islands/UTMSaveController.tsx";
import { getCookies } from "std/http/cookie.ts";
import { getMarketingDataByLoader } from "../../sdk/useMarketingData.ts";

export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}
export interface Buttons {
  hideSearchButton?: boolean;
  hideAccountButton?: boolean;
  hideWishlistButton?: boolean;
  hideCartButton?: boolean;
}

export interface Props {
  alerts?: string[];
  /** @description to show Alert */
  isShow?: boolean;

  /**@description intervalo do slider */
  interval?: number;

  /** @title Search Bar */
  searchbar?: Omit<SearchbarProps, "platform">;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[] | null;

  /** @title Logo */
  logo?: Logo;

  logoPosition?: "left" | "center";

  buttons?: Buttons;
}

function Header({
  alerts,
  interval,
  searchbar,
  isShow,
  navItems = [
    {
      "@type": "SiteNavigationElement",
      name: "Feminino",
      url: "/",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Masculino",
      url: "/",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Sale",
      url: "/",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Linktree",
      url: "/",
    },
  ],
  logo = {
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
    width: 100,
    height: 16,
    alt: "Logo",
  },
  logoPosition = "center",
  buttons,
  device,
  marketing_data,
}: SectionProps<typeof loader>) {
  const platform = usePlatform();
  const items = navItems ?? [];

  return (
    <>
      <header
        style={{
          height: device === "desktop"
            ? headerHeight
            : isShow
            ? headerHeightMobile
            : 64,
        }}
        class=""
      >
        <UTMSaveController marketing_data={marketing_data} />
        <div class="fixed z-[100] w-full">
          {alerts && alerts.length > 0 && (
            <Alert
              alerts={alerts}
              interval={interval}
              device={device}
              isShow={isShow}
            />
          )}
          <Drawers
            menu={{ items }}
            searchbar={searchbar}
            platform={platform}
            device={device}
          >
            <div class="bg-white fixed w-full z-50 h-14 md:auto">
              <Navbar
                device={device}
                items={items}
                searchbar={searchbar && { ...searchbar, platform }}
                logo={logo}
                logoPosition={logoPosition}
                buttons={buttons}
              />
            </div>
          </Drawers>
        </div>
      </header>
    </>
  );
}

export const loader = (props: Props, req: Request, ctx: AppContext) => {
  const cookies = getCookies(req.headers);
  const marketing_data = getMarketingDataByLoader(cookies, req.url);
  return { ...props, device: ctx.device, marketing_data };
};

export default Header;
