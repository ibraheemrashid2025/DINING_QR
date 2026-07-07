export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(value);
}

export function createSlug(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, '-');
}
