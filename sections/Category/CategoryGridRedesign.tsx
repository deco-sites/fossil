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
      class="container mx-auto px-8 lg:px-12"
    >
      <h2 class="text-xl ">
        {title}
      </h2>

      <div class="grid md:grid-cols-2 grid-cols-1 mt-6 px-4 lg:px-20 gap-x-6  gap-y-12">
        {list.map((
          { image, href, label },
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
            <a
              class="font-bold uppercase text-base text-primary  px-6  underline"
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
