import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  /**
   *  @title Título
   */
  title?: string;
  news?: {
    /**
     *  @title Imagem
     */
    image?: ImageWidget;
    /**
     *  @title Título
     */
    label?: string;
    /**
     *  @title Subtítulo
     */
    subtitle?: string;
    link?: {
      label?: string;
      url?: string;
    };
  }[];
}
export default function PresenteWhatNews({ title, news }: Props) {
  return (
    <div class="w-full flex justify-center py-10 px-5 bg-[#F6F4F0]">
      <div class="w-full max-w-[1256px] flex flex-col gap-5">
        <p class="text-xl font-medium font-sacker uppercase text-black">
          {title}
        </p>
        <div class="w-full flex gap-4 max-lg:flex-wrap max-lg:justify-center">
          {(news || []).map(({ image, label, subtitle, link }) => (
            <div class="lg:w-full gap-2 max-lg:max-w-40 flex flex-col">
              {image
                ? (
                  <div class="w-full max-h-[255px] max-md:max-h-[136px] flex items-center justify-center overflow-hidden ">
                    <Image
                      src={image}
                      width={300}
                      class="relative transition-all hover:opacity-35"
                      loading={"lazy"}
                    />
                  </div>
                )
                : null}
              <div class="w-full flex flex-col gap-3 max-md:gap-1">
                <p class="text-base font-bold text-black w-full max-md:text-sm">
                  {label}
                </p>
                <span class="max-lg:hidden lg:flex text-sm font-bold text-black w-full">
                  {subtitle}
                </span>
                {link?.url
                  ? (
                    <a
                      href={link.url}
                      class="text-sm font-bold text-black underline max-md:text-sm w-full"
                      target="_blank"
                    >
                      {link.label}
                    </a>
                  )
                  : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
