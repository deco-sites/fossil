import type { NewsletterForm } from "./Footer.tsx";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
import { clx } from "../../sdk/clx.ts";
import Icon from "../ui/Icon.tsx";
import { ditoIdentifyAndTrackSafe } from "../../sdk/dito.ts";

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
  const error = useSignal<string | null>(null);

  const handleSubmit = async (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();

    loading.value = true;
    success.value = false;
    error.value = null;

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;

      if (!email) {
        error.value = "Informe um e-mail válido.";
        return;
      }

      const optinPromise = fetch("/api/optin", {
        method: "POST",
        body: JSON.stringify({ email, Newsletter: true }),
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
      });

      const ditoPromise = ditoIdentifyAndTrackSafe({
        logLabel: "[NewsletterFooter] Falha ao enviar lead/evento para o Dito",
        identify: {
          id: email,
          email,
          data: {
            newsletter_optin: true,
            source: "footer",
          },
        },
        track: {
          action: "newsletter_subscribe",
          data: {
            email,
            newsletter_optin: true,
            source: "footer",
          },
        },
      });

      const [optinResponse] = await Promise.all([
        optinPromise,
        ditoPromise,
      ]);

      if (!optinResponse.ok) {
        throw new Error("Falha ao cadastrar na newsletter");
      }

      success.value = true;
    } catch (_err) {
      error.value = "Não foi possível concluir o cadastro. Tente novamente.";
    } finally {
      loading.value = false;
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
              disabled={loading.value}
            />
            <button
              type="submit"
              class="border-solid border-primary border-b-[1px]"
              disabled={loading.value}
              aria-label={loading.value ? "Enviando e-mail" : "Enviar e-mail"}
            >
              {loading.value
                ? <span class="loading loading-spinner loading-xs" />
                : <Icon id="EmailSubmitFooter" size={24} strokeWidth={1} />}
            </button>
          </div>
        </form>
        {error.value && (
          <p class="text-sm text-[#B91C1C]" aria-live="assertive">
            {error.value}
          </p>
        )}
      </div>
    </div>
  );
}
