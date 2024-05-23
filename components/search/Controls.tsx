import Button from "../../components/ui/Button.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Filters from "../../components/search/Filters.tsx";
import Sort from "../../islands/sort.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
import { useSignal } from "@preact/signals";
import type { ComponentChildren } from "preact";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { GetSearchQueryParameter } from "../../util/getSearchQueryParameter.ts";

export type FilterDrawerProps = {
  searchParams: string;
  quantityProduct: number;
  searchTerm: string;
};

export type Props =
  & Pick<ProductListingPage, "filters" | "breadcrumb" | "sortOptions">
  & {
    displayFilter?: boolean;
    quantityProduct?: number;
    type: "searchView" | "searchResult";
    filterDrawerProps?: FilterDrawerProps;
  };

function SearchControls(
  {
    filters,
    breadcrumb,
    displayFilter,
    sortOptions,
    quantityProduct,
    type,
    filterDrawerProps,
  }:
    & Props
) {
  const open = useSignal(false);

  const productsFound = (
    <h6 class="text-primary uppercase font-medium">
      {quantityProduct && quantityProduct <= 1
        ? quantityProduct + " Produto encontrado"
        : quantityProduct + " Produtos encontrados"}
    </h6>
  );

  return (
    <Drawer
      loading="lazy"
      open={open.value}
      onClose={() => open.value = false}
      aside={
        <>
          {type !== "searchView"
            ? (
              <div class="bg-base-100 flex flex-col h-full divide-y overflow-y-hidden">
                <div class="flex justify-between items-center">
                  <h1 class="px-4 py-3">
                    <span class="font-medium text-2xl">Filtrar</span>
                  </h1>
                  <Button
                    class="btn btn-ghost"
                    onClick={() => open.value = false}
                  >
                    <Icon id="XMark" size={24} strokeWidth={2} />
                  </Button>
                </div>
                <div class="flex-grow overflow-auto">
                  <Filters filters={filters} />
                </div>
              </div>
            )
            : (
              <div class="bg-base-100 flex flex-col h-full divide-y overflow-y-hidden w-3/4">
                <div class="flex flex-col border-t-2 border-[] justify-between mt-[6.3rem] px-6">
                  <div>
                    {filterDrawerProps && (
                      <FilterDrower {...filterDrawerProps} />
                    )}
                  </div>
                </div>
              </div>
            )}
        </>
      }
    >
      <div class="flex flex-col justify-between mb-4 pb-4 px-4 lg:pb-0 lg:px-0 lg:p-4 sm:mb-0 sm:p-0 sm:gap-4 sm:flex-row sm:h-[53px]">
        <div class="flex flex-row items-center sm:p-0 mb-2">
          <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
        </div>
        <div class="block lg:hidden text-primary text-base  tracking-[.0625rem] uppercase font-scout pb-5">
          {productsFound}
        </div>
        <div class="grid grid-cols-2 flex-row items-center justify-between border-b border-base-200 gap-[0.62rem] sm:gap-1 sm:border-none">
          <Button
            class={displayFilter
              ? "btn-ghost "
              : "btn-ghost w-full  h-[42px] rounded-none uppercase flex items-center justify-center   cursor-pointer outline-none text-[#89A290] border border-[#89A290] font-scout text-base leading-normal py-2 sm:hidden"}
            onClick={() => {
              open.value = true;
            }}
          >
            Filtrar
          </Button>
          {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
        </div>
      </div>
    </Drawer>
  );
}

export default SearchControls;

function FilterDrower(
  { searchParams, quantityProduct, searchTerm }: {
    searchParams: string;
    quantityProduct: number;
    searchTerm: string;
  },
) {
  return (
    <>
      <div class="h-[52px] flex items-center mb-5">
        <h1 class="font-normal text-2xl text-black font-scout uppercase">
          FILTRA POR:
        </h1>
      </div>
      <div class="lg:py-6">
        <a
          href={`s?q=${GetSearchQueryParameter(searchParams)}`}
          aria-label="link de pesquisa de produto"
          class="font-arial text-base text-primary uppercase lg:px-6 lg:mb-4"
        >
          {searchTerm == "relogio" ? "Relógios" : searchTerm}{"  "}
          ({quantityProduct})
        </a>
      </div>
    </>
  );
}
