export { default as LoadingFallback } from "../../components/LoadingFallback.tsx";
import { type FnContext } from "@deco/deco";
import type { ImageWidget, VideoWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Button from "../../components/christmas/Button.tsx";
import GoldBorder from "../../components/christmas/GoldBorder.tsx";
import SnowFooter from "../../components/christmas/SnowFooter.tsx";
import { withDevice } from "../../sdk/withDevice.ts";

export interface ButtonProps {
  /**
   * @title Texto do Botão
   */
  name?: string;
  /**
   * @title URL do Botão
   */
  url?: string;
}

export interface Props {
  /**
   * @title Título
   * @description Título principal da seção
   */
  title?: string;

  /**
   * @title Descrição
   * @description Texto descritivo abaixo do título
   */
  description?: string;

  /**
   * @title Botão
   * @description Botão de call-to-action
   */
  button?: ButtonProps;

  /**
   * @title Vídeo Desktop
   * @description Vídeo de fundo para desktop dentro da borda dourada
   */
  videoDesktop?: VideoWidget;

  /**
   * @title Vídeo Mobile
   * @description Vídeo de fundo para mobile dentro da borda dourada
   */
  videoMobile?: VideoWidget;

  /**
   * @title Imagem de Fundo Desktop (alternativa ao vídeo)
   * @description Imagem de fundo para desktop dentro da borda dourada
   */
  imageDesktop?: ImageWidget;

  /**
   * @title Imagem de Fundo Mobile (alternativa ao vídeo)
   * @description Imagem de fundo para mobile dentro da borda dourada
   */
  imageMobile?: ImageWidget;

  /**
   * @title Imagem de Pôster do Vídeo
   * @description Imagem estática exibida enquanto o vídeo carrega
   */
  posterImage?: ImageWidget;

  /**
   * @title Zoom do Vídeo
   * @description Controle de zoom do vídeo (1.0 = normal, 1.05 = zoom leve)
   * @default 1.05
   */
  videoZoom?: number;

  /**
   * @title Boneco de Neve na Xícara
   * @description Imagem decorativa do boneco de neve
   */
  snowmanImage?: ImageWidget;

  /**
   * @title Largura do Boneco
   */
  snowmanWidth?: number;

  /**
   * @title Altura do Boneco
   */
  snowmanHeight?: number;

  /**
   * @title Neve Desktop
   */
  snowFooterDesktop?: ImageWidget;

  /**
   * @title Neve Mobile
   */
  snowFooterMobile?: ImageWidget;

  /**
   * @title Largura Neve Desktop
   */
  snowFooterDesktopWidth?: number;

  /**
   * @title Altura Neve Desktop
   */
  snowFooterDesktopHeight?: number;

  /**
   * @title Largura Neve Mobile
   */
  snowFooterMobileWidth?: number;

  /**
   * @title Altura Neve Mobile
   */
  snowFooterMobileHeight?: number;

  /**
   * @ignore true
   */
  device?: "mobile" | "tablet" | "desktop";
}

function CRCustom({
  title,
  description,
  button,
  videoDesktop,
  videoMobile,
  imageDesktop,
  imageMobile,
  posterImage,
  videoZoom = 1.05,
  snowmanImage,
  snowmanWidth = 300,
  snowmanHeight = 300,
  snowFooterDesktop,
  snowFooterMobile,
  snowFooterDesktopWidth,
  snowFooterDesktopHeight,
  snowFooterMobileWidth,
  snowFooterMobileHeight,
  device,
}: ReturnType<Awaited<typeof loader>>) {
  const isDesktop = device === "desktop";
  const hasVideo = !!(videoDesktop || videoMobile);

  const renderContent = () => (
    <div class="flex flex-col gap-5 items-start">
      {title && (
        <h2 class="font-benton italic text-5xl lg:text-6xl text-white leading-tight">
          {title}
        </h2>
      )}

      {description && (
        <p class="text-white text-sm font-soleil max-w-md leading-relaxed">
          {description}
        </p>
      )}

      {button?.name && (
        <Button name={button.name} url={button.url} class="font-normal" />
      )}
    </div>
  );

  return (
    <div class="relative w-full">
      <div class="container max-w-7xl mx-auto px-5 pt-8 lg:px-16 lg:py-24 2xl:px-0">
        {/* Desktop View */}
        {isDesktop && (
          <div class="hidden lg:block relative">
            <div class="w-full relative" style={{ aspectRatio: "1148/450" }}>
              <GoldBorder
                class="w-full h-full"
                variant="desktop"
                backgroundDesktop={!hasVideo ? imageDesktop : undefined}
                backgroundMobile={!hasVideo ? imageMobile : undefined}
                videoDesktop={hasVideo ? videoDesktop : undefined}
                videoMobile={hasVideo ? videoMobile : undefined}
                posterImage={hasVideo ? posterImage : undefined}
                videoZoom={hasVideo ? videoZoom : undefined}
              >
                <div class="flex items-center h-full ml-10 max-w-96">
                  {renderContent()}
                </div>
              </GoldBorder>
            </div>
          </div>
        )}

        {/* Mobile View */}
        {!isDesktop && (
          <div class="lg:hidden relative pb-14">
            <div class="relative">
              <GoldBorder
                class="aspect-square -mx-5 w-[calc(100% + 40px)]"
                variant="mobile"
                borderPosition="both"
                backgroundDesktop={!hasVideo ? imageDesktop : undefined}
                backgroundMobile={!hasVideo ? imageMobile : undefined}
                videoDesktop={hasVideo ? videoDesktop : undefined}
                videoMobile={hasVideo ? videoMobile : undefined}
                posterImage={hasVideo ? posterImage : undefined}
                videoZoom={hasVideo ? videoZoom : undefined}
              />
            </div>

            <div class="mt-5 flex flex-col lg:gap-5 items-center text-center">
              {title && (
                <h2 class="font-benton italic text-4xl lg:text-6xl text-white leading-tight">
                  {title}
                </h2>
              )}

              {description && (
                <p class="text-white text-sm font-soleil max-w-md leading-relaxed px-4">
                  {description}
                </p>
              )}

              {button?.name && (
                <Button
                  name={button.name}
                  url={button.url}
                  class="mt-5 lg:mt-0 font-normal"
                />
              )}
            </div>
          </div>
        )}
      </div>

      {snowmanImage && (
        <div class="absolute z-20 -bottom-5 left-1/2 -translate-x-1/2 lg:translate-0 lg:bottom-16 lg:left-auto lg:right-10 scale-50 lg:scale-100">
          <Image
            src={snowmanImage}
            alt="Snowman decoration"
            width={snowmanWidth}
            height={snowmanHeight}
            style={{
              aspectRatio: `${snowmanWidth}/${snowmanHeight}`,
            }}
          />
        </div>
      )}

      <div class="w-full">
        <SnowFooter
          desktopImage={snowFooterDesktop}
          mobileImage={snowFooterMobile}
          desktopWidth={snowFooterDesktopWidth}
          desktopHeight={snowFooterDesktopHeight}
          mobileWidth={snowFooterMobileWidth}
          mobileHeight={snowFooterMobileHeight}
        />
      </div>
    </div>
  );
}

export const loader = (props: Props, _req: Request, ctx: FnContext) => {
  return withDevice(props, ctx);
};

export default CRCustom;
