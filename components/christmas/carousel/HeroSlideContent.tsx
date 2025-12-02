import { Fragment } from "preact";
import Button from "../Button.tsx";
import type { TextSegment } from "../../../util/text.ts";
import type { SwiperInstance } from "../../../sdk/useSwiperCarousel.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface HeroSlideContentProps {
  /** @ignore true */
  title?: string;

  /** @ignore true */
  description?: TextSegment[];

  /** @ignore true */
  ctas?: { label?: string; href?: string }[];

  /** @ignore true */
  className?: string;

  /** @ignore true */
  titleClassName?: string;

  /** @ignore true */
  descriptionClassName?: string;

  /** @ignore true */
  swiperInstance?: SwiperInstance | null;

  /** @ignore true */
  titleImage?: ImageWidget;

  /** @ignore true */
  titleImageWidth?: number;

  /** @ignore true */
  titleImageHeight?: number;

  /** @ignore true */
  titleSrOnly?: boolean;

  /** @ignore true */
  label?: string;

  /** @ignore true */
  isDesktop?: boolean;
}

export default function HeroSlideContent({
  title,
  description,
  ctas,
  className,
  titleClassName,
  descriptionClassName,
  swiperInstance,
  titleImage,
  titleImageWidth,
  titleImageHeight,
  titleSrOnly,
  label,
  isDesktop,
}: HeroSlideContentProps) {
  const handleMouseEnter = () => {
    if (swiperInstance && swiperInstance.autoplay) {
      swiperInstance.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperInstance && swiperInstance.autoplay) {
      swiperInstance.autoplay.start();
    }
  };

  const buttons = ctas || [];

  return (
    <div class={className}>
      {titleImage && isDesktop && (
        <Image
          src={titleImage}
          width={titleImageWidth || 200}
          height={titleImageHeight || 100}
          alt={title || "Banner Title"}
          class="mb-4 object-contain"
          style={{
            width: titleImageWidth ? `${titleImageWidth}px` : "auto",
            height: titleImageHeight ? `${titleImageHeight}px` : "auto",
          }}
        />
      )}

      {label && (
        <span class="font-soleil text-[12px] tracking-[0.05em] uppercase text-white mb-2 block">
          {label}
        </span>
      )}

      {title && (
        <h2 class={titleSrOnly && titleImage ? "sr-only" : titleClassName}>
          {title}
        </h2>
      )}

      {description?.length
        ? (
          <p class={descriptionClassName}>
            {description.map((part, partIndex) =>
              part.bold
                ? <strong key={`desc-${partIndex}`}>{part.text}</strong>
                : <Fragment key={`desc-${partIndex}`}>{part.text}</Fragment>
            )}
          </p>
        )
        : null}

      {buttons.length > 0 && (
        <div class="pointer-events-auto mt-2 flex flex-row gap-[10px] items-center justify-center">
          {buttons.map((btn, idx) => (
            btn.label && (
              <Button
                key={idx}
                name={btn.label}
                url={btn.href}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                class="text-sm xl:text-sm py-2 xl:py-2"
              />
            )
          ))}
        </div>
      )}

      {titleImage && !isDesktop && (
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-40 pointer-events-none">
          <Image
            src={titleImage}
            width={titleImageWidth || 200}
            height={titleImageHeight || 100}
            alt={title || "Banner Title"}
            class="object-contain"
            style={{
              width: titleImageWidth ? `${titleImageWidth}px` : "auto",
              height: titleImageHeight ? `${titleImageHeight}px` : "auto",
            }}
          />
        </div>
      )}
    </div>
  );
}
