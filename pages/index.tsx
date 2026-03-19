import Head from 'next/head';
import { useRouter } from 'next/router';
import { FormEvent, useMemo, useState } from 'react';
import { isValidUuid } from '../lib/deltaForce';

export default function HomePage() {
  const router = useRouter();
  const [playerId, setPlayerId] = useState('');
  const [error, setError] = useState('');

  const trimmed = useMemo(() => playerId.trim(), [playerId]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!trimmed) {
      setError('플레이어 UUID를 입력하세요.');
      return;
    }

    if (!isValidUuid(trimmed)) {
      setError('올바른 UUID 형식이 아닙니다. 예: 123e4567-e89b-12d3-a456-426614174000');
      return;
    }

    setError('');
    router.push(`/player/${encodeURIComponent(trimmed)}`);
  };

  return (
    <>
      <Head>
        <title>Delta Force 전적 조회</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="page-shell">
        <section className="hero-panel">
          <div className="hero-overlay" />
          <div className="hero-grid" />
          <div className="hero-content">
            <p className="eyebrow">DELTA FORCE STATS</p>
            <h1 className="hero-title">전적 조회</h1>
            <p className="hero-description">
              UUID 기반으로 비콘 에어리어 전적을 조회합니다. 현재 엔드포인트는 닉네임이나 일반 UID가 아니라
              UUID만 받습니다.
            </p>

            <form className="search-panel" onSubmit={handleSubmit}>
              <label className="field-label" htmlFor="playerId">
                플레이어 UUID
              </label>
              <input
                id="playerId"
                className="field-input"
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
                placeholder="예: 123e4567-e89b-12d3-a456-426614174000"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
              />
              {error ? <p className="field-error">{error}</p> : null}
              <button className="primary-button" type="submit">
                전적 조회
              </button>
            </form>

            <div className="info-strip">
              <span>API URL</span>
              <code>https://api.deltaforceapi.com</code>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
