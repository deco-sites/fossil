export interface CTAButtonProps {
  /** @title Texto do Botão */
  name: string;
  /** @title URL do Botão */
  url?: string;
  /** @title Variante do Botão */
  variant?: "primary" | "secondary";
  /** @title Classes CSS adicionais */
  class?: string;
}

export default function CTAButton({
  name,
  url = "#",
  variant = "primary",
  class: className = "",
}: CTAButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center h-10 px-6 lg:px-8 font-soleil font-bold text-sm rounded-full tracking-wide transition-colors duration-200";

  const variantClasses = {
    primary: "bg-white text-primary border border-gray-300 hover:bg-gray-100",
    secondary:
      "bg-primary text-white border border-primary hover:bg-primary/90",
  };

  return (
    <a
      href={url}
      class={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {name}
    </a>
  );
}
