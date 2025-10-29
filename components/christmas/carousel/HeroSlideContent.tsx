import { Fragment } from "preact";
import Button from "../Button.tsx";
import type { TextSegment } from "../../../util/text.ts";
import type { SwiperInstance } from "../../../sdk/useSwiperCarousel.ts";

export interface HeroSlideContentProps {
  /** @ignore true */
  title?: string;

  /** @ignore true */
  description?: TextSegment[];

  /** @ignore true */
  cta?: { label?: string; href?: string };

  /** @ignore true */
  className?: string;

  /** @ignore true */
  titleClassName?: string;

  /** @ignore true */
  descriptionClassName?: string;

  /** @ignore true */
  swiperInstance?: SwiperInstance | null;
}

export default function HeroSlideContent({
  title,
  description,
  cta,
  className,
  titleClassName,
  descriptionClassName,
  swiperInstance,
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

  return (
    <div class={className}>
      {title && <h2 class={titleClassName}>{title}</h2>}

      {description?.length ? (
        <p class={descriptionClassName}>
          {description.map((part, partIndex) =>
            part.bold ? (
              <strong key={`desc-${partIndex}`}>{part.text}</strong>
            ) : (
              <Fragment key={`desc-${partIndex}`}>{part.text}</Fragment>
            )
          )}
        </p>
      ) : null}

      {cta?.label && (
        <div class="pointer-events-auto mt-2">
          <Button
            name={cta.label}
            url={cta.href}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            class="text-sm xl:text-sm py-2 xl:py-2"
          />
        </div>
      )}
    </div>
  );
}
