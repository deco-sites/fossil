export const FALLBACK_WIDTH = 1920;
export const FALLBACK_HEIGHT = 960;

export const GOLD_FRAME_SVG_PATH =
  "M1158.07 601.838C1135.81 601.838 1117.76 623.57 1117.76 650.383C1117.76 651.599 1117.81 652.802 1117.88 654H45.1168C45.189 652.802 45.2371 651.599 45.2371 650.383C45.2371 623.57 27.1902 601.838 4.92641 601.838C4.61359 601.838 4.3068 601.856 4 601.868V56.1324C4.3068 56.1384 4.61359 56.1625 4.92641 56.1625C27.1902 56.1625 45.2371 34.4296 45.2371 7.61713C45.2371 6.40139 45.189 5.19769 45.1168 4H1117.88C1117.81 5.19769 1117.76 6.40139 1117.76 7.61713C1117.76 34.4296 1135.81 56.1625 1158.07 56.1625C1158.39 56.1625 1158.69 56.1444 1159 56.1324V601.862C1158.69 601.856 1158.39 601.832 1158.07 601.832V601.838Z";

export const GOLD_FRAME_CLIP_PATH_TRANSFORM =
  "scale(0.00085910653 0.00151975684)";

export const GOLD_FRAME_VIEWBOX = "0 0 1163 658";

export const GOLD_FRAME_STYLES = `
.gold-frame-wrapper {
  width: 100%;
  aspect-ratio: 1163 / 658;
}

.gold-frame-mask .swiper,
.gold-frame-mask .swiper-wrapper,
.gold-frame-mask .swiper-slide {
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  height: 100% !important;
}

.gold-frame-mask .swiper-slide picture {
  display: block !important;
  width: 100% !important;
  height: 100% !important;
}

.gold-frame-mask .swiper-slide img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center !important;
}
`;
