import Icon from "../../components/ui/Icon.tsx";
import Divider from "./Divider.tsx";

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
  label?: "Email" | "Phone";
};

export default function FooterItems(
  { sections, justify = false, device }: {
    sections: Section[];
    justify?: boolean;
    device?: string;
  },
) {
  return (
    <>
      {sections.length > 0 && (
        <>
          {/* Tablet and Desktop view */}
          {(device === "desktop")
            ? (
              <ul
                class={`hidden md:flex flex-row gap-6 lg:gap-20 ${
                  justify && "lg:justify-between"
                }`}
              >
                {sections.map((section) => (
                  <li key={section.label}>
                    <div class="flex flex-col gap-2">
                      <span class="font-bold text-primary uppercase text-2xl">
                        {section.label}
                      </span>
                      <ul class={`flex flex-col flex-wrap text-base`}>
                        {section.items?.map((item, idx) => (
                          <li class="flex items-center gap-1" key={idx}>
                            {item.icon?.label && (
                              <Icon
                                id={item.icon.label}
                                size={16}
                                strokeWidth={1}
                                alt="icons"
                              />
                            )}
                            <a
                              href={item.href}
                              class={`block py-1 text-base font-medium text-primary ${
                                item.icon?.label ? "pointer-events-none" : ""
                              }`}
                            >
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            )
            : (
              <>
                <ul class="flex flex-col  justify-between md:hidden gap-2 py-4">
                  {sections.map((section, index) => (
                    <li key={section.label}>
                      <div class="mb-6">
                        <Divider />
                      </div>
                      <div
                        class={` ${
                          index === sections.length - 1 ? "" : "collapse collapse-plus"
                        } `}
                      >
                        {!(index === sections.length - 1) && (
                          <input
                            id={section.label}
                            type="checkbox"
                            class=""
                          />
                        )}
                        <label
                          htmlFor={section.label}
                          class="collapse-title !font-bold !text-2xl min-h-[0] !p-0 flex gap-2"
                        >
                          <span class=" text-primary text-2xl font-bold uppercase flex items-center">
                            {section.label}
                          </span>
                        </label>
                        <div
                          class={`${
                            index === sections.length - 1 ? " " : "collapse-content"
                          } !p-0`}
                        >
                          <ul class={`flex flex-col`}>
                            {section.items?.map((item, idx) => (
                              <li
                                class={`flex items-center gap-2 ${
                                  section.label === "Atendimento" && "first:mt-4"
                                }`}
                                key={idx}
                              >
                                {item.icon?.label && (
                                  <Icon
                                    id={item.icon.label}
                                    size={16}
                                    strokeWidth={1}
                                    alt="icons"
                                  />
                                )}
                                <a
                                  href={item.href}
                                  class={`block py-1 text-sm font-medium text-primary ${
                                    item.icon?.label ? "pointer-events-none" : ""
                                  }`}
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
          {/* Mobile view */}
        </>
      )}
    </>
  );
}
