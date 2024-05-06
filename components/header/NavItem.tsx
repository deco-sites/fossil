import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { headerHeight } from "./constants.ts";

function NavItem({ item }: { item: SiteNavigationElement }) {
  const { url, name, children } = item;
  const image = item?.image?.[0];

  const hasSubMenu = children && children.length > 0 ? true : false;
  return (
    <li
      class={`group flex mb-1 ${
        hasSubMenu
          ? "n1-custom-text-shadow "
          : "hover:border-primary border-transparent border-solid border-b-4"
      }  items-center`}
    >
      <a href={url} class="py-6 ">
        <span
          class={`${
            name === "off" ? "text-[#FF1010]" : "text-black"
          } uppercase text-sm  font-medium`}
        >
          {name}
        </span>
      </a>

      {/* <div class="w-full h-2 hover:bg-primary"></div> */}

      {children && children.length > 0 &&
        (
          <div
            class="fixed hidden hover:flex group-hover:flex bg-base-100 z-50 items-start  justify-center gap-6  w-screen border-t-4 border-solid border-primary"
            style={{ top: "0px", left: "0px", marginTop: headerHeight }}
          >
            <div class=" w-full  max-w-7xl flex items-start  justify-between ">
              <ul class="flex items-start justify-center gap-6">
                {children.map((node, index) => (
                  <li class="p-6 flex flex-col">
                    <a
                      class="n1-custom-style-navbar  hover:font-bold"
                      href={node.url}
                    >
                      <span>{node.name}</span>
                    </a>

                    <ul class="block mt-4 ">
                      {node.children?.map((leaf) => (
                        <li>
                          <a
                            class=" text-[18px]  w-full leading-6  uppercase hover:font-bold text-primary whitespace-nowrap"
                            href={leaf.url}
                          >
                            <span class="">{leaf.name}</span>
                          </a>
                        </li>
                      ))}
                    </ul>

                    {index === 0 && (
                      <a href={url} class="pt-20">
                        <button class=" border-[1px] border-solid border-[#7F7F7F]  hover:bg-warning hover:border-none  font-medium text-primary hover:text-white w-[150px] h-11 text-[18px] leading-6 uppercase grid place-content-center">
                          Ver todos
                        </button>
                      </a>
                    )}
                  </li>
                ))}
              </ul>

              <div class="flex items-center justify-center gap-6">
                {item?.image && item.image.map((image) => (
                  image?.url && (
                    <Image
                      className="pt-6"
                      src={image.url}
                      alt={image.alternateName}
                      width={205}
                      height={236}
                      loading="lazy"
                    />
                  )
                ))}
              </div>
            </div>
          </div>
        )}
    </li>
  );
}

export default NavItem;
