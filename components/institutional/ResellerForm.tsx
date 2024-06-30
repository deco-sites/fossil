import { ImageWidget } from "apps/admin/widgets.ts";
import { Head } from "$fresh/runtime.ts";
import type { JSX } from "preact";
import { useSignal } from "@preact/signals";

import { FnContext, SectionProps } from "deco/mod.ts";
import { cnpjCpfMask, phoneMask, zipCodeMask } from "./utils/mask.ts";
import { invoke } from "../../runtime.ts";

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

function ResellerForm({
  backgroundImage,
  title = "",
  acronym,
  device,
}: SectionProps<typeof loader>) {
  const loading = useSignal(false);
  const succeeded = useSignal(false);

  const getElement = (name: string): Element | null => {
    return document.getElementById(`ResellerForm__field-${name}`);
  };

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!acronym) return;

    try {
      loading.value = true;

      const elements = e.currentTarget.elements;
      // deno-lint-ignore no-explicit-any
      const data: any = {
        owner: (elements.namedItem("owner") as RadioNodeList)?.value,
        ownerPhone: (elements.namedItem("ownerPhone") as RadioNodeList)?.value,
        ownerEmail: (elements.namedItem("ownerEmail") as RadioNodeList)?.value,
        corporateName: (elements.namedItem("corporateName") as RadioNodeList)
          ?.value,
        tradeName: (elements.namedItem("tradeName") as RadioNodeList)?.value,
        corporateDocument:
          (elements.namedItem("corporateDocument") as RadioNodeList)?.value,
        stateRegistration:
          (elements.namedItem("stateRegistration") as RadioNodeList)?.value,
        segment: (elements.namedItem("segment") as RadioNodeList)?.value,
        hasWork: (elements.namedItem("hasWork") as RadioNodeList)?.value,
        whom: (elements.namedItem("whom") as RadioNodeList)?.value,
        postalCode: (elements.namedItem("postalCode") as RadioNodeList)?.value,
        street: (elements.namedItem("street") as RadioNodeList)?.value,
        number: (elements.namedItem("number") as RadioNodeList)?.value,
        complement: (elements.namedItem("complement") as RadioNodeList)?.value,
        neighborhood: (elements.namedItem("neighborhood") as RadioNodeList)
          ?.value,
        state: (elements.namedItem("state") as RadioNodeList)?.value,
        city: (elements.namedItem("city") as RadioNodeList)?.value,
        telephone: "",
        hasShop: (elements.namedItem("hasShop") as RadioNodeList)?.value,
        tipoLoja: (elements.namedItem("tipoLoja") as RadioNodeList)?.value,
      };

      const wrongMsg =
        "<span class='wrongField'>*Favor conferir as informações no campo</span>";
      const wrongMsg2 = "<span class='wrongField'>*Campo Obrigatório</span>";
      const fields = [
        "owner",
        "ownerEmail",
        "corporateName",
        "tradeName",
        "corporateDocument",
        "segment",
        "hasWork",
        "postalCode",
        "street",
        "number",
        "neighborhood",
        "state",
        "city",
      ];
      let validate = false;

      for (const key in data) {
        const value = data[key];

        if (
          ("" == value || "undefined" == typeof value) && fields.includes(key)
        ) {
          data[key] = "";
          const el = getElement(key);
          if (el) {
            el.classList.add("invalidField");
            el.insertAdjacentHTML("beforeend", wrongMsg2);
          }
          validate = false;
          break;
        }

        if ("corporateDocument" == key && value.length < 18) {
          data[key] = "";
          const el = getElement(key);
          if (el) {
            el.classList.add("invalidField");
            el.insertAdjacentHTML("beforeend", wrongMsg);
          }
        } else if (
          "postalCode" == key && value.length < 9 && value.length > 0
        ) {
          data[key] = "";
          const el = getElement(key);
          if (el) {
            el.classList.add("invalidField");
            el.insertAdjacentHTML("beforeend", wrongMsg);
          }
        } else if (
          "ownerEmail" == key && !value.match(/[^@]+@[^@]+\.[^@]+/) &&
          value.length
        ) {
          data[key] = "";
          const el = getElement(key);
          if (el) {
            el.classList.add("invalidField");
            el.insertAdjacentHTML("beforeend", wrongMsg);
          }
        } else {
          validate = true;
        }
      }

      if (!validate) return;

      const resp = await invoke.vtex.actions.masterdata
        .createDocument({
          data,
          acronym,
        }) as { DocumentId: string } & { Message: string };

      if (resp?.DocumentId) succeeded.value = true;

      if (resp?.Message) {
        const field = resp?.Message?.split("to the field '")[1].split(
          "' is ",
        )[0];
        const el = getElement(field);
        if (el) {
          el.insertAdjacentHTML("beforeend", wrongMsg);
        }
      }
    } finally {
      loading.value = false;
    }
  };

  const handleBlur: JSX.FocusEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
    const parent = document.getElementById(`ResellerForm__field-${name}`);

    if (parent) {
      parent.querySelectorAll(".emptyField,.wrongField").forEach((el) =>
        el.remove()
      );
    }

    if (value != "") {
      if (parent) parent.classList.add("is-valid");
    } else {
      if (parent) parent.classList.remove("is-valid");
    }
  };

  return (
    <>
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .ResellerForm__selects {
                border: none
              }
              .ResellerForm__select-wrapper {
                margin: 0 10px;
                flex: 1;
              }
              .ResellerForm__select-wrapper:first-child {
                margin-left: 0
              }
              .ResellerForm__select-wrapper:last-child {
                margin-right: 0;
                flex: 4;
              }
              .ResellerForm__submit--content {
                display: flex;
                flex-direction: column-reverse;
                align-items: center
              }
              .ResellerForm__submit--content p {
                width: 112px;
                float: left;
                font-size: 11px;
                margin-top: 10px
              }
              .ResellerForm__submit {
                font-size: 14px;
                display: block;
                width: 100%;
                max-width: 300px;
                height: 50px;
                margin: 40px auto 0 !important;
                color: #fff;
                font-weight: 800;
                text-transform: uppercase;
                letter-spacing: .2em;
                background: #c41c17 !important;
                cursor: pointer
              }
              .ResellerForm__fieldset.--dif-estilo {
                display: flex;
                flex-direction: column
              }
              .ResellerForm__field {
                position: relative;
                margin-top: 15px;
                padding-top: 15px;
                border-bottom: 1px solid #fff;
                flex: 1
              }
              .ResellerForm__field .wrongField {
                position: absolute;
                top: 0;
                right: 24px;
                font-size: 14px;
                font-weight: 300;
                color: #FFF;
                background: #C41D17;
                padding: 4px 6px;
                white-space: nowrap;
              }
              .ResellerForm__field .wrongField:after {
                content: "";
                width: 8px;
                height: 8px;
                position: absolute;
                bottom: -6px;
                left: 50%;
                background: #C41D17;
                transform: rotate(135deg) translateX(-50%);
                -webkit-transform: rotate(135deg) translateX(-50%);
                -ms-transform: rotate(135deg) translateX(-50%);
                -moz-transform: rotate(135deg) translateX(-50%)
              }
              .ResellerForm__field--no-label {
                margin-top: 0;
                padding-top: 0
              }
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
              .ResellerForm__field .flex {
                margin-top: 42px
              }
              .ResellerForm__field.no-border {
                border-bottom: none
              }
              .ResellerForm__radios {
                justify-content: center
                position: relative;
              }
              .ResellerForm__field.no-border .ResellerForm__radios {
                display: flex;
                margin-top: 0;
                justify-content: start
              }
              .ResellerForm__radio {
                width: 0;
                height: 0;
                visibility: hidden;
                appearance: none
              }
              .ResellerForm__radio:checked+label {
                color: #000;
                background: #fff
              }
              .ResellerForm__label {
                font-size: 14px;
                font-weight: 300;
                transition: all 0.1s ease
              }
              .ResellerForm__label:not(.ContactForm__label--radio):not(.ResellerForm__label--radio):not(.ContactForm__label--radio):not(.ResellerForm__label--radio) {
                position: absolute;
                top: 22px;
                left: 0;
                z-index: 1;
                line-height: 1;
                opacity: 1
              }
              .ContactForm__input:focus+.ContactForm__label:not(.ContactForm__label--radio):not(.ResellerForm__label--radio):not(.ContactForm__label--radio):not(.ResellerForm__label--radio),.ContactForm__input:focus+.ResellerForm__label:not(.ContactForm__label--radio):not(.ResellerForm__label--radio):not(.ContactForm__label--radio):not(.ResellerForm__label--radio),.is-valid .ContactForm__label:not(.ContactForm__label--radio):not(.ResellerForm__label--radio):not(.ContactForm__label--radio):not(.ResellerForm__label--radio),.is-valid .ResellerForm__label:not(.ContactForm__label--radio):not(.ResellerForm__label--radio):not(.ContactForm__label--radio):not(.ResellerForm__label--radio),.ResellerForm__input:focus+.ContactForm__label:not(.ContactForm__label--radio):not(.ResellerForm__label--radio):not(.ContactForm__label--radio):not(.ResellerForm__label--radio),.ResellerForm__input:focus+.ResellerForm__label:not(.ContactForm__label--radio):not(.ResellerForm__label--radio):not(.ContactForm__label--radio):not(.ResellerForm__label--radio) {
                font-size: 12px;
                top: 0;
                opacity: 0.4
              }
              .ResellerForm__field--hasWork .ResellerForm__radios>label.ResellerForm__label {
                position: static!important;
                width: 140px;
                line-height: 20px!important
              }
              .ResellerForm__field--hasWork .box {
                display: flex;
                margin-left: 50px
              }
              .ResellerForm__label--radio {
                display: inline-block;
                height: 32px;
                margin: 0 30px;
                padding: 0 15px;
                line-height: 31px;
                border-radius: 16px;
                cursor: pointer
              }
              .ResellerForm__label--radio {
                background-color: transparent;
                border: 1px solid #FFF;
                border-radius: 1px
              }
              .ResellerForm__field.no-border .ResellerForm__radios .ResellerForm__label--radio {
                margin-left: 0;
                margin-right: 20px
              }
              .ResellerForm__field--tipoLoja {
                margin-top: 3px
              }
              .ResellerForm__input {
                font-size: 14px;
                position: relative;
                z-index: 2;
                width: 100%;
                color: #fff;
                padding: 0 10px 0 25px;
                border: none;
                border-radius: none;
                background: none;
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none
              } 
              .ResellerForm__input:not(.ContactForm__input--textarea):not(.ResellerForm__input--textarea):not(.ContactForm__input--textarea):not(.ResellerForm__input--textarea) {
                height: 28px
              }
              .ResellerForm__input {
                box-shadow: none !important;
                outline: none !important
              }
              .ResellerForm__field--postalCode,
              .ResellerForm__field--tipoLoja {
                margin-left: 0!important
              }
              .ResellerForm__field.no-border #whom {
                border-bottom: 1px solid #fff
              }
              .ResellerForm__select {
                font-size: 14px;
                width: 100%;
                height: 28px;
                padding: 0 20px 0 0;
                color: #fff;
                font-weight: 300;
                border: none;
                background: transparent url("http://technos.vteximg.com.br/arquivos/icon-drop.png") 100% no-repeat;
                background-size: 13px 7px;
                cursor: pointer;
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none
              }
              .ResellerForm__select option {
                padding: 5px;
                color: #fff;
                background: #000
              }

              @media (min-width: 768px) {
                
                .ResellerForm__fieldset:not(.ContactForm__fieldset--radios):not(.ResellerForm__fieldset--radios):not(.ContactForm__fieldset--radios):not(.ResellerForm__fieldset--radios) {
                  display:-webkit-box;
                  display: -ms-flexbox;
                  display: flex;
                  -webkit-box-flex: 1;
                  -ms-flex: 1;
                  flex: 1
                }
                .ResellerForm__field:not(.ContactForm__select-wrapper):first-child {
                  margin-left: 0;
                }
                .ResellerForm__field:not(.ContactForm__select-wrapper):last-child {
                  margin-right: 0;
                }
                .ResellerForm__field:not(.ContactForm__select-wrapper):not(:only-child) {
                  margin-right:15px;
                  margin-left: 15px
                }
                .ResellerForm__field:not(.ContactForm__select-wrapper):last-child {
                  margin-right: 0;
                }
              }

              @media only screen and (min-width: 100px) and (max-width: 764px) {
                .ResellerForm__fieldset-title {
                  margin-bottom:10px
                }

                .ResellerForm__title {
                  width:80%;
                  margin: 0 auto 20px;
                  line-height: 1.3
                }

                .ResellerForm__subtitle {
                  width:85%;
                  margin: 0 auto;
                  line-height: 1.4
              }
            }
            `,
          }}
        />
      </Head>
      <div className="reseller flex flex-row-reverse mb-[30px]">
        <div
          className="reseller__form-wrapper text-white  font-[sans-serif] pt-[5vmin] px-[19px] pb-[8vmin] lg:flex lg:w-3/4 lg:basis-9/12 items-center justify-center"
          style={{
            background: device == "mobile"
              ? `url("http://technos.vteximg.com.br/arquivos/reseller-form-bg.jpg") top no-repeat`
              : `url("http://technos.vteximg.com.br/arquivos/reseller-form-bg-desktop.jpg") 50% no-repeat`,

            backgroundSize: "cover",
          }}
        >
          {!succeeded.value
            ? (
              <form
                class="ResellerForm w-full max-w-[730px] px-0 md:py-[50px]"
                autocomplete="off"
                novalidate
                onSubmit={handleSubmit}
              >
                <h1 class="ResellerForm__title uppercase tracking-[2px] mb-[10px] font-bold text-white text-center text-base  md:text-xl md:leading-[20px]">
                  {title}
                </h1>
                <p class="ResellerForm__subtitle text-xs font-light text-center uppercase tracking-[1px] text-white  md:text-sm md:leading-[14px] md:mb-[45px]">
                  PREENCHA O FORMULÁRIO ABAIXO E AGUARDE O CONTATO DA EQUIPE
                  RESPONSÁVEL ou envie um e-mail para{" "}
                  <strong>novosclientes@grupotechnos.com.br</strong>
                </p>

                <div className="ResellerForm__fieldset ResellerForm__fieldset--radios">
                  <h3 className="ResellerForm__fieldset-title text-xs mt-[2.5em] font-light text-center lg:mb-[10px]">
                    Possui loja?
                  </h3>
                  <div class="ResellerForm__radios flex relative justify-center">
                    <input
                      type="radio"
                      class="ResellerForm__radio w-0 h-0 invisible appearance-none peer/hasShopFalse"
                      id="hasShopFalse"
                      name="hasShop"
                      required
                      value="false"
                    />
                    <label
                      for="hasShopFalse"
                      class="ResellerForm__label ResellerForm__label--radio text-sm font-light transition-all duration-[0.1s] inline-block h-8 mx-[30px] my-0 px-[15px] py-0 cursor-pointer rounded-[1px] border-[1px] border-[#FFF] bg-transparent leading-[31px] peer-checked/hasShopFalse:bg-[#fff] peer-checked/hasShopFalse:text-black"
                    >
                      Não
                    </label>
                    <input
                      type="radio"
                      class="ResellerForm__radio w-0 h-0 invisible appearance-none peer/hasShopTrue"
                      id="hasShopTrue"
                      name="hasShop"
                      required
                      value="true"
                    />
                    <label
                      for="hasShopTrue"
                      class="ResellerForm__label ResellerForm__label--radio text-sm font-light transition-all duration-[0.1s] inline-block h-8 mx-[30px] my-0 px-[15px] py-0 cursor-pointer rounded-[1px] border-[1px] border-[#FFF] bg-transparent leading-[31px] peer-checked/hasShopTrue:bg-[#fff] peer-checked/hasShopTrue:text-black"
                    >
                      Sim
                    </label>
                  </div>
                </div>
                <div class="ResellerForm__fieldset">
                  <div
                    id={`ResellerForm__field-owner`}
                    class="ResellerForm__field ResellerForm__field--owner"
                  >
                    <input
                      type="text"
                      class="ResellerForm__input"
                      id="owner"
                      name="owner"
                      value=""
                      required
                      onBlur={handleBlur}
                    />
                    <label for="owner" class="ResellerForm__label">
                      Nome Responsável*
                    </label>
                  </div>
                  <div
                    id={`ResellerForm__field-ownerPhone`}
                    class="ResellerForm__field ResellerForm__field--ownerPhone"
                  >
                    <input
                      type="tel"
                      class="ResellerForm__input"
                      id="ownerPhone"
                      name="ownerPhone"
                      required
                      maxLength={15}
                      onBlur={handleBlur}
                      onInput={(e) => {
                        e.currentTarget.value = phoneMask(
                          e.currentTarget.value,
                        );
                      }}
                    />
                    <label for="ownerPhone" class="ResellerForm__label">
                      Telefone do Responsável
                    </label>
                  </div>
                </div>
                <div class="ResellerForm__fieldset">
                  <div
                    id={`ResellerForm__field-ownerEmail`}
                    class="ResellerForm__field ResellerForm__field--ownerEmail"
                  >
                    <input
                      type="email"
                      class="ResellerForm__input"
                      id="ownerEmail"
                      name="ownerEmail"
                      value=""
                      required
                      onBlur={handleBlur}
                    />
                    <label for="ownerEmail" class="ResellerForm__label">
                      E-mail do Responsável*
                    </label>
                  </div>
                  <div
                    id={`ResellerForm__field-corporateName`}
                    class="ResellerForm__field ResellerForm__field--corporateName"
                  >
                    <input
                      type="text"
                      class="ResellerForm__input"
                      id="contactFormCorporateName"
                      name="corporateName"
                      value=""
                      required
                      onBlur={handleBlur}
                    />
                    <label
                      for="contactFormCorporateName"
                      class="ResellerForm__label"
                    >
                      Razão Social*
                    </label>
                  </div>
                </div>
                <div class="ResellerForm__fieldset">
                  <div
                    id={`ResellerForm__field-tradeName`}
                    class="ResellerForm__field ResellerForm__field--tradeName"
                  >
                    <input
                      type="text"
                      class="ResellerForm__input"
                      id="contactFormTradeName"
                      name="tradeName"
                      value=""
                      required
                      onBlur={handleBlur}
                    />
                    <label
                      for="contactFormTradeName"
                      class="ResellerForm__label"
                    >
                      Nome Fantasia*
                    </label>
                  </div>
                  <div
                    id={`ResellerForm__field-corporateDocument`}
                    class="ResellerForm__field ResellerForm__field--corporateDocument"
                  >
                    <input
                      type="tel"
                      class="ResellerForm__input"
                      id="contactFormCorporateDocument"
                      name="corporateDocument"
                      value=""
                      required
                      maxLength={18}
                      onBlur={handleBlur}
                      onInput={(e) => {
                        e.currentTarget.value = cnpjCpfMask(
                          e.currentTarget.value,
                        );
                      }}
                    />
                    <label
                      for="contactFormCorporateDocument"
                      class="ResellerForm__label"
                    >
                      CNPJ*
                    </label>
                  </div>
                </div>
                <div class="ResellerForm__fieldset">
                  <div
                    id={`ResellerForm__field-stateRegistration`}
                    class="ResellerForm__field ResellerForm__field--stateRegistration"
                  >
                    <input
                      type="tel"
                      class="ResellerForm__input"
                      id="contactFormStateRegistration"
                      name="stateRegistration"
                      value=""
                      required
                      onBlur={handleBlur}
                    />
                    <label
                      for="contactFormStateRegistration"
                      class="ResellerForm__label"
                    >
                      Inscrição Estadual*
                    </label>
                  </div>
                  <div
                    id={`ResellerForm__field-segment`}
                    class="ResellerForm__field ResellerForm__field--segment"
                  >
                    <input
                      type="text"
                      class="ResellerForm__input"
                      id="segment"
                      name="segment"
                      value=""
                      required
                      onBlur={handleBlur}
                    />
                    <label for="segment" class="ResellerForm__label">
                      Segmento*
                    </label>
                  </div>
                </div>
                <div class="ResellerForm__fieldset">
                  <div
                    id={`ResellerForm__field-hasWork`}
                    class="ResellerForm__field ResellerForm__field--hasWork no-border"
                  >
                    <div class="ResellerForm__radios flex">
                      <label for="hasWork" class="ResellerForm__label">
                        Trabalha com alguma marca de relógio? *
                      </label>
                      <div class="box">
                        <input
                          type="radio"
                          class="ResellerForm__radio"
                          id="resellerHasShopFalse"
                          name="hasWork"
                          required
                          value="false"
                          onBlur={handleBlur}
                        />
                        <label
                          for="resellerHasShopFalse"
                          class="ResellerForm__label ResellerForm__label--radio"
                        >
                          Não
                        </label>
                        <input
                          type="radio"
                          class="ResellerForm__radio"
                          id="resellerHasShopTrue"
                          name="hasWork"
                          required
                          value="true"
                          onBlur={handleBlur}
                        />
                        <label
                          for="resellerHasShopTrue"
                          class="ResellerForm__label ResellerForm__label--radio"
                        >
                          Sim
                        </label>
                      </div>
                    </div>
                    <div class="ResellerForm__field ResellerForm__field--tipoLoja">
                      <input
                        type="text"
                        class="ResellerForm__input"
                        id="tipoLoja"
                        name="tipoLoja"
                        value=""
                        required
                      />
                      <label for="whom" class="ResellerForm__label">
                        Tipo de loja (loja física, site, marketplace…)
                      </label>
                    </div>
                  </div>
                  <div class="ResellerForm__fieldset --dif-estilo">
                    <div
                      id={`ResellerForm__field-whom`}
                      class="ResellerForm__field ResellerForm__field--whom no-border"
                    >
                      <input
                        type="text"
                        class="ResellerForm__input"
                        id="whom"
                        name="whom"
                        value=""
                        required
                        onBlur={handleBlur}
                      />
                      <label for="whom" class="ResellerForm__label">
                        Qual(quais?)
                      </label>
                    </div>
                    <div
                      id={`ResellerForm__field-postalCode`}
                      class="ResellerForm__field ResellerForm__field--postalCode"
                    >
                      <input
                        type="tel"
                        class="ResellerForm__input"
                        id="contactFormPostalCode"
                        name="postalCode"
                        value=""
                        required
                        maxLength={9}
                        onBlur={handleBlur}
                        onInput={(e) => {
                          e.currentTarget.value = zipCodeMask(
                            e.currentTarget.value,
                          );
                        }}
                      />
                      <label
                        for="contactFormPostalCode"
                        class="ResellerForm__label"
                      >
                        CEP
                      </label>
                    </div>
                  </div>
                </div>
                <div class="ResellerForm__fieldset">
                  <div
                    id={`ResellerForm__field-street`}
                    class="ResellerForm__field ResellerForm__field--street"
                  >
                    <input
                      type="text"
                      class="ResellerForm__input"
                      id="contactFormStreet"
                      name="street"
                      value=""
                      required
                      onBlur={handleBlur}
                    />
                    <label for="contactFormStreet" class="ResellerForm__label">
                      Logradouro
                    </label>
                  </div>
                  <div class="ResellerForm__fieldset ResellerForm__fieldset--inner flex">
                    <div
                      id={`ResellerForm__field-number`}
                      class="ResellerForm__field ResellerForm__field--number"
                    >
                      <input
                        type="tel"
                        class="ResellerForm__input"
                        id="contactFormNumber"
                        name="number"
                        value=""
                        required
                        maxLength={10}
                        onBlur={handleBlur}
                      />
                      <label
                        for="contactFormNumber"
                        class="ResellerForm__label"
                      >
                        Nº
                      </label>
                    </div>
                    <div
                      id={`ResellerForm__field-complement`}
                      class="ResellerForm__field ResellerForm__field--complement"
                    >
                      <input
                        type="text"
                        class="ResellerForm__input"
                        id="contactFormComplement"
                        name="complement"
                        value=""
                        required
                        onBlur={handleBlur}
                      />
                      <label
                        for="contactFormComplement"
                        class="ResellerForm__label"
                      >
                        Complemento
                      </label>
                    </div>
                  </div>
                </div>
                <div class="ResellerForm__fieldset">
                  <div
                    id={`ResellerForm__field-neighborhood`}
                    class="ResellerForm__field ResellerForm__field--neighborhood"
                  >
                    <input
                      type="text"
                      class="ResellerForm__input"
                      id="contactFormNeighborhood"
                      name="neighborhood"
                      value=""
                      required
                      onBlur={handleBlur}
                    />
                    <label
                      for="contactFormNeighborhood"
                      class="ResellerForm__label"
                    >
                      Bairro
                    </label>
                  </div>
                  <div class="ResellerForm__fieldset">
                    <div class="ResellerForm__field ResellerForm__selects flex">
                      <div class="ResellerForm__field ResellerForm__field--no-label ResellerForm__select-wrapper">
                        <select
                          class="ResellerForm__select"
                          id="contactFormState"
                          name="state"
                          required
                        >
                          <option value="">UF</option>
                          <option value="AC">AC</option>
                          <option value="AL">AL</option>
                          <option value="AP">AP</option>
                          <option value="AM">AM</option>
                          <option value="BA">BA</option>
                          <option value="CE">CE</option>
                          <option value="DF">DF</option>
                          <option value="ES">ES</option>
                          <option value="GO">GO</option>
                          <option value="MA">MA</option>
                          <option value="MT">MT</option>
                          <option value="MS">MS</option>
                          <option value="MG">MG</option>
                          <option value="PA">PA</option>
                          <option value="PB">PB</option>
                          <option value="PR">PR</option>
                          <option value="PE">PE</option>
                          <option value="PI">PI</option>
                          <option value="RJ">RJ</option>
                          <option value="RN">RN</option>
                          <option value="RS">RS</option>
                          <option value="RO">RO</option>
                          <option value="RR">RR</option>
                          <option value="SC">SC</option>
                          <option value="SP">SP</option>
                          <option value="SE">SE</option>
                          <option value="TO">TO</option>
                        </select>
                      </div>
                    </div>
                    <div class="ResellerForm__field ResellerForm__field--city">
                      <input
                        type="text"
                        class="ResellerForm__input"
                        id="contactFormCity"
                        name="city"
                        value=""
                      />
                      <label for="contactFormCity" class="ResellerForm__label">
                        Município
                      </label>
                    </div>
                  </div>
                </div>
                <div class="ResellerForm__submit--content">
                  <p>*Campos obrigatórios</p>
                  <button class="ResellerForm__submit" type="submit">
                    Enviar
                  </button>
                </div>
              </form>
            )
            : (
              <div class="reseller__form-wrapper__success w-full max-w-[730px] min-h-[666px] text-center text-white py-[50px] px-0">
                <h2>Sua Mensagem foi enviada com sucesso!</h2>
                <p>Em breve entraremos em contato com você.</p>
              </div>
            )}
        </div>
        <div
          className={`reseller__side lg:w-1/4 lg:basis-1/4`}
          style={{
            background: `url("${backgroundImage}") 50% no-repeat`,
            backgroundSize: "cover",
          }}
        >
        </div>
      </div>
    </>
  );
}

export default ResellerForm;
