import { Head } from "$fresh/runtime.ts";

/** @titleBy title */
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
      <Head>
        {props.css_head && <link rel="stylesheet" href={props.css_head} />}
        {props.script_head && <script defer src={props.script_head}></script>}
      </Head>

      {props.html && (
        <div
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: props.html }}
        >
        </div>
      )}

      {props.css && (
        <style
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: props.css }}
        >
        </style>
      )}

      {props.script && (
        <script
          defer
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: props.script }}
        >
        </script>
      )}
    </>
  );
}
