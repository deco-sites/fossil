import { Head } from "$fresh/runtime.ts";
import { PageInfo, Product } from "apps/commerce/types.ts";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import ProductCard from "../../components/product/ProductCard.tsx";
import { Format } from "../../components/search/SearchResult.tsx";
import Spinner from "../../components/ui/Spinner.tsx";
import ShowMore from "../../islands/ShowMore.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";

export interface Columns {
  mobile?: 1 | 2;
  desktop?: 2 | 3 | 4 | 5;
}

export interface Props {
  products: Product[] | null;
  pageInfo: PageInfo;
  offset: number;
  layout?: {
    columns?: Columns;
    format?: Format;
  };
  url: URL;
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
  { products, layout, offset, device }: Props & { device?: string },
) {
  const platform = usePlatform();
  const mobile = MOBILE_COLUMNS[layout?.columns?.mobile ?? 2];
  const desktop = DESKTOP_COLUMNS[layout?.columns?.desktop ?? 4];

  return (
    <div
      class={`grid ${mobile} gap-2 items-center pt-6 ${desktop} sm:gap-10`}
    >
      {products?.map((product, index) => (
        <ProductCard
          key={`product-card-${product.productID}`}
          product={product}
          preload={index === 0}
          index={offset + index}
          platform={platform}
          device={device}
        />
      ))}
    </div>
  );
}

export default ProductGallery;
