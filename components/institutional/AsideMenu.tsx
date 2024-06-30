
import { FnContext, SectionProps } from "deco/mod.ts";
import { useState } from "preact/compat";
import Icon, { AvailableIcons } from "../ui/Icon.tsx";

export interface Props {
  menuItems: {
    icon: AvailableIcons;
    iconWidth?: number;
    iconHeight?: number;
    label: string;
    href: string;
  }[];
}

export function loader(props: Props, req: Request, ctx: FnContext) {
  const url = new URL(req.url);
  const { pathname } = url;

  return {
    ...props,
    pathname,
    device: ctx.device,
  };
}

function AsideMenu({
  menuItems,
  pathname: currentUrl,
  device,
}: SectionProps<typeof loader>) {
  const [open, setOpen] = useState(false);

  if (device == "mobile") {
    return (
      <>
        <ul className="nav institucional-nav__close mobile mt-5 block relative uppercase font-medium text-black text-left">
          <li className="">
            <a
              href="#"
              className="block relative w-[127px] after:rotate-[135deg] after:absolute after:right-4 after:bottom-4  after:w-[7px] after:h-[7px] after:border-black after:border-t-[1px] after:border-r-[1px] border-[1px] border-black text-[13px] pl-[15px] pr-[53px] pb-2 pt-2"
              onClick={() => setOpen(!open)}
            >
              Opções
            </a>
            <ul
              className={`institucional-nav__list absolute pt-4 bg-white w-full mt-0 block overflow-hidden transition-all z-10	
              ${!open ? "max-h-0" : "max-h-[999em] border-[1px] border-black"}
            `}
            >
              {menuItems.map((item, index) => (
                <li key={index} className="flex items-center  mb-3 flex-nowrap">
                  <a
                    class="institucional-nav__anchor flex justify-start items-center h-12 pl-[15px] pr-[53px] pb-2 pt-2"
                    title="Ordem de Serviço"
                    href={item.href}
                  >
                    <i
                      class={`institucional-nav__icon
                inline-block relative w-[50px] h-[50px] rounded-[50%] 
                ${
                        currentUrl === item.href
                          ? "bg-[#c41c17] active"
                          : "bg-[#eee]"
                      }
              `}
                    >
                      <Icon
                        id={item?.icon}
                        width={item?.iconWidth ?? 50}
                        height={item?.iconHeight ?? 50}
                        strokeWidth={2}
                        viewBox={`0 0 ${item?.iconWidth} ${item?.iconHeight}`}
                        className={`${item?.icon === "Manual" ? "shine" : ""}`}
                      />
                    </i>
                    <span
                      class={`institucional-nav__nav-span pl-3 uppercase text-xs tracking-widest max-w-[130px] text-black
                ${currentUrl === item.href ? "font-bold" : "font-light"}
              `}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </>
    );
  }

  return (
    <>
      <ul className="nav institucional-nav__close relative mt-5 font-medium text-left pl-0 lg:top-8">
        {menuItems.map((item, index) => (
          <li key={index} className="flex items-center  mb-3 flex-nowrap">
            <a
              class="institucional-nav__anchor flex justify-start items-center h-12"
              title="Ordem de Serviço"
              href={item.href}
            >
              <i
                class={`institucional-nav__icon
                inline-block relative w-[50px] h-[50px] rounded-[50%] 
                ${
                  currentUrl === item.href ? "bg-[#c41c17] active" : "bg-[#eee]"
                }
              `}
              >
                <Icon
                  id={item?.icon}
                  width={item?.iconWidth ?? 50}
                  height={item?.iconHeight ?? 50}
                  strokeWidth={2}
                  viewBox={`0 0 ${item?.iconWidth} ${item?.iconHeight}`}
                  className={`${item?.icon === "Manual" ? "shine" : ""}`}
                />
              </i>
              <span
                class={`institucional-nav__nav-span pl-3 uppercase text-xs tracking-widest max-w-[130px] text-black
                ${currentUrl === item.href ? "font-bold" : "font-light"}
              `}
              >
                {item.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default AsideMenu;
