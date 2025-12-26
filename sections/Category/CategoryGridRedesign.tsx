import Header from "../../components/ui/SectionHeader.tsx";
import { useId } from "../../sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface CategoryGridRedesignProps {
  /**
   * @title Imagem
   * @description Tamanho sugerido: 274x360px
   */
  image: ImageWidget;
  /**
   * @title Nome da categoria
   * @description Texto exibido abaixo da imagem
   */
  label: string;
  /**
   * @title Link
   * @description URL para onde o item deve redirecionar ao clicar
   */
  href: string;
}

export interface Props {
  /**
   * @title Título
   * @description Título principal (ex: "Compre Por Categoria")
   */
  title: string;
  /**
   * @title Categorias
   * @description Lista de categorias
   */
  list: CategoryGridRedesignProps[];
}

const DEFAULT_LIST = [
  {
    image:
      "https://assets.decocache.com/fossil/b1a3658f-fcbd-4b19-aea1-c7676e8a911b/1.png",
    label: "Masculinos",
    href: "#1",
  },
  {
    image:
      "https://assets.decocache.com/fossil/15b94b85-6008-412a-80ea-8ff8ed906d45/2.png",
    label: "Femininos",
    href: "#2",
  },
  {
    image:
      "https://assets.decocache.com/fossil/18846491-3caf-4cda-8954-c956f32dcbec/3.png",
    label: "Relógios",
    href: "#3",
  },
  {
    image:
      "https://assets.decocache.com/fossil/09e561c5-d418-4e49-aabd-d1c33a46309c/4.png",
    label: "Presentes Personalizados",
    href: "#4",
  },
];

function CategoryGridRedesign(props: Props) {
  const id = useId();
  const {
    title = "Compre Por Categoria",
    list = DEFAULT_LIST,
  } = props;

  return (
    <div
      id={id}
      class="max-w-7xl mx-auto px-6 py-8 lg:py-12 lg:px-12"
    >
      <h2 class="text-xl leading-none font-bold mb-8">
        {title}
      </h2>

      <div class="grid grid-cols-2 gap-x-4 gap-y-7 lg:grid-cols-4 lg:my-6 lg:gap-x-6">
        {list.map((
          { image, href, label },
        ) => (
          <div class="flex flex-col gap-4">
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
                      width={274}
                      height={360}
                      loading="lazy"
                      fetchPriority="auto"
                    />
                  </figure>
                )}
            </a>
            <a
              class="text-xs lg:text-base lg:font-bold max-lg:uppercase"
              aria-label={label}
              href={href}
            >
              {label}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryGridRedesign;
