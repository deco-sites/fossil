import BackToTop from "../../components/footer/BackToTop.tsx";
import FooterItems from "../../components/footer/FooterItems.tsx";
import Image from "apps/website/components/Image.tsx";
import PaymentMethods from "../../components/footer/PaymentMethods.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import ContactNetwork, {
  ContactNetworkProps,
} from "../../components/footer/ContactNetwork.tsx";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export interface PaymentItem {
  label: string;
  image: ImageWidget;
  width: number;
}

export interface Selos {
  image: ImageWidget;
  href?: string;
  alt?: string;
}

export interface Props {
  logo?: {
    image: ImageWidget;
  };
  sections: Section[];
  payments?: {
    title?: string;
    items: PaymentItem[];
  };
  address?: string;
  selos?: Selos[];
  contactNetworks?: ContactNetworkProps[];
}

function Footer({
  logo,
  sections,
  payments,
  address,
  selos,
  contactNetworks,
}: Props) {
  return (
    <>
      {contactNetworks && <ContactNetwork networks={contactNetworks} />}
      <footer
        class={`bg-primary pt-10 px-[100px] pb-5 max-md:p-[40px_26px_20px]`}
      >
        <div class="block p-0 mb-[5%] max-md:hidden">
          <Image
            src={logo?.image || ""}
            width={239}
            height={50}
            loading="lazy"
            class="w-[240px] h-[50px]"
          />
        </div>
        <div class="block border-b-[3px] border-white relative -top-[50px] max-md:hidden">
        </div>
        <FooterItems
          sections={sections}
          variant="mobile"
        />
        <div class="max-lg:hidden">
          <div class="mt-[-23px] flex w-full justify-between">
            <FooterItems
              sections={sections}
              variant="desktop"
            />
            <PaymentMethods content={payments} />
          </div>
        </div>
        <div class="w-full md:hidden flex items-center justify-between pt-10">
          <PaymentMethods content={payments} />
        </div>
        <div class="block lg:flex justify-between">
          <div class="flex w-[83%] pt-[5%]">
            <div class="w-full">
              <p class="font-medium text-sm leading-none">{address}</p>
            </div>
          </div>
          <div class="w-full lg:w-1/5 lg:flex lg:justify-end h-[243px] pt-[31px] max-md:w-[79%] max-sm:w-1/2 max-sm:mx-auto max-sm:h-[350px]">
            <div class="lg:w-[182px] lg:flex gap-1 flex-wrap lg:h-[169px] -mt-[25px] max-sm:flex max-sm:items-center max-sm:gap-2 max-sm:justify-center max-sm:flex-wrap max-sm:p-[35px_0_13px]">
              {selos?.map((selo) => (
                <a
                  href={selo.href || ""}
                  class="flex items-center justify-center w-fit"
                >
                  <img
                    src={selo.image || ""}
                    alt={selo.alt || ""}
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
        <BackToTop />
      </footer>
    </>
  );
}

export default Footer;
