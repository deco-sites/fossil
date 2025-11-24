import type { FnContext } from "@deco/deco";
import type { ImageWidget, VideoWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../sdk/clx.ts";
import { withDevice } from "../../sdk/withDevice.ts";

/**
 * @title Imagem
 */
export interface MediaImage {
  /** @title Imagem (Desktop) */
  desktop: ImageWidget;
  /** @title Texto Alternativo */
  alt?: string;
}

/**
 * @title Vídeo
 */
export interface MediaVideo {
  /** @title Vídeo (Desktop) */
  desktop: VideoWidget;
  /** @title Reprodução Automática */
  autoplay?: boolean;
  /** @title Loop */
  loop?: boolean;
  /** @title Mudo */
  muted?: boolean;
}

export type MediaType = MediaImage | MediaVideo;

export interface Props {
  /** @title Mídia */
  media: MediaType;
  /** @title Título */
  title?: string;
  /**
   * @title Subtítulo
   * @description Texto acima do título (ex: "PERMISSION TO PEEK")
   */
  subtitle?: string;
  /**
   * @title Imagem Divisória (Inferior)
   * @description Tamanho da imagem: 1280x40
   */
  bottomDivider?: ImageWidget;
  /** @ignore true */
  device?: "mobile" | "tablet" | "desktop";
}

function MediaComponent({ media }: { media: MediaType }) {
  const isVideo = (url?: string) =>
    /\.(mp4|webm|mov|ogg)(\?|$)/i.test(url ?? "");

  // Inferred type or explicit type
  const type = (media as MediaVideo).autoplay || (media as MediaVideo).loop ||
      (media as MediaVideo).muted ||
      isVideo(media.desktop)
    ? "video"
    : "image";

  if (type === "image") {
    const imageMedia = media as MediaImage;
    return (
      <div class="w-full h-full">
        <Picture>
          <Source
            media="(min-width: 769px)"
            src={imageMedia.desktop}
            width={1440}
            height={600}
          />
          <Image
            class="w-full h-full object-cover"
            src={imageMedia.desktop}
            alt={imageMedia.alt ?? "Hero Image"}
            width={1440}
            height={600}
            loading="lazy"
          />
        </Picture>
      </div>
    );
  }

  if (type === "video") {
    const videoMedia = media as MediaVideo;
    return (
      <div class="w-full h-full">
        <video
          src={videoMedia.desktop}
          class="w-full h-full object-cover"
          autoPlay={videoMedia.autoplay}
          muted={videoMedia.muted ?? true}
          loop={videoMedia.loop ?? true}
          playsInline
        />
      </div>
    );
  }

  return null;
}

export default function CRHeroMedia({
  media,
  title,
  subtitle,
  bottomDivider,
  device,
}: ReturnType<Awaited<typeof loader>>) {
  if (device !== "desktop") return null;

  return (
    <section
      class={clx(
        "hidden lg:flex relative w-full min-h-[600px] items-center justify-center overflow-visible",
        bottomDivider && "lg:mb-10",
      )}
    >
      {/* Background Media */}
      <div class="absolute inset-0 z-0">
        <MediaComponent media={media} />
      </div>

      {/* Content Overlay */}
      <div class="relative z-10 flex flex-col items-center text-center w-full max-w-[1200px] mx-auto">
        {subtitle && (
          <span class="font-soleil text-[12px] uppercase tracking-wider text-white">
            {subtitle}
          </span>
        )}
        {title && (
          <h2
            class="font-benton text-[60px] leading-none text-white mb-8"
            // deno-lint-ignore react-no-danger
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}
      </div>

      {/* Bottom Divider */}
      {bottomDivider && (
        <div class="absolute bottom-1 left-0 right-0 z-20 translate-y-full pointer-events-none">
          <Image
            class="w-full h-auto object-cover"
            src={bottomDivider}
            alt="Divisor Decorativo"
            width={1280}
            height={40}
            loading="lazy"
          />
        </div>
      )}
    </section>
  );
}

export const loader = (props: Props, _req: Request, ctx: FnContext) => {
  return withDevice(props, ctx);
};
