import { NavLink, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
const icons = {
  home: <><path d="m3 10 9-7 9 7v10H3Z"/><path d="M9 20v-7h6v7"/></>,
  star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z"/>,
  savings: <><path d="M4 10c0-4 12-5 14 0h3v6h-3l-2 4h-2v-3H8v3H6l-2-5H2v-4Z"/><path d="M9 7V4h5v3M16 11h.01"/></>,
  book: <path d="M12 5v16M12 5C8 2 3 3 3 3v15s5-1 9 3c4-4 9-3 9-3V3s-5-1-9 2Z"/>,
  user: <><circle cx="12" cy="7" r="4"/><path d="M4 21v-3a8 8 0 0 1 16 0v3Z"/></>,
  bell: <path d="M5 10a7 7 0 0 1 14 0v5l2 3H3l2-3ZM9 21h6"/>,
};
const child = [["/home", "홈", "home"], ["/child/missions", "미션", "star"], ["/child/savings", "저축목표", "savings"], ["/child/education", "금융교육", "book"], ["/settings", "내 정보", "user"]];
const parent = [["/home", "홈", "home"], ["/parent/missions", "미션관리", "star"], ["/parent/notifications", "알림함", "bell"], ["/parent/children", "자녀관리", "user"], ["/settings", "설정", "book"]];
export default function BottomNavigation() {
  const { user, accessToken } = useAuthStore();
  const { pathname } = useLocation();
  if (!user || !accessToken || pathname === "/" || pathname === "/child/game") return null;
  return <nav className={`village-nav ${user.role === "PARENT" ? "is-parent" : ""}`} aria-label="주요 메뉴">
    {(user.role === "PARENT" ? parent : child).map(([to, label, icon]) => <NavLink key={to} to={to} end={to === "/home"}
      className={({ isActive }) => `village-nav-item ${isActive ? "is-active" : ""}`}>
      <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{icons[icon]}</svg>
      <span>{label}</span></NavLink>)}
  </nav>;
}
