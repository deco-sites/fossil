import type { Product } from "apps/commerce/types.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import ProductCard from "../components/product/ProductCard.tsx";
import { useDevice } from "@deco/deco/hooks";

export interface Props {
  title?: string;
  products?: Product[] | null;
  ctaText?: string;
  ctaLink?: string;
  showPagination?: boolean;
  currentPage?: number;
  totalPages?: number;
}

const mockProducts: Product[] = [
  {
    "@type": "Product",
    productID: "nick-jonas-1",
    url: "/nick-jonas-machine-luxe-1",
    name: "Nick Jonas Machine Luxe Lorem Ipsum",
    image: [
      {
        "@type": "ImageObject",
        alternateName: "Nick Jonas Machine Luxe Lorem Ipsum",
        url: "https://assets.decocache.com/fossil/2c72998f-2e0d-4c7b-b7fd-b8f88db4cdac/nick-jonas-product-1.jpg",
      },
    ],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "BRL",
      highPrice: 299.99,
      lowPrice: 199.99,
      offerCount: 1,
      offers: [
        {
          "@type": "Offer",
          price: 199.99,
          priceSpecification: [
            {
              "@type": "UnitPriceSpecification",
              priceType: "https://schema.org/ListPrice",
              price: 299.99,
            },
          ],
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            identifier: "1",
          },
        },
      ],
    },
    isVariantOf: {
      "@type": "ProductGroup",
      productGroupID: "nick-jonas-group-1",
      name: "Nick Jonas Machine Luxe Lorem Ipsum",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "category",
        value: "Nick Jonas Collection",
      },
    ],
  },
  {
    "@type": "Product",
    productID: "nick-jonas-2",
    url: "/nick-jonas-machine-luxe-2",
    name: "Nick Jonas Machine Luxe Lorem Ipsum",
    image: [
      {
        "@type": "ImageObject",
        alternateName: "Nick Jonas Machine Luxe Lorem Ipsum",
        url: "https://assets.decocache.com/fossil/7d1d8758-28b5-4f0e-87f4-716fc2611df9/nick-jonas-product-2.jpg",
      },
    ],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "BRL",
      highPrice: 399.99,
      lowPrice: 299.99,
      offerCount: 1,
      offers: [
        {
          "@type": "Offer",
          price: 299.99,
          priceSpecification: [
            {
              "@type": "UnitPriceSpecification",
              priceType: "https://schema.org/ListPrice",
              price: 399.99,
            },
          ],
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            identifier: "1",
          },
        },
      ],
    },
    isVariantOf: {
      "@type": "ProductGroup",
      productGroupID: "nick-jonas-group-2",
      name: "Nick Jonas Machine Luxe Lorem Ipsum",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "category",
        value: "Nick Jonas Collection",
      },
    ],
  },
  {
    "@type": "Product",
    productID: "nick-jonas-3",
    url: "/nick-jonas-machine-luxe-3",
    name: "Nick Jonas Machine Luxe Lorem Ipsum",
    image: [
      {
        "@type": "ImageObject",
        alternateName: "Nick Jonas Machine Luxe Lorem Ipsum",
        url: "https://assets.decocache.com/fossil/af5f0c31-e117-40f9-9e78-67d1c7e6c508/nick-jonas-product-3.jpg",
      },
    ],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "BRL",
      highPrice: 499.99,
      lowPrice: 399.99,
      offerCount: 1,
      offers: [
        {
          "@type": "Offer",
          price: 399.99,
          priceSpecification: [
            {
              "@type": "UnitPriceSpecification",
              priceType: "https://schema.org/ListPrice",
              price: 499.99,
            },
          ],
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            identifier: "1",
          },
        },
      ],
    },
    isVariantOf: {
      "@type": "ProductGroup",
      productGroupID: "nick-jonas-group-3",
      name: "Nick Jonas Machine Luxe Lorem Ipsum",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "category",
        value: "Nick Jonas Collection",
      },
    ],
  },
  {
    "@type": "Product",
    productID: "nick-jonas-4",
    url: "/nick-jonas-machine-luxe-4",
    name: "Nick Jonas Machine Luxe Lorem Ipsum",
    image: [
      {
        "@type": "ImageObject",
        alternateName: "Nick Jonas Machine Luxe Lorem Ipsum",
        url: "https://assets.decocache.com/fossil/d6df7f0f-e7be-409f-a609-914a9f88ec41/nick-jonas-product-4.jpg",
      },
    ],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "BRL",
      highPrice: 599.99,
      lowPrice: 499.99,
      offerCount: 1,
      offers: [
        {
          "@type": "Offer",
          price: 499.99,
          priceSpecification: [
            {
              "@type": "UnitPriceSpecification",
              priceType: "https://schema.org/ListPrice",
              price: 599.99,
            },
          ],
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            identifier: "1",
          },
        },
      ],
    },
    isVariantOf: {
      "@type": "ProductGroup",
      productGroupID: "nick-jonas-group-4",
      name: "Nick Jonas Machine Luxe Lorem Ipsum",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "category",
        value: "Nick Jonas Collection",
      },
    ],
  },
  {
    "@type": "Product",
    productID: "nick-jonas-5",
    url: "/nick-jonas-machine-luxe-5",
    name: "Nick Jonas Machine Luxe Lorem Ipsum",
    image: [
      {
        "@type": "ImageObject",
        alternateName: "Nick Jonas Machine Luxe Lorem Ipsum",
        url: "https://assets.decocache.com/fossil/3f5070ab-f241-4e8b-9be2-dda577e0a9a2/nick-jonas-product-5.jpg",
      },
    ],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "BRL",
      highPrice: 699.99,
      lowPrice: 599.99,
      offerCount: 1,
      offers: [
        {
          "@type": "Offer",
          price: 599.99,
          priceSpecification: [
            {
              "@type": "UnitPriceSpecification",
              priceType: "https://schema.org/ListPrice",
              price: 699.99,
            },
          ],
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            identifier: "1",
          },
        },
      ],
    },
    isVariantOf: {
      "@type": "ProductGroup",
      productGroupID: "nick-jonas-group-5",
      name: "Nick Jonas Machine Luxe Lorem Ipsum",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "category",
        value: "Nick Jonas Collection",
      },
      {
        "@type": "PropertyValue",
        name: "Free Gift With Purchase",
        value: "true",
      },
    ],
  },
];

export default function NickJonasProductShelf({
  title = "The Nick Jonas Collection",
  products,
  ctaText = "Shop All",
  ctaLink = "/nick-jonas-collection",
  showPagination = true,
  currentPage = 4,
  totalPages = 8,
}: Props) {
  const device = useDevice();
  const displayProducts = products || mockProducts;

  return (
    <div class="w-full max-w-[1280px] mx-auto px-14 py-0">
      {/* Header with Title and CTA */}
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center">
          <h2 class="text-xl font-bold text-black font-soleil">
            {title}
          </h2>
        </div>
        
        <div class="flex items-center gap-2">
          {/* Shop All Button */}
          <a
            href={ctaLink}
            class="bg-[#242424] text-white px-6 py-[15px] rounded-full text-sm font-bold font-soleil hover:bg-opacity-90 transition-colors"
          >
            {ctaText}
          </a>
          
          {/* Navigation Arrows */}
          <button 
            class="w-10 h-10 rounded-full bg-[#CCCCCC] flex items-center justify-center disabled:opacity-50"
            disabled
          >
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" class="rotate-180">
              <path d="M1 1L6 6L1 11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          
          <button class="w-10 h-10 rounded-full bg-[#242424] flex items-center justify-center hover:bg-opacity-90 transition-colors">
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
              <path d="M1 1L6 6L1 11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {displayProducts.slice(0, 5).map((product, index) => (
          <div key={product.productID} class="w-full">
            <ProductCard
              product={product}
              itemListName="Nick Jonas Collection"
              index={index}
              preload={index === 0}
              device={device}
            />
          </div>
        ))}
      </div>

      {/* Scroll Bar */}
      <div class="relative mb-4">
        <div class="w-full h-[3px] bg-[#EDEDED] rounded-full">
          <div 
            class="h-full bg-[#242424] rounded-full transition-all duration-300"
            style={{ width: "23.5%" }}
          />
        </div>
      </div>

      {/* Pagination */}
      {showPagination && (
        <div class="flex justify-end">
          <span class="text-sm text-[#6A6A6A] font-soleil">
            {currentPage} of {totalPages}
          </span>
        </div>
      )}
    </div>
  );
}