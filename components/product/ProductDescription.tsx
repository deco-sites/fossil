interface PropertyValue {
  "@type": string;
  name?: string;
  value?: string;
  valueReference?: string;
}

export interface Props {
  additionalProperty?: PropertyValue[];
  description?: string;
}

const ProductDescription = (
  { additionalProperty, description, device }: Props & { device?: string },
) => {
  if (!additionalProperty || !description) return null;

  const filtersCharacteristics = [
    "Gênero",
    "Sobre o Mecanismo",
    "Resistência à Água",
  ];
  const techSpecsFilters = [
    "Largura da Caixa (cm)",
    "Formato da Caixa",
    "Espessura da Caixa (cm)",
    "Material da Caixa",
    "Cor do Mostrador",
    "Tipo de Fecho",
    "Cor da Pulseira",
    "Largura da Pulseira",
    "Material da Pulseira",
    "Coleção",
    "Garantia",
    "Origem",
    "Linha",
    "Dicas de Uso",
    "Cor da Caixa",
    "Peso do Relógio (g)",
    "Conteúdo da embalagem",
  ];

  const characteristicsProduct = additionalProperty.filter(
    (item) => item && item.name && filtersCharacteristics.includes(item.name),
  );

  const technicalSpecificationsProduct = additionalProperty.filter(
    (item) => item && item.name && techSpecsFilters.includes(item.name),
  );

  return (
    <div className="bg-[#eee] p-8 flex flex-col gap-20 lg:px-8 lg:pt-12 lg:pb-12">
      {device !== "desktop"
        ? (
          <>
            <div className="collapse collapse-plus">
              <h2 className=" collapse collapse-plus collapse-title font-scoutCond  text-32 font-medium tracking-one text-primary pb-2 border-primary border-solid border-b uppercase">
                Descrição
              </h2>
              <p className="mt-4 font-arial collapse-content text-xs  leading-4 font-medium text-gray61">
                {description}
              </p>
            </div>
            <div className="">
              <h2 className="font-scoutCond  text-32 font-medium tracking-one text-primary pb-2 border-primary border-solid border-b uppercase">
                Características
              </h2>
              <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {characteristicsProduct?.map((item, index) => (
                  <li key={index} className="flex flex-col gap-1">
                    <span className="font-arial text-xs leading-4 font-bold text-gray61">
                      {item.name}
                    </span>
                    <span className="font-arial text-xs leading-4 font-medium text-gray61">
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-scoutCond  text-32 font-medium tracking-one text-primary pb-2 border-primary border-solid border-b uppercase">
                Especificações Técnicas
              </h2>
              <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {technicalSpecificationsProduct.map((item, index) => (
                  <li key={index}>
                    <span className="block font-scoutCond font-semibold uppercase tracking-one text-primary">
                      {item.name}
                    </span>
                    <span className="font-arial text-xs leading-4 font-medium text-gray61">
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )
        : (
          <>
            <div className="">
              <h2 className=" font-scoutCond  text-32 font-medium tracking-one text-primary pb-2 border-primary border-solid border-b uppercase">
                Descrição
              </h2>
              <p className="mt-4 font-arial text-xs  leading-4 font-medium text-gray61">
                {description}
              </p>
            </div>
            <div className="">
              <h2 className="font-scoutCond  text-32 font-medium tracking-one text-primary pb-2 border-primary border-solid border-b uppercase">
                Características
              </h2>
              <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {characteristicsProduct?.map((item, index) => (
                  <li key={index} className="flex flex-col gap-1">
                    <span className="font-arial text-xs leading-4 font-bold text-gray61">
                      {item.name}
                    </span>
                    <span className="font-arial text-xs leading-4 font-medium text-gray61">
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-scoutCond  text-32 font-medium tracking-one text-primary pb-2 border-primary border-solid border-b uppercase">
                Especificações Técnicas
              </h2>
              <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {technicalSpecificationsProduct.map((item, index) => (
                  <li key={index}>
                    <span className="block font-scoutCond font-semibold uppercase tracking-one text-primary">
                      {item.name}
                    </span>
                    <span className="font-arial text-xs leading-4 font-medium text-gray61">
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
    </div>
  );
};

export default ProductDescription;
