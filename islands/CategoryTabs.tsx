import type { Props } from "../sections/Category/CategoryTabs.tsx";
import Component from "../sections/Category/CategoryTabs.tsx";

function Island(props: Props) {
  return <Component {...props} device={props.device || "desktop"} />;
}

export default Island;
