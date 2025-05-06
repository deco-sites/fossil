import { ImageWidget } from "apps/admin/widgets.ts";
import { Head } from "$fresh/runtime.ts";
import type { JSX } from "preact";
import { useSignal } from "@preact/signals";
import { invoke } from "../../runtime.ts";
import { type FnContext, type SectionProps } from "@deco/deco";
export interface InputTextarea {
  id?: string;
  label?: string;
  name: string;
  value?: string;
  rows?: number;
  required?: boolean;
}
export interface InputText {
  id?: string;
  type: "text" | "tel" | "hidden" | "email";
  label?: string;
  name: string;
  value?: string;
  required?: boolean;
}
export interface InputSelect {
  id?: string;
  label?: string;
  name: string;
  value?: string;
  required?: boolean;
  options: {
    value?: string;
    label?: string;
  }[];
}
/** @title {{field.label}} */
export interface Field {
  field: InputText | InputSelect | InputTextarea;
}
export interface Props {
  title?: string;
  /**
   * @description Name data entity
   */
  acronym: string;
  /**
   * @description Background Image contact form
   */
  backgroundImage: ImageWidget;
  subtitle?: string;
  fields: Field[];
}
export function loader(props: Props, req: Request, ctx: FnContext) {
  const url = new URL(req.url);
  const { pathname } = url;
  return {
    ...props,
    pathname,
    device: ctx.device,
  };
}
function ContactForm(
  { backgroundImage, fields, subtitle = "", title = "", acronym, device }:
    SectionProps<typeof loader>,
) {
  const loading = useSignal(false);
  const succeeded = useSignal(false);
  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!acronym) {
      return;
    }
    try {
      loading.value = true;
      const elements = e.currentTarget.elements;
      // deno-lint-ignore no-explicit-any
      const data: any = {};
      for (const field of fields) {
        const element = elements.namedItem(field?.field?.name) as RadioNodeList;
        if (element) {
          data[`${field?.field?.name}`] = element.value;
        }
      }
      // const res = await invoke.vtex.actions.masterdata.createDocument({
      //   data,
      //   acronym,
      // });
      await invoke.vtex.actions.masterdata.createDocument({
        data,
        acronym,
      });
      succeeded.value = true;
    } finally {
      loading.value = false;
    }
  };
  const handleBlur: JSX.FocusEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
    const parent = document.getElementById(`ContactForm__field-${name}`);
    if (value != "") {
      if (parent) {
        parent.classList.add("is-valid");
      }
    } else {
      if (parent) {
        parent.classList.remove("is-valid");
      }
    }
  };
  return (
    <>
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html: `

            .ContactForm__field:after,
            .ResellerForm__field:after {
              content: "";
              position: absolute;
              top: 100%;
              left: 0;
              width: 0;
              height: 3px;
              background: #fff;
              transition: all 0.15s cubic-bezier(0.6, 0.04, 0.98, 0.335)
            }

            .ContactForm__field.is-valid:after,
            .ResellerForm__field.is-valid:after {
              width: 25%;
              transition: all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)
            }

            .ContactForm__label:not(.ContactForm__label--radio):not(.ResellerForm__label--radio):not(.ContactForm__label--radio):not(.ResellerForm__label--radio),
            .ResellerForm__label:not(.ContactForm__label--radio):not(.ResellerForm__label--radio):not(.ContactForm__label--radio):not(.ResellerForm__label--radio) {
              position: absolute;
              top: 22px;
              left: 0;
              z-index: 1;
              line-height: 1;
              opacity: 1
            }
          
            .ContactForm__input:focus+.ContactForm__label:not(.ContactForm__label--radio):not(.ResellerForm__label--radio):not(.ContactForm__label--radio):not(.ResellerForm__label--radio),
            .ContactForm__input:focus+.ResellerForm__label:not(.ContactForm__label--radio):not(.ResellerForm__label--radio):not(.ContactForm__label--radio):not(.ResellerForm__label--radio),
            .is-valid .ContactForm__label:not(.ContactForm__label--radio):not(.ResellerForm__label--radio):not(.ContactForm__label--radio):not(.ResellerForm__label--radio),
            .is-valid .ResellerForm__label:not(.ContactForm__label--radio):not(.ResellerForm__label--radio):not(.ContactForm__label--radio):not(.ResellerForm__label--radio),
            .ResellerForm__input:focus+.ContactForm__label:not(.ContactForm__label--radio):not(.ResellerForm__label--radio):not(.ContactForm__label--radio):not(.ResellerForm__label--radio),
            .ResellerForm__input:focus+.ResellerForm__label:not(.ContactForm__label--radio):not(.ResellerForm__label--radio):not(.ContactForm__label--radio):not(.ResellerForm__label--radio) {
              font-size: 12px;
              top: 0;
              opacity: 0.4
            }

            .st0 {
              fill:none;
              stroke:#000;
              stroke-width:6;
              stroke-miterlimit:10
            }

            .contact-box__redline .st0 {
              stroke: #c41c17;
              stroke-width: 10px;
          }
            `,
          }}
        />
      </Head>
      <div
        className={`contact bg-cover py-[5vmin] px-[10px]  lg:flex lg:relative lg:min-h-[80vh] lg:p-0  lg:flex-row-reverse`}
        style={{
          background: device == "mobile"
            ? `#000 url("${backgroundImage}") 100% no-repeat`
            : `#000 url("${backgroundImage}") top no-repeat`,
          backgroundSize: "cover",
        }}
      >
        <div className="contact__form-wrapper lg:flex lg:relative lg:w-3/4 lg:justify-center lg:items-center lg:bg-[#00000099]">
          {!succeeded.value
            ? (
              <form
                autoComplete="off"
                className="ContactForm w-[95%] mx-auto my-[40px] lg:w-full lg:py-[80px] lg:px-0 lg:max-w-[595px]"
                onSubmit={handleSubmit}
              >
                <h1 className="ContactForm__title  font-[sans-serif] uppercase text-center mb-[10px] mt-[.67em] text-white tracking-[1px] leading-[12px] text-base font-bold md:text-xl">
                  {title}
                </h1>
                <p className="ContactForm__subtitle font-[sans-serif] uppercase text-center font-light text-white text-xs mb-5 tracking-[1px]  md:text-sm">
                  {subtitle}
                </p>
                <div className="ContactForm__fieldset md:flex md:flex-1 flex-row flex-wrap gap-x-4">
                  {fields?.map(
                    (
                      {
                        field,
                        field: { id, name, label, required, value = undefined },
                      },
                    ) => {
                      if (instanceOfInput(field)) {
                        return (
                          <div
                            class="ContactForm__field relative mt-4  pt-4 flex-1 border-b-[1px] border-b-[#fff] basis-[100%] max-w-[100%] md:basis-[30%] md:max-w-[30%]"
                            id={`ContactForm__field-${name}`}
                          >
                            <input
                              type={field?.type}
                              class="ContactForm__input peer shadow-none outline-none bg-transparent w-full relative border-none text-white text-sm appearance-none pt-0 pr-3 pl-[25px] pb-0 h-7"
                              id={id}
                              name={name}
                              value={value}
                              required={required}
                              onBlur={handleBlur}
                            />
                            <label
                              for={id}
                              class="ContactForm__label absolute transition-all duration-[.1s] left-0 opacity-100 z-10 text-sm text-white"
                            >
                              {label}
                            </label>
                          </div>
                        );
                      }
                      if (instanceOfSelect(field)) {
                        return (
                          <div class="ContactForm__field relative mt-4  pt-4 flex-1 border-b-[1px] border-b-[#fff] basis-[100%] max-w-[100%] md:basis-[30%] md:max-w-[30%]">
                            <select
                              class="ContactForm__select shadow-none outline-none bg-transparent border-none w-full text-white text-sm font-light appearance-none  pt-0 pr-5 pl-0 pb-0 h-7"
                              id={id}
                              name={name}
                              required={required}
                            >
                              {field?.options?.map(({ label, value = "" }) => (
                                <option
                                  value={value}
                                  className="p-[5px] bg-black text-white"
                                >
                                  {label}
                                </option>
                              ))}
                            </select>
                          </div>
                        );
                      }
                      if (instanceOfTextarea(field)) {
                        return (
                          <div
                            class="ContactForm__field relative mt-4  pt-4 flex-1 border-b-[1px] border-b-[#fff] basis-[100%] max-w-[100%]"
                            id={`ContactForm__field-${name}`}
                          >
                            <textarea
                              class="ContactForm__input ContactForm__input--textarea w-full resize-none shadow-none outline-none appearance-none bg-transparent overflow-y-auto pt-[5px] pr[10px] pl-[25px] pb-[5px] text-white"
                              id={id}
                              name={name}
                              required={required}
                              rows={field?.rows}
                              onBlur={handleBlur}
                            >
                            </textarea>
                            <label
                              for={id}
                              class="ContactForm__label absolute  transition-all duration-[.1s] left-0 opacity-100 z-10 text-sm text-white"
                            >
                              {label}
                            </label>
                          </div>
                        );
                      }
                    },
                  )}
                  <fieldset class="ContactForm__fieldset  flex flex-1 basis-[100%] max-w-[100%] border-none items-center justify-start mt-[15px] px-0 py-[10px] gap-[5px]">
                    <input
                      type="checkbox"
                      id="privacyPolicies"
                      value="accept"
                      required
                      className="p-0"
                    />
                    <label
                      for="privacyPolicies"
                      className="font-[Montserrat] font-medium text-xs text-white"
                    >
                      Aceito os termos da{" "}
                      <a href="/politica-de-privacidade">
                        politica de privacidade
                      </a>
                    </label>
                  </fieldset>

                  <button
                    class="ContactForm__submit  disabled:loading uppercase text-white font-extrabold bg-[#c41c17] block text-sm w-full max-w-[300px] h-[50px] mt-[40px] mr-auto mb-0 ml-auto"
                    type="submit"
                    disabled={loading}
                  >
                    Enviar
                  </button>
                </div>
              </form>
            )
            : (
              <div class="contact__form-wrapper__success text-center text-white">
                <h2 className="text-2xl uppercase font-bold mb-[10px] tracking-[1px]">
                  Sua Mensagem foi enviada com sucesso!
                </h2>
                <p className="text-sm uppercase font-light tracking-[1px]">
                  Em breve entraremos em contato com você.
                </p>
              </div>
            )}
        </div>
        <aside className="contact__side text-center lg:relative lg:w-[25%]">
          <div className="contact-box text-sm relative z-[2] mx-0 mt-[15vmin] mb-[5vmin] py-[15px] px-[10px] text-black text-center bg-[#e7e6e6] md:inline-block md:py-[15px] md:px-[30px] lg:absolute lg:bottom-[10vh]  lg:left-[50%] lg:block lg:w-[95%] lg:max-w-[330px] lg:m-0 lg:translate-x-[-50%] max-md:before:bg-[rgba(107,107,107,0.1)] max-md:before:h-[calc(190px+10px)] before:absolute before:top-[-25px] before:right-[-10px] before:z-[1] before:w-[76.5625%] before:h-[calc(270px+10px)] before:bg-[rgba(0,0,0,0.69)] before:md:w-[90%] before:md:right-[-2.5%] after:absolute after:z-[2] after:w-full after:h-full after:top-0 after:left-0 after:bg-[#e7e6e6] ">
            <div className="contact-box__redline absolute z-[1] w-[80%] left-[75px] right-0 top-[-30px] bottom-0">
              <svg
                id="Camada_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 655.8 724.3"
              >
                <path class="st0" d="M8.8 81.9V8.4h533.7v708h104.4"></path>
              </svg>
            </div>
            <div class="contact-box__logo hidden md:block relative z-[3] w-[52px] h-[52px] mx-auto mt-0 mb-[15px] overflow-hidden">
              <i class="contact-box__logo-icon block w-[238px] h-[52px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 801.004 175"
                >
                  <path d="M278.385 45.98v10.158h-28.173v71.108h-11.105V56.138h-28.036V45.98zm27.88 46.051v25.057h49.3v10.158h-60.406V45.98h60.406v10.158h-49.3v26.006h42.799v9.887zm104.472 37.111c-25.462 0-42.527-18.828-42.527-42.393 0-23.837 17.065-42.529 42.527-42.529 19.367 0 28.309 10.293 28.309 10.293l-6.367 8.668s-8.532-8.396-21.806-8.396c-18.42 0-31.287 14.22-31.287 31.964 0 17.608 12.867 31.83 31.287 31.83 13.68 0 21.806-8.399 21.806-8.399l6.367 8.67c-.001-.001-9.077 10.292-28.309 10.292m103.414-1.896V92.302h-46.728v34.944h-11.107V45.98h11.107v36.299h46.728V45.98h11.24v81.266zm102.217 0l-57.699-58.375v58.375h-11.107V45.98h3.116l57.563 57.699V45.98h11.24v81.266zm19.651-40.496c0-23.838 16.39-42.529 42.122-42.529 26.005 0 42.395 18.691 42.395 42.529 0 23.564-16.39 42.393-42.395 42.393-25.732-.001-42.122-18.829-42.122-42.393m73.138 0c0-17.744-12.054-31.965-31.016-31.965-18.69 0-30.745 14.221-30.745 31.965 0 17.607 12.056 31.691 30.745 31.691 18.962 0 31.016-14.084 31.016-31.691m52.451 31.963c13.68 0 19.505-5.281 19.505-12.867 0-6.906-4.607-10.428-21.4-15.168-19.504-5.555-28.308-11.514-28.308-24.11 0-13.951 11.377-22.347 30.475-22.347 20.315 0 29.254 7.855 29.254 7.855l-6.094 9.211s-8.262-6.637-23.16-6.637c-10.971 0-18.692 4.2-18.692 11.784 0 6.093 5.012 9.209 21.4 13.679 21.264 5.823 28.443 13.002 28.443 25.327 0 13.41-9.481 23.703-31.287 23.703-20.993 0-30.61-9.887-30.61-9.887l6.095-8.397c-.001-.001 8.939 7.854 24.379 7.854">
                  </path>
                  <path
                    fill="#C41C17"
                    d="M89.344 168.626c-44.802.139-81.234-36.074-81.369-80.885C7.839 42.938 44.05 6.505 88.86 6.373c44.807-.137 81.238 36.084 81.369 80.883.143 44.81-36.073 81.236-80.885 81.37"
                  >
                  </path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    fill="#FFF"
                    d="M23.207 69.611v28.912c3.818-4.199 8.815-8.27 14.732-11.709 16.858-9.801 34.55-10.795 39.528-2.219 4.002 6.872-1.411 17.809-12.41 26.924h48.241c-11.169-9.076-16.728-20.06-12.75-26.992 4.926-8.603 22.636-7.721 39.553 1.98 5.987 3.434 11.047 7.514 14.899 11.729V69.611H23.207z"
                  >
                  </path>
                </svg>
              </i>
            </div>
            <p class="contact-box__paragraph relative z-[3] m-0 leading-[2] font-[sans-serif]">
              <strong class="contact-box__bold contact-box__bold--block max-md:block font-extrabold mr-[3px]">
                E-mail:
              </strong>
              atendimento@technos.com.br
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
export function instanceOfSelect(
  data: InputText | InputSelect | InputTextarea,
): data is InputSelect {
  return "options" in data;
}
export function instanceOfInput(
  data: InputText | InputSelect | InputTextarea,
): data is InputText {
  return "type" in data;
}
export function instanceOfTextarea(
  data: InputText | InputSelect | InputTextarea,
): data is InputTextarea {
  return "rows" in data;
}
export default ContactForm;
