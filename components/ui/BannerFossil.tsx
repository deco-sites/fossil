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

  /** @description  âncora do link  */
  button: {
    label?: string;
    href?: string;
  };
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
    button,
  }: BannerFossilProps & { device?: string },
) => {
  const { height: desktopHeight, width: desktopWidth } = desktopImageDimensions;
  const { height: mobileHeight, width: mobileWidth } = mobileImageDimensions;
  const { label, href } = button;
  const isDesktop = device === "desktop";

  return (
    <div className="w-full   m-auto flex flex-col justify-center gap-8 items-center px-4 lg:px-20 pt-12">
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
      {(label && href) && isDesktop && (
        <a
          class="font-bold uppercase text-base text-primary  px-6  underline"
          aria-label={label}
          href={href}
        >
          {label}
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
