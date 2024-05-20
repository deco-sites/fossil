/**
 * Rendered when a not found is returned by any of the loaders run on this page
 */
export { default } from "../../components/search/NotFound.tsx";

export function LoadingFallback() {
  return (
    <div style={{ height: "100vh" }} class="flex justify-center items-center">
      <span class="loading loading-spinner" />
    </div>
  );
}
