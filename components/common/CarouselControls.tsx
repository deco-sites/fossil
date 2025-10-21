import type { ComponentChildren } from "preact";
import { clx } from "../../sdk/clx.ts";

type CarouselControlsLayout = "inline" | "stacked";

interface CarouselControlsProps {
  id: string;
  layout?: CarouselControlsLayout;
  buttons?: ComponentChildren;
  /** @ignore true */
  class?: string;
  /** @ignore true */
  scrollbarClass?: string;
  /** @ignore true */
  paginationClass?: string;
  /** @ignore true */
  scrollbarWrapperClass?: string;
  /** @ignore true */
  paginationWrapperClass?: string;
  /** @ignore true */
  buttonsWrapperClass?: string;
}

export default function CarouselControls({
  id,
  layout = "inline",
  buttons,
  class: className = "",
  scrollbarClass = "",
  paginationClass = "",
  scrollbarWrapperClass = "",
  paginationWrapperClass = "",
  buttonsWrapperClass = "",
}: CarouselControlsProps) {
  if (layout === "stacked") {
    return (
      <div class={clx(className)}>
        <div class={clx(scrollbarWrapperClass)}>
          <div
            id={`${id}-scrollbar`}
            class={clx("swiper-scrollbar", scrollbarClass)}
          />
        </div>

        <div class={clx("flex justify-end mt-4", paginationWrapperClass)}>
          <span
            id={`${id}-pagination`}
            class={clx(paginationClass)}
            aria-live="polite"
          />
        </div>

        {buttons && (
          <div class={clx("flex items-center gap-2", buttonsWrapperClass)}>
            {buttons}
          </div>
        )}
      </div>
    );
  }

  return (
    <div class={clx("flex", className)}>
      <div class={clx("relative flex-1", scrollbarWrapperClass)}>
        <div
          id={`${id}-scrollbar`}
          class={clx("swiper-scrollbar", scrollbarClass)}
        />
        <span
          id={`${id}-pagination`}
          class={clx(paginationClass)}
          aria-live="polite"
        />
      </div>

      {buttons && (
        <div class={clx("flex items-center gap-2", buttonsWrapperClass)}>
          {buttons}
        </div>
      )}
    </div>
  );
}
