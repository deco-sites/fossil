import { PageInfo, Product } from "apps/commerce/types.ts";
import ProductCard from "../../components/product/ProductCard.tsx";
import { Format } from "../../components/search/SearchResult.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Columns {
  mobile?: 1 | 2;
  desktop?: 2 | 3 | 4 | 5;
}

export interface Banner {
  img: ImageWidget;
  alt: string;
  url: string;
}

export interface Props {
  products: Product[] | null;
  pageInfo: PageInfo;
  offset: number;
  layout?: {
    columns?: Columns;
    format?: Format;
    banners?: Banner[];
  };
}

const MOBILE_COLUMNS = {
  1: "grid-cols-1",
  2: "grid-cols-2",
};

const DESKTOP_COLUMNS = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
};

function ProductGallery(
  { products, layout, offset, device, pageInfo }: Props & { device?: string },
) {
  const platform = usePlatform();
  const mobile = MOBILE_COLUMNS[layout?.columns?.mobile ?? 2];
  const desktop = DESKTOP_COLUMNS[layout?.columns?.desktop ?? 4];

  const remainingBanners = layout?.banners ? [...layout.banners] : [];

  const isFirstPage = !pageInfo.previousPage;

  console.log(isFirstPage);

  let i = 6;

  return (
    <div
      class={`grid ${mobile} gap-2 items-center pt-6 ${desktop} sm:gap-10`}
    >
      {products?.map((product, index) => {
        const shouldRenderBanner = remainingBanners.length > 0 &&
          (index + 1) % i === 0;
        let showBanner = null;

        if (shouldRenderBanner) {
          // Pegar o primeiro banner disponível e removê-lo da lista
          showBanner = remainingBanners.shift();
          i += 4;
        }

        return (
          <>
            {showBanner && isFirstPage
              ? (
                <div class="card cursor-pointer h-full w-full card-compact group lg:border-2 rounded-none border-transparent lg:hover:border-black  lg:p-2">
                  <a
                    href={showBanner.url}
                    class="flex flex-col h-full w-full  group/product lg:p-4"
                  >
                    <Image
                      src={showBanner.img}
                      width={271}
                      height={389}
                      alt={showBanner.alt}
                      fetchPriority="auto"
                      class=" w-full h-full object-cover"
                    />
                  </a>
                </div>
              )
              : (
                <ProductCard
                  key={`product-card-${product.productID}`}
                  product={product}
                  preload={index === 0}
                  index={offset + index}
                  platform={platform}
                  device={device}
                />
              )}
          </>
        );
      })}
    </div>
  );
}

export default ProductGallery;
