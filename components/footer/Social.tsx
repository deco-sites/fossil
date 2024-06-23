import Image from "apps/website/components/Image.tsx";
import Icon from "../../components/ui/Icon.tsx";

export interface SocialItem {
  label:
    | "Discord"
    | "Facebook"
    | "Instagram"
    | "Linkedin"
    | "Tiktok"
    | "Twitter"
    | "YouTube"
    | "Pinterest"
    | "XMark";
  link: string;
}

export default function Social(
  { content, vertical = false }: {
    content?: { title?: string; items?: SocialItem[] };
    vertical?: boolean;
  },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col gap-4">
          <ul
            class={`flex gap-4 ${
              vertical ? "lg:flex-col lg:items-start" : "flex-wrap items-center"
            }`}
          >
            {content.items.map((item) => {
              return (
                <li>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.label} Logo`}
                    class="flex gap-2 items-center"
                  >
                    <span class="block p-1 text-[#707070]">
                      <Icon size={24} id={item.label} />
                    </span>
                    {vertical && (
                      <div class="text-sm hidden lg:block">{item.label}</div>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
          <Image
            src={`https://service.yourviews.com.br/Image/7f75d9ac-38c3-4026-9132-3b56ecca7415/Footer.jpg`}
            width={88}
            height={91}
            loading="lazy"
            alt="service yourviews"
          />
        </div>
      )}
    </>
  );
}
