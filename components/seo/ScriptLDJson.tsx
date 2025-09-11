import { Head } from "$fresh/runtime.ts";

function ScriptLDJson<T extends Record<string, unknown>>(props: T) {
  const innerHtml = JSON.stringify({
    "@context": "https://schema.org",
    ...props,
  });

  return (
    <Head>
      <script
        type="application/ld+json"
        // deno-lint-ignore react-no-danger
        dangerouslySetInnerHTML={{
          __html: innerHtml,
        }}
      />
    </Head>
  );
}

export default ScriptLDJson;
