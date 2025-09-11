export { default as LoadingFallback } from "../../components/LoadingFallback.tsx";

/**
 * @titleBy name
 */
export interface CategoryButton {
  /** @title Nome da Categoria */
  name?: string;
  /** @title URL da Categoria */
  url?: string;
}

export interface Props {
  /**
   * @title Título da Seção
   * @description Título principal da seção (usa fonte Benton Italic)
   */
  title?: string;

  /**
   * @title Categorias
   * @description Lista de categorias para navegação
   */
  categories?: CategoryButton[];
}

function NJShopByCategories({ title, categories }: Props) {
  if (!categories || categories.length === 0) return null;

  return (
    <div class="w-full bg-nj-primary py-10 lg:py-12 px-4 lg:px-8">
      <div class="container max-w-7xl">
        {title && (
          <div class="mb-5 max-lg:text-center">
            <h2 class="text-lg text-primary font-soleil font-bold uppercase tracking-wide">
              {title}
            </h2>
          </div>
        )}

        <div class="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
          {categories.map(
            (category, index) =>
              category?.name && (
                <a key={index} href={category.url || "#"} class="group block">
                  <div class="w-full max-w-60 mx-auto py-3 px-6 border-2 bg-white border-primary flex items-center justify-center transition-all duration-200 hover:bg-primary hover:text-nj-primary">
                    <span class="text-primary group-hover:text-nj-primary font-soleil font-bold text-sm uppercase tracking-wide">
                      {category.name}
                    </span>
                  </div>
                </a>
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default NJShopByCategories;
