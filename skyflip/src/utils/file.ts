export default function formatNumber(number: number) {
  if (number == null) return "N/A";

  const abs = Math.abs(number);
  const sign = number < 0 ? "-" : "";

  if (abs < 1e1) return sign + abs.toFixed(3);
  if (abs < 1e2) return sign + abs.toFixed(2);
  if (abs < 1e3) return sign + abs.toFixed(1);

  return sign + abs.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}