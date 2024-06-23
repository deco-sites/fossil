import { Head } from "$fresh/runtime.ts";
import Icon from "../../components/ui/Icon.tsx";
import { clx } from "../../sdk/clx.ts";

export interface Question {
  question: string;
  /** @format html */
  answer: string;
}

export interface Props {
  title?: string;
  description?: string;
  questions?: Question[];
  layout?: {
    headerAlignment?: "center" | "left";
  };
}

const DEFAULT_PROPS = {
  title: "",
  description: "",
  questions: [
    {
      question: "Como faço para acompanhar o meu pedido?",
      answer:
        "Acompanhar o seu pedido é fácil! Assim que o seu pedido for enviado, enviaremos um e-mail de confirmação com um número de rastreamento. Basta clicar no número de rastreamento ou visitar o nosso site e inserir o número de rastreamento na seção designada para obter atualizações em tempo real sobre a localização e o status de entrega do seu pedido.",
    },
    {
      question: "Qual é a política de devolução?",
      answer:
        "Oferecemos uma política de devolução sem complicações. Se você não estiver completamente satisfeito(a) com a sua compra, pode devolver o item em até 30 dias após a entrega para obter um reembolso total ou troca. Certifique-se de que o item esteja sem uso, na embalagem original e acompanhado do recibo. Entre em contato com a nossa equipe de atendimento ao cliente e eles o(a) orientarão pelo processo de devolução.",
    },
  ],
  contact: {
    title: "",
    description: "",
    button: {
      text: "",
      link: "",
    },
  },
};

function Question({ question, answer }: Question) {
  return (
    <details class="collapse collapse-plus join-item border-b border-[#eee]">
      <summary class="collapse-title !min-h-0 text-2xl font-scoutCond tracking-one font-medium text-[#1e1d2e]  !pl-0 !pt-2 !pb-0 !mb-0 ">
        {question}
      </summary>
      <div
        class="collapse-content section_content"
        dangerouslySetInnerHTML={{ __html: answer }}
      />
    </details>
  );
}

export default function FAQ(props: Props) {
  const {
    questions = [],
    title,
    layout,
  } = { ...DEFAULT_PROPS, ...props };

  return (
    <>
      <Head>
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html: `
             .collapse-content p {
              font-size: 12px;
             }

             .collapse-content table td {
              border-right: 1px solid #eee;
              padding: 9px;
             }

             .collapse-content table {
              text-align: center;
              font-size: 13px;
              margin-top: 20px;
              border: 1px solid #eee;
             }

             @media only screen and (max-width: 768px) {
               .collapse-content table {
                  width: 100% !important;
                  border-collapse: collapse;
              }
            }
            `,
          }}
        />
      </Head>

      <div class="w-full  max-w-7xl m-auto px-4 pt-8 pb-[100px] flex flex-col lg:flex-row gap-4 lg:my-28 lg:gap-8 lg:py-10  lg:px-10">
        <div class="flex flex-col gap-8 lg:gap-10 w-full">
          <div
            class={`flex flex-col gap-2 ${
              layout?.headerAlignment === "left"
                ? "text-left lg:pl-20 uppercase"
                : "text-center"
            }`}
          >
            {title &&
              (
                <h1
                  class={clx(
                    ` text-4xl font-scoutCond  font-bold   tracking-[2px] lg:text-[40px] lg:font-bold uppercase leading-8 lg:leading-10 text-[#1e1d2e] pb-5 lg:pb-6`,
                  )}
                >
                  {title}
                </h1>
              )}
          </div>

          <div class="flex w-full gap-16">
            <aside class="hidden lg:block">
              <div class="font-arial text-white p-8 bg-primary-content">
                <div class="flex gap-3 items-center justify-center mt-6">
                  <Icon id="Email" size={16} class="" />
                  <p>atendimento@fossil.com.br</p>
                </div>
              </div>
            </aside>
            <div class="join join-vertical w-full">
              {questions.map((question) => <Question {...question} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
