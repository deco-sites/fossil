export { default as LoadingFallback } from "../../components/LoadingFallback.tsx";
import { type FnContext } from "@deco/deco";
import CategoryCarousel from "../../islands/CategoryCarousel.tsx";
import { clx } from "../../sdk/clx.ts";
import { withDevice } from "../../sdk/withDevice.ts";
import { useId } from "../../sdk/useId.ts";
import { ImageWidget } from "apps/admin/widgets.ts";
import { usePartialSection } from "@deco/deco/hooks";

export interface Category {
  /**
   * @title Imagem
   * @description Tamanho sugerid: 284x348px
   */
  image?: ImageWidget;
  /**
   * @title Nome da categoria
   * @description Texto exibido abaixo da imagem
   */
  label?: string;
  /**
   * @title Link
   * @description URL para onde o item deve redirecionar ao clicar
   */
  href?: string;
}

export interface Props {
  /**
   * @title Subtítulo da sessão
   * @description Texto acima do título (ex: "Testados e Aprovados")
")
   */
  subtitle?: string;

  /**
   * @title Título da sessão
   * @description Título principal (ex: "Clássicos Essenciais")
   */
  title?: string;

  /**
   * @title Título primeira da aba
   * @description Texto exibido na primeira aba (ex: "Masculinos")
   */
  firstTabTitle?: string;

  /**
   * @title Título segunda da aba
   * @description Texto exibido na segunda aba (ex: "Femininos")
   */
  secondTabTitle?: string;

  /**
   * @title Cards
   * @description Lista de cards exibidos no carrossel
   */
  firstCategoryList?: Category[];

  /**
   * @title Cards
   * @description Lista de cards exibidos no carrossel
   */
  secondCategoryList?: Category[];

  /**
   * @ignore true
   */
  device?: "mobile" | "tablet" | "desktop";

  /**
   * @ignore true
   */
  activeIndex: number;
}

function CategoryTabs({
  subtitle,
  title,
  firstTabTitle,
  secondTabTitle,
  firstCategoryList,
  secondCategoryList,
  device,
  activeIndex = 0,
}: ReturnType<Awaited<typeof loader>>) {
  const id = useId();
  const activeList = activeIndex == 0 ? firstCategoryList : secondCategoryList;

  if (!firstCategoryList || firstCategoryList.length === 0) return null;

  const buttonStyle =
    "border border-[#cccccc] rounded-full px-4 lg:px-6 py-2 lg:py-3 text-xs lg:text-base font-medium hover:border-[#242424]";

  return (
    <div class="relative w-full">
      <div
        class={clx(
          "max-w-7xl mx-auto ",
        )}
      >
        <div class="py-8 lg:py-10 lg:border-b lg:border-b-[#B0B0B0]">
          <div class="px-6 lg:px-12 flex items-center justify-between mb-4 lg:gap-6 lg:mb-5">
            {(title || subtitle) && (
              <h2 class="text-xl font-bold leading-none">
                {subtitle && (
                  <span class="max-lg:uppercase max-lg:block max-lg:text-xs max-lg:font-normal">
                    {subtitle}
                    <span class="max-lg:hidden">:&nbsp;</span>
                  </span>
                )}
                {title ? title : ""}
              </h2>
            )}
            {(secondTabTitle && secondCategoryList) && (
              <div class="flex gap-2">
                {firstTabTitle && (
                  <button
                    class={clx(
                      buttonStyle,
                      activeIndex == 0 &&
                        "bg-[#242424] text-white border-[#242424]",
                    )}
                    {...usePartialSection<typeof CategoryTabs>({
                      props: { activeIndex: 0 },
                    })}
                  >
                    {firstTabTitle}
                  </button>
                )}
                {(secondTabTitle && secondCategoryList) && (
                  <button
                    class={clx(
                      buttonStyle,
                      activeIndex == 1 &&
                        "bg-[#242424] text-white border-[#242424]",
                    )}
                    {...usePartialSection<typeof CategoryTabs>({
                      props: { activeIndex: 1 },
                    })}
                  >
                    {secondTabTitle}
                  </button>
                )}
              </div>
            )}
          </div>
          <div class="pl-6 lg:px-12 max-w-7xl mx-auto">
            <CategoryCarousel
              list={activeList ?? []}
              device={device}
              carouselId={id}
            />
          </div>
        </div>
        <div class="mx-6 border-b border-b-[#B0B0B0] lg:hidden"></div>
      </div>
    </div>
  );
}

export const loader = (props: Props, _req: Request, ctx: FnContext) => {
  return withDevice(props, ctx);
};

export default CategoryTabs;
