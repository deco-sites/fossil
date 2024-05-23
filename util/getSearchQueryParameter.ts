export const GetSearchQueryParameter = (search: string) => {
  const match = search.match(/q=([^&]*)/);
  return match ? match[1] : "";
};
