import { clx } from "../../sdk/clx.ts";

export type CarouselNavDirection = "prev" | "next";

export type CarouselNavButtonVariant =
  | "christmas"
  | "nick-jonas"
  | "neutral"
  | "black";

interface CarouselNavButtonProps {
  id: string;
  direction: CarouselNavDirection;
  label: string;
  variant?: CarouselNavButtonVariant;
  /** @ignore true */
  class?: string;
  disabled?: boolean;
}

const VARIANT_CLASSES: Record<CarouselNavButtonVariant, string> = {
  christmas:
    "bg-cr-bg-terciary text-primary hover:bg-cr-bg-terciary/90 disabled:opacity-50",
  "nick-jonas": "bg-primary text-white hover:bg-primary/90 disabled:opacity-50",
  neutral: "bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50",
  black: "bg-black text-white hover:bg-black disabled:opacity-50",
};

const ICON_PATH: Record<CarouselNavDirection, string> = {
  prev: "M15 19l-7-7 7-7",
  next: "M9 5l7 7-7 7",
};

export default function CarouselNavButton({
  id,
  direction,
  label,
  variant = "neutral",
  class: className = "",
  disabled = false,
}: CarouselNavButtonProps) {
  const buttonId = `${id}-${direction}`;

  return (
    <button
      type="button"
      id={buttonId}
      class={clx(
        "w-10 h-10 rounded-full transition-colors duration-200 flex items-center justify-center",
        VARIANT_CLASSES[variant],
        className,
      )}
      aria-label={label}
      disabled={disabled}
    >
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d={ICON_PATH[direction]}
        />
      </svg>
    </button>
  );
}
