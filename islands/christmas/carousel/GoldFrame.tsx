import {
  GOLD_FRAME_CLIP_PATH_TRANSFORM,
  GOLD_FRAME_SVG_PATH,
  GOLD_FRAME_VIEWBOX,
} from "./constants.ts";

interface GoldFrameProps {
  isDesktop: boolean;
  clipId: string;
}

function MobileGoldFrame() {
  return (
    <div class="absolute inset-0 pointer-events-none z-20 border-b-[5px] border-cr-primary" />
  );
}

function DesktopGoldFrame({ clipId }: { clipId: string }) {
  return (
    <>
      <svg
        class="absolute inset-0 pointer-events-none z-20"
        width="100%"
        height="100%"
        viewBox={GOLD_FRAME_VIEWBOX}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path
              d={GOLD_FRAME_SVG_PATH}
              transform={GOLD_FRAME_CLIP_PATH_TRANSFORM}
            />
          </clipPath>
          <filter id="goldGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <svg
        class="absolute inset-0 pointer-events-none z-20"
        width="100%"
        height="100%"
        viewBox={GOLD_FRAME_VIEWBOX}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={GOLD_FRAME_SVG_PATH}
          stroke="#E4C062"
          stroke-width="7.74"
          stroke-miterlimit="10"
          stroke-linecap="round"
          fill="none"
          filter="url(#goldGlow)"
        />
      </svg>
    </>
  );
}

export default function GoldFrame({ isDesktop, clipId }: GoldFrameProps) {
  return isDesktop ? <DesktopGoldFrame clipId={clipId} /> : <MobileGoldFrame />;
}
