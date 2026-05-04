import { useState } from "react";
import "./App.css";

// ---------- 定数 ----------
const ERROR_MESSAGE = "エラーが発生しました。時間をおいて再試行してください。";
const THEME_LIGHT = "light";
const THEME_DARK = "dark";

// ---------- プレゼンテーショナルコンポーネント ----------
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <a className="brand" href="#top">
          <span className="brand-mark" aria-hidden="true">◆</span>
          <span className="brand-name">ADR Demo</span>
        </a>
        <ul className="nav-links">
          <li><a href="#features">機能</a></li>
          <li><a href="#about">概要</a></li>
          <li><a href="#docs">ドキュメント</a></li>
        </ul>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="hero" id="top">
      <span className="eyebrow">ARCHITECTURE DECISION RECORDS</span>
      <h1 className="hero-title">React Demo App</h1>
      <p className="hero-description">
        Copilotと対話しながらコードを変更し、そのたびにADRを自動生成するデモ用アプリです。
      </p>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} ADR Demo — Built with React &amp; GitHub Copilot</p>
    </footer>
  );
}

function ControlButtons({ onCountUp, onToggleError, onToggleTheme }) {
  return (
    <div className="button-row">
      <button type="button" onClick={onCountUp}>
        ボタン押下回数をカウントアップ
      </button>
      <button type="button" onClick={onToggleError}>
        エラー表示切り替え
      </button>
      <button type="button" onClick={onToggleTheme}>
        テーマ切り替え
      </button>
    </div>
  );
}

function StatusItem({ label, value }) {
  return (
    <p>
      <span className="status-label">{label}</span>
      <span className="status-value">{value}</span>
    </p>
  );
}

function StatusBox({ count, theme }) {
  return (
    <div className="status-box">
      <StatusItem label="ボタン押下回数" value={count} />
      <StatusItem label="現在のテーマ" value={theme} />
    </div>
  );
}

function ErrorAlert({ message }) {
  if (!message) return null;
  return (
    <div className="error-box" role="alert" aria-live="assertive">
      {message}
    </div>
  );
}

// ---------- カスタムフック ----------
function useAppState() {
  const [count, setCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [theme, setTheme] = useState(THEME_LIGHT);

  return {
    count,
    errorMessage,
    theme,
    onCountUp: () => setCount((prev) => prev + 1),
    onToggleError: () =>
      setErrorMessage((prev) => (prev ? "" : ERROR_MESSAGE)),
    onToggleTheme: () =>
      setTheme((prev) => (prev === THEME_DARK ? THEME_LIGHT : THEME_DARK)),
  };
}

// ---------- App 本体 ----------
function App() {
  const { count, errorMessage, theme, onCountUp, onToggleError, onToggleTheme } =
    useAppState();

  return (
    <div className={`app ${theme}`}>
      <Navbar />
      <main className="container">
        <Hero />

        <section className="card" id="features">
          <h2>デモ機能</h2>
          <ControlButtons
            onCountUp={onCountUp}
            onToggleError={onToggleError}
            onToggleTheme={onToggleTheme}
          />
          <StatusBox count={count} theme={theme} />
          <ErrorAlert message={errorMessage} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;// test change
