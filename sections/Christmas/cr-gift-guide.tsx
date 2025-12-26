import { Picture, Source } from "apps/website/components/Picture.tsx";
import Image from "apps/website/components/Image.tsx";
import type { FnContext } from "@deco/deco";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Button from "../../components/christmas/Button.tsx";
import GreenBorder from "../../components/christmas/GreenBorder.tsx";
import Stars, { type StarsProps } from "../../components/christmas/Stars.tsx";
import { withDevice } from "../../sdk/withDevice.ts";

const IMAGE_DIMENSIONS = {
  CARD_DESKTOP: { width: 270, height: 350 },
  CARD_MOBILE: { width: 160, height: 115 },
  MAIN_DESKTOP: { width: 570, height: 465 },
  MAIN_MOBILE: { width: 300, height: 300 },
} as const;

/**
 * @titleBy text
 */
export interface Card {
  /**
   * @title Imagem (Desktop)
   * @description Tamanho recomendado: 270x350. Para melhor resolução (2x): 540x700.
   */
  imageDesktop: ImageWidget;
  /**
   * @title Imagem (Mobile)
   * @description Tamanho recomendado: 160x115. Para melhor resolução (2x): 320x230.
   */
  imageMobile: ImageWidget;
  /**
   * @title Texto
   */
  text: string;
  /**
   * @title Link
   */
  link: string;
}

export interface Props {
  /**
   * @title Imagem Principal (Desktop)
   * @description Tamanho recomendado: 570x465. Para melhor resolução (2x): 1140x930.
   */
  mainImageDesktop: ImageWidget;
  /**
   * @title Imagem Principal (Mobile)
   * @description Tamanho recomendado: 300x300. Para melhor resolução (2x): 600x600.
   */
  mainImageMobile: ImageWidget;
  /**
   * @title Imagem do Padrão de Fundo
   * @description Padrão decorativo exibido no fundo da moldura verde
   */
  backgroundPattern?: ImageWidget;
  /**
   * @title Subtítulo
   * @description Texto pequeno acima do título
   */
  subtitle?: string;
  /**
   * @title Título
   */
  title?: string;
  /**
   * @title Texto do Botão
   */
  buttonText?: string;
  /**
   * @title Link do Botão
   */
  buttonLink?: string;
  /**
   * @title Estrelas (Mobile)
   */
  stars?: StarsProps;
  /**
   * @title Cards
   * @maxItems 4
   */
  cards?: Card[];
  /**
   * @ignore true
   */
  device?: "mobile" | "tablet" | "desktop";
}

function GiftCard({ card }: { card: Card }) {
  const { CARD_DESKTOP, CARD_MOBILE } = IMAGE_DIMENSIONS;

  return (
    <a
      href={card.link}
      class={`block relative w-full lg:w-[${CARD_DESKTOP.width}px] rounded-[8px] lg:rounded-[12px] overflow-hidden lg:border-[2px] lg:border-[#CEA951] aspect-[${CARD_MOBILE.width}/${CARD_MOBILE.height}] lg:aspect-[${CARD_DESKTOP.width}/${CARD_DESKTOP.height}]`}
    >
      <Picture>
        <Source
          media="(max-width: 768px)"
          src={card.imageMobile}
          width={CARD_MOBILE.width}
          height={CARD_MOBILE.height}
        />
        <Source
          media="(min-width: 769px)"
          src={card.imageDesktop}
          width={CARD_DESKTOP.width}
          height={CARD_DESKTOP.height}
        />
        <Image
          src={card.imageMobile}
          class="w-full h-full object-cover"
          alt={card.text}
          width={CARD_MOBILE.width}
          height={CARD_MOBILE.height}
          loading="lazy"
        />
      </Picture>
      <div class="absolute inset-0 flex items-end justify-center pb-2 lg:pb-6 lg:p-4">
        <span class="text-white font-soleil font-semibold lg:font-bold text-[10px] lg:text-[14px] text-center underline antialiased">
          {card.text}
        </span>
      </div>
    </a>
  );
}

export default function ChristmasGiftGuide({
  mainImageDesktop,
  mainImageMobile,
  backgroundPattern,
  subtitle = "TOP 10 GIFTS FOR HIM",
  title = "The look of a person who just opened the perfect gift.",
  buttonText = "His Gift Guide",
  buttonLink = "#",
  stars,
  cards = [],
  device,
}: ReturnType<Awaited<typeof loader>>) {
  const isDesktop = device === "desktop";
  const { MAIN_DESKTOP, MAIN_MOBILE } = IMAGE_DIMENSIONS;

  const contentSection = (
    <div class="relative flex flex-col items-center text-center lg:flex-1 lg:justify-center lg:px-12 lg:bg-[#58761c]/80 lg:text-white px-4 pt-6 pb-2 lg:py-0">
      {subtitle && (
        <span class="font-soleil text-[10px] lg:text-[12px] uppercase tracking-wider text-primary lg:text-white mb-2 lg:mb-4">
          {subtitle}
        </span>
      )}
      {title && (
        <h2
          class="font-benton text-[24px] lg:text-[60px] leading-tight lg:leading-none text-primary lg:text-white mb-6 lg:mb-8 px-4 lg:px-0"
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: title }}
        />
      )}
      {buttonText && (
        <Button
          name={buttonText}
          url={buttonLink}
          class="w-full lg:w-auto"
        />
      )}
    </div>
  );

  const mainImageSection = (
    <div class="relative w-full lg:flex-1 lg:h-full">
      {stars?.image && !isDesktop && (
        <div class="absolute -top-5 -right-7 z-10 lg:hidden">
          <Stars {...stars} />
        </div>
      )}
      <Picture>
        <Source
          media="(max-width: 768px)"
          src={mainImageMobile}
          width={MAIN_MOBILE.width}
          height={MAIN_MOBILE.height}
        />
        <Source
          media="(min-width: 769px)"
          src={mainImageDesktop}
          width={MAIN_DESKTOP.width}
          height={MAIN_DESKTOP.height}
        />
        <Image
          src={mainImageMobile}
          class="w-full h-full object-cover aspect-square lg:aspect-auto rounded-md lg:rounded-none"
          alt={title}
          width={MAIN_MOBILE.width}
          height={MAIN_MOBILE.height}
          loading="lazy"
        />
      </Picture>
    </div>
  );

  return (
    <section class="container max-[1320px]:px-5 max-w-7xl mx-auto">
      <div class="flex flex-col items-center my-8 lg:my-16">
        {isDesktop
          ? (
            <GreenBorder
              class="w-full bg-[#FFFBF0] aspect-[1200/500]"
              background={backgroundPattern}
              noPadding
            >
              <div class="flex w-full h-full">
                {contentSection}
                <div class="w-[5px] bg-[#27380C] relative z-20 flex-shrink-0" />
                {mainImageSection}
              </div>
            </GreenBorder>
          )
          : (
            <div class="relative rounded-xl p-3 bg-cr-bg-primary w-full">
              {mainImageSection}
              {contentSection}
            </div>
          )}

        {cards.length > 0 && (
          <div class="grid grid-cols-2 gap-2 mt-4 lg:flex lg:justify-center lg:gap-8 lg:mt-10 w-full lg:w-auto">
            {cards.map((card) => <GiftCard key={card.link} card={card} />)}
          </div>
        )}
      </div>
    </section>
  );
}

export const loader = (props: Props, _req: Request, ctx: FnContext) => {
  return withDevice(props, ctx);
};

export { default as LoadingFallback } from "../../components/LoadingFallback.tsx";
