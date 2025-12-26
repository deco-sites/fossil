import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { AppContext } from "../../apps/site.ts";

interface HeroPropsBanner {
  /**
   * @title Tag
   * @description Texto exibido acima do título do header (ex: "HIT REFRESH")
   */
  tag: string;

  /**
   * @title Título
   * @description Texto exibido no título do header (ex: "Simple, never basic. Start with the classics, always the perfect reset.")
   */
  title: string;

  /**
   * @title Imagem de destaque flutuante
   * @description Tamanho recomendado: 332x345
   */
  floatingImage: ImageWidget;

  /**
   * @title Imagem da seta flutuante
   */
  floatingArrow: ImageWidget;

  /**
   * @title Texto de destaque flutuante
   * @description Texto junto à seta e imagem flutuantes (ex: "STACK A STATEMENT")
   */
  floatingText: string;

  /**
   * @title Primeiro Banner
   * @description Primeiro botão de chamada para ação
   */
  banner: {
    /**
     * @title Imagem
     * @description Tamanho recomendado: 273x398
     */
    image: ImageWidget;
    /**
     * @title Texto
     * @description Texto exibido abaixo da imagem
     */
    label?: string;
    /**
     * @title Link
     * @description URL para onde o banner deve redirecionar ao clicar
     */
    href?: string;
  };

  /**
   * @title Segundo Banner
   * @description Segundo botão de chamada para ação
   */
  banner2: {
    /**
     * @title Imagem
     * @description Tamanho recomendado: 273x398
     */
    image: ImageWidget;
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
    tag,
    title,
    floatingImage,
    floatingArrow,
    floatingText,
    banner,
    banner2,
  }: HeroPropsBanner & { device?: string },
) => {
  return (
    <div class="bg-[#FFFBF0]">
      <div className="max-w-7xl mx-auto px-6 py-8 lg:py-12 lg:px-12">
        <div class={"pb-8 lg:py-12 lg:px-10 xl:px-32"}>
          <p class="font-bold max-lg:text-sm">
            {tag}
          </p>
          <h2 class="font-benton text-4xl lg:text-6xl max-w-[530px]">
            {title}
          </h2>
        </div>
        <div class="flex justify-end">
          <div class="relative flex gap-4 xl:gap-7 lg:max-w-[65%]">
            {(floatingImage && floatingArrow && floatingText) && (
              <div class="absolute -left-72 bottom-14 max-lg:hidden">
                <figure className={``}>
                  <Image
                    class="h-auto object-cover"
                    src={floatingImage}
                    alt="Imagem de destaque flutuante com relógios"
                    width={332}
                    height={345}
                    loading="lazy"
                    fetchPriority="auto"
                  />
                </figure>
                <figure className={`absolute top-2 left-0 w-[42px] h-[32px]`}>
                  <Image
                    class="h-auto object-cover"
                    src={floatingArrow}
                    alt="Seta apontando para a imagem de destaque flutuante"
                    width={42}
                    height={32}
                    loading="lazy"
                    fetchPriority="auto"
                  />
                </figure>
                <p class="text-xs absolute top-0 left-4">{floatingText}</p>
              </div>
            )}

            {(banner && banner.label && banner.href && banner.image) && (
              <a
                aria-label={banner.label}
                href={banner.href}
              >
                <figure className={`w-full mb-3`}>
                  <Image
                    class="h-auto object-cover"
                    src={banner.image}
                    alt={banner.label}
                    width={371}
                    height={541}
                    loading="lazy"
                    fetchPriority="auto"
                  />
                </figure>
                <p class="text-sm uppercase underline">{banner.label}</p>
              </a>
            )}
            {(banner2 && banner2.label && banner2.href && banner2.image) && (
              <a
                aria-label={banner2.label}
                href={banner2.href}
              >
                <figure className={`w-full mb-3`}>
                  <Image
                    class="h-auto object-cover"
                    src={banner2.image}
                    alt={banner2.label}
                    width={371}
                    height={541}
                    loading="lazy"
                    fetchPriority="auto"
                  />
                </figure>
                <p class="text-sm uppercase underline">{banner2.label}</p>
              </a>
            )}
          </div>
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
