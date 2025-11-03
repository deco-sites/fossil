export { default as LoadingFallback } from "../../components/LoadingFallback.tsx";
import { type FnContext } from "@deco/deco";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import SnowFooter from "../../components/christmas/SnowFooter.tsx";
import HeroCarousel from "../../islands/christmas/HeroCarousel.tsx";

import type { BannerItem } from "../../islands/christmas/HeroCarousel.tsx";
import { toStrongHTML } from "../../util/text.ts";
import { withDevice } from "../../sdk/withDevice.ts";

interface BannerCTA {
  /** @title Texto do Botão */
  /** @description Texto exibido no botão do banner */
  label?: string;
  /** @title URL do Botão */
  /** @description Link de destino do botão */
  href?: string;
}

/**
 * @titleBy title
 */
interface Banner {
  /** @title Imagem Desktop */
  /** @description Imagem do banner para telas desktop */
  desktop?: ImageWidget;

  /** @title Imagem Mobile */
  /** @description Imagem do banner para telas mobile */
  mobile?: ImageWidget;

  /** @title Texto Alternativo */
  /** @description Descrição da imagem para acessibilidade (alt) */
  alt?: string;

  /** @title Título do Banner (H2) */
  /** @description Título exibido sobre a imagem do banner */
  title?: string;

  /** @title Descrição do Banner */
  /** @description Texto exibido abaixo do título do banner */
  description?: string;

  /** @title CTA do Banner */
  /** @description Botão único do banner */
  cta?: BannerCTA;
}

interface CarouselConfig {
  /** @title Autoplay habilitado */
  /** @description Ativa/desativa o avanço automático dos slides */
  autoplay?: boolean;

  /** @title Pausar ao passar o mouse */
  /** @description Pausa o autoplay quando o mouse estiver sobre o carrossel */
  pauseOnHover?: boolean;

  /** @title Atraso do autoplay (segundos) */
  /** @description Tempo entre as trocas automáticas dos slides */
  delaySeconds?: number;

  /** @title Velocidade da transição (ms) */
  /** @description Duração da animação de transição entre slides */
  speedMs?: number;

  /** @title Mostrar setas */
  /** @description Exibe botões de navegação anterior/próximo */
  showArrows?: boolean;

  /** @title Mostrar pontos */
  /** @description Exibe indicadores (bolinhas) de navegação */
  showDots?: boolean;
}

export interface Props {
  /** @title Título (H1 - somente leitores de tela) */
  /** @description Título principal da página (renderizado como sr-only) */
  titleText?: string;

  /** @title Banners */
  /** @description Lista de banners exibidos no carrossel */
  banners?: Banner[];

  /** @title Configurações do carrossel */
  /** @description Controle de autoplay, velocidade e navegação */
  carousel?: CarouselConfig;

  /** @title Imagem do Centro da Borda Inferior */
  /** @description Imagem posicionada no centro da borda inferior (não será cortada) */
  bottomCenterImage?: ImageWidget;

  /** @title Largura da Imagem Central Inferior */
  /** @description Largura da imagem central inferior */
  bottomCenterImageWidth?: number;

  /** @title Altura da Imagem Central Inferior */
  /** @description Altura da imagem central inferior */
  bottomCenterImageHeight?: number;

  /** @title Imagem Neve Desktop */
  /** @description Imagem decorativa de neve para desktop */
  snowFooterDesktop?: ImageWidget;

  /** @title Imagem Neve Mobile */
  /** @description Imagem decorativa de neve para mobile */
  snowFooterMobile?: ImageWidget;

  /** @title Largura da Neve Desktop */
  /** @description Largura da imagem de neve para desktop */
  snowFooterDesktopWidth?: number;

  /** @title Altura da Neve Desktop */
  /** @description Altura da imagem de neve para desktop */
  snowFooterDesktopHeight?: number;

  /** @title Largura da Neve Mobile */
  /** @description Largura da imagem de neve para mobile */
  snowFooterMobileWidth?: number;

  /** @title Altura da Neve Mobile */
  /** @description Altura da imagem de neve para mobile */
  snowFooterMobileHeight?: number;
}

const DEFAULT_CAROUSEL: Required<CarouselConfig> = {
  autoplay: true,
  pauseOnHover: true,
  delaySeconds: 5,
  speedMs: 500,
  showArrows: false,
  showDots: false,
};

const toHeroCarouselItems = (banners?: Banner[]): BannerItem[] =>
  (banners ?? []).map((banner) => ({
    desktop: banner.desktop,
    mobile: banner.mobile,
    alt: banner.alt,
    title: banner.title,
    description: toStrongHTML(banner.description),
    cta: banner.cta,
  }));

function CRHero({
  titleText,
  banners,
  carousel,
  bottomCenterImage,
  bottomCenterImageWidth,
  bottomCenterImageHeight,
  snowFooterDesktop,
  snowFooterMobile,
  snowFooterDesktopWidth,
  snowFooterDesktopHeight,
  snowFooterMobileWidth,
  snowFooterMobileHeight,
  device,
}: ReturnType<Awaited<typeof loader>>) {
  const isDesktop = device === "desktop";
  const carouselConfig = { ...DEFAULT_CAROUSEL, ...carousel };
  const heroItems = toHeroCarouselItems(banners);
  const firstBannerTitle = heroItems[0]?.title;
  const srTitle = titleText || firstBannerTitle || "Campanha de Natal";

  return (
    <div class="relative w-full overflow-hidden">
      <div class="relative z-10 flex flex-col items-center md:px-4 lg:pt-[60px] lg:justify-between">
        <h1 class="sr-only">{srTitle}</h1>

        <div class="relative w-full max-w-full lg:px-[60px] lg:flex-shrink-0">
          <div
            class={`relative ${
              isDesktop ? "aspect-video" : "aspect-square w-full"
            }`}
          >
            <HeroCarousel
              items={heroItems}
              autoplay={carouselConfig.autoplay}
              pauseOnHover={carouselConfig.pauseOnHover}
              delaySeconds={carouselConfig.delaySeconds}
              speedMs={carouselConfig.speedMs}
              showArrows={carouselConfig.showArrows}
              showDots={carouselConfig.showDots}
              useGoldBorder
              isDesktop={isDesktop}
            />
          </div>

          {bottomCenterImage && (
            <div class="hidden lg:block absolute bottom-0 left-1/2 z-20 -translate-x-1/2 translate-y-1/2">
              <Image
                src={bottomCenterImage}
                alt="Decoração inferior"
                width={bottomCenterImageWidth || 200}
                height={bottomCenterImageHeight || 200}
                style={{
                  width: `${bottomCenterImageWidth || 200}px`,
                  height: "auto",
                  aspectRatio: `${bottomCenterImageWidth || 200}/${
                    bottomCenterImageHeight || 200
                  }`,
                }}
                loading="eager"
                fetchPriority="high"
                preload
              />
            </div>
          )}
        </div>

        <div class="lg:mt-2 lg:flex-shrink-0 lg:w-full">
          <SnowFooter
            desktopImage={snowFooterDesktop}
            mobileImage={snowFooterMobile}
            desktopWidth={snowFooterDesktopWidth}
            desktopHeight={snowFooterDesktopHeight}
            mobileWidth={snowFooterMobileWidth}
            mobileHeight={snowFooterMobileHeight}
            class="-mx-4 !w-[calc(100%+32px)]"
            preload
          />
        </div>
      </div>
    </div>
  );
}

export const loader = (props: Props, _req: Request, ctx: FnContext) =>
  withDevice(props, ctx);

export default CRHero;
