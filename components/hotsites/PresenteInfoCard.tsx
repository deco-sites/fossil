import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { PresenteButton } from "./PresenteButton.tsx";

interface Card {
  /**
   * @title Título
   */
  label?: string;
  /**
   * @title Descrição
   */
  description?: string;
  /**
   * @title Imagem
   */
  image?: ImageWidget;
  /**
   * @title Link
   */
  url?: string;
}
interface Props {
  /**
   * @title Cards
   */
  cards?: Card[];
}
export default function PresenteInfoCard({ cards }: Props) {
  return (
    <div class="w-full py-10 flex justify-center">
      <div class="w-full max-w-[1536px] flex max-lg:gap-10 max-lg:flex-col">
        {(cards || []).map(({ label, description, image, url }) => (
          <div class="w-full flex flex-col gap-5">
            {image && (
              <div class="w-full">
                <Image
                  src={image}
                  loading={"lazy"}
                  width={500}
                  class="w-full h-full max-h-[470px]"
                />
              </div>
            )}
            <div class="w-full flex flex-col items-center gap-3">
              <p class="text-xl font-medium font-sacker uppercase tracking-wider text-center text-[#262626]">
                {label}
              </p>
              <p class="text-base font-normal font-soleil text-center text-[#262626] max-w-[320px] max-lg:text-sm">
                {description}
              </p>
              <PresenteButton
                label="Presentear"
                url={url || ""}
                target="_blank"
                classes="rounded-full bg-[#262626] text-white py-3 px-8 flex justify-center items-center max-lg:text-sm"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
