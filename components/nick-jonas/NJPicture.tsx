import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface NJPictureProps {
  /** Desktop image */
  desktop?: ImageWidget;
  /** Mobile image */
  mobile?: ImageWidget;
  /** Alt text for accessibility */
  alt?: string;
  /** Width for skeleton and image */
  width: number;
  /** Height for skeleton and image */
  height: number;
  /** Additional CSS classes */
  class?: string;
  /** Loading priority */
  loading?: "eager" | "lazy";
  /** Fetch priority */
  fetchPriority?: "high" | "low" | "auto";
  /** Additional CSS classes for the image */
  classImage?: string;
}

function Skeleton({
  width,
  height,
  class: className,
}: {
  width: number;
  height: number;
  class?: string;
}) {
  return (
    <div
      class={`animate-pulse bg-gray-200 rounded-lg ${className || ""}`}
      style={{ width: `${width}px`, height: `${height}px` }}
      aria-label="Carregando imagem..."
    />
  );
}

export default function NJPicture({
  desktop,
  mobile,
  alt = "",
  width,
  height,
  class: className = "",
  classImage = "",
  loading = "lazy",
  fetchPriority = "auto",
}: NJPictureProps) {
  // If no images provided, show skeleton
  if (!desktop && !mobile) {
    return <Skeleton width={width} height={height} class={className} />;
  }

  // Use mobile image if available, fallback to desktop
  const mobileImage = mobile || desktop;
  const desktopImage = desktop || mobile;

  if (!mobileImage || !desktopImage) {
    return <Skeleton width={width} height={height} class={className} />;
  }

  return (
    // Make picture a block-level element so width/height classes apply
    <picture class={`block max-w-full ${className ?? ""}`}>
      {/* Mobile */}
      <source media="(max-width: 1023px)" srcSet={mobileImage} />
      {/* Desktop */}
      <source media="(min-width: 1024px)" srcSet={desktopImage} />
      <Image
        src={desktopImage}
        alt={alt}
        width={width}
        height={height}
        class={`w-full h-auto object-cover ${classImage ?? ""}`}
        loading={loading}
        fetchPriority={fetchPriority}
      />
    </picture>
  );
}
