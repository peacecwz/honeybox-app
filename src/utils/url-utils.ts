export function getFilename(url: string) {
  return url.split('/').pop();
}
