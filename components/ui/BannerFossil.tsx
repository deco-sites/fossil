import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { AppContext } from "../../apps/site.ts";

interface BannerFossilProps {
  /**
   * Desktop image
   */
  desktopImage: ImageWidget;

  /**
   * Image dimensions
   */
  desktopImageDimensions: {
    height: number;
    width: number;
  };

  /**
   * Mobile image
   */
  mobileImage: ImageWidget;

  /**
   * Image dimensions
   */
  mobileImageDimensions: {
    height: number;
    width: number;
  };

  alt: string;

  url: string;
}

const BannerFossil = (
  {
    desktopImage,
    desktopImageDimensions,
    mobileImage,
    mobileImageDimensions,
    device,
    alt,
    url,
  }: BannerFossilProps & { device?: string },
) => {
  const { height: desktopHeight, width: desktopWidth } = desktopImageDimensions;
  const { height: mobileHeight, width: mobileWidth } = mobileImageDimensions;

  return (
    <div className="w-full max-w-screen-2xl m-auto flex justify-center px-4 lg:px-20 pt-12">
      {device === "desktop"
        ? (
          <a href={url} alt="link" class="w-full">
            <Image
              width={desktopWidth}
              height={desktopHeight}
              src={desktopImage}
              alt={alt}
              class="object-cover w-full"
              fetchPriority="auto"
              loading="lazy"
            />
          </a>
        )
        : (
          <a href={url} alt="link" class="w-full">
            <Image
              width={mobileWidth}
              height={mobileHeight}
              src={mobileImage}
              alt={alt}
              class="object-cover w-full h-auto"
              fetchPriority="auto"
              loading="lazy"
            />
          </a>
        )}
    </div>
  );
};

export const loader = (
  props: BannerFossilProps,
  _req: Request,
  ctx: AppContext,
) => {
  return { ...props, device: ctx.device };
};

export default BannerFossil;
