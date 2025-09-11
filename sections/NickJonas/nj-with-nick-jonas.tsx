export { default as LoadingFallback } from "../../components/LoadingFallback.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { getYouTubeEmbedUrl } from "../../util/youtube.ts";

export interface Props {
  /**
   * @title Etiqueta Superior
   * @description Texto da etiqueta superior (12px regular)
   */
  label?: string;

  /**
   * @title Título Principal
   * @description Título principal da seção (60px, leading-none, fonte Benton Italic)
   */
  title?: string;

  /**
   * @title Descrição
   * @description Texto de descrição da seção (14px regular, fonte Soleil)
   */
  description?: string;

  /**
   * @title URL do Vídeo YouTube
   * @description URL completa do vídeo do YouTube para reproduzir
   */
  videoUrl?: string;

  /**
   * @title Imagem da Assinatura
   * @description Imagem da assinatura do Nick Jonas
   */
  signature?: ImageWidget;

  /**
   * @title Largura da Assinatura
   * @description Largura da imagem da assinatura em pixels
   * @default 80
   */
  signatureWidth?: number;

  /**
   * @title Altura da Assinatura
   * @description Altura da imagem da assinatura em pixels
   * @default 40
   */
  signatureHeight?: number;
}

/**
 * YouTubePlayer component for embedding YouTube videos
 * @param videoUrl YouTube URL to embed
 * @param className Additional CSS classes
 */
function YouTubePlayer({
  videoUrl,
  className = "",
}: {
  videoUrl: string;
  className?: string;
}) {
  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  if (!embedUrl) {
    return null;
  }

  return (
    <div
      className={`relative w-full max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-lg bg-black ${className}`}
    >
      <iframe
        src={embedUrl}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-[200px] lg:h-[440px] lg:w-[780px]"
      />
    </div>
  );
}

function ContentLabel({ label }: { label?: string }) {
  if (!label) return null;

  return (
    <div className="text-xs font-soleil tracking-wider uppercase">{label}</div>
  );
}

function ContentTitle({ title }: { title?: string }) {
  if (!title) return null;

  return (
    <h2 className="text-[40px] lg:text-[60px] leading-none font-benton italic">
      {title}
    </h2>
  );
}

function ContentDescription({ description }: { description?: string }) {
  if (!description) return null;

  return (
    <p className="text-sm font-soleil max-w-2xl mx-auto leading-relaxed !mt-0">
      {description}
    </p>
  );
}

function Signature({
  signature,
  width = 80,
  height = 40,
}: {
  signature?: ImageWidget;
  width?: number;
  height?: number;
}) {
  if (!signature) return null;

  return (
    <div className="flex justify-center">
      <Image
        src={signature}
        alt="Nick Jonas Signature"
        width={width}
        height={height}
        style={{ width }}
        className="h-auto"
      />
    </div>
  );
}

function NJWithNickJonas({
  label,
  title,
  description,
  videoUrl,
  signature,
  signatureWidth = 80,
  signatureHeight = 40,
}: Props) {
  return (
    <div className="bg-nj-primary w-full py-14 px-4 lg:py-16 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        {/* Content Container */}
        <div className="text-center text-primary space-y-2">
          {/* Label */}
          <ContentLabel label={label} />

          {/* Title */}
          <ContentTitle title={title} />

          {/* Description */}
          <ContentDescription description={description} />

          {/* Video Player */}
          {videoUrl && (
            <div className="!my-14 lg:!my-[75px]">
              <YouTubePlayer videoUrl={videoUrl} />
            </div>
          )}

          {/* Nick Jonas Signature */}
          <Signature
            signature={signature}
            width={signatureWidth}
            height={signatureHeight}
          />
        </div>
      </div>
    </div>
  );
}

export default NJWithNickJonas;
