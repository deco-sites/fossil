import Image from "apps/website/components/Image.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import { PresenteButton } from "./PresenteButton.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";

interface ActionProps {
  logo?: {
    desktop?: ImageWidget;
    mobile?: ImageWidget;
  };
  /**
   * @title Título
   */
  title?: string;
  /**
   * @title Descrição
   */
  description?: string;
  cta: {
    label?: string;
    url?: string;
  };
  link?: string;
}
export interface Props {
  banner?: {
    desktop?: ImageWidget;
    mobile?: ImageWidget;
  };
  action?: ActionProps;
}

export default function PresenteActionBanner({ banner, action }: Props) {
  return (
    <div class="w-full flex justify-center">
      <div class="w-full lg:relative max-lg:flex max-lg:flex-col max-lg:gap-5">
        {banner?.desktop && (
          <Picture class="">
            <Source
              media="(max-width: 1024px)"
              src={banner.mobile || banner.desktop}
              width={176}
            />
            <Image
              src={banner.desktop}
              class="w-full object-cover"
              width={2000}
              loading={"lazy"}
            />
          </Picture>
        )}
        <div class="w-full lg:max-w-[350px] h-full lg:absolute flex flex-col items-center justify-center lg:top-0 lg:ml-[95px] max-lg:px-4 max-lg:pb-9">
          <div class="w-full flex flex-col items-center gap-5">
            <div class="flex flex-col items-center gap-2">
              {action?.logo?.desktop
                ? (
                  <Picture class="">
                    <Source
                      media="(max-width: 1024px)"
                      src={action?.logo.mobile || action?.logo.desktop}
                      width={176}
                    />
                    <img
                      src={action?.logo.desktop}
                      class="w-full object-cover"
                    />
                  </Picture>
                )
                : null}
              {action?.title && (
                <p class="text-white text-center font-soleil text-xl font-bold max-lg:text-[#262626]">
                  {action.title}
                </p>
              )}
              {action?.description && (
                <p class="text-white text-center font-soleil text-base max-lg:text-[#262626]">
                  {action.description}
                </p>
              )}
            </div>
            {/* CTA */}
            {action?.cta.label && (
              <PresenteButton
                label={action?.cta.label}
                url={action?.cta.url || ""}
                classes="py-3 px-8 flex justify-center items-center w-fit rounded-full bg-white font-soleil border border-[#262626] text-[#262626] text-sm transition-all max-lg:text-sm"
                target="_blank"
              />
            )}
            {action?.link
              ? (
                <a
                  class="text-white font-soleil text-sm underline max-lg:text-[#262626]"
                  href={action.link}
                >
                  Explore Now
                </a>
              )
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
