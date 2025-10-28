import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../sdk/clx.ts";

/** @titleBy name */
export interface Card {
  /**
   * @title Nome do Card
   * @description Título principal exibido abaixo da imagem
   */
  name: string;

  /**
   * @title Etiqueta
   * @description Texto pequeno exibido acima do nome (opcional, uppercase)
   */
  label?: string;

  /**
   * @title Imagem Padrão
   * @description Imagem exibida no estado fechado/padrão (355x456px)
   */
  defaultImage: ImageWidget;

  /**
   * @title Imagem Aberta
   * @description Imagem exibida no estado aberto/hover (343x324px)
   */
  openImage: ImageWidget;

  /**
   * @title Imagem de Fundo no Hover
   * @description Imagem de fundo exibida ao passar o mouse (opcional, padrão: cor sólida dourada)
   */
  hoverBackgroundImage?: ImageWidget;

  /**
   * @title URL do Card
   * @description Link de destino ao clicar no card
   */
  url?: string;

  /**
   * @title Texto do Botão
   * @description Texto exibido no botão de ação (padrão: "Shop Now")
   */
  buttonText?: string;

  /**
   * @title Texto Alternativo
   * @description Descrição da imagem para acessibilidade
   */
  alt?: string;

  /**
   * @title Largura Imagem Padrão
   * @description Largura para a imagem no estado padrão (padrão: 355)
   */
  defaultImageWidth?: number;

  /**
   * @title Altura Imagem Padrão
   * @description Altura para a imagem no estado padrão (padrão: 456)
   */
  defaultImageHeight?: number;

  /**
   * @title Largura Imagem Aberta
   * @description Largura para a imagem no estado aberto (padrão: 307)
   */
  openImageWidth?: number;

  /**
   * @title Altura Imagem Aberta
   * @description Altura para a imagem no estado aberto (padrão: 352)
   */
  openImageHeight?: number;
}

export default function ProductCard({
  name,
  label,
  defaultImage,
  openImage,
  hoverBackgroundImage,
  url = "#",
  buttonText = "Shop Now",
  alt,
  defaultImageWidth = 355,
  defaultImageHeight = 456,
  openImageWidth = 307,
  openImageHeight = 352,
}: Card) {
  const id = `cr-card-${name?.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div id={id} class="group w-full">
      <a
        href={url}
        aria-label={`View ${name}`}
        class="block w-full rounded-xl overflow-hidden shadow-[0px_4px_6px_0px_rgba(0,0,0,0.16)] transition-shadow duration-500 hover:shadow-[0px_6px_12px_0px_rgba(0,0,0,0.24)]"
      >
        <figure
          class={clx(
            "relative w-full bg-[#cea951]",
            "transition-all duration-500 ease-in-out",
          )}
          style={{
            backgroundImage: hoverBackgroundImage
              ? `url(${hoverBackgroundImage})`
              : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Default state image - visible by default, hidden on mobile, fades out on desktop hover */}
          <div
            class={clx(
              "relative w-full transition-opacity duration-500 ease-in-out",
              "hidden md:block md:group-hover:opacity-0",
            )}
          >
            <Image
              src={defaultImage}
              alt={alt || name}
              width={defaultImageWidth}
              height={defaultImageHeight}
              class="w-full h-auto object-cover border-2 border-[#cea951] rounded-xl"
              sizes={`(max-width: 640px) 0vw, (max-width: 768px) 45vw, ${defaultImageWidth}px`}
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Open state content - visible on mobile, fades in on desktop hover */}
          <div
            class={clx(
              "flex flex-col items-center text-center gap-3 lg:gap-6 p-6",
              "opacity-100 md:opacity-0 md:group-hover:opacity-100",
              "transition-opacity duration-500 ease-in-out",
              "md:absolute md:inset-0 md:grid md:grid-rows-[1fr_auto] md:grid-cols-[1fr_auto] md:items-center md:text-left md:gap-6 md:p-6",
            )}
          >
            <div
              class={clx(
                "order-1 flex flex-col items-center text-center lg:text-start",
                "md:order-none md:items-start md:row-start-2 md:col-start-1 md:justify-self-start",
              )}
            >
              {label && (
                <p class="text-xs font-soleil uppercase tracking-wide text-primary leading-none">
                  {label}
                </p>
              )}
              <h3 class="text-xl font-soleil font-bold leading-6 text-primary">
                {name}
              </h3>
            </div>

            {/* Open state image with proper dimensions */}
            <div
              class={clx(
                "order-2 w-full bg-[#002F3F] rounded-lg overflow-hidden flex items-center justify-center",
                "md:order-none md:col-span-2 md:row-start-1 md:h-full",
              )}
            >
              <Image
                src={openImage}
                alt={alt || name}
                width={openImageWidth}
                height={openImageHeight}
                class="w-full object-cover md:h-full"
                sizes={`(max-width: 640px) 90vw, (max-width: 768px) 45vw, ${openImageWidth}px`}
                loading="lazy"
                decoding="async"
              />
            </div>

            <button
              type="button"
              class="order-3 bg-primary hover:bg-primary/90 transition-colors duration-200 text-white font-soleil text-xs px-4 py-3 rounded-full whitespace-nowrap tracking-wide h-8 flex items-center justify-center shrink-0 self-center md:order-none md:row-start-2 md:col-start-2 md:justify-self-end"
              aria-label={`${buttonText} ${name}`}
            >
              {buttonText}
            </button>
          </div>
        </figure>
      </a>
    </div>
  );
}
