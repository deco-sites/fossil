import Avatar from "../../components/ui/Avatar.tsx";
import { formatPrice } from "../../sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";
import Button from "../ui/Button.tsx";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

const hiddenFilters = [
  "Resistência à Água",
  "Material da Pulseira",
  "Marca",
  "Cor do Mostrador",
  "Cor da Pulseira",
  "Coleção",
  "Automático",
  "Subcategoria",
  "Departamento",
  "Categoria",
  "Preço",
  "Tamanho - xml",
  "Linha",
  "Gênero-xml",
].map((filter) => filter.toUpperCase());

const orderedFilters = [
  "off",
  "Cor",
  "Tamanho",
  "Coleção",
  "Gênero",
].map((filter) => filter.toUpperCase());

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2">
      <div aria-checked={selected} class="checkbox" />
      <span class="text-sm">{label}</span>
      {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <ul class={`flex flex-col gap-2 ${flexDirection}`}>
      {values.map((item) => {
        const { url, selected, value, quantity } = item;

        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
            />
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  const filteredAndSortedFilters = filters
    .filter(isToggle)
    .filter((filter) => !hiddenFilters.includes(filter.label.toUpperCase()))
    .sort((a, b) => {
      const indexA = orderedFilters.indexOf(a.label.toUpperCase());
      const indexB = orderedFilters.indexOf(b.label.toUpperCase());

      // Se um filtro não estiver na lista de ordenação, coloca-o no final
      const orderA = indexA !== -1 ? indexA : orderedFilters.length;
      const orderB = indexB !== -1 ? indexB : orderedFilters.length;

      return orderA - orderB;
    });

  return (
    <ul class="flex flex-col gap-6 p-4">
      {filteredAndSortedFilters.map((filter) => (
        <li class="flex flex-col gap-4" key={filter.label}>
          <span>{filter.label}</span>
          <FilterValues {...filter} />
        </li>
      ))}
    </ul>
  );
}

export default Filters;
