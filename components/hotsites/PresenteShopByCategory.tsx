import { PresenteButton } from "./PresenteButton.tsx";

export interface Props {
  /**
   *  @title Título
   */
  title?: string;
  categories?: {
    label?: string;
    url?: string;
  }[];
}

export default function PresenteShopByCategory({ title, categories }: Props) {
  return (
    <div class="w-full flex justify-center">
      <div class="w-full max-w-[1256px] flex flex-col gap-2">
        <h3 class="">{title}</h3>
        <div class="">
          {(categories || []).map(({ label, url }) => (
            <PresenteButton
              url={url || ""}
              label={label || ""}
              target="_blank"
              classes="py-3 px-8 flex justify-center items-center w-fit bg-white font-soleil border border-[#262626] text-[#262626] text-sm transition-all max-lg:text-sm"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
