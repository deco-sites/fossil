import { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { PresenteButton } from "./PresenteButton.tsx";

export interface Props {
  banner: {
    imageDesktop: ImageWidget;
    animationImageDesktop: ImageWidget;
    imageMobile: ImageWidget;
  };
  logo?: {
    desktop?: ImageWidget;
    mobile?: ImageWidget;
  };
  title?: string;
  subtitle?: string;
  cta?: {
    label?: string;
    url?: string;
  };
}

export default function PresenteBanner(
  { banner, logo, title, subtitle, cta }: Props,
) {
  return (
    <div class="w-full relative flex flex-col items-center gap-5">
      <div class="w-full">
        <Picture>
          <Source
            media="(max-width: 1024px)"
            src={banner.imageMobile}
            width={1024}
          />
          <img src={banner.imageDesktop} class="w-full object-cover" />
        </Picture>
      </div>
      <div class="h-full lg:absolute flex items-center">
        <div class="flex flex-col items-center gap-5 w-full lg:max-w-[260px] max-lg:px-5">
          {logo?.desktop
            ? (
              <Picture class="">
                <Source
                  media="(max-width: 1024px)"
                  src={logo.mobile || logo.desktop}
                  width={176}
                />
                <img src={logo.desktop} class="w-full object-cover" />
              </Picture>
            )
            : null}
          <div class="w-full flex flex-col items-center gap-2">
            <h1 class="text-white font-medium font-sacker text-xl text-center tracking-wider max-lg:hidden">
              {title}
            </h1>
            <p class="text-white font-normal font-soleil text-center max-lg:text-[#262626]">
              {subtitle}
            </p>
          </div>
          {cta?.url
            ? (
              <PresenteButton
                url={cta?.url || ""}
                label={cta?.label || ""}
                classes="py-3 px-8 flex rounded-full justify-center items-center uppercase w-fit bg-white font-soleil border border-[#262626] text-[#262626] text-sm transition-all max-lg:text-sm"
                target="_target"
              />
            )
            : null}
        </div>
      </div>
    </div>
  );
}
