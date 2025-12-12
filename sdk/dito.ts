export type DitoIdentifyPayload = {
  id: string;
  email?: string;
  data?: Record<string, unknown>;
};

export type DitoTrackPayload = {
  action: string;
  data?: Record<string, unknown>;
};

export type DitoSDK = {
  identify?: (payload: DitoIdentifyPayload) => void;
  track?: (payload: DitoTrackPayload) => void;
};

const getDito = (): DitoSDK | null => {
  if (typeof window === "undefined") return null;
  return (window as typeof window & { dito?: DitoSDK }).dito ?? null;
};

export const ditoIdentifyAndTrackSafe = (
  params: {
    identify: DitoIdentifyPayload;
    track?: DitoTrackPayload;
    logLabel?: string;
  },
): Promise<void> =>
  (async () => {
    try {
      await Promise.resolve();

      const sdk = getDito();
      if (!sdk?.identify) return;

      sdk.identify(params.identify);
      if (params.track) {
        sdk.track?.(params.track);
      }
    } catch (err) {
      console.warn(
        params.logLabel ?? "[Dito] Falha ao enviar lead/evento",
        err,
      );
    }
  })();
