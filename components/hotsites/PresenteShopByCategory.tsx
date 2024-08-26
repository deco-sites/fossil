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
    <div class="w-full flex justify-center py-10 px-5">
      <div class="w-full max-w-[1256px] flex flex-col gap-2">
        <h3 class="font-bold text-[#242424] text-xl capitalize">{title}</h3>
        <div class="w-full flex items-center justify-between gap-4 max-lg:flex-col">
          {(categories || []).map(({ label, url }) => (
            <PresenteButton
              url={url || ""}
              label={label || ""}
              target="_blank"
              classes="py-3 px-8 flex justify-center items-center capitalize w-full bg-white font-soleil border border-[#262626] text-[#262626] text-sm transition-all max-lg:text-sm"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
