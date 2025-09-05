import { formatPrice } from "../../sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

const allowedFilters = [
  "Cor",
  "Tamanho",
  "Coleção",
  "Gênero",
  "off",
].map((filter) => filter.toUpperCase());

const orderedFilters = [
  "off",
  "Cor",
  "Tamanho",
  "Coleção",
  "Gênero",
].map((filter) => filter.toUpperCase());

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue & {
    device?: string;
  },
) {
  return (
    <a
      href={url}
      rel="nofollow"
      class="flex items-center pt-1 gap-1 text-gray-600 text-sm font-arial"
    >
      <div
        aria-checked={selected}
        aria-label={label}
        role="checkbox"
        class="checkbox !rounded-none !h-4 !w-4 !border-black"
      />
      <span class="text-sm">{label}</span>
      {quantity > 0 && (
        <span class="text-gray-600 text-sm font-arial">({quantity})</span>
      )}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const selectedValues = values.filter((item) => item.selected);
  const unselectedValues = values.filter((item) => !item.selected);

  return (
    <>
      {selectedValues.length > 0
        ? (
          <div class="flex flex-wrap gap-2 mb-2 w-full">
            {selectedValues.map((item) => (
              <div
                key={item.value}
                class=" border-b-[3px] border-solid border-primary w-full flex justify-between"
              >
                <span class="font-semibold lg:pl-6 text-[#5A5A5A] text-sm font-arial">
                  {item.label}
                </span>
                <a href={item.url} class="ml-2 mr-2 text-[#5A5A5A]">x</a>
              </div>
            ))}
          </div>
        )
        : (
          unselectedValues.map((item) => {
            if (key === "price") {
              const range = parseRange(item.value);

              return range && (
                <ValueItem
                  key={item.value}
                  {...item}
                  label={`${formatPrice(range.from)} - ${
                    formatPrice(range.to)
                  }`}
                />
              );
            }

            return <ValueItem key={item.value} {...item} />;
          })
        )}
    </>
  );
}

function Filters({ filters, device }: Props & { device?: string }) {
  const isDesktop = device === "desktop";

  const filteredAndSortedFilters = filters
    .filter(isToggle)
    .filter((filter) => allowedFilters.includes(filter.label.toUpperCase()))
    .sort((a, b) => {
      const indexA = orderedFilters.indexOf(a.label.toUpperCase());
      const indexB = orderedFilters.indexOf(b.label.toUpperCase());

      // Se um filtro não estiver na lista de ordenação, coloca-o no final
      const orderA = indexA !== -1 ? indexA : orderedFilters.length;
      const orderB = indexB !== -1 ? indexB : orderedFilters.length;

      return orderA - orderB;
    });

  return (
    <>
      <span class="w-full table my-4 lg:my-0 lg:font-bold text-2xl text-black font-scout uppercase">
        FILTRAR POR:
      </span>
      <div>
        <div class="lg:mt-5 flex flex-col gap-4">
          {filteredAndSortedFilters.map((filter) => (
            <fieldset
              tabIndex={0}
              class="collapse collapse-plus rounded-none"
              key={filter.label}
              role="group"
              aria-labelledby={`filter-${filter.label}`}
            >
              <input
                type="checkbox"
                class="peer min-h-0 flex items-end"
                name="accordion"
                id={`filter-${filter.label}`}
                defaultChecked={isDesktop}
                aria-labelledby={`label-${filter.label}`}
              />
              <label
                id={`label-${filter.label}`}
                for={`filter-${filter.label}`}
                class="collapse-title !min-h-0 flex p-0 items-end tracking-one uppercase text-primary py-2 text-base font-arial leading-[110%] cursor-pointer border-b border-solid border-gray-300"
              >
                {filter.label}
              </label>
              <div class="collapse-content py-4 !px-0 flex flex-col">
                <FilterValues {...filter} />
              </div>
            </fieldset>
          ))}
        </div>
      </div>
    </>
  );
}

export default Filters;
