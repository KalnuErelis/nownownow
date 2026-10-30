export interface VatBreakdown {
  net: number;
  vat: number;
  gross: number;
  rate: number;
}

export function roundCents(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function addVat(net: number, rate: number): VatBreakdown {
  const vat = roundCents(net * rate);
  const gross = roundCents(net + vat);
  return { net: roundCents(net), vat, gross, rate };
}

export function extractVat(gross: number, rate: number): VatBreakdown {
  const net = roundCents(gross / (1 + rate));
  const vat = roundCents(gross - net);
  return { net, vat, gross: roundCents(gross), rate };
}

/** Lithuanian grouping, independent of the runtime ICU locale data. */
export function formatEur(value: number): string {
  const [whole, fraction] = roundCents(value).toFixed(2).split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
  return `${grouped},${fraction}\u00a0€`;
}
