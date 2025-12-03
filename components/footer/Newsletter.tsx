import { invoke } from "../../runtime.ts";
import { clx } from "../../sdk/clx.ts";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
import Icon from "../ui/Icon.tsx";

declare global {
  interface Window {
    insider_object?: {
      user?: Record<string, unknown>;
    };
  }
}

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format rich-text */
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

const add_email_optin_inside_user_object = ({
  email_optin,
  email,
}: {
  email: string;
  email_optin: boolean;
}) => {
  let user_formatted = { email_optin };

  globalThis.window.insider_object = JSON.parse(
    sessionStorage.getItem("user_object") || "{}"
  ) ||
    globalThis.window.insider_object || { user: user_formatted };

  if (email) {
    user_formatted = Object.assign(user_formatted, { email });
  }

  if (globalThis.window.insider_object) {
    globalThis.window.insider_object.user = {
      ...globalThis.window.insider_object.user,
      ...user_formatted,
    };
  }
  sessionStorage.setItem(
    "user_object",
    JSON.stringify(globalThis.window.insider_object)
  );
};

function Newsletter({ content, layout = {} }: Props) {
  const { tiled = false } = layout;
  const loading = useSignal(false);

  const handleSubmit: JSX.SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email = (
        e.currentTarget.elements.namedItem("email") as RadioNodeList
      )?.value;

      if (email) {
        await invoke.vtex.actions.newsletter.subscribe({ email });
        add_email_optin_inside_user_object({ email_optin: true, email });

        // Envia para Dito
        fetch("/api/dito", {
          method: "POST",
          body: JSON.stringify({
            email,
            newsletter: true,
            source: "footer",
          }),
          headers: {
            "content-type": "application/json",
            accept: "application/json",
          },
        }).catch((error) => {
          console.error("[Dito Integration] Erro ao enviar para Dito:", error);
        });
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
        "flex flex-col gap-4 w-full md:w-full",
        tiled && "flex-col lg:justify-between"
      )}
    >
      <div class="flex">
        {content?.title && (
          <h3 class="text-2xl tracking-[1px] text-primary font-bold leading-none uppercase">
            {content?.title}
          </h3>
        )}
      </div>
      <div class="flex flex-col gap-4">
        <form class="form-control" onSubmit={handleSubmit}>
          <div class="flex w-full">
            <input
              name="email"
              class="flex-auto md:flex-none w-9/12 border-solid border-b-[1px] border-primary focus:outline-none  text-base-content"
              placeholder={content?.form?.placeholder || "Digite seu email"}
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

export default Newsletter;
