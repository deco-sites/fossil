import type { Product } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { SendEventOnClick } from "../../components/Analytics.tsx";
import { clx } from "../../sdk/clx.ts";
import { relative } from "../../sdk/url.ts";
import { mapProductToAnalyticsItem } from "../../util/formatToAnalytics.ts";
import { useOffer } from "../../util/useOffer.ts";

interface Props {
  product: Product;
  preload?: boolean;
  itemListName?: string;
  index?: number;
  hideImage?: boolean;
  promotionalText?: string;
}

const WIDTH = 400;
const HEIGHT = 400;

function NJProductCard({
  product,
  preload,
  itemListName,
  index,
  hideImage = false,
  promotionalText,
}: Props) {
  const { url, productID, image: images, offers, isVariantOf } = product;

  const id = `nj-product-card-${productID}`;
  const [front, back] = images ?? [];
  const { listPrice, price } = useOffer(offers);
  const relativeUrl = relative(url);
  const aspectRatio = `${WIDTH} / ${HEIGHT}`;
  const productName = isVariantOf?.name || "";

  return (
    <div id={id} data-deco="view-product" class="group w-full h-full">
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

      <a
        href={relativeUrl}
        aria-label={`View ${productName}`}
        class="block w-full h-full"
      >
        <div class="flex flex-col font-soleil space-y-1">
          <figure
            class="relative overflow-hidden bg-white transition-all duration-300"
            style={{ aspectRatio }}
          >
            {hideImage && (
              <div
                class="absolute inset-0 bg-gray-200 animate-pulse pointer-events-none"
                aria-hidden="true"
              />
            )}
            <Image
              src={front.url!}
              alt={front.alternateName}
              width={WIDTH}
              height={HEIGHT}
              style={{ aspectRatio }}
              class={clx(
                "object-cover w-full h-full",
                "transition-transform duration-300",
                "group-hover:scale-105",
                // fade image once ready
                "transition-opacity duration-300",
                hideImage ? "opacity-0" : "opacity-100",
              )}
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
              preload={preload}
              loading={preload ? "eager" : "lazy"}
              decoding="async"
            />

            <div class="hidden lg:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {back && (
                <Image
                  src={back.url ?? ""}
                  alt={back.alternateName}
                  width={WIDTH}
                  height={HEIGHT}
                  style={{ aspectRatio }}
                  class={clx(
                    "absolute top-0 left-0 object-cover w-full h-full",
                    "transition-opacity duration-300",
                    hideImage
                      ? "opacity-0"
                      : "opacity-0 group-hover:opacity-100",
                  )}
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
                  loading="lazy"
                  decoding="async"
                />
              )}
            </div>
          </figure>

          <div class="text-left space-y-1">
            <h3 class="text-sm text-primary font-soleil transition-colors duration-200 group-hover:text-primary/80">
              {productName}
            </h3>
            {price && (
              <p class="text-sm text-primary font-soleil font-bold">
                {price?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            )}
            {promotionalText && (
              <p class="text-xs text-[#D22B20] font-soleil">
                {promotionalText}
              </p>
            )}
          </div>
        </div>
      </a>
    </div>
  );
}

export default NJProductCard;
