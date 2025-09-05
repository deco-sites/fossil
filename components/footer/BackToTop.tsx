import Icon from "../../components/ui/Icon.tsx";

export default function BackToTop({ content }: { content?: string }) {
  return (
    <>
      <div class="w-full flex items-center justify-center">
        <a
          href="#top"
          aria-label="back to top"
          class="z-50 w-8 h-8 md:w-14 md:h-12 fixed flex justify-center items-center  right-1 md:right-6 bottom-16 md:bottom-[72px] border-solid text-primary border-primary border-[3px] bg-[#ffffff99] hover:bg-[#e07f16] text-center"
        >
          {content}{" "}
          <Icon
            id="ChevronUp"
            width={30}
            height={30}
            class="text-primary  font-bold"
            alt="icon back to top"
          />
        </a>
      </div>
    </>
  );
}
