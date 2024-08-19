export default function formatCoins(coins: number): string {
  return coins.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}