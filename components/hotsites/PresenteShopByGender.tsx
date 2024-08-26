import Image from "apps/website/components/Image.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import { PresenteButton } from "./PresenteButton.tsx";

interface Link {
  /**
   * @title Texto
   */
  label?: string;
  /**
   * @title Link
   */
  url?: string;
}
export interface Props {
  /**
   * @title Título
   */
  title?: string;
  /**
   * @title Descrição
   */
  description?: string;
  /**
   * @title Imagem
   */
  image?: ImageWidget;
  /**
   * @title Lista de Links
   */
  links?: Link[];
}
export default function PresenteShopByGender(
  { title, description, image, links }: Props,
) {
  return (
    <div class="w-full py-10 flex justify-center max-lg:gap-10 max-lg:px-8">
      <div class="w-full max-w-[1192px] flex justify-center items-center gap-14 max-lg:flex-col max-lg:gap-5">
        {image && (
          <div class="w-full max-w-[720px] max-h-[620px]">
            <Image
              src={image}
              loading={"lazy"}
              width={720}
              class="h-full object-contain"
            />
          </div>
        )}
        <div class="flex flex-col max-lg:items-center gap-2">
          <p class="text-3xl font-medium font-sacker max-lg:text-center text-[#262626] max-lg:text-xl">
            {title}
          </p>
          <p class="text-base font-normal font-soleil max-lg:text-center text-[#262626] max-w-[320px] max-lg:text-sm">
            {description}
          </p>
          <div class="w-full flex flex-col gap-3 max-lg:items-center max-lg:mt-10">
            {(links || []).map(({ label, url }) => (
              <PresenteButton
                label={label || ""}
                url={url || ""}
                classes="rounded-full bg-[#262626] text-white py-3 px-8 w-fit flex justify-center items-center max-lg:text-sm"
                target="_blank"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
