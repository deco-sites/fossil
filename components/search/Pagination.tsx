import { PageInfo } from "apps/commerce/types.ts";
import Icon from "../ui/Icon.tsx";
import { h } from "preact";
import { useState } from "preact/hooks";

export interface Props {
  pageInfo: PageInfo;
  productsLength: number;
  startingPage: number;
}

const goToPage = (page: number) => {
  const searchParams = new URLSearchParams(globalThis.window.location.search);
  searchParams.set("page", `${page}`);
  globalThis.window.location.search = searchParams.toString();
};

export default function Pagination(
  { pageInfo, productsLength, startingPage }: Props,
) {

  const { recordPerPage, records = 0, nextPage, previousPage, currentPage } =
    pageInfo;

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const offset = Math.abs(startingPage - 1);
  const perPage = recordPerPage || productsLength;
  const lastPage = Math.ceil(records / perPage);

  const calculatePageOptions = () => {
    const pageOptions = [];
    const maxVisibleOptions = 5;

    let startPage = currentPage;
    let endPage = startPage + maxVisibleOptions - 1;

    if (endPage > lastPage) {
      endPage = lastPage;
      startPage = Math.max(endPage - maxVisibleOptions + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageOptions.push({ pageName: `${i}`, pageIndex: i });
    }

    return pageOptions;
  };

  const pageOptions = calculatePageOptions();

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  const handlePageSelection = (pageIndex: number) => {
    goToPage(pageIndex);
    setDropdownOpen(false);
  };

  return (
    <div class="flex justify-center pt-2 mt-24 lg:my-4 border-t border-solid border-[rgb(224,224,224)] lg:border-none">
      <div class=" flex justify-center items-center gap-2">
        <button
          aria-label="previous page link"
          onClick={() => goToPage(currentPage - 1)}
          class={` mr-12 lg:mr-0 max-lg:px-2 ${
            !previousPage ? "text-gray-500" : "text-black"
          }`}
          disabled={!previousPage}
        >
          <span class="uppercase block lg:hidden font-scoutCond tracking-one underline font-base font-bold ">
            Anterior
          </span>
          <Icon
            id="ChevronLeft"
            size={7}
            strokeWidth={2}
            class="hidden lg:block"
          />
        </button>

        <div
          class="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            class={`btn !bg-white !h-[20px] !min-h-[20px] font-bold font-arial !border-2 !border-solid text-xs !rounded-none w-[42px] !px-[1px] !border-primary cursor-pointer flex items-center ${
              dropdownOpen ? "!border-b-0" : "!border-black"
            }`}
          >
            {currentPage}
            <Icon id="ChevronDown" size={9} strokeWidth={2} class="ml-1" />
          </button>
          {dropdownOpen && (
            <div class="absolute top-full left-0  bg-white shadow-md max-h-48 overflow-auto w-full flex flex-col items-center justify-start z-10 border-2 overflow-y-hidden border-t-0 rounded-none border-primary">
              {pageOptions.map((option) => (
                <button
                  key={option.pageIndex}
                  class="w-full text-black text-start hover:bg-black hover:text-white text-xs py-2"
                  onClick={() => handlePageSelection(option.pageIndex)}
                >
                  <span class="pl-1">{option.pageName}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div class="flex items-center justify-center w-[40px] h-[20px] text-xs font-arial font-bold ">
          -{"   "}<span class="pl-4">{lastPage}</span>
        </div>

        <button
          aria-label="next page link"
          onClick={() => goToPage(currentPage + 1)}
          class={` ml-12 lg:ml-0 max-lg:px-2 ${
            !nextPage ? "text-gray-500" : "text-black"
          }`}
          disabled={!nextPage}
        >
          <span class="uppercase block lg:hidden font-scoutCond tracking-one underline font-base font-bold ">
            Próximo
          </span>
          <Icon
            id="ChevronRight"
            size={7}
            strokeWidth={2}
            class="hidden lg:block"
          />
        </button>
      </div>
    </div>
  );
}
