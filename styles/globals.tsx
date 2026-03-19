:root {
  --bg: #0b1020;
  --bg-elevated: #121a30;
  --bg-elevated-2: #18223d;
  --line: rgba(255, 255, 255, 0.1);
  --text: #eef3ff;
  --muted: #9eb0d1;
  --accent: #66e3ff;
  --accent-strong: #3ec8ff;
  --error-bg: rgba(255, 93, 93, 0.12);
  --error-line: rgba(255, 93, 93, 0.28);
  --shadow: 0 20px 40px rgba(0, 0, 0, 0.28);
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  background:
    radial-gradient(circle at top, rgba(62, 200, 255, 0.16), transparent 28%),
    linear-gradient(180deg, #08101f 0%, #0b1020 100%);
  color: var(--text);
  font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input {
  font: inherit;
}

.app-shell {
  min-height: 100vh;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(18px);
  background: rgba(8, 12, 24, 0.72);
  border-bottom: 1px solid var(--line);
}

.topbar-inner,
.page-container {
  width: min(100%, 960px);
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

.topbar-inner {
  min-height: 72px;
  display: flex;
  align-items: center;
}

.page-container {
  padding-top: 36px;
  padding-bottom: 48px;
}

.eyebrow {
  margin: 0 0 6px;
  color: var(--accent);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.brand,
.hero-title,
.section-title {
  margin: 0;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.brand {
  font-size: 24px;
}

.hero-card,
.panel-card,
.search-card {
  border: 1px solid var(--line);
  background: linear-gradient(180deg, rgba(18, 26, 48, 0.94), rgba(13, 19, 35, 0.94));
  box-shadow: var(--shadow);
}

.hero-card {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 20px;
  padding: 28px;
  border-radius: 24px;
}

.hero-copy {
  padding: 8px 4px 8px 0;
}

.hero-title {
  font-size: clamp(32px, 4vw, 46px);
  line-height: 1.05;
  margin-bottom: 14px;
}

.hero-description,
.section-subtitle,
.helper-text,
.empty-text {
  color: var(--muted);
}

.hero-description {
  max-width: 640px;
  margin: 0;
  line-height: 1.7;
}

.search-card {
  border-radius: 20px;
  padding: 20px;
  align-self: stretch;
}

.field-label {
  display: block;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 700;
}

.input,
.button {
  width: 100%;
  border-radius: 14px;
}

.input {
  height: 52px;
  padding: 0 16px;
  color: var(--text);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  outline: none;
  transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;
}

.input:focus {
  border-color: rgba(102, 227, 255, 0.8);
  box-shadow: 0 0 0 4px rgba(102, 227, 255, 0.14);
}

.button {
  height: 52px;
  border: none;
  cursor: pointer;
  color: #07111f;
  background: linear-gradient(135deg, var(--accent), var(--accent-strong));
  font-weight: 800;
  transition: transform 180ms ease, filter 180ms ease, box-shadow 180ms ease;
  box-shadow: 0 10px 24px rgba(62, 200, 255, 0.22);
}

.button:hover {
  transform: translateY(-1px);
  filter: brightness(1.03);
}

.button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
  box-shadow: none;
}

.button-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  min-width: 150px;
  padding: 0 18px;
  background: transparent;
  color: var(--text);
  border: 1px solid var(--line);
  box-shadow: none;
}

.button-secondary:hover {
  background: rgba(255, 255, 255, 0.04);
}

.helper-text {
  margin: 12px 0 0;
  font-size: 13px;
  line-height: 1.6;
}

.content-stack {
  display: grid;
  gap: 16px;
}

.back-row {
  display: flex;
  justify-content: flex-start;
}

.panel-card {
  padding: 20px;
  border-radius: 22px;
}

.panel-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 18px;
}

.panel-header.compact {
  margin-bottom: 12px;
}

.section-title {
  font-size: 28px;
}

.section-title.small {
  font-size: 22px;
}

.section-subtitle {
  margin: 8px 0 0;
}

.notice-error {
  margin-bottom: 18px;
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid var(--error-line);
  background: var(--error-bg);
  color: #ffd6d6;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
}

.stat-tile {
  padding: 16px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0.02));
}

.stat-label {
  display: block;
  margin-bottom: 8px;
  font-size: 13px;
  color: var(--muted);
}

.stat-value {
  font-size: 28px;
  line-height: 1;
}

.table-wrap {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 14px 12px;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.table th {
  color: var(--muted);
  font-size: 13px;
  font-weight: 700;
}

.fade-in {
  animation: fadeIn 260ms ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 900px) {
  .hero-card {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .page-container,
  .topbar-inner {
    padding-left: 16px;
    padding-right: 16px;
  }

  .hero-card,
  .panel-card,
  .search-card {
    border-radius: 18px;
  }

  .hero-card {
    padding: 18px;
  }

  .section-title {
    font-size: 24px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .stat-value {
    font-size: 24px;
  }
  }
