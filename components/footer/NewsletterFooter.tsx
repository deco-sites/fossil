import { NewsletterForm } from "./Footer.tsx";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
import { clx } from "../../sdk/clx.ts";
import Icon from "../ui/Icon.tsx";

export interface Props {
  newsletter: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: NewsletterForm;
  };
  layout?: {
    tiled?: boolean;
  };
}

export default function NewsletterFooter({ newsletter, layout = {} }: Props) {
  const { tiled = false } = layout;
  const loading = useSignal(false);
  const success = useSignal(false);

  const handleSubmit = async (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email");
      const Newsletter = true;
      const data = { email, Newsletter };

      await fetch("/api/optin", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
      });
    } finally {
      loading.value = false;
      success.value = true;
    }
  };

  if (success.value) {
    return (
      <div
        class={clx(
          "flex flex-col gap-4 w-full md:w-full",
          tiled && "flex-col lg:justify-between",
        )}
      >
        <div class="flex flex-col gap-4">
          {newsletter?.title && (
            <h3 class="text-2xl tracking-[1px] text-primary font-bold leading-none uppercase">
              {newsletter?.title}
            </h3>
          )}
          {newsletter?.description && (
            <p class="text-base text-primary font-light">
              {newsletter?.description}
            </p>
          )}
        </div>
        <div class="flex flex-col gap-4">
          <p class="text-base text-[#228B22] font-bold uppercase">
            Cadastro enviado com sucesso!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      class={clx(
        "flex flex-col gap-4 w-full md:w-full",
        tiled && "flex-col lg:justify-between",
      )}
    >
      <div class="flex flex-col gap-4">
        {newsletter?.title && (
          <h3 class="text-2xl tracking-[1px] text-primary font-bold leading-none uppercase">
            {newsletter?.title}
          </h3>
        )}

        {newsletter?.description && (
          <p class="text-base text-primary font-light">
            {newsletter?.description}
          </p>
        )}
      </div>
      <div class="flex flex-col gap-4">
        <form class="form-control" onSubmit={handleSubmit}>
          <div class="flex w-full">
            <input
              name="email"
              class="flex-auto md:flex-none w-9/12 border-solid border-b-[1px] border-primary focus:outline-none  text-base-content"
              placeholder={newsletter?.form?.placeholder || "Digite seu email"}
            />
            <button
              type="submit"
              class="border-solid border-primary border-b-[1px]"
              disabled={loading}
              aria-label={`submit e-mail`}
            >
              <Icon id="EmailSubmitFooter" size={24} strokeWidth={1} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
