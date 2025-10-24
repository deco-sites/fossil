export interface ButtonProps {
  /**
   * @title Texto do Botão
   * @description Texto exibido no botão
   */
  name: string;

  /**
   * @title URL do Botão
   * @description Link de destino do botão
   */
  url?: string;

  /** @ignore true */
  class?: string;
}

export default function Button({
  name,
  url = "#",
  class: className = "",
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center py-3 px-4 font-soleil font-medium text-sm rounded-full tracking-wide transition-colors duration-200";

  return (
    <a
      href={url}
      class={`${baseClasses} leading-none text-xs bg-cr-primary text-primary hover:bg-cr-primary/90 cursor-pointer ${className}`}
      onMouseEnter={() => {
        const swiperContainer = document.querySelector(".swiper");
        if (swiperContainer) {
          swiperContainer.dispatchEvent(new Event("mouseenter"));
        }
      }}
      onMouseLeave={() => {
        const swiperContainer = document.querySelector(".swiper");
        if (swiperContainer) {
          swiperContainer.dispatchEvent(new Event("mouseleave"));
        }
      }}
    >
      {name}
    </a>
  );
}
