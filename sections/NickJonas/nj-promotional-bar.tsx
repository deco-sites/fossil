export { default as LoadingFallback } from "../../components/LoadingFallback.tsx";

export interface Props {
  /**
   * @title Texto Promocional
   * @description Texto do link promocional
   */
  text?: string;

  /**
   * @title URL do Link
   * @description URL de destino do link promocional
   */
  url?: string;
}

function NJPromotionalBar({ text, url }: Props) {
  return (
    <div class="w-full h-11 flex items-center justify-center bg-nj-secondary">
      <a
        href={url}
        class="font-soleil text-xs font-bold uppercase text-white hover:opacity-80 transition-opacity tracking-wider"
      >
        {text}
      </a>
    </div>
  );
}

export default NJPromotionalBar;
