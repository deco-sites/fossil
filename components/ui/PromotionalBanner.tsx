export interface Button {
  name: string;
  url: string;
}

export interface Props {
  title: string;
  button: Button;
}

export default function PromotionalBanner({
  title = "Confiro os últimos lançamentos",
  button,
}: Props) {
  return (
    <div class="w-full flex items-center justify-center bg-[#E97E53]  md:mt-4">
      <div class="w-full font-soleil flex flex-col md:flex-row items-center text-center justify-between   py-4 md:py-8 px-10  md:px-20">
        <span></span>
        <h2 class="uppercase font-bold text-primary text-xl lg:text-[32px]">
          {title}
        </h2>
        <a
          href={button.url}
          class="underline uppercase text-xs md:text-base font-bold"
        >
          {button.name}
        </a>
      </div>
    </div>
  );
}
