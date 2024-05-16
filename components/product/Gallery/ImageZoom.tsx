import Image from "apps/website/components/Image.tsx";
export interface Props {
  aspectRatio: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  index: number;
}

export default function ImageZoom(
  { aspectRatio, src, alt, width, height, index }: Props,
) {
  const handleMouseLeave = (e: MouseEvent) => {
    const parent = (e.target as HTMLImageElement).parentElement;
    const image = parent?.querySelector("div");

    if (image) image.style.display = "none";
  };

  const handleMouseMove = (e: MouseEvent) => {
    const target = e.target as HTMLImageElement;
    const image = target.nextElementSibling as HTMLDivElement;

    if (!image) return;

    const container = target.parentElement as HTMLLIElement;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    const xPercentage =
      ((e.clientX - container.getBoundingClientRect().left) / containerWidth) *
      100;

    const yPercentage =
      ((e.clientY - container.getBoundingClientRect().top) / containerHeight) *
      100;

    image.style.display = "block";
    image.style.backgroundPosition = `${xPercentage}% ${yPercentage}%`;
  };
  return (
    <>
      <Image
        class="w-auto h-[600px] max-2xl:h-[500px] max-xl:h-[300px] max-lg:h-auto lg:object-contain cursor-pointer"
        sizes="(max-width: 640px) 100vw, 40vw"
        style={{ aspectRatio }}
        src={src}
        alt={alt}
        width={width}
        height={height}
        // Preload LCP image for better web vitals
        preload={index === 0}
        loading={index === 0 ? "eager" : "lazy"}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      />
      <div
        class="hidden max-lg:!hidden absolute left-0 top-0 bg-no-repeat w-full h-full pointer-events-none border"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "200%",
          backgroundPosition: "center",
        }}
      />
    </>
  );
}
