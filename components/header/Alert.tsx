import Slider from "../../components/ui/Slider.tsx";
import SliderJS from "../../islands/SliderJS.tsx";
import { useId } from "../../sdk/useId.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import CartButtonVTEX from "../../islands/Header/Cart/vtex.tsx";
import Cart from "../../components/minicart/Cart.tsx";
import { lazy, Suspense } from "preact/compat";
import MiniCart from "../../islands/MiniCart.tsx";

export interface Props {
  alerts?: string[];
  /** @description slider mobile */
  interval?: number;

  device: string;
}

function Alert({ alerts = [], interval = 2, device }: Props) {
  const id = useId();
  const platform = usePlatform();

  return (
    <>
      {device === "desktop"
        ? (
          <div class="w-full h-10 text-sm font-light lg:px-8 flex bg-primary items-center">
            <div class=" container hidden lg:flex items-center justify-between w-full gap-8   font-light">
              <a href="/central" class="text-white text-sm font-light">
                Suporte
              </a>
              <div class="w-full  max-w-4xl">
                <ul class="hidden lg:flex placeholder:flex">
                  {alerts.map((alert, index) => (
                    <li
                      key={index}
                      class="flex items-center"
                    >
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
                <a
                  class="flex items-center text-white text-sm font-thin "
                  href="/account"
                  aria-label="Account"
                >
                  Entrar / Cadastrar
                </a>
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
          </div>
        )}
    </>
  );
}

export default Alert;
