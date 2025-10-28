export { default as LoadingFallback } from "../../components/LoadingFallback.tsx";
import { type FnContext } from "@deco/deco";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Button from "../../components/christmas/Button.tsx";
import Stars, { type StarsProps } from "../../components/christmas/Stars.tsx";
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
   * @description Título principal (ex: "The Nick List")
   */
  title?: string;

  /**
   * @title Descrição
   * @description Texto descritivo da coleção
   */
  description?: string;

  /**
   * @title Botão
   */
  button?: ButtonProps;

  /**
   * @title Imagem Desktop
   * @description Imagem principal para desktop
   */
  mainImageDesktop?: ImageWidget;

  /**
   * @title Largura da Imagem Desktop
   */
  mainImageDesktopWidth?: number;

  /**
   * @title Altura da Imagem Desktop
   */
  mainImageDesktopHeight?: number;

  /**
   * @title Imagem Mobile
   * @description Imagem principal para mobile
   */
  mainImageMobile?: ImageWidget;

  /**
   * @title Largura da Imagem Mobile
   */
  mainImageMobileWidth?: number;

  /**
   * @title Altura da Imagem Mobile
   */
  mainImageMobileHeight?: number;

  /**
   * @title Imagem das Estrelas
   */
  stars?: StarsProps;

  /**
   * @ignore true
   */
  device?: "mobile" | "tablet" | "desktop";
}

function CRNickList({
  title,
  description,
  button,
  mainImageDesktop,
  mainImageDesktopWidth,
  mainImageDesktopHeight,
  mainImageMobile,
  mainImageMobileWidth,
  mainImageMobileHeight,
  stars,
  device,
}: ReturnType<Awaited<typeof loader>>) {
  const isDesktop = device === "desktop";
  const aspectRatio = isDesktop
    ? `${mainImageDesktopWidth || 600}/${mainImageDesktopHeight || 600}`
    : `${mainImageMobileWidth || 600}/${mainImageMobileHeight || 600}`;

  return (
    <div class="relative w-full bg-cr-bg-secondary">
      <div class="container mx-auto px-8 lg:px-16 py-8 lg:pt-20 lg:pb-28 relative z-10">
        <div class="flex flex-col lg:flex-row justify-end items-center gap-5 lg:gap-10 xl:justify-start">
          <div class="relative">
            <div class="relative">
              {(mainImageDesktop || mainImageMobile) && (
                <Picture>
                  <Source
                    media="(max-width: 768px)"
                    src={mainImageMobile || mainImageDesktop!}
                    width={mainImageMobileWidth || 600}
                    height={mainImageMobileHeight || 600}
                  />
                  <Source
                    media="(min-width: 769px)"
                    src={mainImageDesktop || mainImageMobile!}
                    width={mainImageDesktopWidth || 600}
                    height={mainImageDesktopHeight || 600}
                  />
                  <img
                    class="max-w-full rounded-xl lg:max-w-[520px]"
                    src={mainImageDesktop || mainImageMobile}
                    alt={title || "The Nick List"}
                    style={{
                      aspectRatio,
                    }}
                  />
                </Picture>
              )}
              {isDesktop && stars?.image && (
                <>
                  <Stars
                    {...stars}
                    class="absolute top-5 -right-5 text-cr-primary hidden lg:block z-20 translate-x-full"
                  />
                  <Stars
                    {...stars}
                    class="absolute top-1/2 -left-10 text-cr-primary hidden lg:block z-20 -translate-x-full"
                  />
                </>
              )}
            </div>
          </div>

          <div class="flex flex-col gap-5 lg:gap-8 text-center lg:text-left items-center lg:items-start max-w-72 lg:max-w-none">
            <div>
              {title && (
                <h2
                  class="font-benton italic text-4xl lg:text-5xl xl:text-6xl text-white leading-none mb-1"
                  // deno-lint-ignore react-no-danger
                  dangerouslySetInnerHTML={{ __html: title }}
                />
              )}

              {description && (
                <p class="font-soleil text-white text-sm leading-relaxed max-w-96">
                  {description}
                </p>
              )}
            </div>
            {button?.name && (
              <Button name={button.name} url={button.url} class="font-normal" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const loader = (props: Props, _req: Request, ctx: FnContext) => {
  return withDevice(props, ctx);
};

export default CRNickList;
