import type { Ref } from "preact";

interface CarouselContainerProps {
  useGoldBorder: boolean;
  isDesktop: boolean;
  clipPathUrl: string;
  containerRef: Ref<HTMLDivElement>;
  children: preact.ComponentChildren;
}

export default function CarouselContainer({
  useGoldBorder,
  isDesktop,
  clipPathUrl,
  containerRef,
  children,
}: CarouselContainerProps) {
  const isGoldDesktop = useGoldBorder && isDesktop;

  if (isGoldDesktop) {
    return (
      <div
        class="gold-frame-mask absolute inset-0 overflow-hidden"
        style={{
          clipPath: clipPathUrl,
          WebkitClipPath: clipPathUrl,
        }}
      >
        <div ref={containerRef} class="swiper w-full h-full">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} class="swiper w-full h-full">
      {children}
    </div>
  );
}
