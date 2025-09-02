import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  /** @title Overline Text */
  overlineText?: string;
  /** @title Main Title */
  title?: string;
  /** @title Description */
  description?: string;
  /** @title Button Text */
  buttonText?: string;
  /** @title Button Link */
  buttonLink?: string;
  /** @title Hero Image */
  heroImage?: ImageWidget;
  /** @title Hero Image Alt */
  heroImageAlt?: string;
  /** @title Mug Section Overline */
  mugOverlineText?: string;
  /** @title Mug Section Title */
  mugTitle?: string;
  /** @title Mug Section Description */
  mugDescription?: string;
  /** @title Mug Background Image */
  mugBackgroundImage?: ImageWidget;
  /** @title Watch Image */
  watchImage?: ImageWidget;
  /** @title Watch Image Alt */
  watchImageAlt?: string;
}

export default function NickJonasCollection({
  overlineText = "now serving",
  title = "The Nick Jonas Collection",
  description = "Discover iconic timepieces from the cultural icon. Statement-making watches and watch rings, complete with a side of bold design details.",
  buttonText = "Explore More",
  buttonLink = "#",
  heroImage = "https://assets.decocache.com/fossil/fcafc56b-d438-42c2-855c-c963fa92f4f1/nick-jonas-hero.jpg",
  heroImageAlt = "Nick Jonas Collection Hero",
  mugOverlineText = "hot news!",
  mugTitle = "Fossil Diner Mug",
  mugDescription = "Included with every Nick Jonas x Fossil purchase (while supplies last).",
  mugBackgroundImage = "https://assets.decocache.com/fossil/55785309-b6ae-4bd5-9a6e-a5b1e6a1e79b/nick-jonas-mug-bg.jpg",
  watchImage = "https://assets.decocache.com/fossil/495cabfe-74cf-47a5-917a-15a9819a00bb/nick-jonas-watch.jpg",
  watchImageAlt = "Nick Jonas Watch"
}: Props) {
  return (
    <section class="w-full max-w-[1280px] mx-auto px-4 py-16 relative">
      <div class="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Content */}
        <div class="flex-1 flex flex-col gap-20">
          {/* Main Content */}
          <div class="flex flex-col gap-5">
            <div class="flex flex-col gap-2.5">
              <p class="text-xs font-light uppercase tracking-[0.6px] leading-4 text-black">
                {overlineText}
              </p>
              <h2 class="text-[61px] leading-[55px] font-normal italic tracking-[-0.488px] text-black">
                {title}
              </h2>
            </div>
            <p class="text-sm leading-[21px] text-black max-w-[373px]">
              {description}
            </p>
            <a 
              href={buttonLink}
              class="inline-flex items-center justify-center bg-[#242424] text-white px-6 py-[15px] rounded-full text-sm font-bold leading-[21px] hover:bg-black transition-colors w-fit"
            >
              {buttonText}
            </a>
          </div>

          {/* Mug Section */}
          <div 
            class="relative rounded-[28px] p-11 min-h-[543px] flex flex-col justify-end"
            style={{
              backgroundImage: `url(${mugBackgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div class="absolute inset-0 rounded-[28px] shadow-[inset_0_-125px_50px_rgba(255,255,255,0.25)]"></div>
            
            <div class="relative z-10 flex flex-col gap-2.5 max-w-[373px]">
              <p class="text-xs font-light uppercase tracking-[0.6px] leading-4 text-black">
                {mugOverlineText}
              </p>
              <h3 class="text-[33px] leading-[30px] font-normal italic text-black">
                {mugTitle}
              </h3>
              <p class="text-sm leading-[21px] text-black">
                {mugDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div class="flex-1 lg:max-w-[671px]">
          <div class="relative">
            <img 
              src={heroImage}
              alt={heroImageAlt}
              class="w-full h-[750px] object-cover rounded-[28px]"
            />
            
            {/* Watch Image Overlay */}
            <div class="absolute top-[85px] left-[91px]">
              <img 
                src={watchImage}
                alt={watchImageAlt}
                class="w-[154px] h-[207px] object-cover"
              />
            </div>

            {/* Fossil Logo Overlay */}
            <div class="absolute bottom-[68px] right-[45px]">
              <svg width="134" height="138" viewBox="0 0 134 138" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0)">
                  <path d="M67 16.85C40.31 16.85 18.15 39.01 18.15 65.7C18.15 92.39 40.31 114.55 67 114.55C93.69 114.55 115.85 92.39 115.85 65.7C115.85 39.01 93.69 16.85 67 16.85Z" fill="#004677"/>
                  <path d="M67 29.42C46.14 29.42 29.42 46.14 29.42 67C29.42 87.86 46.14 104.58 67 104.58C87.86 104.58 104.58 87.86 104.58 67C104.58 46.14 87.86 29.42 67 29.42Z" fill="#FEC00F"/>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Stars */}
      <div class="absolute top-0 left-4 opacity-70">
        <svg width="45" height="51" viewBox="0 0 45 51" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M27.81 13.29L27.81 0L29.61 0L29.61 13.29L27.81 13.29Z" fill="#004677"/>
          <path d="M27.81 32.92L27.81 19.63L29.61 19.63L29.61 32.92L27.81 32.92Z" fill="#004677"/>
          <path d="M38.43 21.19L21.38 21.19L21.38 19.39L38.43 19.39L38.43 21.19Z" fill="#004677"/>
          <path d="M17 21.19L0 21.19L0 19.39L17 19.39L17 21.19Z" fill="#004677"/>
        </svg>
      </div>

      <div class="absolute bottom-0 right-4 opacity-70 rotate-180">
        <svg width="45" height="51" viewBox="0 0 45 51" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M27.81 13.29L27.81 0L29.61 0L29.61 13.29L27.81 13.29Z" fill="#004677"/>
          <path d="M27.81 32.92L27.81 19.63L29.61 19.63L29.61 32.92L27.81 32.92Z" fill="#004677"/>
          <path d="M38.43 21.19L21.38 21.19L21.38 19.39L38.43 19.39L38.43 21.19Z" fill="#004677"/>
          <path d="M17 21.19L0 21.19L0 19.39L17 19.39L17 21.19Z" fill="#004677"/>
        </svg>
      </div>
    </section>
  );
}