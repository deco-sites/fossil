import { SendEventOnView } from "../../components/Analytics.tsx";
import AddToCartButtonVTEX from "../../islands/AddToCartButton/vtex.tsx";
import OutOfStock from "../../islands/OutOfStock.tsx";
import ShippingSimulation from "../../islands/ShippingSimulation.tsx";
import { formatPrice } from "../../sdk/format.ts";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface Props {
  page: ProductDetailsPage | null;

  flagDiscount?: {
    /**@title tag image */
    /**@description  " ex : AME" */
    image: ImageWidget;

    /** @format html */
    /** @title ex: Receba R$ 77,45 de volta pagando com Ame  */
    description: string;
  };

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

function ProductInfo(
  { page, layout, flagDiscount, sizeChartLink, device }: Props & {
    device?: string;
  },
) {
  const platform = usePlatform();
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { breadcrumbList, product } = page;
  const {
    productID,
    offers,
    name = "",
    gtin,
    isVariantOf,
    additionalProperty = [],
  } = product;
  const description = product.description || isVariantOf?.description;
  const productName = isVariantOf?.name;
  const {
    price = 0,
    listPrice,
    seller = "1",
    installments,
    availability,
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

  const productGroupID = isVariantOf?.productGroupID ?? "";
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

  return (
    <div class="flex flex-col font- px-4 gap-6 w-full lg:w-[52%]" id={id}>
      {/* Add to Cart and Favorites button Mobile */}
      {device !== "desktop" && (
        <div class="flex justify-center w-full m-auto">
          {availability === "https://schema.org/InStock"
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
        </div>
      )}

      {/* Code and name */}
      <div class="mt-4 sm:mt-8">
        <h1>
          <span class="hidden lg:block text-nowrap font-medium  font-scoutCond text-3xl leading-10 tracking-one text-primary uppercase m-0 ">
            {productName && productName}
          </span>
        </h1>
        <p class="text-base font-medium tracking-one text-[#89a290]  font-arial">
          {name}
        </p>
      </div>

      <div>
        {/** stock */}
        {!(Number(stock) < 1 || Number(stock) > 3) && (
          <div class=" px-2 block w-32 h-7 font-arial text-xs text-[#9e9e9e] text-center leading-7 border-solid border border-[#89a290]">
            {qtdText}
          </div>
        )}

        {/**Reviews */}
        <div class="h-6">
          <div id="yv-review-quickreview"></div>
        </div>
      </div>

      {/* Prices */}
      <div class="">
        <div class="flex flex-col font-scoutCond">
          {(listPrice ?? 0) > price && (
            <span class="line-through block font-medium text-[#89a290] text-22 m-0 leading-none tracking-one">
              {formatPrice(listPrice, offers?.priceCurrency)}
            </span>
          )}
          <span class="tracking-one block text-primary font-medium text-3xl leading-none">
            {formatPrice(price, offers?.priceCurrency)}
          </span>
        </div>
        {(installments && typeof installments !== "string") && (
          <p class="text-sm mt-3 text-primary tracking-one font-arial">
            ou {installments.billingDuration} x de{"  "}
            <span class="font-bold text-primary">
              R$ {installments.billingIncrement} {" "}
            </span>
          </p>
        )}
      </div>
      {flagDiscount && (
        <div class="flex items-center ">
          <Image
            src={flagDiscount.image}
            width={70}
            height={19}
            alt="tag de desconto"
            loading="eager"
            fetchPriority="auto"
            class="mr-1"
          />

          <div
            class="border-l border-solid font-montserrat border-[#5C5C5C] pl-1 text-sm"
            dangerouslySetInnerHTML={{ __html: flagDiscount.description }}
          />
        </div>
      )}

      {/* Add to Cart and Favorites button */}
      <div class="flex flex-col gap-2">
        {device === "desktop" && (
          <>
            {availability === "https://schema.org/InStock"
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
              <span class="underline block  cursor-pointer  font-montserrat text-primary text-sm">
                Tabela de Medidas
              </span>
            </a>
          </div>
        )}
      </div>

      {/* Shipping Simulation */}
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
    </div>
  );
}

export default ProductInfo;
