import { useSignal } from "@preact/signals";
import { invoke } from "../../runtime.ts";
import type { Product } from "apps/commerce/types.ts";
import type { JSX } from "preact";

export interface Props {
  productID: Product["productID"];
}

function Notify({ productID }: Props) {
  const loading = useSignal(false);
  const sendEmail = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
      ?.value;
    const email = (e.currentTarget.elements.namedItem("email") as RadioNodeList)
      ?.value;

    if (email) {
      try {
        loading.value = true;
        await invoke.vtex.actions.notifyme({ skuId: productID, name, email });
      } finally {
        loading.value = false;
        sendEmail.value = true;
      }
    }
  };

  return (
    <>
      <form
        class="form-control justify-start gap-2 w-full mb-6"
        onSubmit={handleSubmit}
      >
        <span class=" text-32 font-scoutCond font-bold tracking-one text-primary ">
          PRODUTO INDISPONÍVEL
        </span>
        {!sendEmail.value
          ? (
            <div class="flex flex-col">
              <span class="text-sm block w-[300px] font-arial leading-[18px] tracking-one text-[#89a290]">
                Digite seu e-mail e seja avisado quando tivermos mais deste
                produto em estoque
              </span>
              <div class="flex h-10 mt-2">
                <input
                  placeholder="Email"
                  class="input input-bordered rounded-none !outline-none inline-block w-full max-w-80 h-10 font-arial px-2 !border !border-solid !border-primary"
                  name="email"
                />
                <button
                  type="submit"
                  class="rounded-none disabled:loading uppercase w-[120px] !outline-none   text-white !h-10 inline-block font-scoutCond text-18 font-bold tracking-one  bg-warning border border-warning hover:brightness-90"
                >
                  Avisa-me
                </button>
              </div>
            </div>
          )
          : (
            <>
              <span class="text-xs font-arial">
                Cadastrado com sucesso, assim que o produto for disponibilizado
                você receberá um email avisando.
              </span>
            </>
          )}
      </form>
    </>
  );
}

export default Notify;
