import Icon, { AvailableIcons } from "../../components/ui/Icon.tsx";

export type Item = {
  label: string;
  href: string;
  icon?: Icon; 
};

export type Section = {
  label: string;
  items: Item[];
};

export type Icon = {
   /** @title Icon */
   label?: "Email" | "Phone"
}

export default function FooterItems(
  { sections, justify = false, }: { sections: Section[]; justify?: boolean},
) {
  console.log(sections, "aqui")
  return (
    <>
      {sections.length > 0 && (
        <>
          {/* Tablet and Desktop view */}
          <ul
            class={`hidden md:flex flex-row gap-6 lg:gap-20 ${
              justify && "lg:justify-between"
            }`}
          >
            {sections.map((section) => (
              <li>
                <div class="flex flex-col gap-2">
                  <span class="font-bold text-primary uppercase text-2xl">
                    {section.label}
                  </span>
                  <ul class={`flex flex-col flex-wrap text-base`}>
                    {section.items?.map((item) => (
                      <li class="flex items-center gap-1">
                         {item.icon?.label && (
                            <Icon id={`${item.icon.label}`} size={16} strokeWidth={1} alt="icons" />
                          )}
                        <a href={item.href} class={`block py-1 text-base font-medium text-primary ${item.icon?.label ? 'pointer-events-none' : '' }`}>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          {/* Mobile view */}
          <ul class="flex flex-col md:hidden gap-4">
            {sections.map((section) => (
              <li>
                <div class="collapse collapse-arrow ">
                  <input id={section.label} type="checkbox" class="min-h-[0]" />
                  <label
                    htmlFor={section.label}
                    class="collapse-title min-h-[0] !p-0 flex gap-2"
                  >
                    <span>{section.label}</span>
                  </label>
                  <div class="collapse-content">
                    <ul
                      class={`flex flex-col gap-1 pl-5 pt-2`}
                    >
                      {section.items?.map((item) => (
                        <li class="flex justify-between">
                          {item.icon?.label && (
                            <Icon id={`${item.icon.label}`} size={16} strokeWidth={1} alt="icons" />
                          )}
                          <a
                            href={item.href}
                            class="block py-1 link link-hover"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
