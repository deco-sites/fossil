import { useEffect } from "preact/hooks";

export interface Props {
  rootId: string;
}

const setup = ({ rootId }: Props) => {
  const root = document.getElementById(rootId);
  if (!root) return;
  const toRight = document.getElementById(`${rootId}-to-right`);
  const toLeft = document.getElementById(`${rootId}-to-left`);
  toRight?.addEventListener("click", () => {
    isMobile
      ? root.scroll({
        left: root.scrollLeft + 100,
        behavior: "smooth",
      })
      : root.scroll({
        top: root.scrollTop + 200,
        behavior: "smooth",
      });
  });
  toLeft?.addEventListener("click", () => {
    isMobile
      ? root.scroll({
        left: root.scrollLeft - 100,
        behavior: "smooth",
      })
      : root.scroll({
        top: root.scrollTop - 200,
        behavior: "smooth",
      });
  });
  const isMobile = getComputedStyle(root).flexDirection === "row";
  const hasScroll = isMobile
    ? (root.scrollWidth != root.offsetWidth)
    : (root.scrollHeight != root.offsetHeight);
  if (!hasScroll) {
    toRight?.classList.add("hidden");
    toLeft?.classList.add("hidden");
  }
  root.onscroll = () => {
    const isFullyScrolled = isMobile
      ? (root.scrollLeft + root.clientWidth >= root.scrollWidth)
      : (root.scrollTop + root.clientHeight >= root.scrollHeight);
    isFullyScrolled
      ? toRight?.classList.add("hidden")
      : toRight?.classList.remove("hidden");
    (root.scrollLeft === 0 && root.scrollTop === 0)
      ? toLeft?.classList.add("hidden")
      : toLeft?.classList.remove("hidden");
  };
};
function ProductDots({ rootId }: Props) {
  useEffect(
    () =>
      setup({
        rootId,
      }),
    [
      rootId,
    ],
  );
  return <div data-product-slider-dots-controller-js />;
}

export default ProductDots;
