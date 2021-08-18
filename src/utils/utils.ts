export function getImageResource(url: string) {
  return require(`../../public/${url}`).default;
}
