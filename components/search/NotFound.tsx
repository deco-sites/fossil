import Image from "apps/website/components/Image.tsx";
import { asset } from "$fresh/runtime.ts";

export default function NotFound() {
  return (
    <div class="w-full bg-[#e9e6e1] pt-[72px] pb-14  lg:pt-20 lg:pb-10 mb-[72px]">
      <div class="flex flex-col lg:flex-row w-[320px] lg:max-w-[892px] m-auto lg:w-full justify-center items-center">
        <div class=" w-full lg:w-1/2">
          <h1 class="block leading-none font-scoutCond m-0 text-[83px] lg:text-[161px] font-bold tracking-[6px] text-center  text-primary-content">
            OOPS!
          </h1>
          <p class="font-arial font-base leading-5 m-0 text-center text-primary tracking-one">
            Não encontramso nenhum resultado para o termo buscado
          </p>
          <a
            href="/"
            arial-label="link para home"
            class=" table !rounded-none w-[155px] h-9 m-auto mt-10 bg-[#000911] text-center  hover:brightness-90"
          >
            <span class="uppercase text-base text-white font-semibold font-scoutCond font-base lg:font-normal leading-[36px] tracking-one ">
              Voltar para a home
            </span>
          </a>
        </div>
        <div class=" hidden lg:w-1/2 lg:flex justify-center">
          <Image
            src={`https://fossil.vteximg.com.br/arquivos/fossil-empty-search.png?v=636957933129730000`}
            width={332}
            height={420}
            loading={`eager`}
            fetchPriority="high"
          />
        </div>
      </div>
    </div>
  );
}
