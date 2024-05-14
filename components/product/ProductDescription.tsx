import { ProductDetailsPage } from "apps/commerce/types.ts";

export interface Props {
  page: ProductDetailsPage | null;
}

const ProductDescription = ({ page }: Props) => {
  if (page === null) return null;

  const { product } = page;

  const {
    productID,
    offers,
    name = "",
    gtin,
    isVariantOf,
  } = product;

  const description = product.description || isVariantOf?.description;

  console.log(product);

  return (
    <div className="bg-gray-100 p-8 flex flex-col gap-20">
      <div className="mb-8">
        <h2 className=" font-scoutCond  text-32 font-medium tracking-one text-primary pb-2 border-primary border-solid border-b uppercase">
          Descrição
        </h2>
        <p className="mt-4 font-arial text-xs  leading-4 font-medium text-gray61">
          {description}
        </p>
      </div>
      <div className="mb-8">
        <h2 className="font-scoutCond  text-32 font-medium tracking-one text-primary pb-2 border-primary border-solid border-b uppercase">
          Características
        </h2>
        <div className="mt-4 flex flex-col">
          <span className="font-arial text-xs  leading-4 font-bold text-gray61">
            Gênero
          </span>
          <span className="font-arial text-xs  leading-4 font-medium text-gray61">
            Masculino
          </span>
        </div>
      </div>
      <div>
        <h2 className="font-scoutCond  text-32 font-medium tracking-one text-primary pb-2 border-primary border-solid border-b uppercase">
          Especificações Técnicas
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div>
            <span className="block font-scoutCond font-semibold uppercase tracking-one text-primary">
              Formato da Caixa
            </span>
            <span className="mt-4 font-arial text-base  leading-4 font-medium text-gray61">
              Quadrado
            </span>
          </div>
          <div>
            <span className="block font-scoutCond font-semibold uppercase tracking-one text-primary">
              Cor do Mostrador
            </span>
            <span className="mt-4 font-arial text-base  leading-4 font-medium text-gray61">
              Branco
            </span>
          </div>
          <div>
            <span className="block font-scoutCond font-semibold uppercase tracking-one text-primary">
              Tipo de Fecho
            </span>
            <span className="mt-4 font-arial text-base  leading-4 font-medium text-gray61">
              Fivela
            </span>
          </div>
          <div>
            <span className="block font-scoutCond font-semibold uppercase tracking-one text-primary">
              Cor da Pulseira
            </span>
            <span className="mt-4 font-arial text-base  leading-4 font-medium text-gray61">
              Marrom
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
