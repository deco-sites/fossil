export { default as LoadingFallback } from "../../components/LoadingFallback.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import NJLPCarousel from "../../islands/NickJonas/NJLPCarousel.tsx";

/**
 * @titleBy name
 */
export interface ProductItem {
  /**
   * @title Imagem Frontal
   * @description Imagem principal do produto (414x545 desktop, 250x330 mobile)
   */
  frontImage?: ImageWidget;

  /**
   * @title Imagem Traseira
   * @description Imagem que aparece no hover (apenas desktop, mesmo tamanho da frontal)
   */
  backImage?: ImageWidget;

  /**
   * @title Texto Alt
   * @description Texto alternativo para acessibilidade
   */
  alt?: string;

  /**
   * @title Link do Produto
   * @description URL para a página do produto
   */
  href?: string;

  /**
   * @title Família do Produto
   * @description Ex: "Machine Luxe"
   */
  family?: string;

  /**
   * @title Nome do Produto
   * @description Nome completo do produto
   */
  name?: string;

  /**
   * @title Preço
   * @description Preço do produto
   */
  price?: string;
}

export interface Props {
  /**
   * @title Título da Seção
   * @description Apenas para acessibilidade
   */
  title?: string;

  /**
   * @title Produtos da Coleção
   * @description Lista de produtos a serem exibidos no carrossel
   */
  products?: ProductItem[];
}

function NJLPCollection({ title, products = [] }: Props) {
  if (!products.length) return null;

  return (
    <div class="w-full bg-nj-primary pt-5 lg:pt-16 lg:px-8 overflow-x-hidden">
      <div class="container max-w-7xl">
        {title && <h2 class="sr-only">{title}</h2>}

        {/* Carousel */}
        <NJLPCarousel products={products} />
      </div>
    </div>
  );
}

export default NJLPCollection;
