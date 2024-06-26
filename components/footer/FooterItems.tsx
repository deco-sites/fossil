export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export default function FooterItems(
  { sections, variant }: { sections: Section[]; variant: "mobile" | "desktop" },
) {
  return (
    <>
      {sections.length > 0 && (
        <>
          {/* Tablet and Desktop view */}
          {variant === "desktop" && (
            <>
              {sections.map((section) => (
                <div class="flex flex-col">
                  <span class="font-bold uppercase text-sm py-[10%] leading-none text-[#4a4a4a]">
                    {section.label}
                  </span>
                  {section.items?.map((item) => (
                    <a href={item.href} class="mt-[10px]">
                      <span class="text-sm leading-none text-[#4a4a4a]">
                        {item.label}
                      </span>
                    </a>
                  ))}
                </div>
              ))}
            </>
          )}

          {/* Mobile view */}
          {variant === "mobile" && (
            <ul class="flex flex-col md:hidden">
              {sections.map((section) => (
                <li class="border-b-2 border-white">
                  <div class="collapse collapse-arrow ">
                    <input type="checkbox" class="min-h-[40px]" />
                    <div class="collapse-title min-h-[40px] items-center text-[#4a4a4a] uppercase text-sm font-bold !p-0 flex gap-2 after:-rotate-45">
                      <span>{section.label}</span>
                    </div>
                    <div class="collapse-content !p-0">
                      <ul
                        class={`flex flex-col gap-1 pt-2`}
                      >
                        {section.items?.map((item) => (
                          <li>
                            <a
                              href={item.href}
                              class="block py-1 font-apple text-sm text-[#4a4a4a]"
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
          )}
        </>
      )}
    </>
  );
}
