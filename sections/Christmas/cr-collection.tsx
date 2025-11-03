export { default as LoadingFallback } from "../../components/LoadingFallback.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { Product } from "apps/commerce/types.ts";
import NJProductCarousel from "../../islands/NickJonas/NJProductCarousel.tsx";
import Image from "apps/website/components/Image.tsx";
import { useId } from "../../sdk/useId.ts";

export interface Button {
  /** @title Texto do Botão */
  name?: string;
  /** @title URL do Botão */
  url?: string;
}

/** @titleBy text */
export interface IconTextItem {
  /**
   * @title Imagem do Ícone
   * @description Tamanho 120x120 (renderizado 60x60)
   */
  image: ImageWidget;
  /** @title Texto Alternativo */
  alt: string;
  /** @title Texto */
  text: string;
}

export interface Props {
  /**
   * @title Título da Coleção
   * @description Título principal da seção (usa fonte Benton Italic)
   */
  title?: string;

  /**
   * @title Produtos da Coleção
   * @description Lista de produtos a serem exibidos no carrossel
   */
  products: Product[] | null;

  /**
   * @title Botão "Ver Todos"
   * @description Configuração do botão principal de call-to-action
   */
  shopAllButton?: Button;

  /**
   * @title Lista de Ícones e Textos
   * @description Itens com ícone e texto exibidos abaixo do carrossel
   */
  iconTextList?: IconTextItem[];
}

function IconTextList({ items }: { items: IconTextItem[] }) {
  if (!items || items.length === 0) return null;

  return (
    <div class="w-[calc(100%+40px)] lg:w-full -mx-5 lg:mx-0 overflow-x-auto lg:overflow-x-visible mt-8 mb-3 lg:mt-12 scrollbar-hide">
      <div class="flex gap-8 lg:gap-12 pl-5 lg:px-[84px] min-w-max lg:min-w-0 lg:justify-center">
        {items.map((item, index) => (
          <div
            key={index}
            class={`flex items-center gap-2 min-w-[120px] ${
              index === items.length - 1 ? "mr-5 lg:mr-0" : ""
            }`}
          >
            <Image src={item.image} alt={item.alt} width={60} height={60} />
            <span class="max-w-32 lg:max-w-none font-soleil text-sm text-primary">
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CRCollection({
  title,
  products,
  shopAllButton,
  iconTextList,
}: Props) {
  const id = useId();

  if (!products || products.length === 0) return null;

  return (
    <div class="w-full bg-cr-bg-primary pt-2 pb-3 px-5">
      <div class="container max-w-7xl">
        <NJProductCarousel
          products={products ?? []}
          title={title}
          shopAllButton={shopAllButton}
          carouselId={id}
        />
        {iconTextList && <IconTextList items={iconTextList} />}
      </div>
    </div>
  );
}
