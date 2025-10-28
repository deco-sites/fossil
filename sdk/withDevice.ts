import { type FnContext } from "@deco/deco";
import { type Device } from "deco/utils/userAgent.ts";

export const withDevice = <T>(props: T, ctx: FnContext) => ({
  ...props,
  device: (ctx.device || "desktop") as Device,
});
