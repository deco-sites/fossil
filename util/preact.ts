import type { VNode } from "preact";
import type { ComponentChildren } from "preact";

export function isVNode(node: unknown): node is VNode<Record<string, unknown>> {
  return (
    typeof node === "object" &&
    node !== null &&
    "type" in (node as Record<string, unknown>) &&
    "props" in (node as Record<string, unknown>)
  );
}

export function flattenChildren(children: ComponentChildren): VNode[] {
  const arr = children ? [children].flat() : [];
  const result: VNode[] = [];
  for (const child of arr) {
    if (isVNode(child) && child.type === "preact-fragment") {
      result.push(...flattenChildren(child.props.children));
    } else if (isVNode(child)) {
      result.push(child);
    }
  }
  return result;
}
