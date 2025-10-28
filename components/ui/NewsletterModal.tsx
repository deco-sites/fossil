import Icon from "./Icon.tsx";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
import { useEffect, useRef } from "preact/compat";
import { getCookies } from "std/http/mod.ts";
import { clx } from "../../sdk/clx.ts";
import { AppContext } from "../../apps/site.ts";
import InputCustom from "./InputCustom.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { type SectionProps } from "@deco/deco";
export interface INewsletterInputProps {
  /**
   * @title Hide input?
   */
  show?: boolean;
  /**
   * @title placeholder
   */
  placeholder?: string;
}
interface ImageGeneric {
  src?: ImageWidget;
  /**
   * @title Largura da imagem
   * @description ex: (800)
   */
  width?: number;
  /**
   * @title Altura da imagem
   * @description ex: (900)
   */
  height?: number;
}
interface Device {
  /**@title Desktop*/
  desktop?: ImageGeneric;
  /**@title Mobile*/
  mobile?: ImageGeneric;
}
export interface INewsletterFormProps {
  email?: INewsletterInputProps;
  name?: INewsletterInputProps;
  phone?: INewsletterInputProps;
  dateOfBirth?: INewsletterInputProps;
  button: {
    /**
     * @title button label?
     * @default cadastrar
     */
    label?: string;
  };
}
export interface Props {
  /**
   * @title Ativar?
   * @default true
   */
  is_active?: boolean;
  /**
   * @title Imagem
   */
  image?: Device;
  /**
   * @title Imagem de sucesso
   */
  imageSuccess?: Device;
  /**
   * @title Newsletter Form
   */
  form: INewsletterFormProps;
  /**
   * @title Título
   * @format rich-text
   */
  text: string;
  /**
   * @title Texto de finalização
   * @format rich-text
   */
  textSendSucess?: string;
  /**
   * @title Nome do campo cupom
   */
  textFieldCupom?: string;
  /**
   * @title Texto do cupom
   */
  textCupom?: string;
  /**
   * @title Cor do texto
   * @format color
   */
  colorText?: string;
  /**
   * @title Days to reopen modal if it is registered
   */
  modalSignExpiredDate: number;
  /**
   * @title Days to reopen moda if it is closed
   */
  modalCloseExpiredDate: number;
  /**
   * @title Layout form
   */
  layout?: {
    /**
     * @title Form
     * @description Setting the styles for the form
     */
    form?: {
      desktop?: {
        top?: string;
        left?: string;
      };
      mobile?: {
        top?: string;
        left?: string;
      };
      tailwind?: string;
    };
    button?: {
      desktop?: {
        margin?: string;
      };
      mobile?: {
        margin?: string;
      };
      tailwind?: string;
    };
    text?: {
      successCouponField?: {
        desktop?: {
          margin?: string;
          fontSize?: string;
        };
        mobile?: {
          margin?: string;
          fontSize?: string;
        };
        tailwind?: string;
      };
    };
  };
}
interface InputNewletterProps {
  name: string;
  placeholder: string;
  type: string;
  required: boolean;
}
export const loader = (props: Props, req: Request, ctx: AppContext) => {
  const cookies = getCookies(req.headers);
  const cookieEmpty = req.method === "POST";
  const isOpen = cookieEmpty ? false : Boolean(!cookies["DecoNewsletterModal"]);
  return { ...props, isOpen, device: ctx.device };
};
function InputNewsletter({
  name,
  placeholder,
  required,
  type,
}: InputNewletterProps) {
  return (
    <input
      name={name}
      type={type}
      class={clx(
        `px-[15px] font-gotham py-[5px] h-8 w-full max-w-[276px] text-[.688rem] rounded-[3px] leading-10 focus:outline-none border border-[#969696]`,
      )}
      placeholder={placeholder}
      required={required}
    />
  );
}
function NewsletterModal({
  textFieldCupom,
  textCupom,
  textSendSucess,
  isOpen,
  form,
  text,
  modalSignExpiredDate,
  modalCloseExpiredDate,
  colorText,
  image,
  imageSuccess,
  is_active,
  layout,
  device,
}: SectionProps<ReturnType<typeof loader>>) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const loading = useSignal(false);
  const success = useSignal(false);
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    }
  }, [isOpen]);
  const refCupom = useRef<HTMLInputElement>(null);
  if (!is_active) {
    return null;
  }
  const handleSubmit = async (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const Newsletter = Boolean(formData.get("newsletter"));
      const name = formData.get("name");
      const email = formData.get("email");
      const telephone = formData.get("telephone");
      const dateOfBirth = formData.get("dateOfBirth");

      const data = {
        Newsletter,
        name: name || "",
        email: email || "",
        telephone: telephone || "",
        dateOfBirth: dateOfBirth || "",
      };

      // const data = { Newsletter, name, email, telephone, dateOfBirth };
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
      setCookieOnCloseModal("registered", modalSignExpiredDate);
    }
  };
  const setCookieOnCloseModal = (
    cookieValue: string,
    expirationSeconds: number,
  ) => {
    // deno-lint-ignore no-var
    var date = new Date();
    date.setTime(date.getTime() + expirationSeconds * 24 * 60 * 60 * 1000);
    // deno-lint-ignore no-var
    var expires = "expires=" + date.toUTCString();
    document.cookie = "DecoNewsletterModal" + "=" + cookieValue + ";" +
      expires + ";path=/";
  };
  function handleClickCopy() {
    const elementTextCupom = refCupom.current;
    if (!elementTextCupom) {
      return null;
    }
    const cupomText = elementTextCupom?.querySelector<HTMLParagraphElement>(
      ".popup-custom-text",
    );
    if (!cupomText) {
      return null;
    }
    const elementSpan = document.createElement("span");
    if (!elementSpan) {
      return null;
    }
    navigator.clipboard.writeText(cupomText.innerText);
    elementSpan?.classList.add("popup-copied");
    elementSpan.innerText = "Copiado";
    elementTextCupom.append(elementSpan);
    setTimeout(() => {
      elementSpan.remove();
    }, 2500);
  }
  const emailInput = !form?.email?.show
    ? (
      <InputNewsletter
        name="email"
        required
        type="email"
        placeholder={form?.email?.placeholder || "E-mail"}
      />
    )
    : null;
  const nameInput = !form?.name?.show
    ? (
      <InputNewsletter
        name="name"
        type="text"
        placeholder={form?.name?.placeholder || "Nome"}
        required
      />
    )
    : null;
  const phoneInput = !form?.phone?.show
    ? (
      <InputCustom
        _type="text"
        _name="telephone"
        _placeholder={form?.phone?.placeholder || "(xx) 999999999"}
        _maxLength={15}
        _required
        _class={clx(
          `px-[15px] font-gotham py-[5px] h-8 w-[100%] font-arial text-[.688rem] rounded-[3px] leading-10 focus:outline-none border border-[#969696]`,
        )}
      />
    )
    : null;
  const dateOfBirthInput = !form?.dateOfBirth?.show
    ? (
      <InputCustom
        _type="text"
        _name="dateOfBirth"
        _placeholder={form?.dateOfBirth?.placeholder || "DD/MM/AAAA"}
        _maxLength={10}
        _required
        _class="px-[15px] font-gotham py-[5px] h-8 w-[100%] font-arial text-[.688rem] rounded-[3px] leading-10 focus:outline-none  border border-[#969696]"
      />
    )
    : null;
  return (
    <>
      <dialog
        ref={modalRef}
        class="modal-fossil bg-secondary bg-opacity-70 items-center"
      >
        <div
          class={clx(
            `fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full sm:max-w-[80%] max-h-[555px] lg:max-w-[745px]
            z-[101] max-md:w-[90%] max-md:max-w-[350px]`,
          )}
          id="newsletterModal"
        >
          <form method="dialog">
            <button
              type="button"
              class="absolute -top-[11px] right-0 translate-x-1/2 bg-[#333333] border-none rounded-full p-[0.2rem] cursor-pointer text-white"
              onClick={() => {
                setCookieOnCloseModal("closed", modalCloseExpiredDate);
                modalRef.current?.close();
              }}
              aria-label="Fechar"
            >
              <Icon id="CloseNewsletter" width={22} height={22} />
            </button>
            <div class="w-full h-full absolute -z-[1]">
              {success.value
                ? (
                  <>
                    {textSendSucess && (
                      <div
                        class={clx(
                          `popup-custom-text is-title-cupom relative top-[35%] !-translate-y-[35%] md:translate-x-[34px] max-md:[&_*]:!text-[37px] 
                          max-md:[&_*]:!leading-[25px] max-md:top-[70px] max-md:text-center max-md:left-2/4 max-md:!-translate-x-1/2 leading-none z-10`,
                        )}
                        style={{
                          color: colorText || "#ffffff",
                        }}
                        // deno-lint-ignore react-no-danger
                        dangerouslySetInnerHTML={{
                          __html: textSendSucess,
                        }}
                      >
                      </div>
                    )}

                    {textFieldCupom && (
                      <p
                        class={clx(
                          `popup-custom-text relative top-[40%] !-translate-y-[40%] md:translate-x-[90px] text-[1.75rem] md:max-w-[35%] 
                          leading-none z-10 max-md:top-[15%]  max-md:text-center max-md:!text-[25px] max-md:!leading-[19px] max-md:-translate-y-[15%] 
                          max-md:left-2/4 max-md:!-translate-x-1/2 `,
                          layout?.text?.successCouponField?.tailwind,
                        )}
                        style={{
                          color: colorText || "#ffffff",
                          ...(device === "desktop"
                            ? layout?.text?.successCouponField?.desktop
                            : layout?.text?.successCouponField?.mobile),
                        }}
                        // deno-lint-ignore react-no-danger
                        dangerouslySetInnerHTML={{
                          __html: textFieldCupom,
                        }}
                      >
                      </p>
                    )}

                    {textCupom && (
                      <div
                        onClick={handleClickCopy}
                        ref={refCupom}
                        class={clx(
                          `relative md:top-[42%] md:-translate-y-[42%] z-10 w-[254px] h-[40px] cursor-pointer md:left-10
                          left-2/4 max-md:-translate-x-1/2 top-[16%] -translate-y-[16%]`,
                        )}
                      >
                        <p
                          class={clx(
                            `popup-custom-text is-no-select max-md:!text-[1.063rem] max-md:!leading-[19px] text-[1.75rem] uppercase max-md:text-center 
                            md:max-w-full max-md:left-0 leading-none z-10 w-[254px] h-[39px] rounded-[3px] 
                     
                            flex items-center justify-center absolute top-[0]`,
                          )}
                          style={{
                            color: colorText || "#ffffff",
                          }}
                          // deno-lint-ignore react-no-danger
                          dangerouslySetInnerHTML={{
                            __html: textCupom,
                          }}
                        >
                        </p>
                        <Icon
                          id="Copy"
                          width={22}
                          height={28}
                          strokeWidth={1}
                          class="text-primary-content absolute top-[5px] left-[260px] cursor-pointer"
                        />
                      </div>
                    )}

                    {imageSuccess?.desktop?.src && imageSuccess.mobile?.src && (
                      <Picture>
                        <Source
                          media="(max-width: 767px)"
                          src={imageSuccess.mobile?.src}
                          width={image?.mobile?.width || 393}
                          height={image?.mobile?.height || 555}
                        />
                        <Source
                          media="(min-width: 768px)"
                          src={imageSuccess.desktop.src}
                          width={imageSuccess.desktop.width || 745}
                          height={imageSuccess.desktop.height || 550}
                        />
                        <img
                          class="w-full h-full object-cover absolute inset-0 filter"
                          sizes="(max-width: 640px) 100vw, 30vw"
                          src={imageSuccess.mobile.src}
                          alt="Imagem de fundo do modal de newsletter"
                          decoding="async"
                          loading="eager"
                        />
                      </Picture>
                    )}
                  </>
                )
                : (
                  <>
                    {image?.desktop?.src && image?.mobile?.src && (
                      <Picture>
                        <Source
                          media="(max-width: 768px)"
                          src={image?.mobile?.src}
                          width={image?.mobile?.width || 393}
                          height={image?.mobile?.height || 555}
                        />
                        <Source
                          media="(min-width: 769px)"
                          src={image?.desktop?.src}
                          width={image?.desktop?.width || 745}
                          height={image?.desktop?.height || 550}
                        />
                        <img
                          class="w-full h-full object-cover absolute inset-0"
                          sizes="(max-width: 640px) 100vw, 30vw"
                          src={image?.mobile?.src}
                          alt="Imagem de fundo do modal de newsletter"
                          decoding="async"
                          loading="lazy"
                        />
                      </Picture>
                    )}

                    {text && (
                      <div
                        class={clx(
                          `popup-custom-text relative top-[19%] !-translate-y-[19%] md:translate-x-[64px] max-md:[&_*]:!text-[1.063rem] max-md:[&_*]:!leading-[19px]
                           max-md:top-[40px] max-md:text-center md:max-w-[40%] max-md:left-2/4 max-md:!-translate-x-1/2 leading-none`,
                        )}
                        style={{
                          color: colorText || "#ffffff",
                        }}
                        // deno-lint-ignore react-no-danger
                        dangerouslySetInnerHTML={{
                          __html: text,
                        }}
                      />
                    )}
                    <form
                      class={clx(
                        `flex flex-col items-start justify-center gap-[.875rem] relative top-[31%] -translate-y-[31%] md:left-[62px] 
                                                max-md:items-center max-md:gap-[0.8rem] max-md:-translate-x-1/2 max-md:top-[23%] max-md:left-1/2`,
                        layout?.form?.tailwind,
                      )}
                      style={{
                        ...(device === "desktop"
                          ? layout?.form?.desktop
                          : layout?.form?.mobile),
                      }}
                      onSubmit={handleSubmit}
                    >
                      {nameInput}
                      {emailInput}

                      <div class="flex max-w-[276px] gap-x-[10px]">
                        {phoneInput}
                        {dateOfBirthInput}
                      </div>

                      <div class="relative w-[276px]">
                        <span
                          class={clx(
                            `absolute -bottom-[30px] right-0 md:-right-[15px] text-white`,
                          )}
                        >
                          *
                        </span>
                      </div>

                      <button
                        type="submit"
                        class={clx(
                          `border-none py-[10px] rounded-[3px] max-h-8 flex items-center justify-center text-white cursor-pointer 
                           font-soleil text-[1rem] leading-8 min-w-[128px] focus:outline-none duration-150 font-normal bg-[#969696]`,
                          layout?.button?.tailwind,
                        )}
                        style={{
                          ...(device === "desktop"
                            ? { ...layout?.button?.desktop }
                            : { ...layout?.button?.mobile }),
                        }}
                        disabled={loading}
                      >
                        {form?.button?.label || "Inscreva-se"}
                      </button>

                      <div
                        class={clx(
                          `max-md:flex max-md:justify-center max-md:w-full popup-custom-check flex md:absolute md:translate-y-[25%] md:-bottom-[25%] 
                          items-center gap-[1ch] text-white focus:outline-none`,
                        )}
                      >
                        <input
                          class="w-auto p-[5px] max-w-[250px] text-sm focus:outline-none"
                          type="checkbox"
                          id="newsletter"
                          name="newsletter"
                        />
                        <label
                          for="newsletter"
                          class="text-[.688rem] text-black leading-10 mt-[2px] ml-[5px]"
                        >
                          Aceito receber ofertas e novidades do grupo Technos
                        </label>
                      </div>
                    </form>
                  </>
                )}
            </div>
          </form>
          <form method="dialog" className="modal-backdrop">
            <button
              type="button"
              onClick={() => {
                setCookieOnCloseModal("closed", modalCloseExpiredDate);
                modalRef.current?.close();
              }}
            >
              fechar
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default NewsletterModal;
