import type { BreadcrumbList } from "apps/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Breadcrumb({ itemListElement = [] }: Props) {
  const items = [{ name: "FOSSIL", item: "/" }, ...itemListElement];

  return (
    <div class="breadcrumbs-fossil uppercase font-arial text-xs font-semibold text-primary lg:mb-6 lg:mt-5">
      <ul>
        {items
          .filter(({ name, item }) => name && item)
          .map(({ name, item }) => (
            <li class=" opacity-60  last-of-type:opacity-100">
              <a href={item}>{name}</a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Breadcrumb;
