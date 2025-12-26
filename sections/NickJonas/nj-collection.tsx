export { default as LoadingFallback } from "../../components/LoadingFallback.tsx";
import type { Product } from "apps/commerce/types.ts";
import NJProductCarousel from "../../islands/NickJonas/NJProductCarousel.tsx";
import { useId } from "../../sdk/useId.ts";

export interface Button {
  /** @title Texto do Botão */
  name?: string;
  /** @title URL do Botão */
  url?: string;
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
   * @title Texto Promocional
   * @description Texto promocional a ser exibido abaixo do preço
   */
  promotionalText?: string;
}

function NJCollection({
  title,
  products,
  shopAllButton,
  promotionalText,
}: Props) {
  const id = useId();

  if (!products || products.length === 0) return null;

  return (
    <div class="px-6 lg:px-12 py-8 lg:py-10 max-w-7xl mx-auto">
      <NJProductCarousel
        products={products ?? []}
        title={title}
        shopAllButton={shopAllButton}
        promotionalText={promotionalText}
        carouselId={id}
      />
    </div>
  );
}

export default NJCollection;
