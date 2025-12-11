import type { App as A, FnContext } from "@deco/deco";
import type { Secret } from "apps/website/loaders/secret.ts";
import { type Manifest, manifest } from "./dito/manifest.gen.ts";

export interface Props {
  /**
   * @title Usuário
   * @description E-mail da Service Account do Dito
   */
  username?: Secret;
  /**
   * @title Senha
   * @description Senha da Service Account do Dito
   */
  password?: Secret;
  /**
   * @title Marca
   * @description Identificador da marca para eventos do Dito (padrão: fossil)
   */
  brand?: string;
}

export interface State {
  brand: string;
  getAccessToken: () => Promise<string | null>;
}

const DITO_AUTH_URL = "https://openapi.dito.com.br/authentication/";

let cachedToken: string | null = null;
let tokenExpiry: number = 0;

/**
 * @title Dito
 * @description Integração com Dito CRM para rastreamento de eventos e identificação de leads.
 * @category Marketing
 * @logo https://app.dito.com.br/apple-touch-icon-152x152.png
 */
export default function Dito(props: Props): A<Manifest, State> {
  const { username, password, brand } = props;

  const state: State = {
    brand: brand ?? "fossil-oficial",
    getAccessToken: async () => {
      const user = username?.get?.();
      const pass = password?.get?.();

      if (!user || !pass) {
        console.error("[Dito App] Credenciais não configuradas");
        return null;
      }

      const now = Date.now();
      if (cachedToken && tokenExpiry > now) {
        return cachedToken;
      }

      try {
        const response = await fetch(DITO_AUTH_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user}:${pass}`,
          },
        });

        if (!response.ok) {
          console.error("[Dito App] Falha na autenticação:", response.status);
          return null;
        }

        const data = await response.json() as { token: string };
        cachedToken = data.token;
        tokenExpiry = now + 23 * 60 * 60 * 1000;

        return cachedToken;
      } catch (error) {
        console.error("[Dito App] Falha na autenticação:", error);
        return null;
      }
    },
  };

  return {
    state,
    manifest,
  };
}

export type App = ReturnType<typeof Dito>;
export type AppContext = FnContext<State, Manifest>;
