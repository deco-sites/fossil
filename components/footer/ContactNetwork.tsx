import Image from "apps/website/components/Image.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";

export interface ContactNetworkLinks {
  image: ImageWidget;
  href: string;
  label: string;
}
export interface ContactNetworkProps {
  label: string;
  links: ContactNetworkLinks[];
}

interface Props {
  networks: ContactNetworkProps[];
}

export default function ContactNetwork({ networks }: Props) {
  return (
    <section class="flex items-center justify-center float-none mx-auto p-[75px_0_20px_0] mb-10 max-w-[1050px] max-md:mb-[15px] max-lg:max-w-[800px]">
      <article class="flex items-center justify-around flex-1 mx-auto px-[50px] max-sm:p-0">
        {networks.map((network) => (
          <div class="flex flex-col items-center justify-around flex-1 w-full md:border-l border-black first:border-0 max-sm:mx-[10px]">
            <span class="text-normal font-bold text-sm leading-[18px] mb-4 uppercase max-sm:text-[10px] max-md:text-xs max-md:mb-3 max-md:text-center">
              {network.label}
            </span>
            <aside class="flex items-center justify-center">
              {network.links.map((link) => (
                <a href={link.href}>
                  <Image
                    src={link.image}
                    width={40}
                    height={40}
                    loading="lazy"
                    class="h-10 w-10 mx-[10px] max-md:w-[30px] max-md:h-[30px] max-sm:mx-[5px]"
                    alt={link.label}
                  />
                </a>
              ))}
            </aside>
          </div>
        ))}
      </article>
    </section>
  );
}
