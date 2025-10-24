import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface StarsProps {
  /**
   * @title Imagem das Estrelas
   * @description Imagem decorativa das estrelas
   */
  image?: ImageWidget;

  /**
   * @title Largura
   * @description Largura da imagem em pixels
   */
  width?: number;

  /**
   * @title Altura
   * @description Altura da imagem em pixels
   */
  height?: number;

  /** @ignore true */
  alt?: string;

  /** @ignore true */
  class?: string;
}

export default function Stars({
  image,
  width = 100,
  height = 100,
  alt = "Estrelas decorativas",
  class: className = "",
}: StarsProps) {
  if (!image) {
    return null;
  }

  return (
    <div class={className}>
      <Image
        src={image}
        alt={alt}
        width={width}
        height={height}
        style={{
          width: `${width}px`,
          height: "auto",
          aspectRatio: `${width}/${height}`,
        }}
      />
    </div>
  );
}
