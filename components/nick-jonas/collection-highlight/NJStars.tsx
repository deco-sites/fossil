export interface NJStarsProps {
  /** Star variant */
  variant: "desktop-1" | "desktop-2" | "mobile";
  /** Additional CSS classes */
  class?: string;
}

export default function NJStars({
  variant,
  class: className = "",
}: NJStarsProps) {
  const getStarSrc = () => {
    switch (variant) {
      case "desktop-1":
        return "/nick-jonas/nj-collection-highlight/stars-1.svg";
      case "desktop-2":
        return "/nick-jonas/nj-collection-highlight/stars-2.svg";
      case "mobile":
        return "/nick-jonas/nj-collection-highlight/stars-3.svg";
      default:
        return "/nick-jonas/nj-collection-highlight/stars-1.svg";
    }
  };

  return <img src={getStarSrc()} alt="Stars decoration" class={className} />;
}
