import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { AppContext } from "../../apps/site.ts";

interface HeroPropsBanner {
  /**
   * @title Imagem (Desktop)
   * @description Tamanho recomendado: 1280x533
   */
  desktopImage: ImageWidget;

  /**
   * @title Imagem (Mobile)
   * @description Tamanho recomendado: 375x267
   */
  mobileImage: ImageWidget;

  /**
   * @title Texto Alternativo
   * @description Descrição da imagem para acessibilidade
   */
  alt: string;

  /**
   * @title Título
   * @description Texto exibido no título do header (ex: "ADERINDO AO NOVO")
   */
  title: string;

  /**
   * @title Subtítulo
   * @description Texto exibido no subtítulo do header (ex: "Comece o ano no tom certo, com estilos novos e cheios de energia")
   */
  subtitle: string;

  /**
   * @title Primeiro CTA
   * @description Primeiro botão de chamada para ação
   */
  button: {
    /**
     * @title Texto
     * @description Texto exibido no botão
     */
    label?: string;
    /**
     * @title Link
     * @description URL para onde o botão deve redirecionar ao clicar
     */
    href?: string;
  };

  /**
   * @title Segundo CTA
   * @description Segundo botão de chamada para ação
   */
  button2: {
    /**
     * @title Texto
     * @description Texto exibido no botão
     */
    label?: string;
    /**
     * @title Link
     * @description URL para onde o botão deve redirecionar ao clicar
     */
    href?: string;
  };
}

const HeroBanner = (
  {
    desktopImage,
    mobileImage,
    device,
    alt,
    title,
    subtitle,
    button,
    button2,
  }: HeroPropsBanner & { device?: string },
) => {
  return (
    <div className="w-full m-auto lg:flex lg:items-center">
      {device === "desktop"
        ? (
          <Image
            width={1280}
            height={533}
            src={desktopImage}
            alt={alt}
            class="object-cover w-full"
            fetchPriority="auto"
            loading="lazy"
          />
        )
        : (
          <Image
            width={375}
            height={267}
            src={mobileImage}
            alt={alt}
            class="object-cover w-full h-auto"
            fetchPriority="auto"
            loading="lazy"
          />
        )}
      <div class="py-9 lg:py-0 px-6 lg:px-10 xl:px-40 lg:absolute max-lg:[bg-#FFFBF0]">
        <h2 class="text-3xl font-bold mb-3 lg:mb-4 uppercase">
          {title}
        </h2>
        <p class="text-sm lg:text-base mb-4">
          {subtitle}
        </p>
        <div class="flex gap-2">
          {(button.label && button.href) && (
            <a
              class="bg-black rounded-full px-5 py-3 text-xs text-white hover:bg-[#6A6A6A]"
              aria-label={button.label}
              href={button.href}
            >
              {button.label}
            </a>
          )}
          {(button2.label && button2.href) && (
            <a
              class="bg-black rounded-full px-5 py-3 text-xs text-white hover:bg-[#6A6A6A]"
              aria-label={button2.label}
              href={button2.href}
            >
              {button2.label}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export const loader = (
  props: HeroPropsBanner,
  _req: Request,
  ctx: AppContext,
) => {
  return { ...props, device: ctx.device };
};

export default HeroBanner;
