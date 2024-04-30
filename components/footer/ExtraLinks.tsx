export type Item = {
  label: string;
  href: string;
};

export type Props  = {
   content?:Item[]
   copyright?: string; 
}

export default function ExtraLinks({ content, copyright }: Props) {
  return (
    <>
      {content && content?.length > 0 && (
        <div class="flex flex-wrap lg:flex-row  justify-evenly items-center lg:justify-around  py-3 px-4 lg:px-20 gap-5 lg:gap-10 w-full text-[#727272]">
           <p class="text-[12px]">{copyright}</p>
          {content.map((item) => (
            <a class="text-base uppercase" href={item.href}>{item.label}</a>
          ))}
        </div>
      )}
    </>
  );
}
