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

const DEFAULT_PER_PAGE_DESKTOP = 4;
const DEFAULT_PER_PAGE_MOBILE = 2;
const DEFAULT_AUTOPLAY_SECONDS = 4;

function NJWhereDidYouGetThat({
  title,
  description,
  items = [],
  autoplaySeconds = DEFAULT_AUTOPLAY_SECONDS,
  perPageDesktop = DEFAULT_PER_PAGE_DESKTOP,
  perPageMobile = DEFAULT_PER_PAGE_MOBILE,
}: Props) {
  if (!items?.length) return null;

  return (
    <div class="w-full bg-nj-primary pt-16">
      {/* Header */}
      <div class="text-center mb-6 lg:mb-8 px-5">
        <h2 class="font-benton italic text-4xl lg:text-6xl text-primary mb-4 leading-none">
          {title}
        </h2>
        {description && (
          <p class="font-soleil text-sm text-primary">{description}</p>
        )}
      </div>

      {/* Carousel */}
      <NJSimpleCarousel
        perPage={perPageDesktop}
        perPageMobile={perPageMobile}
        autoplaySeconds={autoplaySeconds}
        items={items}
      />
    </div>
  );
}

export default NJWhereDidYouGetThat;
