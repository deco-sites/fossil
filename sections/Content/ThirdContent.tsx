import { Head } from "$fresh/runtime.ts";

/** @titleBy {{title}} */
export interface Props {
  /**
   * @title Título do componente
   */
  title?: string;
  /**
   * @title Link de script para head
   * @description <script type="text/javascript" src=""></script> Colocar link do `src`
   * @format textarea
   */
  script_head?: string;
  /**
   * @title Link de CSS para head
   * @description <link type="text/css" rel="stylesheet" href="" /> Colocar link do `href`
   * @format textarea
   */
  css_head?: string;
  /**
   * @title Código Javascript para BODY
   * @description Colocar o conteúdo dentro <script></script>
   * @format textarea
   */
  script?: string;
  /**
   * @title Código CSS para BODY
   * @description Colocar o conteúdo dentro <style></style>
   * @format textarea
   */
  css?: string;
  /**
   * @title Código HTML para BODY
   * @description Colocar o conteúdo dentro <body></body>
   * @format textarea
   */
  html?: string;
}

export default function ThirdContent(props: Props) {
  return (
    <>
      {props.css_head && (
        <Head>
          <link rel="stylesheet" href={props.css_head} />
        </Head>
      )}

      {props.script_head && (
        <Head>
          <script src={props.script_head}></script>
        </Head>
      )}

      {props.html && (
        <div dangerouslySetInnerHTML={{ __html: props.html }}></div>
      )}

      {props.css && (
        <style dangerouslySetInnerHTML={{ __html: props.css }}></style>
      )}

      {props.script && (
        <script dangerouslySetInnerHTML={{ __html: props.script }}></script>
      )}
    </>
  );
}
