import { useMemo, useState } from "react";
import "./App.css";

// ---------- 定数 ----------
const THEME_LIGHT = "light";
const THEME_DARK = "dark";

const DATASETS = {
  stock: {
    label: "月次株価終値 (USD)",
    unit: "USD",
    note: "NYSE: KD　※サンプル用の近似データ",
    data: [
      { x: "25/05", y: 32.1 },
      { x: "25/06", y: 34.4 },
      { x: "25/07", y: 36.0 },
      { x: "25/08", y: 35.2 },
      { x: "25/09", y: 37.8 },
      { x: "25/10", y: 39.6 },
      { x: "25/11", y: 41.5 },
      { x: "25/12", y: 40.9 },
      { x: "26/01", y: 42.7 },
      { x: "26/02", y: 44.1 },
      { x: "26/03", y: 42.5 },
      { x: "26/04", y: 45.3 },
    ],
  },
  revenue: {
    label: "四半期売上高 (10億USD)",
    unit: "B USD",
    note: "直近12四半期　※サンプル用の近似データ",
    data: [
      { x: "FY23 Q1", y: 4.34 },
      { x: "FY23 Q2", y: 4.21 },
      { x: "FY23 Q3", y: 4.34 },
      { x: "FY23 Q4", y: 4.10 },
      { x: "FY24 Q1", y: 4.04 },
      { x: "FY24 Q2", y: 3.95 },
      { x: "FY24 Q3", y: 4.07 },
      { x: "FY24 Q4", y: 3.99 },
      { x: "FY25 Q1", y: 3.74 },
      { x: "FY25 Q2", y: 3.77 },
      { x: "FY25 Q3", y: 3.74 },
      { x: "FY25 Q4", y: 3.81 },
    ],
  },
  operating: {
    label: "四半期営業損益 (100万USD)",
    unit: "M USD",
    note: "直近12四半期　※サンプル用の近似データ",
    data: [
      { x: "FY23 Q1", y: -150 },
      { x: "FY23 Q2", y: -180 },
      { x: "FY23 Q3", y: -120 },
      { x: "FY23 Q4", y: -200 },
      { x: "FY24 Q1", y: -90 },
      { x: "FY24 Q2", y: -50 },
      { x: "FY24 Q3", y: -30 },
      { x: "FY24 Q4", y: 20 },
      { x: "FY25 Q1", y: 60 },
      { x: "FY25 Q2", y: 80 },
      { x: "FY25 Q3", y: 110 },
      { x: "FY25 Q4", y: 140 },
    ],
  },
};

const CHART_TYPES = [
  { id: "bar", label: "棒グラフ" },
  { id: "line", label: "折れ線" },
];

// ---------- プレゼンテーショナルコンポーネント ----------
function Navbar({ theme, onToggleTheme }) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <a className="brand" href="#top">
          <span className="brand-mark" aria-hidden="true">K</span>
          <span className="brand-name">
            Kyndryl <span className="brand-sub">Dashboard</span>
          </span>
        </a>
        <ul className="nav-links">
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#about">Company</a></li>
          <li><a href="#docs">IR</a></li>
        </ul>
        <div className="nav-actions">
          <span className="live-pill" title="サンプルデータ">
            <span className="live-dot" /> LIVE
          </span>
          <button type="button" className="theme-toggle" onClick={onToggleTheme} aria-label="テーマ切替">
            {theme === THEME_DARK ? "☀" : "☽"}
          </button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="hero" id="top">
      <span className="eyebrow">
        <span className="ticker-badge">NYSE: KD</span>
        KYNDRYL HOLDINGS · REAL-TIME (SAMPLE)
      </span>
      <h1 className="hero-title">Kyndryl Dashboard</h1>
      <p className="hero-description">
        株価・売上・業績トレンドをリアルタイム風に可視化するデモダッシュボード。
        ※表示データはサンプル用の近似値です。
      </p>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Kyndryl Dashboard (Demo) — Built with React &amp; GitHub Copilot</p>
    </footer>
  );
}

// ---------- KPI ----------
function HeaderQuote({ data, unit }) {
  const last = data[data.length - 1].y;
  const prev = data[data.length - 2]?.y ?? last;
  const delta = last - prev;
  const pct = prev === 0 ? 0 : (delta / Math.abs(prev)) * 100;
  const cls = delta > 0 ? "is-up" : delta < 0 ? "is-down" : "";
  const arrow = delta > 0 ? "▲" : delta < 0 ? "▼" : "●";
  const fmt = (n) => (Number.isInteger(n) ? n.toLocaleString() : n.toFixed(2));
  return (
    <div className="header-quote">
      <span className="header-price">
        {fmt(last)}
        <span className="header-unit"> {unit}</span>
      </span>
      <span className={`header-delta ${cls}`}>
        {arrow} {delta >= 0 ? "+" : ""}{fmt(delta)} ({pct >= 0 ? "+" : ""}{pct.toFixed(1)}%)
      </span>
    </div>
  );
}

function StatCard({ label, value, sub, trend }) {
  const trendClass =
    trend == null ? "" : trend > 0 ? "is-up" : trend < 0 ? "is-down" : "";
  const arrow = trend == null ? null : trend > 0 ? "▲" : trend < 0 ? "▼" : "●";
  return (
    <div className="stat-card">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
      <span className={`stat-sub ${trendClass}`}>
        {arrow && <span className="stat-arrow">{arrow}</span>}
        {sub}
      </span>
    </div>
  );
}

function StatGrid({ data, unit }) {
  const total = data.reduce((sum, d) => sum + d.y, 0);
  const avg = total / data.length;
  const max = data.reduce((m, d) => (d.y > m.y ? d : m), data[0]);
  const first = data[0].y;
  const last = data[data.length - 1].y;
  const growth = first === 0 ? 0 : ((last - first) / Math.abs(first)) * 100;
  const prev = data[data.length - 2]?.y ?? first;
  const lastDelta = last - prev;
  const lastDeltaPct = prev === 0 ? 0 : (lastDelta / Math.abs(prev)) * 100;

  const fmt = (n) =>
    Number.isInteger(n) ? n.toLocaleString() : n.toFixed(2);

  return (
    <div className="stat-grid">
      <StatCard
        label="最新値"
        value={`${fmt(last)} ${unit}`}
        sub={`${lastDelta >= 0 ? "+" : ""}${fmt(lastDelta)} (${lastDeltaPct >= 0 ? "+" : ""}${lastDeltaPct.toFixed(1)}%)`}
        trend={lastDelta}
      />
      <StatCard label="平均" value={`${fmt(avg)} ${unit}`} sub={`n=${data.length}`} />
      <StatCard label="ピーク" value={`${fmt(max.y)} ${unit}`} sub={max.x} />
      <StatCard
        label="期間変化"
        value={`${growth >= 0 ? "+" : ""}${growth.toFixed(1)} %`}
        sub={`${fmt(first)} → ${fmt(last)}`}
        trend={growth}
      />
    </div>
  );
}

// ---------- Chart ----------
const CHART_W = 720;
const CHART_H = 320;
const PADDING = { top: 28, right: 24, bottom: 40, left: 64 };

function useChartGeometry(data) {
  return useMemo(() => {
    const innerW = CHART_W - PADDING.left - PADDING.right;
    const innerH = CHART_H - PADDING.top - PADDING.bottom;

    const values = data.map((d) => d.y);
    const rawMax = Math.max(...values, 0);
    const rawMin = Math.min(...values, 0);
    const niceStep = (n) => {
      const abs = Math.abs(n) || 1;
      const mag = Math.pow(10, Math.floor(Math.log10(abs)));
      return Math.ceil(abs / mag) * mag;
    };
    const niceMax = rawMax === 0 ? 0 : niceStep(rawMax);
    const niceMin = rawMin === 0 ? 0 : -niceStep(-rawMin);
    const range = niceMax - niceMin || 1;

    const xStep = innerW / data.length;
    const xCenter = (i) => PADDING.left + xStep * i + xStep / 2;
    const yPos = (v) =>
      PADDING.top + innerH - ((v - niceMin) / range) * innerH;
    const yZero = yPos(0);

    const ticks = 4;
    const yTicks = Array.from({ length: ticks + 1 }, (_, i) => {
      const value = niceMin + (range / ticks) * i;
      return { value, y: yPos(value) };
    });

    return { innerW, innerH, niceMax, niceMin, xStep, xCenter, yPos, yZero, yTicks };
  }, [data]);
}

function Chart({ data, type, hovered, onHover }) {
  const geo = useChartGeometry(data);
  const { xCenter, yPos, yTicks, xStep, yZero } = geo;

  const linePath = data
    .map((d, i) => `${i === 0 ? "M" : "L"} ${xCenter(i)} ${yPos(d.y)}`)
    .join(" ");

  const areaPath =
    `M ${xCenter(0)} ${yZero} ` +
    data.map((d, i) => `L ${xCenter(i)} ${yPos(d.y)}`).join(" ") +
    ` L ${xCenter(data.length - 1)} ${yZero} Z`;

  return (
    <div className="chart-wrap">
      <svg
        className="chart"
        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        role="img"
        aria-label="データ可視化チャート"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#c2410c" />
          </linearGradient>
          <linearGradient id="barGradNeg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(251,191,36,0.5)" />
            <stop offset="100%" stopColor="rgba(194,65,12,0.02)" />
          </linearGradient>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#c2410c" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Y軸グリッド */}
        {yTicks.map((t) => (
          <g key={t.value} className="grid">
            <line
              x1={PADDING.left}
              x2={CHART_W - PADDING.right}
              y1={t.y}
              y2={t.y}
            />
            <text x={PADDING.left - 8} y={t.y + 4} textAnchor="end">
              {Number.isInteger(t.value) ? t.value : t.value.toFixed(1)}
            </text>
          </g>
        ))}

        {/* X軸ラベル */}
        {data.map((d, i) => (
          <text
            key={d.x}
            className="axis-label"
            x={xCenter(i)}
            y={CHART_H - PADDING.bottom + 18}
            textAnchor="middle"
          >
            {d.x}
          </text>
        ))}

        {/* 棒グラフ */}
        {type === "bar" &&
          data.map((d, i) => {
            const w = xStep * 0.6;
            const x = xCenter(i) - w / 2;
            const y = Math.min(yPos(d.y), yZero);
            const h = Math.abs(yPos(d.y) - yZero);
            const isHover = hovered === i;
            return (
              <rect
                key={d.x}
                className={`bar ${isHover ? "is-hover" : ""} ${d.y < 0 ? "is-neg" : ""}`}
                x={x}
                y={y}
                width={w}
                height={h}
                rx="6"
                fill={d.y < 0 ? "url(#barGradNeg)" : "url(#barGrad)"}
                onMouseEnter={() => onHover(i)}
                onMouseLeave={() => onHover(null)}
              />
            );
          })}

        {/* 棒の値ラベル */}
        {type === "bar" &&
          data.map((d, i) => (
            <text
              key={`vl-${d.x}`}
              className="value-label"
              x={xCenter(i)}
              y={d.y >= 0 ? yPos(d.y) - 6 : yPos(d.y) + 14}
              textAnchor="middle"
              pointerEvents="none"
            >
              {Number.isInteger(d.y) ? d.y : d.y.toFixed(1)}
            </text>
          ))}

        {/* 折れ線 */}
        {type === "line" && (
          <>
            <path className="area" d={areaPath} fill="url(#areaGrad)" />
            <path
              className="line"
              d={linePath}
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
            />
            {data.map((d, i) => (
              <circle
                key={d.x}
                className={`dot ${hovered === i ? "is-hover" : ""}`}
                cx={xCenter(i)}
                cy={yPos(d.y)}
                r={hovered === i ? 6 : 3.5}
                onMouseEnter={() => onHover(i)}
                onMouseLeave={() => onHover(null)}
              />
            ))}
            {data.map((d, i) => (
              <text
                key={`vl-${d.x}`}
                className="value-label"
                x={xCenter(i)}
                y={yPos(d.y) - 10}
                textAnchor="middle"
                pointerEvents="none"
              >
                {Number.isInteger(d.y) ? d.y : d.y.toFixed(1)}
              </text>
            ))}
          </>
        )}

        {/* ツールチップ */}
        {hovered != null && (
          <g className="tooltip" pointerEvents="none">
            <line
              x1={xCenter(hovered)}
              x2={xCenter(hovered)}
              y1={PADDING.top}
              y2={CHART_H - PADDING.bottom}
            />
            <rect
              x={xCenter(hovered) - 44}
              y={yPos(data[hovered].y) - 38}
              width="88"
              height="28"
              rx="6"
            />
            <text
              x={xCenter(hovered)}
              y={yPos(data[hovered].y) - 19}
              textAnchor="middle"
            >
              {data[hovered].x}: {data[hovered].y}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}

function ChartControls({ datasetId, onDataset, chartType, onChartType }) {
  return (
    <div className="chart-controls">
      <div className="control-group">
        <span className="control-label">データセット</span>
        <div className="segmented">
          {Object.entries(DATASETS).map(([id, ds]) => (
            <button
              key={id}
              type="button"
              className={`segment ${datasetId === id ? "is-active" : ""}`}
              onClick={() => onDataset(id)}
            >
              {ds.label}
            </button>
          ))}
        </div>
      </div>
      <div className="control-group">
        <span className="control-label">表示形式</span>
        <div className="segmented">
          {CHART_TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`segment ${chartType === t.id ? "is-active" : ""}`}
              onClick={() => onChartType(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- カスタムフック ----------
function useDashboardState() {
  const [theme, setTheme] = useState(THEME_DARK);
  const [datasetId, setDatasetId] = useState("stock");
  const [chartType, setChartType] = useState("bar");
  const [hovered, setHovered] = useState(null);

  return {
    theme,
    datasetId,
    chartType,
    hovered,
    setDatasetId,
    setChartType,
    setHovered,
    onToggleTheme: () =>
      setTheme((prev) => (prev === THEME_DARK ? THEME_LIGHT : THEME_DARK)),
  };
}

// ---------- App 本体 ----------
function App() {
  const {
    theme,
    datasetId,
    chartType,
    hovered,
    setDatasetId,
    setChartType,
    setHovered,
    onToggleTheme,
  } = useDashboardState();

  const dataset = DATASETS[datasetId];

  return (
    <div className={`app ${theme}`}>
      <Navbar theme={theme} onToggleTheme={onToggleTheme} />
      <main className="container">
        <Hero />

        <section className="card" id="dashboard">
          <div className="card-header">
            <div>
              <h2>{dataset.label}</h2>
              <p className="card-sub">{dataset.note}</p>
            </div>
            <HeaderQuote data={dataset.data} unit={dataset.unit} />
          </div>

          <ChartControls
            datasetId={datasetId}
            onDataset={(id) => {
              setDatasetId(id);
              setHovered(null);
            }}
            chartType={chartType}
            onChartType={setChartType}
          />

          <Chart
            data={dataset.data}
            type={chartType}
            hovered={hovered}
            onHover={setHovered}
          />

          <StatGrid data={dataset.data} unit={dataset.unit} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
