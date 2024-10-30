export function unixNanoToDate(unixNano: number) {
  const milliseconds = unixNano / 1_000_000;
  return new Date(milliseconds);
}
