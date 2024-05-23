export const getSearchTerm = (search: string) => {
  const nameMatch = search.match(/q=([^&+]*)/);
  if (nameMatch) {
    const decodedValue = decodeURIComponent(nameMatch[1]);
    return decodedValue.split(" ")[0];
  }
  return "";
};
