# Delta Force 전적 조회 최소 버전

전적 조회 기능만 남긴 Next.js 확인용 프로젝트입니다.

## 실행 방법

1. 의존성 설치

```bash
npm install
```

2. 환경변수 파일 생성

`.env.local.example`을 복사해서 `.env.local` 파일을 만들고 실제 API 값을 넣습니다.

```bash
cp .env.local.example .env.local
```

3. 개발 서버 실행

```bash
npm run dev
```

4. 브라우저에서 확인

```text
http://localhost:3000
```

## 남겨둔 기능
- 홈에서 플레이어 ID 입력
- 서버에서 API 호출
- 요약 통계 표시
- 최근 경기 표시

## 제거한 기능
- 오퍼레이터
- 무기
- 맵
- 메타
- 커뮤니티 빌드
