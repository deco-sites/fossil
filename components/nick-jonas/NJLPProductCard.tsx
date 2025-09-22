import type { ProductItem } from "../../sections/NickJonas/nj-lp-collection.tsx";
import Image from "apps/website/components/Image.tsx";

interface Props {
  product: ProductItem;
  index: number;
}

export default function NJLPProductCard({ product, index }: Props) {
  const { frontImage, backImage, alt, href, family, name, price } = product;

  const ImageContainer = () => (
    <div class="img-container relative group w-full overflow-hidden">
      {/* Front Image */}
      {frontImage && (
        <Image
          src={frontImage}
          alt={alt || `${family} - ${index + 1}`}
          width={414}
          height={545}
          class={`card-img static-state w-full h-full object-cover transition-opacity duration-300 rounded-3xl ${
            backImage ? "lg:group-hover:opacity-0" : ""
          }`}
          sizes="(max-width: 768px) 250px, 414px"
          loading="lazy"
          decoding="async"
        />
      )}

      {/* Back Image - Desktop Only (CSS controlled) */}
      {backImage && (
        <Image
          src={backImage}
          alt={alt
            ? `${alt} - vista traseira`
            : `${family} - vista traseira - ${index + 1}`}
          width={414}
          height={545}
          class="card-img hover-state absolute inset-0 w-full h-full object-cover opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 hidden lg:block rounded-3xl"
          sizes="(max-width: 768px) 250px, 414px"
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );

  const ProductInfo = () => (
    <div class="card-body px-3 lg:px-6 mt-3 pt-0">
      <div class="product-info text-left font-soleil">
        {name && (
          <div class="color-text mb-1">
            <div class="text-primary font-soleil font-bold text-[14px] leading-5 group-hover:underline transition-all duration-200">
              {name}
            </div>
          </div>
        )}
        {price && (
          <p class="price-text text-primary font-soleil font-normal text-[12px] group-hover:underline transition-all duration-200">
            {Number(
              price.replace(/[^\d.,]/g, "").replace(",", "."),
            ).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        )}
      </div>
    </div>
  );

  const cardContent = (
    <div class="flex flex-col items-center justify-start text-left relative w-full">
      <ImageContainer />
      <ProductInfo />
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        class="block w-full focus:outline-none focus:ring-2 focus:ring-primary group"
        style={{ width: "100%", display: "inline-block" }}
        aria-label={family && name
          ? `Ver ${family} - ${alt || "produto"}`
          : `Ver produto ${index + 1}`}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <div
      class="block w-full"
      style={{ width: "100%", display: "inline-block" }}
    >
      {cardContent}
    </div>
  );
}
