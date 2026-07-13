export type CurrencyType = "INR" | "USD";

const currencyLocales: Record<CurrencyType, string> = {
  INR: "en-IN",
  USD: "en-US",
};

const currencyOptions: Intl.NumberFormatOptions = {
  style: "currency",
};

export function formatCurrency(value: number, currencyType: CurrencyType): string {
  if (value < 0) {
    throw new Error("Negative values are not allowed");
  }

  if (!(currencyType in currencyLocales)) {
    throw new Error("Unsupported currency type");
  }

  return new Intl.NumberFormat(currencyLocales[currencyType], {
    ...currencyOptions,
    currency: currencyType,
  }).format(value);
}
