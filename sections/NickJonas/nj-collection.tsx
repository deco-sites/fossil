export { default as LoadingFallback } from "../../components/LoadingFallback.tsx";
import type { Product } from "apps/commerce/types.ts";
import NJProductCarousel from "../../islands/NickJonas/NJProductCarousel.tsx";

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
  if (!products || products.length === 0) return null;

  return (
    <div class="w-full bg-nj-primary pt-6 lg:pt-16 pb-3 px-5">
      <div class="container max-w-7xl">
        <NJProductCarousel
          products={products ?? []}
          title={title}
          shopAllButton={shopAllButton}
          promotionalText={promotionalText}
        />
      </div>
    </div>
  );
}

export default NJCollection;
