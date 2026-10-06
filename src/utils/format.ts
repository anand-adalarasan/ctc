// Zero-padded, one-based step label for numbered rows: 0 → "01".
export function formatStep(index: number) {
  return String(index + 1).padStart(2, "0");
}
