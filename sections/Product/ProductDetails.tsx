import { ProductDetailsPage } from "apps/commerce/types.ts";
import ImageGallerySlider from "../../components/product/Gallery/ImageSlider.tsx";
import ProductInfo from "../../components/product/ProductInfo.tsx";
import NotFound from "../../sections/Product/NotFound.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import ProductDescription from "../../components/product/ProductDescription.tsx";
import { AppContext } from "../../apps/site.ts";

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
  { page, flagDiscount, sizeChartLink, device }: Props & { device?: string },
) {
  if (!page?.seo) {
    return <NotFound />;
  }

  const { isVariantOf } = page?.product!;
  const description = page.product.description || isVariantOf?.description;
  const additionalProperty = page.product.isVariantOf?.additionalProperty ?? [];

  return (
    <div class="w-full  max-w-screen-2xl  m-auto lg:px-20 lg:mt-24  flex flex-col gap-6 lg:pb-10">
      <section class="w-full block px-4 lg:px-0 lg:mb-4">
        <ul class="flex flex-col lg:block max-lg:font-scoutCond font-arial">
          <li class="inline-block pb-1 mr-1  text-[#252525] font-arial font-semibold text-xs my-4 lg:my-0 leading-4">
            <a href="/" arial-label="Link para home" class="">Fossil /</a>
          </li>
          <li class="inline-block leading-8 text-[#252525] uppercase pb-2 text-28 lg:px-0 lg:pb-1 mr-1 font-medium lg:font-semibold lg:text-xs  lg:leading-4">
            {isVariantOf?.name}
          </li>
        </ul>
      </section>
      <div class="flex flex-col gap-6 lg:flex-row lg:justify-center">
        <ImageGallerySlider
          page={page}
          device={device}
        />
        <ProductInfo
          page={page}
          flagDiscount={flagDiscount}
          sizeChartLink={sizeChartLink}
          device={device}
        />
      </div>
      <ProductDescription
        description={description}
        additionalProperty={additionalProperty}
        device={device}
      />
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

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, device: ctx.device };
};
