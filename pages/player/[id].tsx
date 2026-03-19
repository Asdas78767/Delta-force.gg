import type { GetServerSideProps } from 'next';
import Link from 'next/link';
import { getPlayerOperationStats, isValidUuid } from '../../lib/deltaForce';

type Mode = 'beacon' | 'warfare';

interface PageProps {
  playerId: string;
  mode: Mode;
  error: string | null;
  raw: any | null;
}

function getByPath(obj: any, path: string) {
  return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

function pick(obj: any, paths: string[], fallback: any = '-') {
  for (const path of paths) {
    const value = getByPath(obj, path);
    if (value !== undefined && value !== null && value !== '') return value;
  }
  return fallback;
}

function findList(obj: any): any[] {
  const candidates = [
    'result.recentMatches',
    'result.records',
    'result.matches',
    'result.history',
    'recentMatches',
    'records',
    'matches',
    'history',
    'result.list',
    'list'
  ];

  for (const key of candidates) {
    const value = getByPath(obj, key);
    if (Array.isArray(value)) return value;
  }

  const queue: any[] = [obj];
  while (queue.length > 0) {
    const current = queue.shift();
    if (Array.isArray(current) && current.every((v) => typeof v === 'object')) return current;
    if (current && typeof current === 'object') {
      for (const value of Object.values(current)) {
        if (value && typeof value === 'object') queue.push(value);
      }
    }
  }
  return [];
}

function normalizeBeacon(item: any, index: number) {
  return {
    id: String(pick(item, ['id', 'recordId', 'matchId', 'battleId'], index)),
    result: pick(item, ['resultText', 'status', 'title', 'summary'], '기록'),
    time: pick(item, ['date', 'createdAt', 'matchTime', 'time'], '-'),
    extractValue: pick(item, ['extractValue', 'value', 'score', 'points'], 0),
    operatorKills: pick(item, ['operatorKills', 'kills', 'kill'], 0),
    otherKills: pick(item, ['otherKills', 'npcKills', 'aiKills'], 0),
    revive: pick(item, ['revive', 'rescues', 'rescue'], 0),
    survival: pick(item, ['survivalTime', 'aliveTime', 'duration'], '-'),
    achievements: pick(item, ['achievements', 'badges'], []),
  };
}

function normalizeWarfare(item: any, index: number) {
  const kills = pick(item, ['kills', 'kill'], 0);
  const deaths = pick(item, ['deaths', 'death'], 0);
  const assists = pick(item, ['assists', 'assist'], 0);

  return {
    id: String(pick(item, ['id', 'recordId', 'matchId', 'battleId'], index)),
    result: pick(item, ['resultText', 'status', 'title', 'summary'], '기록'),
    time: pick(item, ['date', 'createdAt', 'matchTime', 'time'], '-'),
    score: pick(item, ['score', 'points'], 0),
    kda: `${kills}/${deaths}/${assists}`,
    capture: pick(item, ['capture', 'captures', 'objective'], '-'),
    battleTime: pick(item, ['battleTime', 'duration', 'aliveTime'], '-'),
    achievements: pick(item, ['achievements', 'badges'], []),
    rank: pick(item, ['rankText', 'rankName', 'rank'], '-'),
  };
}

export default function PlayerPage({ playerId, mode, error, raw }: PageProps) {
  const list = raw ? findList(raw) : [];
  const rows = mode === 'beacon'
    ? list.slice(0, 20).map(normalizeBeacon)
    : list.slice(0, 20).map(normalizeWarfare);

  const summary = {
    kills: pick(raw, ['result.stats.kills', 'result.summary.kills', 'kills']),
    deaths: pick(raw, ['result.stats.deaths', 'result.summary.deaths', 'deaths']),
    kd: pick(raw, ['result.stats.kdRatio', 'result.summary.kdRatio', 'kdRatio']),
    extraction: pick(raw, ['result.stats.extractionRate', 'result.summary.extractionRate', 'extractionRate']),
    matches: pick(raw, ['result.stats.matchesPlayed', 'result.summary.matchesPlayed', 'matchesPlayed']),
  };

  return (
    <main className="page">
      <div className="shell">
        <div className="topBack">
          <Link href="/">← 검색으로 돌아가기</Link>
        </div>

        <section className="panel headerPanel">
          <div>
            <div className="eyebrow">CHARACTER INFO</div>
            <h1 className="pageTitle">역대 전적</h1>
            <div className="uuid">UUID: {playerId}</div>
          </div>

          <div className="tabs">
            <Link href={`/player/${encodeURIComponent(playerId)}?mode=beacon`} className={mode === 'beacon' ? 'tab active' : 'tab'}>
              비콘 에어리어
            </Link>
            <Link href={`/player/${encodeURIComponent(playerId)}?mode=warfare`} className={mode === 'warfare' ? 'tab active' : 'tab'}>
              전면전
            </Link>
          </div>
        </section>

        {error ? (
          <section className="panel errorPanel">
            <h2>전적을 불러오지 못했습니다.</h2>
            <p>{error}</p>
          </section>
        ) : (
          <>
            <section className="summaryGrid">
              <div className="panel statCard"><span>킬</span><strong>{String(summary.kills)}</strong></div>
              <div className="panel statCard"><span>데스</span><strong>{String(summary.deaths)}</strong></div>
              <div className="panel statCard"><span>K/D</span><strong>{String(summary.kd)}</strong></div>
              <div className="panel statCard"><span>추출 성공률</span><strong>{summary.extraction === '-' ? '-' : `${summary.extraction}%`}</strong></div>
              <div className="panel statCard"><span>매치 수</span><strong>{String(summary.matches)}</strong></div>
            </section>

            <section className="panel tablePanel">
              <div className="tableTitle">{mode === 'beacon' ? '비콘 에어리어 전적' : '전면전 전적'}</div>

              {rows.length === 0 ? (
                <div className="empty">매치 목록을 찾지 못했습니다. 아래 원본 JSON을 확인하세요.</div>
              ) : (
                <div className="tableWrap">
                  {mode === 'beacon' ? (
                    <table className="statsTable">
                      <thead>
                        <tr>
                          <th>결과</th>
                          <th>시간</th>
                          <th>반출 가치</th>
                          <th>오퍼레이터 처치</th>
                          <th>기타 적</th>
                          <th>구조/부활</th>
                          <th>생존 시간</th>
                          <th>업적</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row: any) => (
                          <tr key={row.id}>
                            <td>{row.result}</td>
                            <td>{row.time}</td>
                            <td>{String(row.extractValue)}</td>
                            <td>{String(row.operatorKills)}</td>
                            <td>{String(row.otherKills)}</td>
                            <td>{String(row.revive)}</td>
                            <td>{String(row.survival)}</td>
                            <td>{Array.isArray(row.achievements) ? row.achievements.length : String(row.achievements)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <table className="statsTable">
                      <thead>
                        <tr>
                          <th>결과</th>
                          <th>시간</th>
                          <th>점수</th>
                          <th>K/D/A</th>
                          <th>구조/점령</th>
                          <th>전투 시간</th>
                          <th>업적</th>
                          <th>랭크</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row: any) => (
                          <tr key={row.id}>
                            <td>{row.result}</td>
                            <td>{row.time}</td>
                            <td>{String(row.score)}</td>
                            <td>{row.kda}</td>
                            <td>{String(row.capture)}</td>
                            <td>{String(row.battleTime)}</td>
                            <td>{Array.isArray(row.achievements) ? row.achievements.length : String(row.achievements)}</td>
                            <td>{row.rank}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </section>

            <details className="panel rawPanel">
              <summary>원본 JSON 보기</summary>
              <pre>{JSON.stringify(raw, null, 2)}</pre>
            </details>
          </>
        )}
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => {
  const playerId = String(ctx.params?.id ?? '').trim();
  const mode = ctx.query.mode === 'warfare' ? 'warfare' : 'beacon';

  if (!isValidUuid(playerId)) {
    return { props: { playerId, mode, error: '플레이어 ID는 UUID 형식이어야 합니다.', raw: null } };
  }

  try {
    const raw = await getPlayerOperationStats({ playerId, mode });
    return { props: { playerId, mode, error: null, raw } };
  } catch (error) {
    return {
      props: {
        playerId,
        mode,
        error: error instanceof Error ? error.message : '알 수 없는 오류',
        raw: null,
      },
    };
  }
};
