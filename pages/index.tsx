import { useRouter } from 'next/router';
import type { FormEvent } from 'react';
import { useMemo, useState } from 'react';

function normalizePlayerId(value: string): string {
  return value.trim();
}

export default function Home() {
  const router = useRouter();
  const [playerId, setPlayerId] = useState('');
  const normalizedPlayerId = useMemo(() => normalizePlayerId(playerId), [playerId]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!normalizedPlayerId) {
      return;
    }
    router.push(`/player/${encodeURIComponent(normalizedPlayerId)}`);
  };

  return (
    <section className="hero-card fade-in">
      <div className="hero-copy">
        <p className="eyebrow">ONLY STATS</p>
        <h2 className="hero-title">플레이어 전적만 바로 확인하는 최소 버전</h2>
        <p className="hero-description">
          오퍼레이터, 무기, 맵, 커뮤니티 기능은 모두 제거하고 전적 조회만 남긴 확인용 사이트입니다.
          플레이어 ID를 입력하면 서버에서 API를 호출해 통계와 최근 경기를 불러옵니다.
        </p>
      </div>

      <form className="search-card" onSubmit={handleSubmit}>
        <label className="field-label" htmlFor="player-id">
          플레이어 ID
        </label>
        <input
          id="player-id"
          name="playerId"
          type="text"
          className="input"
          placeholder="예: 1234567890 또는 UUID"
          autoComplete="off"
          value={playerId}
          onChange={(event) => setPlayerId(event.target.value)}
        />
        <button type="submit" className="button" disabled={!normalizedPlayerId}>
          전적 조회
        </button>
        <p className="helper-text">
          `.env.local`에 API 설정을 넣은 뒤 실행하면 바로 확인할 수 있습니다.
        </p>
      </form>
    </section>
  );
}
