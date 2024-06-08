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
import Breadcrumb from "../ui/Breadcrumb.tsx";
import Button from "../ui/Button.tsx";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import { GetSearchQueryParameter } from "../../util/getSearchQueryParameter.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";

export type Format = "Show More" | "Pagination";

export interface Banner {
  img: ImageWidget;
  alt: string;
  url: string;
}

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

  banners?: Banner[];
}

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  layout?: Layout;

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
  isCollection = false,
}: Omit<Props, "page"> & {
  page: ProductListingPage;
  url: string;
  device?: string;
}) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const { nextPage, previousPage } = pageInfo;
  const perPage = pageInfo?.recordPerPage || products.length;
  const url = new URL(_url, window.location.origin);

  const { format = "Show More" } = layout ?? {};

  const id = useId();

  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;

  const isPartial = url.searchParams.get("partial") === "true";
  const hasParams = url.search.length > 1;
  const searchParams = url.search;
  const urlSearchCustom = `s?q=${GetSearchQueryParameter(searchParams)}`;

  const isFirstPage = !pageInfo.previousPage;

  const productsFound = (
    <h6 class="text-primary uppercase font-medium">
      {pageInfo.records} Produtos encontrados
    </h6>
  );

  return (
    <>
      <div class="w-full max-w-7xl m-auto px-1 sm:pb-5">
        {device === "desktop" && (
          <>
            <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
          </>
        )}
        <div class="flex flex-row gap-7">
          {filters.length > 0 && (!isCollection || hasParams) &&
              (isFirstPage || !isPartial)
            ? (
              <aside class="hidden sm:block w-min min-w-[300px]">
                <Filters filters={filters} device={device} />
                <div class="grid grid-cols-2 gap-6">
                  <a
                    href={`${
                      url.pathname === "/s" ? urlSearchCustom : url.pathname
                    }`}
                    class="inline-block cursor-pointer  h-11 font-scoutCond text-2xl tracking-one text-center leading-[44px] border border-black text-primary"
                  >
                    Limpar
                  </a>
                </div>
              </aside>
            )
            : (
              <aside class="hidden sm:block w-min min-w-[300px]">
                <div class="h-[52px] flex items-center mb-5">
                  <span class="lg:font-bold text-2xl text-black font-scout uppercase">
                    FILTRA POR:
                  </span>
                </div>
                <div class="lg:pt-6">
                  <div class="grid grid-cols-2 gap-4">
                    <Button
                      {...usePartialSection<typeof Result>({
                        props: { isCollection: false },
                      })}
                      class="inline-block cursor-pointer  h-11 font-scoutCond text-2xl tracking-one text-center leading-[44px] border border-black text-primary"
                    >
                      Limpar
                    </Button>
                  </div>
                </div>
              </aside>
            )}
          <div class="flex-grow" id={id}>
            {device !== "desktop"
              ? (
                <SearchControls
                  sortOptions={sortOptions}
                  filters={filters}
                  breadcrumb={breadcrumb}
                  displayFilter={layout?.variant === "drawer"}
                  quantityProduct={pageInfo.records}
                  type="searchResult"
                  url={url.toString()}
                  device={device}
                >
                </SearchControls>
              )
              : (
                <div class=" flex justify-between items-center gap-2.5">
                  <div class="hidden lg:block text-primary text-base  tracking-[.0625rem] uppercase font-scout">
                    {productsFound}
                  </div>
                  <div class="flex flex-row items-center justify-between border-b border-base-200 sm:border-none">
                    {sortOptions.length > 0 && (
                      <Sort sortOptions={sortOptions} />
                    )}
                  </div>
                </div>
              )}

            <ProductGallery
              products={products}
              offset={offset}
              layout={{
                columns: layout?.columns,
                format,
                banners: layout?.banners,
              }}
              pageInfo={pageInfo}
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

        {format == "Pagination" && (
          <div class="flex justify-center my-4">
            <div class="join">
              <a
                aria-label="previous page link"
                rel="prev"
                href={pageInfo.previousPage ?? "#"}
                class="btn btn-ghost join-item"
              >
                <Icon id="ChevronLeft" size={24} strokeWidth={2} />
              </a>
              <span class="btn btn-ghost join-item">
                Page {zeroIndexedOffsetPage + 1}
              </span>
              <a
                aria-label="next page link"
                rel="next"
                href={pageInfo.nextPage ?? "#"}
                class="btn btn-ghost join-item"
              >
                <Icon id="ChevronRight" size={24} strokeWidth={2} />
              </a>
            </div>
          </div>
        )}
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
