/** @titleBy value */
export interface PriceCard {
  /**
   * @title Etiqueta
   * @description Texto pequeno acima do valor (ex: "GIFTS UNDER", "GIFTS THAT")
   */
  label: string;

  /**
   * @title Valor
   * @description Texto principal do card (ex: "$100", "$150", "WOW")
   */
  value: string;

  /**
   * @title URL
   * @description Link de destino ao clicar no card
   */
  url?: string;
}

export default function CRPriceCard({ label, value, url = "#" }: PriceCard) {
  return (
    <a
      href={url}
      class="block w-full bg-cr-bg-terciary rounded-xl overflow-hidden transition-colors duration-200 hover:bg-[#8DA460] text-white hover:text-primary aspect-[272/198]"
      aria-label={`${label} ${value}`}
    >
      <div class="flex flex-col items-center justify-center h-full px-4 py-8 text-center">
        <p class="font-soleil text-xs leading-4 tracking-wider uppercase lg:mb-2">
          {label}
        </p>
        <p class="font-benton italic text-4xl lg:text-5xl xl:text-6xl leading-tight lg:leading-[55px]">
          {value}
        </p>
      </div>
    </a>
  );
}
