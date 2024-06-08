import { useMemo } from "preact/hooks";
import { ProductListingPage } from "apps/commerce/types.ts";
import type { JSX } from "preact";

const SORT_QUERY_PARAM = "sort";
const PAGE_QUERY_PARAM = "page";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(
      globalThis.window.location?.search,
    );
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

// TODO: Replace with "search utils"
const applySort = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
  const urlSearchParams = new URLSearchParams(
    globalThis.window.location.search,
  );

  urlSearchParams.delete(PAGE_QUERY_PARAM);
  urlSearchParams.set(SORT_QUERY_PARAM, e.currentTarget.value);
  globalThis.window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions">;

// TODO: move this to the loader
const portugueseMappings = {
  "relevance:desc": "SELECIONE",
  "price:desc": "Maior Preço",
  "price:asc": "Menor Preço",
  "orders:desc": "Mais vendidos",
  "name:desc": "Nome - de Z a A",
  "name:asc": "Nome - de A a Z",
  "release:desc": "Data de Lançamento",
  "discount:desc": "Maior desconto",
};

function Sort({ sortOptions }: Props) {
  const sort = useSort();

  return (
    <>
      <label
        for="sort"
        class=" uppercase hidden lg:block text-[#636363] lg:text-18 font-scout"
      >
        Ordenar por :
      </label>
      <select
        id="sort"
        name="sort"
        onInput={applySort}
        class=" w-full h-[42px] lg:h-[36px] text-base py-2 rounded-none uppercase flex items-center justify-center lg:w-48  lg:m-2  cursor-pointer outline-none text-[#89A290] bg-[] border border-[#89A290] font-scout lg:text-xs leading-normal tracking-one lg:py-[10px] px-5"
        style={{
          color: "#89A290",
          backgroundColor: "white",
        }}
      >
        {sortOptions.map(({ value, label }) => ({
          value,
          label: portugueseMappings[label as keyof typeof portugueseMappings] ??
            label,
        })).filter(({ label }) => label).map(({ value, label }) => (
          <option key={value} value={value} selected={value === sort}>
            <span class="font-scout text-xs mb-[2px] leading-normal tracking-one uppercase">
              {label}
            </span>
          </option>
        ))}
      </select>
    </>
  );
}

export default Sort;
