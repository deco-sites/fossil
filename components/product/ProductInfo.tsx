import { SendEventOnView } from "../../components/Analytics.tsx";
import AddToCartButtonVTEX from "../../islands/AddToCartButton/vtex.tsx";
import OutOfStock from "../../islands/OutOfStock.tsx";
import ShippingSimulation from "../../islands/ShippingSimulation.tsx";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../util/useOffer.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
// import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductInfoPriceModel from "./ProductInfoPriceModel.tsx";
import { mapProductToAnalyticsItem } from "../../util/formatToAnalytics.ts";

interface Props {
  page: ProductDetailsPage | null;

  sizeChartLink?: {
    url: string;
  };

  layout?: {
    /**
     * @title Product Name
     * @description How product title will be displayed. Concat to concatenate product and sku names.
     * @default product
     */
    name?: "concat" | "productGroup" | "product";
  };
}

function ProductInfo({
  page,
  sizeChartLink,
  device,
}: Props & {
  device?: string;
}) {
  const platform = usePlatform();
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { breadcrumbList, product } = page;
  const { productID, offers, isVariantOf } = product;
  const {
    price,
    listPrice,
    seller = "1",
    installment,
    availability,
    priceWithPixDiscount,
    pixPercentDiscountByDiferenceSellerPrice,
  } = useOffer(offers);

  let stock;
  let qtdText;

  if (offers) {
    stock = offers.offers[0].inventoryLevel.value;

    if (stock === 1) {
      qtdText = ` ${stock} peça em estoque`;
    } else {
      qtdText = ` ${stock} peças em estoque`;
    }
  }

  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const eventItem = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  const referenceID = product.additionalProperty?.find(
    ({ valueReference }) => valueReference == "ReferenceID",
  )?.value ?? product.gtin;

  return (
    <div
      class="flex flex-col mb-10 lg:mb-0  px-4 gap-1 lg:gap-6 w-full lg:w-[52%]"
      id={id}
    >
      {/* Add to Cart and Favorites button Mobile */}
      {device !== "desktop" && (
        <div class="flex justify-center w-full m-auto">
          {availability
            ? (
              <>
                {platform === "vtex" && (
                  <AddToCartButtonVTEX
                    eventParams={{ items: [eventItem] }}
                    productID={productID}
                    seller={seller}
                  />
                )}
              </>
            )
            : <OutOfStock productID={productID} />}
        </div>
      )}

      {/* Code and name */}
      <div class="mt-4 sm:mt-0">
        <h1>
          <span class="uppercase font-medium text-base-content text-xl lg:text-2xl">
            {isVariantOf?.name}
          </span>
        </h1>

        <div>
          <span class="text-xs font-normal text-[#585858]">
            Ref: {referenceID}
          </span>
        </div>

        {/**Reviews */}
        {availability && (
          <div class="h-6">
            <div id="yv-review-quickreview"></div>
          </div>
        )}
      </div>

      {/** stock */}
      {!(Number(stock) < 1 || Number(stock) > 3) && (
        <div>
          <div class=" px-2 block w-32 h-7 font-arial text-xs text-[#9e9e9e] text-center leading-7 border-solid border border-[#89a290]">
            {qtdText}
          </div>
        </div>
      )}

      {/* Prices */}
      {availability && (
        <ProductInfoPriceModel
          installmentBillingDuration={installment?.billingDuration}
          installmentBillingIncrement={installment?.billingIncrement}
          priceCurrency={offers?.priceCurrency}
          priceWithPixDiscount={priceWithPixDiscount}
          sellerPrice={price}
          listPrice={listPrice}
          pixPercentDiscountByDiferenceSellerPrice={pixPercentDiscountByDiferenceSellerPrice}
        />
      )}

      {/* Add to Cart and Favorites button */}
      <div class="flex flex-col gap-2">
        {device === "desktop" && (
          <>
            {availability
              ? (
                <>
                  {platform === "vtex" && (
                    <>
                      <AddToCartButtonVTEX
                        eventParams={{ items: [eventItem] }}
                        productID={productID}
                        seller={seller}
                      />
                    </>
                  )}
                </>
              )
              : <OutOfStock productID={productID} />}
          </>
        )}

        {/** size chart */}
        {sizeChartLink && (
          <div class="">
            <a href={sizeChartLink.url} class="text-primary my-4">
              <span class="underline block font-auto cursor-pointer text-primary text-sm">
                Tabela de Medidas
              </span>
            </a>
          </div>
        )}
      </div>

      {/* Shipping Simulation */}
      {availability && (
        <div class="">
          {platform === "vtex" && (
            <ShippingSimulation
              items={[
                {
                  id: Number(product.sku),
                  quantity: 1,
                  seller: seller,
                },
              ]}
            />
          )}
        </div>
      )}

      {/* Analytics Event */}
      <SendEventOnView
        id={id}
        event={{
          name: "view_item",
          params: {
            item_list_id: "product",
            item_list_name: "Product",
            items: [eventItem],
          },
        }}
      />
      {/** input Reviews */}
      <input class="hidden" id="___rc-p-id" value={productID} />
    </div>
  );
}

export default ProductInfo;
