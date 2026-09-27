import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { logoutApi } from "../api/auth";
import ParentDashboard from "./parent/ParentDashboard";
import ChildDashboard from "./child/ChildDashboard";
import { IconSettings } from "../components/common/icons";
import VillageCharacter from "../components/common/VillageCharacter";
import villageTheme from "../assets/village/village-theme.webp";

export default function Home() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const isParent = user.role === "PARENT";
  const handleLogout = async () => {
    try { await logoutApi(); } catch { /* Always clear this device's session. */ }
    logout(); navigate("/");
  };
  return <div className={`village-home ${isParent ? "parent-home" : ""}`}>
    <header className="home-brand">
      <div><span className="nh-wordmark">NH <b>올원뱅크</b></span><span className="brand-caption">우리 아이가 자라는 금융 마을</span></div>
      <button type="button" onClick={() => navigate("/settings")} aria-label="설정" className="village-header-button"><IconSettings width={22} height={22}/></button>
    </header>
    <section className="home-scene" aria-label="올원 주니어빌리지">
      <img src={villageTheme} alt="노란 새, 흰 토끼, 초록 새가 반기는 올원 주니어빌리지" fetchPriority="high" />
    </section>
    <div className="home-welcome">
      <div><span className="village-eyebrow">{isParent ? "함께 키우는 좋은 습관" : "오늘도 반가워요!"}</span>
        <h1>{user.name}{isParent ? "님" : " 어린이"}<span aria-hidden="true"> 🌱</span></h1>
        <p>{isParent ? "아이의 작은 도전을 함께 응원해주세요." : "친구들과 배우고, 모으고, 꿈을 키워요."}</p></div>
      <VillageCharacter pose={isParent ? "learn" : "hello"} size={90} decorative />
    </div>
    <main className="home-content">
      {isParent ? <>
        <div className="section-heading"><div><span className="village-eyebrow">우리 가족의 금융 생활</span><h2>우리 아이들</h2></div>
          <button onClick={() => navigate("/parent/children")} className="text-link">자녀 관리 ›</button></div>
        <ParentDashboard />
        <button onClick={() => navigate("/meal")} className="village-feature scene-peach"><div><h2>우리 학교 급식</h2><p>아이의 오늘 식단을 확인해요</p><span className="feature-action">급식 보기 ›</span></div><VillageCharacter pose="meal" decorative /></button>
      </> : <ChildDashboard />}
      <button onClick={handleLogout} className="logout-link">로그아웃</button>
    </main>
  </div>;
}
