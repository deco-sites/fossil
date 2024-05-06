import Header from "../../components/ui/SectionHeader.tsx";
import { useId } from "../../sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Button from "../../components/ui/Button.tsx";

export interface CategoryGridProps {
  href?: string;
  image?: ImageWidget;
  /** @description Alternative text */
  label?: string;
  buttonText?: string;
}

export interface Props {
  header?: {
    /**
     * @default Explore Our Categories
     */
    title?: string;
    /**
     * @default Your description here
     */
    description?: string;
  };
  list?: CategoryGridProps[];
  layout?: {
    headerAlignment?: "center" | "left";
    categoryCard?: {
      textPosition?: "top" | "bottom";
      textAlignment?: "center" | "left";
    };
  };
}

const DEFAULT_LIST = [
  {
    href: "/category",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    label: "category",
    buttonText: "Explore collection",
  },
  {
    href: "/category",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    label: "category",
    buttonText: "Explore collection",
  },
  {
    href: "/category",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    label: "category",
    buttonText: "Explore collection",
  },
  {
    href: "/category",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    label: "category",
    buttonText: "Explore collection",
  },
];

function CategoryGrid(props: Props) {
  const id = useId();
  const {
    header = {
      title: "Explore Our Categories",
      description: "Your description",
    },
    list = DEFAULT_LIST,
    layout = {
      headerAlignment: "center",
      categoryCard: {
        textPosition: "bottom",
        textAlignment: "left",
      },
    },
  } = props;

  return (
    <div
      id={id}
      class="container mt-16"
    >
      <Header
        title={header.title}
        description={header.description || ""}
        alignment={layout.headerAlignment || "center"}
      />

      <div class="grid md:grid-cols-2 grid-cols-1 mt-6 px-4 lg:px-20 gap-x-6  gap-y-12">
        {list.map((
          { href, image, label, buttonText },
        ) => (
          <div class=" flex flex-col gap-4 items-center w-full ">
            <a
              href={href}
              class={` flex items-center w-full `}
            >
              {image &&
                (
                  <figure className={`w-full`}>
                    <Image
                      class="w-full h-auto object-cover"
                      src={image}
                      alt={label}
                      width={610}
                      height={400}
                      loading="lazy"
                      fetchPriority="auto"
                    />
                  </figure>
                )}
            </a>

            <h3 class="font-bold text-primary text-3xl">
              {label}
            </h3>

            <Button
              class="font-bold uppercase text-base text-primary  px-6  underline"
              aria-label={label}
            >
              {buttonText}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryGrid;
