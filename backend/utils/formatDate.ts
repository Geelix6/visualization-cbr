export function formatDate(isoString: string) {
  // с компенсацией часового пояса
  const date = new Date(+new Date(isoString) + 4 * 60 * 60 * 1000);

  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}
