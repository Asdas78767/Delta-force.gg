# Delta Force 전적 조회 사이트

UUID 기반 비콘 에어리어 전적 조회용 최소 Next.js 프로젝트입니다.

## 환경변수

`.env.local` 파일을 만들고 아래처럼 입력하세요.

```env
DELTA_FORCE_API_URL=https://api.deltaforceapi.com
DELTA_FORCE_API_KEY=YOUR_API_KEY_HERE
```

## 실행

```bash
npm install
npm run dev
```

## 배포

Vercel에 그대로 올리면 됩니다.

- Build Command: 기본값
- Output Directory: 비워둠
- Install Command: 기본값
- Environment Variables:
  - DELTA_FORCE_API_URL=https://api.deltaforceapi.com
  - DELTA_FORCE_API_KEY=실제키

## 중요

이 엔드포인트는 닉네임이나 일반 UID가 아니라 UUID 형식의 `playerId`를 요구합니다.
