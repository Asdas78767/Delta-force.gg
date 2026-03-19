import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { UUID_REGEX } from '../lib/deltaForce';

export default function HomePage() {
  const [playerId, setPlayerId] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = playerId.trim();

    if (!value) {
      setError('플레이어 UUID를 입력하세요.');
      return;
    }

    if (!UUID_REGEX.test(value)) {
      setError('UUID 형식이 아닙니다. 예: 123e4567-e89b-12d3-a456-426614174000');
      return;
    }

    setError('');
    router.push(`/player/${encodeURIComponent(value)}?mode=beacon`);
  };

  return (
    <main className="page">
      <section className="hero shell">
        <div className="eyebrow">DELTA FORCE STATS</div>
        <h1 className="heroTitle">전적 조회</h1>
        <p className="heroDesc">
          비콘 에어리어와 전면전 전적을 분리해서 확인하는 버전입니다.
          현재는 UUID 기반 조회만 지원합니다.
        </p>

        <form className="searchBox" onSubmit={submit}>
          <label htmlFor="playerId" className="label">플레이어 UUID</label>
          <div className="row">
            <input
              id="playerId"
              className="input"
              type="text"
              value={playerId}
              onChange={(e) => setPlayerId(e.target.value)}
              placeholder="예: 123e4567-e89b-12d3-a456-426614174000"
            />
            <button className="button" type="submit">조회</button>
          </div>
          {error ? <p className="error">{error}</p> : <p className="hint">닉네임이 아니라 UUID만 지원합니다.</p>}
        </form>
      </section>
    </main>
  );
}
