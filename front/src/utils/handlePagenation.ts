export function handlePagenation<T>(
  datas: T[],
  currentPage: number,
  itemsPerPage: number,
): T[] {
  const page = Math.max(1, currentPage);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsOnPage = datas.slice(startIndex, endIndex);

  return itemsOnPage;
}
