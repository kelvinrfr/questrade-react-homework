export interface Lottery {
  id: string;
  name: string;
  prize: string;
  type: string;
  status: 'running' | 'finished';
}

const API_URL = import.meta.env.VITE_API_URL;

// async because fetch() returns a Promise — we need to await the network response
export async function createLotteryAsync(name: string, prize: string) {
  // fetch() is the browser's built-in HTTP client
  // First arg: the URL to call
  // Second arg: options object (method, headers, body)
  const response = await fetch(`${API_URL}/lotteries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // Converts the JS object to a JSON string for the request body
    // type is hardcoded to 'simple' because the backend only accepts that value
    body: JSON.stringify({ type: 'simple', name, prize }),
  });

  // fetch() doesn't throw on HTTP errors (4xx, 5xx) — it only throws on network failures
  // So we manually check response.ok (true if status is 200-299)
  if (!response.ok) {
    // Parse the error body from the server (e.g. { error: 'Invalid lottery name' })
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create lottery');
  }

  return await response.json();
}

export async function fetchLotteriesAsync(): Promise<Lottery[]> {
  const response = await fetch(`${API_URL}/lotteries`);

  if (!response.ok) {
    throw new Error('Failed to fetch lotteries');
  }

  return await response.json();
}

export async function registerForLotteryAsync(lotteryId: string, name: string) {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lotteryId, name }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to register');
  }

  return await response.json();
}