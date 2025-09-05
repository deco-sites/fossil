export interface NJEggMascotProps {
  /** Additional CSS classes */
  class?: string;
}

export default function NJEggMascot({
  class: className = "",
}: NJEggMascotProps) {
  return (
    <img
      src="/nick-jonas/nj-collection-highlight/egg-mascot.png"
      alt="Sparkling Egg Mascot"
      class={className}
    />
  );
}
