import { ComponentChildren } from "preact";
import type { ImageWidget, VideoWidget } from "apps/admin/widgets.ts";
import MediaBackground from "./MediaBackground.tsx";

export interface GoldBorderProps {
  /** @ignore true */
  children?: ComponentChildren;

  /** @ignore true */
  class?: string;

  /**
   * @title Imagem de Fundo Desktop
   * @description Imagem de fundo para telas desktop
   */
  backgroundDesktop?: ImageWidget;

  /**
   * @title Imagem de Fundo Mobile
   * @description Imagem de fundo para telas mobile
   */
  backgroundMobile?: ImageWidget;

  /**
   * @title Vídeo de Fundo Desktop
   * @description Vídeo de fundo para telas desktop
   */
  videoDesktop?: VideoWidget;

  /**
   * @title Vídeo de Fundo Mobile
   * @description Vídeo de fundo para telas mobile
   */
  videoMobile?: VideoWidget;

  /**
   * @title Imagem Pôster do Vídeo
   * @description Imagem exibida enquanto o vídeo carrega
   */
  posterImage?: ImageWidget;

  /**
   * @title Zoom do Vídeo
   * @description Fator de zoom aplicado ao vídeo (1.0 = normal, 1.05 = zoom leve)
   */
  videoZoom?: number;

  /** @ignore true */
  onClipIdReady?: (clipId: string) => void;

  /** @ignore true */
  variant?: "desktop" | "mobile";

  /** @ignore true */
  borderPosition?: "top" | "bottom" | "both";

  /** @ignore true */
  noPadding?: boolean;
}

export default function GoldBorder({
  children,
  backgroundDesktop,
  backgroundMobile,
  videoDesktop,
  videoMobile,
  posterImage,
  videoZoom = 1.05,
  class: className = "",
  onClipIdReady,
  variant = "desktop",
  borderPosition = "both",
  noPadding = false,
}: GoldBorderProps) {
  const clipId = `goldBorderClip-${Math.random().toString(36).substr(2, 9)}`;

  if (onClipIdReady) {
    onClipIdReady(clipId);
  }

  const backgroundImage = backgroundDesktop || backgroundMobile;
  const hasVideo = videoDesktop || videoMobile;

  if (variant === "mobile") {
    const borderClasses = borderPosition === "top"
      ? "border-t-[5px]"
      : borderPosition === "bottom"
      ? "border-b-[5px]"
      : "border-y-[5px]";

    return (
      <div
        class={`relative overflow-hidden ${borderClasses} border-cr-primary ${className}`}
      >
        {hasVideo
          ? (
            <>
              {videoDesktop && (
                <video
                  class="hidden md:block absolute inset-0 w-full h-full object-cover"
                  src={videoDesktop}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster={posterImage || ""}
                  aria-hidden="true"
                  tabIndex={-1}
                  style={{
                    objectPosition: "50% 50%",
                    transform: `scale(${videoZoom})`,
                  }}
                />
              )}
              {(videoMobile || videoDesktop) && (
                <video
                  class="block md:hidden absolute inset-0 w-full h-full object-cover"
                  src={videoMobile || videoDesktop}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster={posterImage || ""}
                  aria-hidden="true"
                  tabIndex={-1}
                  style={{
                    objectPosition: "50% 50%",
                    transform: `scale(${videoZoom})`,
                  }}
                />
              )}
            </>
          )
          : (
            backgroundImage && (
              <MediaBackground
                type="image"
                imageDesktop={backgroundDesktop}
                imageMobile={backgroundMobile}
              />
            )
          )}
        <div
          class={`relative z-10 h-full ${
            !noPadding ? "px-8 py-6 lg:px-12 lg:py-10" : ""
          }`}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div class={`relative ${className}`}>
      {hasVideo
        ? (
          <>
            <svg
              class="absolute inset-0 pointer-events-none"
              width="100%"
              height="100%"
              viewBox="0 0 1163 658"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <clipPath id={clipId}>
                  <path d="M1158.07 601.838C1135.81 601.838 1117.76 623.57 1117.76 650.383C1117.76 651.599 1117.81 652.802 1117.88 654H45.1168C45.189 652.802 45.2371 651.599 45.2371 650.383C45.2371 623.57 27.1902 601.838 4.92641 601.838C4.61359 601.838 4.3068 601.856 4 601.868V56.1324C4.3068 56.1384 4.61359 56.1625 4.92641 56.1625C27.1902 56.1625 45.2371 34.4296 45.2371 7.61713C45.2371 6.40139 45.189 5.19769 45.1168 4H1117.88C1117.81 5.19769 1117.76 6.40139 1117.76 7.61713C1117.76 34.4296 1135.81 56.1625 1158.07 56.1625C1158.39 56.1625 1158.69 56.1444 1159 56.1324V601.862C1158.69 601.856 1158.39 601.832 1158.07 601.832V601.838Z" />
                </clipPath>
              </defs>
            </svg>
            {videoDesktop && (
              <video
                class="hidden lg:block absolute inset-0 w-full h-full object-cover"
                src={videoDesktop}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={posterImage || ""}
                aria-hidden="true"
                tabIndex={-1}
                style={{
                  objectPosition: "50% 50%",
                  transform: `scale(${videoZoom})`,
                  clipPath: `url(#${clipId})`,
                }}
              />
            )}
            {(videoMobile || videoDesktop) && (
              <video
                class="block lg:hidden absolute inset-0 w-full h-full object-cover"
                src={videoMobile || videoDesktop}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={posterImage || ""}
                aria-hidden="true"
                tabIndex={-1}
                style={{
                  objectPosition: "50% 50%",
                  transform: `scale(${videoZoom})`,
                  clipPath: `url(#${clipId})`,
                }}
              />
            )}
          </>
        )
        : (
          backgroundImage && (
            <svg
              class="absolute inset-0"
              width="100%"
              height="100%"
              viewBox="0 0 1163 658"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <clipPath id={clipId}>
                  <path d="M1158.07 601.838C1135.81 601.838 1117.76 623.57 1117.76 650.383C1117.76 651.599 1117.81 652.802 1117.88 654H45.1168C45.189 652.802 45.2371 651.599 45.2371 650.383C45.2371 623.57 27.1902 601.838 4.92641 601.838C4.61359 601.838 4.3068 601.856 4 601.868V56.1324C4.3068 56.1384 4.61359 56.1625 4.92641 56.1625C27.1902 56.1625 45.2371 34.4296 45.2371 7.61713C45.2371 6.40139 45.189 5.19769 45.1168 4H1117.88C1117.81 5.19769 1117.76 6.40139 1117.76 7.61713C1117.76 34.4296 1135.81 56.1625 1158.07 56.1625C1158.39 56.1625 1158.69 56.1444 1159 56.1324V601.862C1158.69 601.856 1158.39 601.832 1158.07 601.832V601.838Z" />
                </clipPath>
              </defs>
              <image
                href={backgroundImage}
                width="1163"
                height="658"
                preserveAspectRatio="xMidYMid slice"
                clip-path={`url(#${clipId})`}
              />
            </svg>
          )
        )}

      <svg
        class="absolute inset-0 pointer-events-none"
        width="100%"
        height="100%"
        viewBox="0 0 1163 658"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="goldGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M1158.07 601.838C1135.81 601.838 1117.76 623.57 1117.76 650.383C1117.76 651.599 1117.81 652.802 1117.88 654H45.1168C45.189 652.802 45.2371 651.599 45.2371 650.383C45.2371 623.57 27.1902 601.838 4.92641 601.838C4.61359 601.838 4.3068 601.856 4 601.868V56.1324C4.3068 56.1384 4.61359 56.1625 4.92641 56.1625C27.1902 56.1625 45.2371 34.4296 45.2371 7.61713C45.2371 6.40139 45.189 5.19769 45.1168 4H1117.88C1117.81 5.19769 1117.76 6.40139 1117.76 7.61713C1117.76 34.4296 1135.81 56.1625 1158.07 56.1625C1158.39 56.1625 1158.69 56.1444 1159 56.1324V601.862C1158.69 601.856 1158.39 601.832 1158.07 601.832V601.838Z"
          stroke="#E4C062"
          stroke-width="7.74"
          stroke-miterlimit="10"
          stroke-linecap="round"
          fill="none"
          filter="url(#goldGlow)"
        />
      </svg>

      <div
        class={`relative z-10 h-full ${
          !noPadding ? "px-8 py-6 lg:px-12 lg:py-10" : ""
        }`}
        style={{ clipPath: `url(#${clipId})` }}
      >
        {children}
      </div>
    </div>
  );
}
