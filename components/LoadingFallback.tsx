import LoadingSpinner from "./ui/LoadingSpinner.tsx";

export function LoadingFallback() {
  return (
    <div class="flex justify-center items-center h-16 w-full">
      <LoadingSpinner />
    </div>
  );
}

export default LoadingFallback;
