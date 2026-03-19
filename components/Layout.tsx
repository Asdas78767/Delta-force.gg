import Head from 'next/head';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Delta Force 전적 조회</title>
        <meta
          name="description"
          content="플레이어 ID로 Delta Force 전적을 조회하는 확인용 사이트"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="app-shell">
        <header className="topbar">
          <div className="topbar-inner">
            <div>
              <p className="eyebrow">CHECK BUILD</p>
              <h1 className="brand">Delta Force 전적 조회</h1>
            </div>
          </div>
        </header>
        <main className="page-container">{children}</main>
      </div>
    </>
  );
}
