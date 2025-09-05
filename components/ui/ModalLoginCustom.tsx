import { useUser } from "apps/vtex/hooks/useUser.ts";
import { clx } from "../../sdk/clx.ts";
import { useSignal } from "@preact/signals";
import { useUI } from "../../sdk/useUI.ts";

function ModalLoginCustom() {
  const { user } = useUser();
  const sessionFirst = useSignal(false);
  const storeScope = "fossil";
  const { vtexIdScriptsLoaded } = useUI();

  return (
    <>
      <button
        type="button"
        class={`group peer cursor-pointer duration-150 text-white`}
        onClick={async () => {
          const currentPathname = globalThis.window.location.pathname;

          if (user.value?.email) {
            if (currentPathname !== "/my-account") {
              globalThis.window.location.pathname = "/my-account";
            } else {
              globalThis.window.location.href =
                `/api/vtexid/pub/logout?scope=${storeScope}&returnUrl=https://www.${storeScope}.com.br`;
            }
          } else {
            const execute = () => {
              vtexIdScriptsLoaded.value = true;
              // deno-lint-ignore ban-ts-comment
              // @ts-expect-error
              globalThis.window.vtexid.start({
                userEmail: "",
                locale: "pt-BR",
                forceReload: true,
              });
            };

            if (!vtexIdScriptsLoaded.value) {
              const { loadVtexIdScripts } = await import(
                "../../sdk/loadVtexIdScripts.ts"
              );
              loadVtexIdScripts(execute);
            } else {
              execute();
            }
          }
        }}
      >
        Entrar / Cadastrar

        {user.value?.givenName && (
          <div
            class={clx(
              `hidden group-hover:block hover:block duration-150 bg-transparent top-0 -right-5 absolute w-auto z-[100] p-6 shadow-[0_0_50px_0_rgba(0_0_0_0.08)]`,
            )}
          >
            <div
              onMouseEnter={() => {
                sessionStorage.setItem(
                  "@fossil-session",
                  "true",
                );

                sessionFirst.value = true;
              }}
              class={clx(
                `absolute bg-[#fff] flex text-primary top-[70%] shadow-lg right-[110px] whitespace-nowrap p-[24px] flex-col z-50 gap-[6px] items-start
                                ${
                  !sessionFirst.value ? "flex" : "hidden group-hover:flex"
                }`,
              )}
            >
              <span
                class={`font-bold`}
              >
                Olá {user.value?.givenName} !
              </span>

              <a
                href="/my-account"
                class={clx(
                  `text-[#252526] hover:font-bold duration-150`,
                )}
              >
                Meu perfil
              </a>

              <a
                href="/my-account/orders"
                class={clx(
                  `text-[#252526] hover:font-bold duration-150`,
                )}
              >
                Meus pedidos
              </a>

              <div
                class={clx(
                  `h-[1px]  w-[160px] my-[5px] duration-150`,
                )}
              />

              <a
                class={clx(
                  `text-[#252526] hover:font-bold duration-150`,
                )}
                href={`/api/vtexid/pub/logout?scope=${storeScope}&returnUrl=https://www.${storeScope}.com.br`}
              >
                Sair
              </a>
            </div>
          </div>
        )}
      </button>
    </>
  );
}

export default ModalLoginCustom;
