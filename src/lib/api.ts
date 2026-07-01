const COINGECKO_BASE = "https://api.coingecko.com/api/v3";

export interface CoinPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  image: string;
  sparkline_in_7d?: { price: number[] };
}

export interface GlobalData {
  data: {
    total_market_cap: { usd: number };
    total_volume: { usd: number };
    market_cap_percentage: { btc: number; eth: number };
    active_cryptocurrencies: number;
  };
}

// Fetch top coins with market data
export async function getTopCoins(limit = 20): Promise<CoinPrice[]> {
  const res = await fetch(
    `${COINGECKO_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=24h`,
    { next: { revalidate: 60 } } // Cache for 60 seconds
  );
  if (!res.ok) throw new Error("Failed to fetch coin data");
  return res.json();
}

// Fetch specific coins by ID
export async function getCoinsByIds(ids: string[]): Promise<CoinPrice[]> {
  const res = await fetch(
    `${COINGECKO_BASE}/coins/markets?vs_currency=usd&ids=${ids.join(",")}&sparkline=true&price_change_percentage=24h`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error("Failed to fetch coin data");
  return res.json();
}

// Fetch global market data
export async function getGlobalData(): Promise<GlobalData> {
  const res = await fetch(`${COINGECKO_BASE}/global`, {
    next: { revalidate: 300 }, // Cache for 5 minutes
  });
  if (!res.ok) throw new Error("Failed to fetch global data");
  return res.json();
}

// Fetch historical chart data for a coin
export async function getCoinHistory(
  coinId: string,
  days: number = 30
): Promise<{ prices: [number, number][] }> {
  const res = await fetch(
    `${COINGECKO_BASE}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,
    { next: { revalidate: 300 } }
  );
  if (!res.ok) throw new Error("Failed to fetch history");
  return res.json();
}

// Format large numbers
export function formatCurrency(value: number): string {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
  return `$${value.toFixed(2)}`;
}

export function formatPrice(price: number): string {
  if (price >= 1) return `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return `$${price.toFixed(6)}`;
}
