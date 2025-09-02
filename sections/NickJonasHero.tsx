import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  /** @title Texto da barra superior */
  topBarText?: string;
  /** @title Imagem de fundo */
  backgroundImage?: ImageWidget;
  /** @title Logo Nick Jonas x Fossil */
  logo?: ImageWidget;
  /** @title Texto do botão */
  buttonText?: string;
  /** @title Link do botão */
  buttonLink?: string;
}

export default function NickJonasHero({
  topBarText = "THE NICK JONAS COLLECTION: GET IT FIRST AT FOSSIL",
  backgroundImage = "https://assets.decocache.com/fossil/38b7f127-2b11-458d-a5d9-b27c63ae7fa8/nick-jonas-hero-bg.jpg",
  logo,
  buttonText = "Shop All",
  buttonLink = "#",
}: Props) {
  return (
    <div class="w-full">
      {/* Barra verde superior */}
      <div class="bg-[#287851] text-white py-3 px-4">
        <div class="text-center">
          <p class="text-xs font-bold tracking-wide uppercase">
            {topBarText}
          </p>
        </div>
      </div>

      {/* Hero principal */}
      <div 
        class="relative w-full h-[638px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* Overlay escuro */}
        <div class="absolute inset-0 bg-black bg-opacity-25"></div>
        
        {/* Conteúdo centralizado */}
        <div class="relative z-10 flex flex-col items-center justify-center text-center text-white px-14">
          {/* Logo Nick Jonas x Fossil */}
          {logo && (
            <div class="mb-6">
              <img 
                src={logo} 
                alt="Nick Jonas x Fossil" 
                class="w-72 h-auto"
              />
            </div>
          )}
          
          {/* Botão Shop All */}
          <a 
            href={buttonLink}
            class="bg-white text-black font-bold text-sm px-6 py-4 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
          >
            {buttonText}
          </a>
        </div>
      </div>

      {/* Padrão decorativo inferior */}
      <div class="bg-white border-t-4 border-[#287851] py-6">
        <div class="max-w-screen-xl mx-auto px-4">
          {/* Padrão de quadrados em xadrez */}
          <div class="flex justify-center">
            <div class="grid grid-cols-[repeat(54,1fr)] gap-0 w-full max-w-5xl">
              {Array.from({ length: 108 }, (_, i) => {
                const row = Math.floor(i / 54);
                const col = i % 54;
                const isEvenRow = row % 2 === 0;
                const isEvenCol = col % 2 === 0;
                const shouldFill = (isEvenRow && isEvenCol) || (!isEvenRow && !isEvenCol);
                const shouldHaveIcon = [5, 8, 11, 15, 19, 23, 27, 31, 35, 39, 43, 47].includes(col) && row === 0 ||
                                     [2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42, 46, 50].includes(col) && row === 1;
                
                return (
                  <div
                    key={i}
                    class={`w-6 h-6 ${shouldFill ? 'bg-[#287851]' : 'bg-transparent'} relative flex items-center justify-center`}
                  >
                    {shouldHaveIcon && (
                      <svg class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}