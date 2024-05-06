import { invoke } from "../../runtime.ts";
import { clx } from "../../sdk/clx.ts";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
import Icon from "../ui/Icon.tsx";

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  content: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: Form;
  };
  layout?: {
    tiled?: boolean;
  };
}

function Newsletter(
  { content, layout = {} }: Props,
) {
  const { tiled = false } = layout;
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      if (email) {
        await invoke.vtex.actions.newsletter.subscribe({ email });
      } else {
        alert("Erro! Preencha o campo de email.");
      }
    } finally {
      loading.value = false;
    }
  };

  return (
    <div
      class={clx(
        "flex flex-col gap-4 w-full md:w-56",
        tiled && "flex-col lg:justify-between",
      )}
    >
      <div class="flex">
        {content?.title && (
          <h4
            class={"text-2xl tracking-[1px] text-primary font-bold leading-none uppercase"}
          >
            {content?.title}
          </h4>
        )}
      </div>
      <div class="flex flex-col gap-4">
        <form
          class="form-control"
          onSubmit={handleSubmit}
        >
          <div class="flex">
            <input
              name="email"
              class="flex-auto md:flex-none  w-56 border-solid border-b-[1px] border-primary focus:outline-none  text-base-content"
              placeholder={content?.form?.placeholder || "Digite seu email"}
            />
            <button
              type="submit"
              class="border-solid border-primary border-b-[1px]"
              disabled={loading}
              aria-label={`submit e-mail`}
            >
              <Icon id="EmailSubmitFooter" size={15} strokeWidth={1} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Newsletter;
