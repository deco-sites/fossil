
export interface Button {
    name: string;
    url: string;
}

export interface Props {
    title: string;
    button: Button;
}

export default function PromotionalBanner({ 
    title = "Confiro os últimos lançamentos", 
    button 
    }: Props) {
    return (
        <div class="w-full flex items-center justify-center bg-[#E97E53] mt-8">
            <div class="w-full flex items-center justify-between py-8 lg:px-20">
                <span></span>
                <h2 class="uppercase font-bold text-primary lg:text-4xl">{title}</h2>
                <a href={button.url} class="underline uppercase text-base font-bold">{button.name}</a>
            </div>
        </div>
    )
}
