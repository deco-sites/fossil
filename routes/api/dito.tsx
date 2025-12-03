/**
 * Rota de API para enviar leads para o Dito
 *
 * @example
 * POST /api/dito
 * {
 *   "email": "cliente@email.com",
 *   "name": "Nome do Cliente",
 *   "phone": "11999999999",
 *   "dateOfBirth": "01/01/1990",
 *   "newsletter": true,
 *   "source": "popup" | "footer"
 * }
 */

import { Handlers } from "$fresh/server.ts";
import {
  type NewsletterFormData,
  type NewsletterSource,
  sendNewsletterToDito,
} from "../../sdk/dito.ts";

interface DitoRequestData {
  email: string;
  name?: string;
  phone?: string;
  dateOfBirth?: string;
  newsletter?: boolean;
  source: NewsletterSource;
}

export const handler: Handlers = {
  POST: async (req) => {
    try {
      const data: DitoRequestData = await req.json();

      if (!data.email) {
        return new Response(JSON.stringify({ error: "Email é obrigatório" }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }

      const ditoData: NewsletterFormData = {
        email: data.email,
        name: data.name,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth,
        newsletter: data.newsletter ?? true,
        source: data.source ?? "footer",
      };

      const response = await sendNewsletterToDito(ditoData);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[Dito Integration] Erro na API do Dito:", errorText);

        return new Response(
          JSON.stringify({
            success: false,
            error: "Erro ao enviar para Dito",
          }),
          {
            status: response.status,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
      }

      return new Response(
        JSON.stringify({ success: true }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    } catch (error) {
      console.error("[Dito Integration] Erro:", error);

      return new Response(
        JSON.stringify({ success: false, error: "Erro interno" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }
  },

  OPTIONS: () => {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  },
};

