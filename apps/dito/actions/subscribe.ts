import type { AppContext } from "../../dito.ts";
import {
  type NewsletterFormData,
  type NewsletterSource,
  sendNewsletterToDito,
} from "../../../sdk/dito.ts";

export interface Props {
  /**
   * @title E-mail
   * @description E-mail do usuário
   */
  email: string;
  /**
   * @title Nome
   * @description Nome do usuário
   */
  name?: string;
  /**
   * @title Telefone
   * @description Telefone do usuário
   */
  phone?: string;
  /**
   * @title Data de Nascimento
   * @description Data de nascimento no formato DD/MM/AAAA
   */
  dateOfBirth?: string;
  /**
   * @title Newsletter
   * @description Aceite de recebimento de newsletter
   */
  newsletter?: boolean;
  /**
   * @title Origem
   * @description Origem do cadastro (popup, footer, checkout)
   */
  source: NewsletterSource;
}

export interface SubscribeResult {
  success: boolean;
  error?: string;
}

/**
 * @title Inscrição Newsletter Dito
 * @description Envia dados de cadastro de newsletter para o Dito CRM
 */
export default async function subscribe(
  props: Props,
  _req: Request,
  ctx: AppContext,
): Promise<SubscribeResult> {
  const { email, name, phone, dateOfBirth, newsletter, source } = props;

  const apiKey = await ctx.getAccessToken();

  if (!apiKey) {
    console.error("[Dito Action] Falha na autenticação - token não disponível");
    return { success: false, error: "Erro de autenticação" };
  }

  const formData: NewsletterFormData = {
    email,
    name,
    phone,
    dateOfBirth,
    newsletter,
    source,
  };

  try {
    const response = await sendNewsletterToDito(formData, {
      apiKey,
      brand: ctx.brand,
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("[Dito Action] Erro ao enviar para Dito:", text);
      return { success: false, error: "Erro na API do Dito" };
    }

    return { success: true };
  } catch (error) {
    console.error("[Dito Action] Exceção:", error);
    return { success: false, error: "Erro interno" };
  }
}
