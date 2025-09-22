import type { ImageWidget } from "apps/admin/widgets.ts";
import NJPicture from "./NJPicture.tsx";
import {
  IMAGE_DIMENSIONS,
  ImageContainer,
} from "./ScrollTriggeredCarousel.tsx";

/**
 * @titleBy alt
 */
export interface StaticResponsiveImageProps {
  desktopImage?: ImageWidget;
  mobileImage?: ImageWidget;
  alt: string | undefined;
  isMobile?: boolean;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  nested?: boolean;
}

export default function StaticResponsiveImage({
  desktopImage,
  mobileImage,
  alt,
  isMobile = false,
  loading = "lazy",
  fetchPriority = "auto",
  nested = false,
}: StaticResponsiveImageProps) {
  if (!desktopImage && !mobileImage) return null;

  const dimensions = IMAGE_DIMENSIONS[isMobile ? "mobile" : "desktop"];

  if (nested) {
    return (
      <NJPicture
        desktop={desktopImage}
        mobile={mobileImage}
        alt={alt || ""}
        width={dimensions.width}
        height={dimensions.height}
        class="w-full h-full object-cover"
        loading={loading}
        fetchPriority={fetchPriority}
      />
    );
  }

  return (
    <ImageContainer isMobile={isMobile}>
      <NJPicture
        desktop={desktopImage}
        mobile={mobileImage}
        alt={alt || ""}
        width={dimensions.width}
        height={dimensions.height}
        class="w-full h-full object-cover"
        loading={loading}
        fetchPriority={fetchPriority}
      />
    </ImageContainer>
  );
}
