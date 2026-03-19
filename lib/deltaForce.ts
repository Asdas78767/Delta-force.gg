export interface OperationStatsRequest {
  playerId: string;
  ranked?: boolean;
  seasonId?: string | null;
}

/**
 * Fetches Delta Force operation stats for the given player.
 *
 * This function calls the Delta Force community API using the base URL and API key
 * defined in environment variables. See .env.local.example for the required
 * configuration.
 *
 * @param args Object containing the playerId and optional ranked/seasonId filters.
 * @returns A promise that resolves with the parsed JSON response from the API.
 */
export async function getPlayerOperationStats(
  args: OperationStatsRequest,
): Promise<any> {
  const apiUrl = process.env.DELTA_FORCE_API_URL;
  const apiKey = process.env.DELTA_FORCE_API_KEY;
  if (!apiUrl || !apiKey) {
    throw new Error('Missing API configuration');
  }
  const endpoint = `${apiUrl}/deltaforceapi.gateway.v1.ApiService/GetPlayerOperationStats`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Connect-Protocol-Version': '1',
      'Api-Key': apiKey,
    },
    body: JSON.stringify({
      playerId: args.playerId,
      ranked: args.ranked ?? false,
      seasonId: args.seasonId ?? null,
    }),
  });
  if (!res.ok) {
    const errorText = await res.text().catch(() => '');
    throw new Error(
      `API error ${res.status}: ${res.statusText} ${errorText}`,
    );
  }
  return res.json();
}