import Slider from "../../components/ui/Slider.tsx";
import SliderJS from "../../islands/SliderJS.tsx";
import { useId } from "../../sdk/useId.ts";
import CartButtonVTEX from "../../islands/Header/Cart/vtex.tsx";
import MiniCart from "../../islands/MiniCart.tsx";
import Button from "../ui/Button.tsx";
import Icon from "../ui/Icon.tsx";
import ModalLoginCustom from "../../components/ui/ModalLoginCustom.tsx";
import { usePartialSection } from "@deco/deco/hooks";
export interface Props {
  alerts?: string[];
  /** @description slider mobile */
  interval?: number;
  device?: string;
  isShow?: boolean;
}
function Alert({ alerts = [], interval = 2, device, isShow }: Props) {
  const id = useId();
  return (
    <>
      {/** Desktop */}
      {device === "desktop"
        ? (
          <div class="w-full h-10 text-sm font-light lg:px-8 flex bg-primary items-center">
            <div class="hidden lg:flex items-center justify-between w-full gap-8 font-soleil  font-light">
              <a href="/central" class="text-white text-sm font-light">
                Suporte
              </a>
              <div class="w-full max-w-2xl xl:max-w-4xl">
                <ul class="hidden lg:flex placeholder:flex justify-center">
                  {alerts.map((alert, index) => (
                    <li key={index} class="flex items-center">
                      <span class="text-[.7rem] uppercase text-white h-[38px] flex items-center  font-light">
                        {alert}
                      </span>
                      {index < alerts.length - 1 && (
                        <div class="border border-r-white h-3 mx-5">
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div class=" hidden lg:flex gap-5">
                <ModalLoginCustom />

                {/**minicart */}
                {(device === "desktop" || device === "tablet") && (
                  <>
                    <div class="relative">
                      <CartButtonVTEX />
                      <MiniCart />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )
        : (
          /** Mobile */
          <>
            {isShow && (
              <div id={id} class="">
                <Slider class="carousel carousel-center gap-6 w-screen bg-primary">
                  {alerts.map((alert, index) => (
                    <Slider.Item
                      index={index}
                      class="carousel-item items-center justify-center"
                    >
                      <span class="text-[0.7rem] uppercase w-screen text-white flex items-center justify-center h-[38px]">
                        {alert}
                      </span>
                    </Slider.Item>
                  ))}
                </Slider>
                <SliderJS
                  rootId={id}
                  interval={interval && interval * 1e3}
                  infinite
                />
                <Button
                  {
                    // deno-lint-ignore react-rules-of-hooks
                    ...usePartialSection<typeof Alert>({
                      props: { isShow: false },
                    })
                  }
                  aria-label="close alert"
                  class="h-full w-8 text-left absolute transform -translate-y-1/2 top-1/2 right-0 text-white rounded-none bg-primary"
                >
                  <Icon
                    id="XAlert"
                    size={16}
                    aria-label="close"
                    class="z-0 pointer-events-none"
                  />
                </Button>
              </div>
            )}
          </>
        )}
    </>
  );
}
export default Alert;
