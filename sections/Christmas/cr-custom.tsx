export { default as LoadingFallback } from "../../components/LoadingFallback.tsx";
import type { FnContext } from "@deco/deco";
import type { ImageWidget, VideoWidget } from "apps/admin/widgets.ts";
import Button from "../../components/christmas/Button.tsx";
import GoldBorder from "../../components/christmas/GoldBorder.tsx";
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
   * @description Vídeo de fundo exibido dentro da moldura dourada no desktop
   */
  videoDesktop?: VideoWidget;

  /**
   * @title Vídeo Mobile
   * @description Vídeo de fundo exibido dentro da moldura dourada no mobile
   */
  videoMobile?: VideoWidget;

  /**
   * @title Imagem de Pôster do Vídeo (Desktop)
   * @description Imagem estática exibida enquanto o vídeo carrega no desktop
   */
  posterImageDesktop?: ImageWidget;

  /**
   * @title Imagem de Pôster do Vídeo (Mobile)
   * @description Imagem estática exibida enquanto o vídeo carrega no mobile
   */
  posterImageMobile?: ImageWidget;

  /**
   * @title Zoom do Vídeo
   * @description Controle de zoom do vídeo (1.0 = normal, 1.05 = zoom leve)
   * @default 1.05
   */
  videoZoom?: number;

  /**
   * @title Largura do Vídeo
   * @description Valor utilizado para calcular a proporção (aspect ratio)
   * @default 1163
   */
  videoWidth?: number;

  /**
   * @title Altura do Vídeo
   * @description Valor utilizado para calcular a proporção (aspect ratio)
   * @default 658
   */
  videoHeight?: number;

  /**
   * @title Largura do Vídeo (Mobile)
   * @description Valor utilizado para calcular a proporção no mobile
   * @default 375
   */
  videoWidthMobile?: number;

  /**
   * @title Altura do Vídeo (Mobile)
   * @description Valor utilizado para calcular a proporção no mobile
   * @default 375
   */
  videoHeightMobile?: number;

  /**
   * @title Cor do Texto (Desktop)
   * @description Cor do texto do título e descrição no desktop. No mobile sempre será branco.
   * @default Escuro
   */
  textColor?: "Claro" | "Escuro";

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
  posterImageDesktop,
  posterImageMobile,
  videoZoom = 1.05,
  videoWidth = 1163,
  videoHeight = 658,
  videoWidthMobile = 375,
  videoHeightMobile = 375,
  textColor = "Escuro",
  device,
}: ReturnType<Awaited<typeof loader>>) {
  const isDesktop = device === "desktop";
  // Ensure valid numbers for aspect ratio calculation
  const width = Number(videoWidth) || 1163;
  const height = Number(videoHeight) || 658;
  const paddingBottom = `${(height / width) * 100}%`;

  const widthMobile = Number(videoWidthMobile) || 375;
  const heightMobile = Number(videoHeightMobile) || 375;
  const paddingBottomMobile = `${(heightMobile / widthMobile) * 100}%`;

  const renderContent = (
    alignment: "left" | "center",
    textColor: "Claro" | "Escuro" = "Escuro",
  ) => (
    <div
      class={`flex flex-col ${
        alignment === "left"
          ? "items-start text-left"
          : "items-center text-center"
      }`}
    >
      {title && (
        <h2
          class={`font-benton italic text-4xl lg:text-6xl leading-tight ${
            textColor === "Claro" ? "text-white" : "text-primary"
          }`}
        >
          {title}
        </h2>
      )}

      {description && (
        <p
          class={`text-sm font-soleil max-w-md leading-relaxed ${
            textColor === "Claro" ? "text-white" : "text-primary"
          }`}
        >
          {description}
        </p>
      )}

      {button?.name && (
        <Button name={button.name} url={button.url} class="font-normal mt-5" />
      )}
    </div>
  );

  return (
    <div class="relative w-full">
      <div class="container max-w-7xl mx-auto px-5 pt-8 lg:px-16 lg:py-24 2xl:px-0">
        {isDesktop
          ? (
            <div class="hidden lg:block relative">
              <div class="w-full relative" style={{ paddingBottom }}>
                <div class="absolute inset-0 w-full h-full">
                  <GoldBorder
                    class="w-full h-full"
                    variant="desktop"
                    videoDesktop={videoDesktop}
                    videoMobile={videoMobile}
                    posterImage={posterImageDesktop}
                    videoZoom={videoZoom}
                  >
                    <div class="flex items-center h-full ml-10 max-w-96">
                      {renderContent("left", textColor)}
                    </div>
                  </GoldBorder>
                </div>
              </div>
            </div>
          )
          : (
            <div class="lg:hidden relative flex flex-col">
              <div
                class="-mx-5 w-[calc(100% + 40px)] relative"
                style={{ paddingBottom: paddingBottomMobile }}
              >
                <div class="absolute inset-0 w-full h-full">
                  <GoldBorder
                    class="w-full h-full"
                    variant="mobile"
                    borderPosition="both"
                    videoDesktop={videoDesktop}
                    videoMobile={videoMobile}
                    posterImage={posterImageMobile}
                    videoZoom={videoZoom}
                  />
                </div>
              </div>
              <div class="-mx-5 w-[calc(100% + 40px)] py-8 lg:py-12 px-6 relative">
                {renderContent("center", "Claro")}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

export const loader = (props: Props, _req: Request, ctx: FnContext) => {
  return withDevice(props, ctx);
};

export default CRCustom;
