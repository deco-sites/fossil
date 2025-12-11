// DO NOT EDIT. This file is intended to mirror deco's generated manifest structure for the Dito app.
// Update this file whenever new actions/loaders/sections are added under apps/dito.

import * as $$$0 from "./actions/subscribe.ts";

const manifest = {
  actions: {
    "dito/actions/subscribe.ts": $$$0,
  },
  loaders: {},
  sections: {},
  name: "dito",
  baseUrl: import.meta.url,
} as const;

export type Manifest = typeof manifest;

export { manifest };

export default function resolveManifest() {
  return manifest;
}
