/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import Icon from "../../components/ui/Icon.tsx";
import { sendEvent } from "../../sdk/analytics.tsx";
import { useId } from "../../sdk/useId.ts";
import { useSuggestions } from "../../sdk/useSuggestions.ts";
import { useUI } from "../../sdk/useUI.ts";
import { Suggestion } from "apps/commerce/types.ts";
import { Resolved } from "deco/engine/core/resolver.ts";
import { useEffect, useRef } from "preact/compat";
import type { Platform } from "../../apps/site.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useOffer } from "../../util/useOffer.ts";
import Image from "apps/website/components/Image.tsx";

// Editable props
export interface Props {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;

  /**
   * @title Suggestions Integration
   * @todo: improve this typings ({query: string, count: number}) => Suggestions
   */
  loader: Resolved<Suggestion | null>;

  platform?: Platform;
}

// Editable props
export interface Props {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;

  /**
   * @title Suggestions Integration
   * @todo: improve this typings ({query: string, count: number}) => Suggestions
   */
  loader: Resolved<Suggestion | null>;

  platform?: Platform;
}

function Searchbar({
  action = "/s",
  name = "&utm_p=",
  loader,
  device,
}: Props & { variant?: string; device?: string }) {
  const id = useId();
  const { displaySearchPopup } = useUI();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setQuery, payload, loading } = useSuggestions(loader);
  const { products = [], searches = [] } = payload.value ?? {};
  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);
  const topSearches = [
    {
      text: "Masculino",
      url: "/relogio/masculino?PS=18&O=OrderByReleaseDateDESC",
    },
    {
      text: "Feminino",
      url: "/relogio/feminino?PS=18&O=OrderByReleaseDateDESC",
    },
    {
      text: "Nate",
      url: "/s?q=nate&PS=30&O=OrderByReleaseDateDESC&utmi_pc=search",
    },
    {
      text: "Lançamentos",
      url: "/2146?PS=18&map=productClusterIds&O=OrderByReleaseDateDESC",
    },
    {
      text: "Relógio",
      url: "/s?q=relogio&O=OrderByReleaseDateDESC&utmi_pc=search",
    },
    {
      text: "Stella",
      url: "/s?q=stella&O=OrderByReleaseDateDESC&utmi_pc=search",
    },
    {
      text: "Feminino",
      url: "/relogio/feminino?&utmi_pc=Html&utmi_cp=Popular",
    },
  ];

  useEffect(() => {
    if (displaySearchPopup.value === false && !hasTerms && !hasProducts) {
      setQuery("");
    }
  }, [displaySearchPopup.value]);

  const handleSearch = (event: Event) => {
    event.preventDefault();
    const value = searchInputRef?.current?.value.trim();
    if (value) {
      const searchURL = `${action}?${name}=${
        encodeURIComponent(value)
      }&utmi_pc=search&utmi_cp=${encodeURIComponent(value)}`;
      window.location.href = searchURL;
    }
  };

  return (
    <div class="max-md:flex itens-center justify-center w-full relative ">
      <form
        id={id}
        action={action}
        class="join rounded-none md:h-10 bg-[#f5f5f5] w-[90%] md:w-auto"
        onSubmit={handleSearch}
      >
        <input
          ref={searchInputRef}
          id="search-input"
          class="input input-bordered join-item flex-grow  lg:w-64 lg:h-10 text-base lg:text-sm lowercase text-black font-medium focus:outline-none pl-4 border-none bg-[#f5f5f5]"
          name={name}
          onFocus={() => displaySearchPopup.value = true}
          onBlur={() => {
            setTimeout(() => {
              displaySearchPopup.value = false;
            }, 200);
          }}
          placeholder="digite a sua busca"
          role="combobox"
          aria-controls="search-suggestion"
          aria-haspopup="listbox"
          aria-expanded={displaySearchPopup.value}
          autocomplete="off"
        />
        <button
          type="submit"
          class={`join-item bg-[#f5f5f5] border-0 w-[30px] `}
          aria-label="Search"
          for={id}
          tabIndex={-1}
          onClick={() => {
            const value = searchInputRef?.current?.value;
            if (value) {
              sendEvent({
                name: "search",
                params: { search_term: value },
              });
            }
            handleSearch;
          }}
        >
          {loading.value
            ? <span class="loading loading-spinner loading-xs" />
            : (
              <Icon
                id="MagnifyingGlass"
                size={30}
                strokeWidth={0.01}
                class="pt-1"
              />
            )}
        </button>
      </form>

      <section
        class={`absolute w-[90%] md:bg-white m-auto md:w-[300px] h-auto flex-col z-50 top-12 md:top-14 md:right-0 border-t-[3px] border-solid border-primary ${
          !displaySearchPopup.value ? "hidden" : "flex"
        }`}
      >
        {/**desktop */}
        {device !== "mobile"
          ? (
            <>
              {searchInputRef.current &&
                    searchInputRef.current.value.length === 0 ||
                  !hasProducts || loading.value
                ? (
                  <div class="flex m-auto flex-1 bg-white h-full flex-col float-none pb-5 p-0 box-border">
                    <h5 class="text-lg leading-none w-[80%] uppercase mt-4 font-semibold pb-1 text-primary  tracking-[1px]">
                      Termos mais buscados
                    </h5>
                    <span class="border-b-2 border-primary mb-4 border-solid">
                    </span>
                    <ul class="flex flex-col flex-1 w-auto border-none box-border">
                      {topSearches.map(({ text, url }) => (
                        <li>
                          <a
                            href={url}
                            class="text-xs capitalize  text-primary my-[5px]"
                          >
                            {text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
                : (
                  <ul class="z-50 md:w-[334px] w-full max-md:h-full max-md:min-h-[300px] absolute top-0 right-0 bg-white py-3 pb-8 px-4 box-border">
                    {searches.map(({ term }, index) => (
                      <>
                        {index < 2 && (
                          <li class="font-medium text-sm leading-4 capitalize text-[#2e2e2eb3] mb-[10px] hidden ">
                            <a href={`/s?q=${term}`}>{term}</a>
                          </li>
                        )}
                      </>
                    ))}
                    <span class=" font-bold uppercas w-[80%] text-left border-b-2 border-solid border-black max-md:hidden box-border text-black text-[18px] leading-[18px]  flex pt-4 pb-5">
                      Nossas sugestões
                    </span>
                    {products.map((
                      { image, isVariantOf, offers, url },
                      index,
                    ) => {
                      const { has_discount, listPrice, price } = useOffer(
                        offers,
                      );

                      return (
                        <>
                          {index < 2 && (
                            <li class="inline-block float-left w-1/2 pt-4 px-4">
                              <a
                                class="text-[10px] leading-none text-center text-black"
                                href={url}
                              >
                                <Image
                                  src={image![0].url! || ""}
                                  width={240}
                                  height={240}
                                  class="w-4/5 h-auto block mb-4 p-2 mx-auto"
                                />

                                {isVariantOf!.name}

                                {has_discount && (
                                  <span class="table max-md:hidden relative top-3 w-full text-[13px] font-bold text-[#5e5e5e] leading-[14px] uppercase text-center mt-[10px]">
                                    De: {formatPrice(
                                      listPrice,
                                      offers?.priceCurrency,
                                    )}
                                  </span>
                                )}

                                <span class="table max-md:hidden relative top-3 w-full text-[13px] font-bold text-[#5e5e5e] leading-[14px] uppercase text-center mt-[10px]">
                                  Por:{" "}
                                  {formatPrice(price, offers?.priceCurrency)}
                                </span>
                              </a>
                            </li>
                          )}
                        </>
                      );
                    })}
                  </ul>
                )}
            </>
          )
          : (
            <>
              {/** search  mobile */}
              {searchInputRef.current &&
                    searchInputRef.current.value.length === 0 ||
                  !hasProducts || loading.value
                ? (
                  <div class="flex w-[80%] flex-1 bg-white h-full flex-col float-none pl-6 box-border">
                    <h5 class="text-lg leading-none w-52 uppercase mt-4 font-semibold pb-1 text-primary  tracking-[1px]">
                      Termos mais buscados
                    </h5>
                    <span class="border-b-2 w-52 border-primary mb-4 border-solid">
                    </span>
                    <ul class="flex flex-col flex-1 w-auto border-none box-border">
                      {topSearches.map(({ text, url }, index) => (
                        <li class="flex flex-col">
                          <span class=" text-xl  font-semibold ml-2">
                            {index + 1}
                          </span>
                          <a
                            href={url}
                            class="text-xs capitalize  text-primary my-[5px]"
                          >
                            {text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
                : (
                  <ul class="z-50 md:w-[504px] w-full max-md:min-h-[300px] absolute top-0 right-0 bg-white py-[32px] px-10 box-border">
                    {searches.map(({ term }, index) => (
                      <>
                        {index < 2 && (
                          <li class="font-medium text-sm leading-4 capitalize text-[#2e2e2eb3] mb-[10px] hidden">
                            <a href={`/s?q=${term}`}>{term}</a>
                          </li>
                        )}
                      </>
                    ))}
                    <span class=" font-bold uppercas w-[80%] text-left border-b-2 border-solid border-black max-md:hidden box-border text-primary leading-[18px]  flex pt-4 pb-5">
                      Nossas sugestões
                    </span>
                    {products.map((
                      { image, isVariantOf, offers, url },
                      index,
                    ) => {
                      const { has_discount, listPrice, price } = useOffer(
                        offers,
                      );

                      return (
                        <>
                          {index < 2 && (
                            <li class="inline-block float-left w-1/2 px-2">
                              <a
                                class="text-[10px] leading-none text-center text-black"
                                href={url}
                              >
                                <Image
                                  src={image![0].url! || ""}
                                  width={240}
                                  height={240}
                                  class="w-4/5 h-auto block mb-4 p-2 mx-auto"
                                />

                                {isVariantOf!.name}

                                {has_discount && (
                                  <span class="table max-md:hidden relative top-3 w-full text-[13px] font-bold text-[#5e5e5e] leading-[14px] uppercase text-center mt-[10px]">
                                    De: {formatPrice(
                                      listPrice,
                                      offers?.priceCurrency,
                                    )}
                                  </span>
                                )}

                                <span class="table max-md:hidden relative top-3 w-full text-[13px] font-bold text-[#5e5e5e] leading-[14px] uppercase text-center mt-[10px]">
                                  Por:{" "}
                                  {formatPrice(price, offers?.priceCurrency)}
                                </span>
                              </a>
                            </li>
                          )}
                        </>
                      );
                    })}
                  </ul>
                )}
            </>
          )}
      </section>
    </div>
  );
}

export default Searchbar;
