import { Head } from "$fresh/runtime.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  /** @title Padrão Desktop */
  desktopPattern?: ImageWidget;
  /** @title Padrão Mobile */
  mobilePattern?: ImageWidget;
  /** @title Cor de Fundo */
  backgroundColor?: string;
  /** @title Offset Vertical Desktop */
  offsetYDesktop?: string;
  /** @title Offset Vertical Mobile */
  offsetYMobile?: string;
  /** @title Opacidade da Sobreposição */
  overlayOpacity?: number;
}

function buildBackgroundRule(
  image: string | undefined,
  overlay: string,
  position: string,
  color?: string,
  imageSize = "auto",
) {
  const hasImage = Boolean(image);

  const backgroundImage = hasImage
    ? `linear-gradient(${overlay}, ${overlay}), url(${image})`
    : `linear-gradient(${overlay}, ${overlay})`;

  const backgroundRepeat = hasImage ? "no-repeat, repeat" : "no-repeat";
  const backgroundSize = hasImage ? `auto, ${imageSize}` : "auto";
  const backgroundPosition = hasImage ? `center, ${position}` : "center";

  const declarations = [
    color ? `background-color: ${color};` : undefined,
    `background-image: ${backgroundImage};`,
    `background-repeat: ${backgroundRepeat};`,
    `background-size: ${backgroundSize};`,
    `background-position: ${backgroundPosition};`,
  ]
    .filter(Boolean)
    .join("\n");

  return declarations;
}

export default function CRBackground({
  desktopPattern,
  mobilePattern,
  backgroundColor,
  offsetYDesktop = "0%",
  offsetYMobile = "0%",
  overlayOpacity = 0.4,
}: Props) {
  const desktopSrc = desktopPattern ?? mobilePattern;
  const mobileSrc = mobilePattern ?? desktopPattern;

  if (!desktopSrc && !mobileSrc) {
    return null;
  }

  const overlay = `rgba(0, 0, 0, ${overlayOpacity})`;
  const desktopRule = buildBackgroundRule(
    desktopSrc,
    overlay,
    `left ${offsetYDesktop}`,
    backgroundColor,
  );
  const mobileRule = buildBackgroundRule(
    mobileSrc,
    overlay,
    `left ${offsetYMobile}`,
    backgroundColor,
    "contain",
  );

  return (
    <Head>
      {desktopPattern && (
        <link
          rel="preload"
          as="image"
          href={desktopPattern}
          media="(min-width: 769px)"
        />
      )}

      {mobilePattern && (
        <link
          rel="preload"
          as="image"
          href={mobilePattern}
          media="(max-width: 768px)"
        />
      )}

      <style
        type="text/css"
        // deno-lint-ignore react-no-danger
        dangerouslySetInnerHTML={{
          __html: `
            body {
              ${desktopRule}
            }

            @media (max-width: 768px) {
              body {
                ${mobileRule}
              }
            }`,
        }}
      />
    </Head>
  );
}
