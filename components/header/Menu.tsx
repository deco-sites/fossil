import type { SiteNavigationElement } from "apps/commerce/types.ts";
export interface Props {
  items: SiteNavigationElement[];
}

function MenuItem(
  { item, isParent }: { item: SiteNavigationElement; isParent?: boolean },
) {
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div
      className={hasChildren
        ? "collapse"
        : "collapse-title !uppercase !px-0 !text-sm flex items-center justify-between"}
    >
      {hasChildren
        ? (
          <>
            <input type="checkbox" />
            <div
              className={`collapse-title !uppercase !px-0 !text-sm flex items-center justify-between ${
                item.name === "off" ? "!text-[#FF1010]" : "!text-black"
              }`}
            >
              {item.name}
              <span className="font-bold text-3xl leading-4 text-black">
                &rsaquo;
              </span>
            </div>

            <div className="collapse-content">
              <ul>
                {item.children?.map((node) => (
                  <li key={node}>
                    <MenuItem item={node} />
                  </li>
                ))}

                {isParent && (
                  <li className="grid place-content-center w-64 mt-4 mx-auto bg-warning">
                    <a className="py-2 px-4 text-white font-se" href={item.url}>
                      Ver todos
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </>
        )
        : (
          <a
            href={item.url}
            className={`${
              item.name === "off" ? "!text-[#FF1010]" : "!text-black"
            }`}
            alt={item.name}
          >
            {item.name}
          </a>
        )}
    </div>
  );
}

function Menu({ items }: Props) {
  return (
    <div class="flex flex-col h-full">
      <ul class="px-4 flex-grow flex flex-col divide-y divide-base-200 bg-white overflow-y-scroll">
        {items.map((item, index) => (
          <li>
            <MenuItem item={item} isParent={true} />
          </li>
        ))}
        <li>
          <div class="collapse-title !uppercase !px-0 !text-sm flex items-center justify-between ">
            <a href="/account" alt="account !text-black">MINHA CONTA</a>
            <span className="font-bold text-3xl leading-4 text-black">
              &rsaquo;
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
