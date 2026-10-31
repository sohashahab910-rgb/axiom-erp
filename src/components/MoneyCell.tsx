type MoneyCellProps = {
  amount: string; // e.g. "1250.00", as sent by the backend
  currency: string; // e.g. "USD"
};

// Adds thousands separators without converting to a JavaScript number.
function groupThousands(value: string): string {
  const negative = value.startsWith("-");
  const unsigned = negative ? value.slice(1) : value;
  const [whole, fraction] = unsigned.split(".");

  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const result = fraction !== undefined ? `${grouped}.${fraction}` : grouped;

  return negative ? `-${result}` : result;
}

export function MoneyCell({ amount, currency }: MoneyCellProps) {
  return (
    <span style={{ fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
      {groupThousands(amount)} {currency}
    </span>
  );
}
