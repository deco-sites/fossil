export type DitoIdentifyPayload = {
  id: string;
  email?: string;
  name?: string;
  birthday?: string;
  data?: Record<string, unknown>;
};

export type DitoTrackPayload = {
  action: string;
  data?: Record<string, unknown>;
};

export type DitoSDK = {
  generateID?: (str: string) => string;
  identify?: (payload: DitoIdentifyPayload) => void;
  track?: (payload: DitoTrackPayload) => void;
  CurrentUser?: {
    logout?: () => void;
  };
};

const getDito = (): DitoSDK | null => {
  if (typeof window === "undefined") return null;
  return (window as typeof window & { dito?: DitoSDK }).dito ?? null;
};

/**
 * Gera o ID no formato esperado pela Dito (_dito_sha1_ + hash)
 * Usa o método nativo do SDK se disponível
 */
const generateDigoId = (email: string): string => {
  const sdk = getDito();
  if (sdk?.generateID) {
    return sdk.generateID(email);
  }
  console.warn("[Dito] SDK não encontrado, usando email como ID");
  return email;
};

export type DitoIdentifyAndTrackParams = {
  email: string;
  name?: string;
  phone?: string;
  birthday?: string;
  optin: boolean;
  source: "popup" | "newsletter";
  logLabel?: string;
};

export const ditoIdentifyAndTrackSafe = (
  params: DitoIdentifyAndTrackParams,
): Promise<void> =>
  (async () => {
    try {
      await Promise.resolve();

      const sdk = getDito();
      if (!sdk?.identify) {
        console.warn("[Dito] SDK não disponível");
        return;
      }

      sdk.CurrentUser?.logout?.();

      const ditoId = generateDigoId(params.email);

      const identifyPayload: DitoIdentifyPayload = {
        id: ditoId,
        email: params.email,
        data: {
          origem_cadastro: params.source,
          optin_newsletter: params.optin ? "sim" : "não",
        },
      };

      if (params.name) {
        identifyPayload.name = params.name;
      }
      if (params.birthday) {
        identifyPayload.birthday = params.birthday;
      }
      if (params.phone) {
        identifyPayload.data = {
          ...identifyPayload.data,
          telefone: params.phone,
        };
      }

      sdk.identify(identifyPayload);

      const trackAction = params.source === "popup"
        ? "cadastrou-popup"
        : "cadastrou-newsletter";

      sdk.track?.({ action: trackAction });
    } catch (err) {
      console.warn(
        params.logLabel ?? "[Dito] Falha ao enviar lead/evento",
        err,
      );
    }
  })();
