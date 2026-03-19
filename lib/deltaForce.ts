export interface OperationStatsRequest {
  playerId: string;
  mode: 'beacon' | 'warfare';
}

export const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isValidUuid(value: string): boolean {
  return UUID_REGEX.test(value.trim());
}

export async function getPlayerOperationStats(args: OperationStatsRequest): Promise<any> {
  const apiUrl = process.env.DELTA_FORCE_API_URL;
  const apiKey = process.env.DELTA_FORCE_API_KEY;

  if (!apiUrl || !apiKey) {
    throw new Error('환경변수 누락: DELTA_FORCE_API_URL / DELTA_FORCE_API_KEY');
  }

  if (!isValidUuid(args.playerId)) {
    throw new Error('playerId는 UUID 형식이어야 합니다.');
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
      ranked: args.mode === 'warfare',
      seasonId: null,
    }),
    cache: 'no-store',
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText} ${text}`);
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error('API 응답 JSON 파싱 실패');
  }
}
