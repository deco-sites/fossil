import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import type { ProductDetailsPage } from "apps/commerce/types.ts";

export interface HighLight {
  icon?: ImageWidget;
  label?: string;
  collectionId?: string;
  /** @default 0 */
  minPrice?: number;
  /** @format text-color */
  backgorundColor?: string;
  /** @format text-color */
  color?: string;
}

type Props = {
  product: ProductDetailsPage["product"];
  className?: string;
  highlights?: HighLight[];
  listPrice?: number;
};

export const DEFAULT_HIGHLIGHTS = [
  {
    "color": "#FFF",
    "label": "FRETE GRÁTIS",
    "minPrice": 550,
    "backgorundColor": "#949494",
  },
  {
    "color": "#FFF",
    "label": "NOVIDADES",
    "minPrice": 0,
    "collectionId": "574",
    "backgorundColor": "#000",
  },
] as HighLight[];

function ProductHighlights(props: Props) {
  const { product, highlights, listPrice } = props;
  const additionalProperty = product?.additionalProperty ?? [];
  const productHighlights = additionalProperty;

  if (!productHighlights.length) return null;
  if (!highlights) return null;

  return (
    <>
      {productHighlights.map(({ value, propertyID }) => {
        return highlights.map(
          (
            {
              collectionId,
              minPrice = 0,
              backgorundColor,
              color,
              label,
              icon,
            },
          ) => {
            if (
              propertyID == collectionId &&
              (listPrice ? listPrice >= minPrice : true)
            ) {
              return (
                <div
                  class="flex items-center justify-center uppercase font-bold leading-normal text-center w-auto h-5 min-w-[4.875rem] rounded-[0.3125rem] mb-[5px] text-[.5625rem] px-2"
                  style={{
                    background: backgorundColor,
                    color,
                  }}
                >
                  {icon
                    ? (
                      <Image
                        src={icon}
                        width={58}
                        height={58}
                      />
                    )
                    : label
                    ? label
                    : value}
                </div>
              );
            } else {
              return null;
            }
          },
        );
      })}
    </>
  );
}

export default ProductHighlights;
