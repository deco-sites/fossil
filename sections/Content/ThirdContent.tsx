import { Head } from "$fresh/runtime.ts";

/** @title {{title}} */
export interface Props {
  /**
   * @title Título do componente
   */
  title?: string;
  /**
   * @title Link de script para head
   * @description <script type="text/javascript" src=""></script> Colocar link do `src`
   */
  script_head?: string;
  /**
   * @title Link de CSS para head
   * @description <link type="text/css" rel="stylesheet" href="" /> Colocar link do `href`
   */
  css_head?: string;
  /**
   * @title Código Javascript para BODY
   * @description Colocar a tag com o conteúdo dentro <script></script>
   * @format html
   */
  script?: string;
  /**
   * @title Código CSS para BODY
   * @description Colocar a tag com o conteúdo dentro <style></l>
   * @format html
   */
  css?: string;
  /**
   * @title Código HTML para BODY
   * @description Colocar a tag com o conteúdo dentro <body></body>
   * @format html
   */
  html?: string;
}

export default function ThirdContent(props: Props) {
  return (
    <>
      {props.css_head && <Head>{props.css_head}</Head>}
      {props.script_head && <Head>{props.script_head}</Head>}

      {props.html && props.html}
      {props.css && props.css}
      {props.script && props.script}
    </>
  );
}
