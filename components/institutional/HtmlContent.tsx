import { HTML } from "./types.ts";

export interface Props {
  /**
   * @description Content will be rendered as markdown.
   */
  content: HTML;
}

function HtmlContent({ content }: Props) {
  return (
    <div
      className="htmlContent"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

export default HtmlContent;
