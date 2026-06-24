export function formatDate(isoString: string): string {
  const date = new Date(isoString);

  if (Number.isNaN(date.valueOf())) {
    throw new Error(`Invalid ISO date: ${isoString}`);
  }

  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
}