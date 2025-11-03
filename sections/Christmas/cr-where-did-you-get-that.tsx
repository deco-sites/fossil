export { default as LoadingFallback } from "../../components/LoadingFallback.tsx";
import NJSimpleCarousel, {
  type Item,
} from "../../islands/NickJonas/NJSimpleCarousel.tsx";

export interface Props {
  /** @title Título da Seção */
  title?: string;
  /** @title Descrição */
  description?: string;
  /** @title Itens do Carrossel */
  items?: Item[];
  /** @title Intervalo do Autoplay (segundos) */
  autoplaySeconds?: number;
  /** @title Itens por página no desktop */
  perPageDesktop?: number;
  /** @title Itens por página no mobile */
  perPageMobile?: number;
}

export default function CRWhereDidYouGetThat({
  title,
  description,
  items = [],
  autoplaySeconds = 4,
  perPageDesktop = 4,
  perPageMobile = 2,
}: Props) {
  if (!items?.length) return null;

  return (
    <div class="w-full bg-cr-bg-primary pt-5 xl:pt-8 pb-10">
      <div class="text-center mb-6 lg:mb-8 px-5">
        <h2 class="font-benton italic text-4xl lg:text-6xl text-primary mb-4 leading-none">
          {title}
        </h2>
        {description && (
          <p class="font-soleil text-sm text-primary">{description}</p>
        )}
      </div>

      <NJSimpleCarousel
        perPage={perPageDesktop}
        perPageMobile={perPageMobile}
        autoplaySeconds={autoplaySeconds}
        items={items}
      />
    </div>
  );
}
