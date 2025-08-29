import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  /** @title Quote Text */
  quote?: string;
  /** @title Background Image */
  backgroundImage?: ImageWidget;
  /** @title Button Text */
  buttonText?: string;
  /** @title Button Link */
  buttonLink?: string;
}

export default function HeroQuote({
  quote = "Wearing watches should be fun. It's an expression of who you are.",
  backgroundImage =
    "https://assets.decocache.com/fossil/cd51e430-dfac-45eb-ada1-929d310b148f/hero-quote-background.jpg",
  buttonText = "Shop All",
  buttonLink = "/products",
}: Props) {
  return (
    <section class="relative w-full h-[373px] flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div
        class="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />
      <div class="absolute inset-0 bg-black bg-opacity-50" />

      {/* Content */}
      <div class="relative z-10 max-w-[571px] px-4 text-center">
        {/* Quote */}
        <h2
          class="text-white text-[61px] leading-[55px] font-normal italic text-center mb-10 tracking-[-0.488px]"
          style={{ fontFamily: "Benton Modern D" }}
        >
          {quote}
        </h2>

        {/* Button */}
        <a
          href={buttonLink}
          class="inline-flex items-center justify-center px-6 py-[15px] bg-white border border-[#CCCCCC] rounded-full text-[#242424] text-sm font-bold leading-[21px] hover:bg-gray-50 transition-colors"
          style={{ fontFamily: "Soleil" }}
        >
          {buttonText}
        </a>
      </div>

      {/* Stars Pattern */}
      <div class="absolute bottom-0 left-0 right-0 h-[47px] border-t-[5px] border-[#28784F]">
        <div class="w-full h-full relative overflow-hidden">
          {/* Stars Grid Pattern */}
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="grid grid-cols-[repeat(54,24px)] gap-x-[23px] gap-y-[23px] grid-rows-2">
              {Array.from(
                { length: 108 },
                (_, i) => (
                  <div key={i} class="w-6 h-6 relative">
                    {/* Star Background */}
                    <div class="w-full h-full bg-[#28784F] transform rotate-45" />
                    {/* Star Icon */}
                    <div class="absolute inset-0 flex items-center justify-center">
                      <svg
                        width="11"
                        height="13"
                        viewBox="0 0 11 13"
                        fill="none"
                        class="transform -rotate-45"
                      >
                        <path
                          d="M5.5 0L6.7 4.2H11L7.65 6.8L8.85 11L5.5 8.4L2.15 11L3.35 6.8L0 4.2H4.3L5.5 0Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
