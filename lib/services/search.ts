export function searchProducts(query: string) {
  return `/search?q=${encodeURIComponent(query)}`;
}
