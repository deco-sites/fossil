import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { SendEventOnView } from "../../components/Analytics.tsx";
import Filters from "../../components/search/Filters.tsx";
import Icon from "../../components/ui/Icon.tsx";
import SearchControls from "../../islands/SearchControls.tsx";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import NotFound from "./NotFound.tsx";
import { redirect } from "deco/mod.ts";
import { AppContext } from "../../apps/site.ts";
import Pagination from "../../islands/Pagination.tsx";
import Sort from "../../islands/sort.tsx";
import Button from "../ui/Button.tsx";
import Breadcrumb from "../ui/Breadcrumb.tsx";

export type Format = "Show More" | "Pagination";

export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns?: Columns;
  /**
   * @description Format of the pagination
   */
  format?: Format;
}

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  layout?: Layout;

  /** @hide */
  isCollection?: boolean;

  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
}

function Result({
  page,
  layout,
  startingPage = 0,
  url: _url,
  device,
  isCollection,
}: Omit<Props, "page"> & {
  page: ProductListingPage;
  url: string;
  device?: string;
}) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const { recordPerPage, nextPage, previousPage, currentPage } = pageInfo;
  const perPage = recordPerPage || products.length;

  const url = new URL(_url);

  const id = useId();

  const { format = "Show More" } = layout ?? {};

  const zeroIndexedOffsetPage = currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;

  const searchParams = url.search;

  const getSearchValue = (search: string) => {
    const nameMatch = search.match(/q=([^&]*)/);
    if (nameMatch) {
      const decodedValue = decodeURIComponent(nameMatch[1]);
      return decodedValue.split(" ")[0];
    }
    return "";
  };

  const getSearch = (search: string) => {
    const match = search.match(/q=([^&]*)/);
    return match ? match[1] : "";
  };

  const searchValue = getSearchValue(searchParams);

  const productsFound = (
    <h6 class="text-primary uppercase font-medium">
      {pageInfo.records} Produtos encontrados
    </h6>
  );

  return (
    <>
      <div class=" w-full max-w-7xl m-auto px-4 lg:px-0 sm:pb-10">
        <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
        <div class="flex flex-row">
          {layout?.variant === "aside" && filters.length > 0 &&
            (
              <aside class="hidden sm:block w-min min-w-[250px]">
                <div class="h-[52px] flex items-center mb-5">
                  <span class="font-bold text-2xl text-black font-scout uppercase">
                    FILTRA POR:
                  </span>
                </div>
                <div class="lg:py-6">
                  <a
                    href={`s?q=${getSearch(searchParams)}`}
                    arial-label="link de pesquisa de produto"
                    class="font-arial text-base text-primary uppercase lg:px-6 lg:mb-4"
                  >
                    {searchValue == "relogio" ? "Relógios" : searchValue}{"  "}
                    ({pageInfo.records})
                  </a>
                </div>
              </aside>
            )}
          <div class="flex-grow" id={id}>
            <div class=" flex justify-between items-center gap-2.5">
              <div class="hidden lg:block text-primary text-base  tracking-[.0625rem] uppercase font-scout">
                {productsFound}
              </div>
              <div class="flex flex-row items-center justify-between border-b border-base-200 sm:gap-1 sm:border-none">
                {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
              </div>
            </div>
            <ProductGallery
              products={products}
              offset={offset}
              layout={{ columns: layout?.columns, format }}
              pageInfo={pageInfo}
              url={url}
              device={device}
            />

            {(nextPage || previousPage) && (
              <Pagination
                pageInfo={pageInfo}
                productsLength={products.length}
                startingPage={startingPage}
              />
            )}
          </div>
        </div>
      </div>
      <SendEventOnView
        id={id}
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
            item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
            items: page.products?.map((product, index) =>
              mapProductToAnalyticsItem({
                ...(useOffer(product.offers)),
                index: offset + index,
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult(
  { page, device, url, ...props }: ReturnType<typeof loader>,
) {
  if (!page || page.products.length <= 0 || !page.products) {
    return <NotFound />;
  }

  return <Result {...props} page={page} device={device} url={url} />;
}

export const loader = (props: Props, req: Request, ctx: AppContext) => {
  const { page } = props;

  if (!page || !page.products || page.products.length === 0) {
    const url = new URL(req.url);
    url.pathname = "Sistema/buscavazia";
    redirect(url.toString(), 301);
  }

  return {
    ...props,
    url: req.url,
    device: ctx.device,
  };
};

export default SearchResult;
