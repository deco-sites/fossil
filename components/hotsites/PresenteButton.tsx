export interface ButtonProps {
  label: string;
  url: string;
  classes: string;
  target: string;
}
export function PresenteButton({ label, url, classes, target }: ButtonProps) {
  return <a class={classes} href={url} target={target}>{label}</a>;
}
