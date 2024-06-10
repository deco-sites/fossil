import { clx } from "../../sdk/clx.ts";

export interface Props {
  title?: string;
  description?: string;
  layout?: {
    headerAlignment?: "center" | "left";
  };
}

export default function IframeMaps({ title, description, layout }: Props) {
  return (
    <div class="w-full max-w-7xl m-auto mb-20 lg:mb-28 lg:mt-28">
      <div
        class={`flex flex-col gap-2 py-10 px-4 lg:px-0 lg:pb-14 ${
          layout?.headerAlignment === "left"
            ? "text-left lg:pl-20 uppercase"
            : "text-center"
        }`}
      >
        {title &&
          (
            <h1
              class={clx(
                ` font-scoutCond  font-bold   tracking-[2px] text-4xl lg:text-[40px] lg:font-bold uppercase leading-8 lg:leading-10 text-[#1e1d2e]`,
              )}
            >
              {title}
            </h1>
          )}

        <p class=" block font-arial text-sm lg:text-18  mt-2 lg:mt-0 tracking-one text-[#1e1d2e]">
          {description}
        </p>
      </div>

      <div class="w-full">
        <iframe
          src="https://munddi.com/fossil?e=1"
          width="100%"
          height="500px"
          allow="geolocation *;"
        >
        </iframe>
      </div>
    </div>
  );
}
