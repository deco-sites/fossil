import { itemToAnalyticsItem } from "apps/vtex/hooks/useCart.ts";
import BackToTop from "../../components/footer/BackToTop.tsx";
import Divider from "../../components/footer/Divider.tsx";
import ExtraLinks from "../../components/footer/ExtraLinks.tsx";
import FooterItems from "../../components/footer/FooterItems.tsx";
import Logo from "../../components/footer/Logo.tsx";
import MobileApps from "../../components/footer/MobileApps.tsx";
import PaymentMethods from "../../components/footer/PaymentMethods.tsx";
import RegionSelector from "../../components/footer/RegionSelector.tsx";
import Social from "../../components/footer/Social.tsx";
import Newsletter from "../../islands/Newsletter.tsx";
import { clx } from "../../sdk/clx.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import PoweredByDeco from "apps/website/components/PoweredByDeco.tsx";
import { AppContext } from "../../apps/site.ts";

export type Item = {
  label: string;
  href: string;
  icon?: Icon;
};

export interface ExtraLinks {
  content?: Item[];
  copyright?: string;
}
export type Icon = {
  label?: "Email" | "Phone";
};
export type Section = {
  label: string;
  items: Item[];
};
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

export interface PaymentItem {
  label: "Diners" | "Elo" | "Mastercard" | "Pix" | "Visa";
}

export interface MobileApps {
  /** @description Link to the app */
  apple?: string;
  /** @description Link to the app */
  android?: string;
}

export interface RegionOptions {
  currency?: Item[];
  language?: Item[];
}

export interface NewsletterForm {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Layout {
  backgroundColor?:
    | "Primary"
    | "Secondary"
    | "Accent"
    | "Base 100"
    | "Base 100 inverted";
  variation?: "Variation 3";
  hide?: {
    logo?: boolean;
    newsletter?: boolean;
    sectionLinks?: boolean;
    socialLinks?: boolean;
    paymentMethods?: boolean;
    mobileApps?: boolean;
    regionOptions?: boolean;
    extraLinks?: boolean;
    backToTheTop?: boolean;
  };
}

export interface Props {
  logo?: {
    image: ImageWidget;
    description?: string;
  };
  newsletter?: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: NewsletterForm;
  };
  sections?: Section[];
  social?: {
    title?: string;
    items: SocialItem[];
  };
  payments?: {
    title?: string;
    items: PaymentItem[];
  };
  mobileApps?: MobileApps;
  extraLinks: ExtraLinks;
  address?: string;
  backToTheTop?: {
    text?: string;
  };
  layout?: Layout;
}

const LAYOUT = {
  "Primary": "bg-primary text-primary-content",
  "Secondary": "bg-secondary text-secondary-content",
  "Accent": "bg-accent text-accent-content",
  "Base 100": "bg-base-100 text-base-content",
  "Base 100 inverted": "bg-base-content text-base-100",
};

function Footer({
  logo,
  newsletter = {
    title: "Newsletter",
    description: "",
    form: { placeholder: "", buttonText: "", helpText: "" },
  },
  sections = [{
    "label": "Sobre",
    "items": [
      {
        "href": "/quem-somos",
        "label": "Quem somos",
      },
      {
        "href": "/termos-de-uso",
        "label": "Termos de uso",
      },
      {
        "href": "/trabalhe-conosco",
        "label": "Trabalhe conosco",
      },
    ],
  }, {
    "label": "Atendimento",
    "items": [
      {
        "href": "/centraldeatendimento",
        "label": "Central de atendimento",
      },
      {
        "href": "/whatsapp",
        "label": "Fale conosco pelo WhatsApp",
      },
      {
        "href": "/trocaedevolucao",
        "label": "Troca e devolução",
      },
    ],
  }],
  social = {
    title: "Redes sociais",
    items: [{ label: "Instagram", link: "/" }, { label: "Tiktok", link: "/" }],
  },
  payments = {
    title: "Formas de pagamento",
    items: [{ label: "Mastercard" }, { label: "Visa" }, { label: "Pix" }],
  },
  mobileApps = { apple: "/", android: "/" },
  extraLinks = { copyright: "2019", content: [] },
  address =
    "Endereço: Est. Luiz Lopes Neto, 21 - Galpão A - Modulo 4 Do Tenentes - Extrema - MG - Cep: 37.640-000 CNPJ: 28.778.134/0026-05",
  backToTheTop,
  layout = {
    backgroundColor: "Primary",
    hide: {
      logo: false,
      newsletter: false,
      sectionLinks: false,
      socialLinks: false,
      paymentMethods: false,
      mobileApps: false,
      regionOptions: false,
      extraLinks: false,
      backToTheTop: false,
    },
  },
  device,
}: Props & { device?: string }) {
  const _logo = layout?.hide?.logo ? <></> : <Logo logo={logo} />;
  const _newsletter = layout?.hide?.newsletter ? <></> : (
    <Newsletter
      content={newsletter}
    />
  );
  const _sectionLinks = layout?.hide?.sectionLinks ? <></> : (
    <FooterItems
      sections={sections}
      device={device}
    />
  );
  const _social = layout?.hide?.socialLinks
    ? <></>
    : <Social content={social} />;
  const _payments = layout?.hide?.paymentMethods
    ? <></>
    : <PaymentMethods content={payments} />;
  const _apps = layout?.hide?.mobileApps
    ? <></>
    : <MobileApps content={mobileApps} />;
  const _links = layout?.hide?.extraLinks ? <></> : (
    <ExtraLinks
      content={extraLinks.content}
      copyright={extraLinks.copyright}
    />
  );
  return (
    <footer
      class={clx(
        "w-full flex flex-col pt-10 gap-10",
      )}
    >
      {/** Desktop */}
      {device === "desktop"
        ? (
          <>
            <div class="container hidden md:block px-16 lg:mx-auto">
              <Divider />
              <div class="flex flex-col gap-10 pt-4">
                <div class="flex flex-col lg:flex-row gap-14">
                  <div class="flex flex-col md:flex-row lg:flex-col md:justify-between lg:justify-normal gap-10 lg:w-2/5">
                    {_newsletter}
                    <div class="flex flex-col gap-10">
                      {_social}
                    </div>
                  </div>
                  <div class="flex flex-col gap-10 lg:gap-20 lg:w-3/5 lg:items-end">
                    <div class="flex flex-col md:flex-row gap-10">
                      {_sectionLinks}
                    </div>
                  </div>
                </div>
              </div>
              <address class="w-full font-light not-italic py-8">
                {address}
              </address>
            </div>
            <div class="hidden md:flex flex-col items-center md:flex-row md:justify-between gap-10 bg-[#FAF8F6]">
              <div class="w-full flex items-center">
                {_links}
              </div>
            </div>
          </>
        )
        : (
          <>
            {/* Mobile */}
            <div class="container block px-4 lg:mx-auto">
              <Divider />
              <div class="flex flex-col pt-4">
                {_newsletter}
              </div>
              <div class="flex flex-col gap-6  pt-12">
                {_social}
              </div>
              <div class="w-full">
                {_sectionLinks}
              </div>
              <address class="w-56 m-auto font-light not-italic py-8">
                {address}
              </address>
              <div class="w-full flex flex-wrap justify-between bg-[#FAF8F6]">
                {_links}
              </div>
            </div>
          </>
        )}
    </footer>
  );
}

export default Footer;

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, device: ctx.device };
};
