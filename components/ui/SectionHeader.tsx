import { clx } from "../../sdk/clx.ts";

export interface Props {
  title?: string;
  fontSize?: "Small" | "Normal" | "Large";
  description?: string;
  alignment?: "center" | "left";
  colorReverse?: boolean;
}

const fontSizeClasses = {
  "Small": "lg:text-2xl",
  "Normal": "lg:text-3xl",
  "Large": "lg:text-4xl",
};

function Header(props: Props) {
  return (
    <>
      {props.title || props.description
        ? (
          <div
            class={`flex flex-col gap-2 ${
              props.alignment === "left"
                ? "text-left pl-20 uppercase"
                : "text-center lg:w-full m-auto"
            }`}
          >
            {props.title &&
              (
                <h1
                  class={clx(
                    " text-3xl lg:text-[2.5rem] font-bold leading-8 lg:leading-10 text-primary lg:pb-8",
                  )}
                >
                  {props.title}
                </h1>
              )}
            {props.description &&
              (
                <h2
                  class={clx(
                    "leading-6 lg:leading-8",
                    props.colorReverse
                      ? "text-primary-content"
                      : "text-base-content",
                    fontSizeClasses[props.fontSize || "Normal"],
                  )}
                >
                  {props.description}
                </h2>
              )}
          </div>
        )
        : null}
    </>
  );
}

export default Header;
