// import Markdown from "deco-sites/technos/components/institutional/Markdown.tsx";

import { HTML } from "./types.ts";

export interface Props {
  /**
   * @description Content will be rendered as markdown.
   */
  content: HTML;
  title: string;
}

interface PropsCurrent extends Props {
  index?: number;
}

export function AccordionItem({ title, content, index = 0 }: PropsCurrent) {
  return (
    <div tabIndex={index} class="collapse collapse-plus rounded-none">
      <input type="checkbox" class="hidden" />
      <div class="collapse-title institucional-content__faq-question after:!text-center after:!text-xl after:!text-white  after:!top-[50%] after:translate-y-[-50%] after:!w-8 after:!h-8 after:!rounded-[50%] after:bg-[#c41c17] relative flex items-center mb-2 min-h-[50px] max-h-[150px] bg-[#eee] cursor-pointer pt-2 pr-16 pb-2 pl-0 md:pl-3">
        <span class="institucional-content__faq-text ">
          <strong class="institucional-content__faq-number institucional-content__faq-number--inline inline-block text-xs p-0 md:text-base">
            {index + 1}.
          </strong>
          <span class="institucional-content__faq-text pl-2 text-xs md:pl-3 md:text-sm">
            {title}
          </span>
        </span>
      </div>
      <div class="collapse-content px-0 !pb-0">
        <div className="pt-5" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}
