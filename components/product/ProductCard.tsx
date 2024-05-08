import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import type { Platform } from "../../apps/site.ts";
import { SendEventOnClick } from "../../components/Analytics.tsx";
import Avatar from "../../components/ui/Avatar.tsx";
import {
  default as WishlistButtonVtex,
  default as WishlistButtonWake,
} from "../../islands/WishlistButton/vtex.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { relative } from "../../sdk/url.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  platform?: Platform;
}

const WIDTH = 400;
const HEIGHT = 400;

function ProductCard({
  product,
  preload,
  itemListName,
  platform,
  index,
  device,
}: Props & { device?: string }) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
    isVariantOf,
    inProductGroupWithID,
  } = product;
  const id = `product-card-${productID}`;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const productGroupID = isVariantOf?.productGroupID;
  const description = product.description || isVariantOf?.description;
  const productName = isVariantOf?.name;
  const [front, back] = images ?? [];
  const { listPrice, price, installments } = useOffer(offers);
  const possibilities = useVariantPossibilities(hasVariant, product);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});
  const relativeUrl = relative(url);
  const aspectRatio = `${WIDTH} / ${HEIGHT}`;

  return (
    <div
      id={id}
      data-deco="view-product"
      class="card card-compact group w-full lg:border-2 rounded-none border-transparent lg:hover:border-black p-3 lg:p-2"
    >
      {/* Add click event to dataLayer */}
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
                index,
              }),
            ],
          },
        }}
      />

      <div class="flex flex-col gap-1 group/product">
        <figure
          class="relative overflow-hidden"
          style={{ aspectRatio }}
        >
          {/* Wishlist button */}
          <div
            class={clx(
              "absolute top-0 left-0",
              "z-10 w-full",
              "flex items-center justify-end",
            )}
          >
            {/* Discount % */}
            <div class="text-sm">
              {(listPrice && price &&
                (Math.round(((listPrice - price) / listPrice) * 100) > 0)) && (
                <span class="w-9 h-9 flex items-center justify-center text-center text-sm font-medium bg-[#d20d17] text-white rounded-[100px]">
                  OFF
                </span>
              )}
            </div>
            <div class="hidden">
              {platform === "vtex" && (
                <WishlistButtonVtex
                  productGroupID={productGroupID}
                  productID={productID}
                />
              )}
              {platform === "wake" && (
                <WishlistButtonWake
                  productGroupID={productGroupID}
                  productID={productID}
                />
              )}
            </div>
          </div>

          {/* Product Images */}
          <a
            href={relativeUrl}
            aria-label="view product"
            class={clx(
              "absolute top-0 left-0",
              "grid grid-cols-1 grid-rows-1",
              "w-full",
            )}
          >
            <Image
              src={front.url!}
              alt={front.alternateName}
              width={WIDTH}
              height={HEIGHT}
              style={{ aspectRatio }}
              class={clx(
                "bg-base-100",
                "object-cover",
                "rounded w-full",
                "col-span-full row-span-full",
              )}
              sizes="(max-width: 400px) 50vw, 20vw"
              preload={preload}
              loading={preload ? "eager" : "lazy"}
              decoding="async"
            />
            {device === "desktop" && (
              <Image
                src={back?.url ?? front.url!}
                alt={back?.alternateName ?? front.alternateName}
                width={WIDTH}
                height={HEIGHT}
                style={{ aspectRatio }}
                class={clx(
                  "bg-base-100",
                  "object-cover",
                  "rounded w-full",
                  "col-span-full row-span-full",
                  "transition-opacity opacity-0 lg:group-hover:opacity-100",
                )}
                sizes="(max-width: 400px) 50vw, 20vw"
                loading="lazy"
                decoding="async"
              />
            )}
            {device === "desktop" && (
              <a
                href={relativeUrl}
                aria-label="view product"
                class="!transition-none !h-12 w-[96%] font-medium items-center justify-center !hover:brightness-90 uppercase !border-warning absolute bottom-2 right-0 !bg-[#A66C18] hidden text-white group-hover/product:flex text-base tracking-[1px] "
              >
                comprar
              </a>
            )}
          </a>
        </figure>

        {/* SKU Selector */}
        <ul class="flex items-center justify-center gap-2">
          {variants
            .map(([value, link]) => [value, relative(link)] as const)
            .map(([value, link]) => (
              <li>
                <a href={link}>
                  <Avatar
                    content={value}
                    variant={link === relativeUrl
                      ? "active"
                      : link
                      ? "default"
                      : "disabled"}
                  />
                </a>
              </li>
            ))}
        </ul>

        {/* Name/Description */}
        <div class="flex flex-col">
          <h2
            class="text-xs md:text-sm uppercase font-normal  leading-3 md:leading-4  text-primary-content tracking-one"
            dangerouslySetInnerHTML={{ __html: productName ?? "" }}
          />
        </div>
        {/**review */}
        <div class="h-5">
          <div class="yv-review-quickreview" value={inProductGroupWithID}></div> 
        </div>
      
        {/* Price from/to */}
        <div class="flex flex-col gap-1 font-light text-primary-content">
          {listPrice !== price && (
            <span class="line-through text-sm ">
              {formatPrice(listPrice, offers?.priceCurrency)}
            </span>
          )}

          <span class="text-sm font-bold tracking-one">
            {formatPrice(price, offers?.priceCurrency)}
          </span>
        </div>

        {/* Installments */}
        <span class="flex gap-2 font-light text-xs truncate text-primary-content">
          ou {installments}
        </span>
      </div>
    </div>
  );
}

export default ProductCard;
