import { useNavigate } from "react-router-dom";
import VillageIntro from "./VillageIntro";
export default function BackHeader({ title, tone = "junior", showIntro = true }) {
  const navigate = useNavigate();
  return <>
    <header className={`village-header ${tone === "parent" ? "is-parent" : ""}`}>
      <button type="button" onClick={() => window.history.state?.idx > 0 ? navigate(-1) : navigate("/home")}
        aria-label="뒤로가기" className="village-header-button">‹</button>
      <h1>{title}</h1>
      <button type="button" onClick={() => navigate("/home")} aria-label="주니어빌리지 홈" className="village-header-button">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m3 10 9-7 9 7v10H3Z"/><path d="M9 20v-7h6v7"/></svg>
      </button>
    </header>
    {showIntro && <VillageIntro title={title} />}
  </>;
}
