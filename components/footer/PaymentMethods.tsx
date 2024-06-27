import Image from "apps/website/components/Image.tsx";

export interface PaymentItem {
  label: string;
  image: string;
  width: number;
}

export default function PaymentMethods(
  { content }: { content?: { items?: PaymentItem[] } },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div class="block md:w-[40%]">
          <div class="flex md:flex-col w-full mb-5">
            <div class="pt-[9px] flex flex-wrap w-full gap-2 md:justify-center">
              {content.items.map((item) => {
                return (
                  <div class="flex bg-white w-[65px] h-[35px] items-center justify-center">
                    <Image
                      width={item.width}
                      src={item.image}
                      loading="lazy"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
