import { signal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";

const locationHref = signal<string>("");

if (IS_BROWSER) {
  locationHref.value = globalThis.window.location.pathname;
}

export const useLocation = () => locationHref;
