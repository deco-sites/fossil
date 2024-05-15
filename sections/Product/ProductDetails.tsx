import { ProductDetailsPage } from "apps/commerce/types.ts";
import ImageGallerySlider from "../../components/product/Gallery/ImageSlider.tsx";
import ProductInfo from "../../components/product/ProductInfo.tsx";
import NotFound from "../../sections/Product/NotFound.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import ProductDescription from "../../components/product/ProductDescription.tsx";

export interface FlagDiscount {
  /**@title tag image */
  /**@description  " ex : AME" */
  image: ImageWidget;

  /** @format html */
  /** @title ex: Receba R$ 77,45 de volta pagando com Ame  */
  description: string;
}

export interface sizeChartLink {
  url: string;
}

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;

  /** @title Size chart link */
  sizeChartLink?: sizeChartLink;

  flagDiscount: FlagDiscount;
}

export default function ProductDetails(
  { page, flagDiscount, sizeChartLink }: Props,
) {
  if (!page?.seo) {
    return <NotFound />;
  }

  const { isVariantOf } = page?.product!;
  const description = page.product.description || isVariantOf?.description;
  const additionalProperty =  page.product.isVariantOf?.additionalProperty ?? [];

  return (
    <div class="w-full  max-w-screen-2xl m-auto lg:px-20  lg:mt-24 pb-8 flex flex-col gap-6 lg:pb-10">
      <div class="flex flex-col gap-6 lg:flex-row lg:justify-center">
        <ImageGallerySlider
          page={page}
        />
        <ProductInfo
          page={page}
          flagDiscount={flagDiscount}
          sizeChartLink={sizeChartLink}
        />
      </div>
      <ProductDescription description={description}  additionalProperty={additionalProperty}/>
    </div>
  );
}

export function LoadingFallback() {
  return (
    <div
      style={{ height: "710px" }}
      class="w-full flex justify-center items-center"
    >
      <span class="loading loading-spinner" />
    </div>
  );
}
