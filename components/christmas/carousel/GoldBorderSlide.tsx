import { ComponentChildren } from "preact";
import GoldBorder from "../GoldBorder.tsx";
import HeroSlideContent from "./HeroSlideContent.tsx";
import type { TextSegment } from "../../../util/text.ts";

export interface GoldBorderSlideProps {
  /** @ignore true */
  title?: string;

  /** @ignore true */
  description?: TextSegment[];

  /** @ignore true */
  cta?: { label?: string; href?: string };

  /** @ignore true */
  backgroundDesktop?: string;

  /** @ignore true */
  backgroundMobile?: string;

  /** @ignore true */
  isDesktop?: boolean;

  /** @ignore true */
  className?: string;

  /** @ignore true */
  children?: ComponentChildren;
}

export default function GoldBorderSlide({
  title,
  description,
  cta,
  backgroundDesktop,
  backgroundMobile,
  isDesktop = false,
  className = "",
  children,
}: GoldBorderSlideProps) {
  if (children) {
    return (
      <GoldBorder
        class={`relative h-full w-full overflow-hidden ${className}`}
        variant={isDesktop ? "desktop" : "mobile"}
        borderPosition={isDesktop ? undefined : "bottom"}
        backgroundDesktop={backgroundDesktop}
        backgroundMobile={backgroundMobile}
        noPadding
      >
        {children}
      </GoldBorder>
    );
  }

  return (
    <GoldBorder
      class={`relative h-full w-full overflow-hidden ${className}`}
      variant={isDesktop ? "desktop" : "mobile"}
      borderPosition={isDesktop ? undefined : "bottom"}
      backgroundDesktop={backgroundDesktop}
      backgroundMobile={backgroundMobile}
      noPadding
    >
      <HeroSlideContent
        title={title}
        description={description}
        cta={cta}
        className="relative z-10 h-full flex flex-col items-center justify-center gap-4 px-8 py-6 lg:px-12 lg:py-10 text-center text-white"
        titleClassName="text-3xl font-soleil font-bold sm:text-4xl md:text-5xl [text-shadow:_2px_2px_10px_rgba(0,0,0,0.8)]"
        descriptionClassName="max-w-2xl text-xs font-soleil md:text-sm [text-shadow:_1px_1px_10px_rgba(0,0,0,0.7)]"
      />
    </GoldBorder>
  );
}
