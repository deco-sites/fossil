import { Fragment } from "preact";
import Button from "../Button.tsx";
import type { TextSegment } from "../../../util/text.ts";

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
}

export default function HeroSlideContent({
  title,
  description,
  cta,
  className =
    "relative z-10 flex flex-col items-center justify-center gap2 gap-4 px-4 text-center text-white pointer-events-auto",
  titleClassName = "text-3xl font-sacker font-bold sm:text-4xl md:text-5xl",
  descriptionClassName =
    "max-w-2xl text-sm font-soleil sm:text-base md:text-lg",
}: HeroSlideContentProps) {
  return (
    <div class={className}>
      {title && <h2 class={titleClassName}>{title}</h2>}

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

      {cta?.label && (
        <div class="pointer-events-auto mt-2">
          <Button name={cta.label} url={cta.href} />
        </div>
      )}
    </div>
  );
}
