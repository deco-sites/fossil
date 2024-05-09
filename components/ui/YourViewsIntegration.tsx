const js = () => {
  const init = () => {
    const node = document.createElement("script");

    node.id = "_yvsrc";
    node.async = true;
    node.src =
      "//service.yourviews.com.br/script/7f75d9ac-38c3-4026-9132-3b56ecca7415/yvapi.js";

    document.head.appendChild(node);
  };

  addEventListener(
    "load",
    () =>
      typeof requestIdleCallback !== "undefined"
        ? requestIdleCallback(() => setTimeout(init, 5_500))
        : init(),
  );
};

function YourViewsIntegration() {
  return (
    <>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" />
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: `(${js})()` }}
      />
    </>
  );
}

export default YourViewsIntegration;
