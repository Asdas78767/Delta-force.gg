import type { GetServerSideProps } from 'next';
import Link from 'next/link';
import { getPlayerOperationStats } from '../../lib/deltaForce';

interface RecentMatch {
  id?: string;
  date?: string;
  mode?: string;
  kills?: number;
  deaths?: number;
  result?: string;
}

interface PlayerPageProps {
  id: string;
  stats: Record<string, unknown> | null;
  recentMatches: RecentMatch[];
  errorMessage: string | null;
}

function formatPercent(value: unknown): string {
  if (typeof value !== 'number') {
    return '-';
  }
  return `${value}%`;
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined || value === '') {
    return '-';
  }
  return String(value);
}

export default function PlayerPage({ id, stats, recentMatches, errorMessage }: PlayerPageProps) {
  return (
    <div className="content-stack fade-in">
      <div className="back-row">
        <Link href="/" className="button button-secondary">
          검색으로 돌아가기
        </Link>
      </div>

      <section className="panel-card">
        <div className="panel-header">
          <div>
            <p className="eyebrow">PLAYER</p>
            <h2 className="section-title">플레이어 전적</h2>
            <p className="section-subtitle">플레이어 ID: {id}</p>
          </div>
        </div>

        {errorMessage ? (
          <div className="notice-error">{errorMessage}</div>
        ) : null}

        <div className="stats-grid">
          <article className="stat-tile">
            <span className="stat-label">킬</span>
            <strong className="stat-value">{formatValue(stats?.kills)}</strong>
          </article>
          <article className="stat-tile">
            <span className="stat-label">데스</span>
            <strong className="stat-value">{formatValue(stats?.deaths)}</strong>
          </article>
          <article className="stat-tile">
            <span className="stat-label">K/D</span>
            <strong className="stat-value">{formatValue(stats?.kdRatio)}</strong>
          </article>
          <article className="stat-tile">
            <span className="stat-label">추출 성공률</span>
            <strong className="stat-value">{formatPercent(stats?.extractionRate)}</strong>
          </article>
          <article className="stat-tile">
            <span className="stat-label">매치 수</span>
            <strong className="stat-value">{formatValue(stats?.matchesPlayed)}</strong>
          </article>
        </div>
      </section>

      <section className="panel-card">
        <div className="panel-header compact">
          <div>
            <p className="eyebrow">RECENT MATCHES</p>
            <h3 className="section-title small">최근 경기</h3>
          </div>
        </div>

        {recentMatches.length === 0 ? (
          <p className="empty-text">최근 경기 데이터가 없습니다.</p>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>날짜</th>
                  <th>모드</th>
                  <th>킬</th>
                  <th>데스</th>
                  <th>결과</th>
                </tr>
              </thead>
              <tbody>
                {recentMatches.map((match, index) => (
                  <tr key={match.id ?? `${match.date ?? 'match'}-${index}`}>
                    <td>{formatValue(match.date)}</td>
                    <td>{formatValue(match.mode)}</td>
                    <td>{formatValue(match.kills)}</td>
                    <td>{formatValue(match.deaths)}</td>
                    <td>{formatValue(match.result)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<PlayerPageProps> = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const data = await getPlayerOperationStats({ playerId: id });
    const stats = data?.result?.stats ?? null;
    const recentMatches = Array.isArray(data?.result?.recentMatches)
      ? data.result.recentMatches
      : [];

    return {
      props: {
        id,
        stats,
        recentMatches,
        errorMessage: null,
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';

    return {
      props: {
        id,
        stats: null,
        recentMatches: [],
        errorMessage: `전적을 불러오지 못했습니다. ${message}`,
      },
    };
  }
};
