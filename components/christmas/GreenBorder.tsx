import type { ImageWidget } from "apps/admin/widgets.ts";
import type { ComponentChildren } from "preact";
import { useId } from "preact/hooks";

export interface GreenBorderProps {
  /** @ignore true */
  children?: ComponentChildren;

  /** @ignore true */
  class?: string;

  /**
   * @title Imagem de Fundo
   * @description Imagem de fundo para o padrão decorativo
   */
  background?: ImageWidget;

  /** @ignore true */
  noPadding?: boolean;
}

export default function GreenBorder({
  children,
  background,
  class: className = "",
  noPadding = false,
}: GreenBorderProps) {
  const id = useId();
  const clipId = `greenBorderClip-${id}`;
  const strokeColor = "#27380C";
  const strokePathData =
    "M1158.07 601.838C1135.81 601.838 1117.76 623.57 1117.76 650.383C1117.76 651.599 1117.81 652.802 1117.88 654H45.1168C45.189 652.802 45.2371 651.599 45.2371 650.383C45.2371 623.57 27.1902 601.838 4.92641 601.838C4.61359 601.838 4.3068 601.856 4 601.868V56.1324C4.3068 56.1384 4.61359 56.1625 4.92641 56.1625C27.1902 56.1625 45.2371 34.4296 45.2371 7.61713C45.2371 6.40139 45.189 5.19769 45.1168 4H1117.88C1117.81 5.19769 1117.76 6.40139 1117.76 7.61713C1117.76 34.4296 1135.81 56.1625 1158.07 56.1625C1158.39 56.1625 1158.69 56.1444 1159 56.1324V601.862C1158.69 601.856 1158.39 601.832 1158.07 601.832V601.838Z";

  const normalizedPathData =
    "M 0.99576 0.91465 C 0.97662 0.91465 0.96110 0.94767 0.96110 0.98842 C 0.96110 0.99027 0.96114 0.99210 0.96120 0.99392 H 0.03879 C 0.03886 0.99210 0.03890 0.99027 0.03890 0.98842 C 0.03890 0.94767 0.02338 0.91465 0.00424 0.91465 C 0.00397 0.91465 0.00370 0.91467 0.00344 0.91469 V 0.08531 C 0.00370 0.08532 0.00397 0.08535 0.00424 0.08535 C 0.02338 0.08535 0.03890 0.05232 0.03890 0.01158 C 0.03890 0.00973 0.03886 0.00790 0.03879 0.00608 H 0.96120 C 0.96114 0.00790 0.96110 0.00973 0.96110 0.01158 C 0.96110 0.05232 0.97662 0.08535 0.99576 0.08535 C 0.99604 0.08535 0.99629 0.08533 0.99656 0.08531 V 0.91468 C 0.99629 0.91467 0.99604 0.91464 0.99576 0.91464 V 0.91465 Z";

  return (
    <div class={`relative rounded-xl overflow-hidden ${className}`}>
      {/* Background Pattern Layer */}
      {background && (
        <div class="absolute inset-0 z-0">
          <img
            src={background}
            class="w-full h-full object-cover"
            alt="Pattern de fundo"
          />
        </div>
      )}

      {/* Frame Container with Padding */}
      <div class="relative w-full h-full p-[20px]">
        <div class="relative w-full h-full">
          {/* Clip Path Definition */}
          <svg class="absolute w-0 h-0">
            <title>Borda verde natalina</title>
            <defs>
              <clipPath id={clipId} clipPathUnits="objectBoundingBox">
                <path d={normalizedPathData} />
              </clipPath>
            </defs>
          </svg>

          {/* Content (Clipped) */}
          <div
            class={`relative h-full w-full overflow-hidden ${
              !noPadding ? "px-8 py-6 lg:px-12 lg:py-10" : ""
            }`}
            style={{ clipPath: `url(#${clipId})` }}
          >
            {children}
          </div>

          {/* Stroke Overlay */}
          <svg
            class="absolute inset-0 pointer-events-none"
            width="100%"
            height="100%"
            viewBox="0 0 1163 658"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Borda verde natalina</title>
            <path
              d={strokePathData}
              stroke={strokeColor}
              stroke-width="5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              fill="none"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
