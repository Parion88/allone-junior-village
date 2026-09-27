import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { logoutApi } from "../api/auth";
import ParentDashboard from "./parent/ParentDashboard";
import ChildDashboard from "./child/ChildDashboard";
import { IconMission, IconBell, IconFamily, IconMeal, IconSettings } from "../components/common/icons";
import Avatar from "../components/common/Avatar";
import FriendCharacter from "../components/common/FriendCharacter";

const TILE_TONES = {
  parent: { icon: "bg-gradient-to-br from-parent-400 to-parent-600", text: "text-parent-700" },
  mission: { icon: "bg-gradient-to-br from-amber-400 to-amber-600", text: "text-amber-700" },
  meal: { icon: "bg-gradient-to-br from-rose-400 to-rose-600", text: "text-rose-700" },
};

function BottomMenuBar({ items, isParent }) {
  const navigate = useNavigate();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 pointer-events-none">
      <div className="mx-auto max-w-[480px] rounded-t-[28px] border-t border-white/80 bg-white/95 px-2 shadow-[0_-10px_32px_rgba(34,72,48,0.10)] backdrop-blur pb-[env(safe-area-inset-bottom)] pointer-events-auto">
        <div className="flex items-stretch">
          {items.map((item, index) => {
            const t = TILE_TONES[item.tone] || TILE_TONES.parent;
            const active = !isParent && index === 0;
            return (
              <button key={item.label} onClick={() => navigate(item.to)} className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1 py-2.5 transition active:scale-95">
                <span className={`flex h-9 w-9 items-center justify-center rounded-2xl text-lg ${isParent ? `${t.icon} text-white shadow-sm` : active ? "bg-junior-600 text-white shadow-sm" : "bg-transparent text-[#5F6C63]"}`}>
                  {item.Icon ? <item.Icon width={17} height={17} /> : item.emoji}
                </span>
                <span className={`whitespace-nowrap text-[10px] font-extrabold ${active ? "text-junior-700" : isParent ? t.text : "text-[#68756C]"}`}>{item.label}</span>
                {active ? <span className="h-1 w-7 rounded-full bg-junior-600" /> : <span className="h-1" />}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

const PARENT_MENU = [
  { Icon: IconMission, label: "미션 관리", tone: "mission", to: "/parent/missions" },
  { Icon: IconMeal, label: "급식메뉴", tone: "meal", to: "/meal" },
  { Icon: IconBell, label: "알림함", tone: "parent", to: "/parent/notifications" },
  { Icon: IconFamily, label: "자녀 계정", tone: "parent", to: "/parent/children" },
];

const CHILD_MENU = [
  { emoji: "🏠", label: "홈", to: "/home" },
  { emoji: "⭐", label: "미션", to: "/child/missions" },
  { emoji: "🐷", label: "저축목표", to: "/child/savings" },
  { emoji: "📖", label: "금융교육", to: "/child/education" },
  { emoji: "👤", label: "내 정보", to: "/settings" },
];

function JuniorVillageHero({ user, onSettings }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#78CCF3] via-[#C9EDFF] to-[#EAF9DC] px-4 pb-14 pt-4">
      <div className="pointer-events-none absolute -left-10 top-16 h-24 w-32 rounded-full bg-white/75" />
      <div className="pointer-events-none absolute right-8 top-12 h-12 w-20 rounded-full bg-white/70" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#8FD565] via-[#BCEB8D]/85 to-transparent" />
      <div className="pointer-events-none absolute -bottom-10 -left-8 h-36 w-48 rounded-full bg-[#6FBE50]/55" />
      <div className="pointer-events-none absolute -bottom-12 right-[-35px] h-44 w-56 rounded-full bg-[#79C85B]/50" />

      <div className="relative z-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden="true">🌱</span>
          <div>
            <p className="text-lg font-black tracking-tight text-[#0B6B4B]">NH 올원뱅크</p>
            <p className="text-[10px] font-extrabold tracking-[0.15em] text-[#267A5E]">JUNIOR VILLAGE</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/75 px-3 py-2 text-xs font-extrabold text-[#18714F] shadow-sm backdrop-blur">🏡 주니어빌리지</span>
          <button type="button" onClick={onSettings} aria-label="설정" className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/80 text-[#18714F] shadow-sm ring-1 ring-white backdrop-blur">
            <IconSettings width={20} height={20} />
          </button>
        </div>
      </div>

      <div className="relative z-10 mt-4 min-h-[260px]">
        <div className="absolute left-0 top-3 z-20 w-[61%] rounded-[30px] bg-white/92 p-4 shadow-[0_14px_30px_rgba(49,110,71,0.16)] ring-1 ring-white backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#E6F7D8] ring-4 ring-white">
              <FriendCharacter name="oli" size={58} label="올리" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[17px] font-black text-[#173A2B]">{user.name} 어린이 🌱</p>
              <p className="mt-1 text-xs font-semibold leading-5 text-[#6B7A70]">오늘도 신나게 성장하는 너를 응원해요!</p>
            </div>
          </div>
        </div>

        <div className="absolute right-[-2px] top-[86px] z-10 flex items-end gap-[-8px]">
          <FriendCharacter name="danji" size={88} className="translate-x-5 translate-y-3" label="단지" />
          <FriendCharacter name="oli" size={122} className="relative z-20" label="올리" />
          <FriendCharacter name="woni" size={92} className="-translate-x-5 translate-y-2" label="원이" />
        </div>

        <div className="absolute bottom-4 right-[126px] z-20 rotate-[-4deg] rounded-[18px] bg-white/90 px-3 py-2 text-center text-[11px] font-extrabold leading-4 text-[#18714F] shadow-md">
          우리 같이 해봐요!
          <span className="absolute -bottom-2 right-4 h-4 w-4 rotate-45 bg-white/90" />
        </div>

        <div className="pointer-events-none absolute bottom-0 left-3 text-5xl opacity-80" aria-hidden="true">🌳</div>
        <div className="pointer-events-none absolute bottom-0 right-2 text-5xl opacity-80" aria-hidden="true">🏫</div>
      </div>
    </section>
  );
}

export default function Home() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const isParent = user.role === "PARENT";

  const handleLogout = async () => {
    try { await logoutApi(); } catch (e) {}
    logout();
    navigate("/");
  };

  if (!isParent) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F9FCFF] via-white to-[#F4FAF5]">
        <JuniorVillageHero user={user} onSettings={() => navigate("/settings")} />
        <main className="relative z-20 -mt-7 flex flex-col gap-4 px-4 pb-32">
          <ChildDashboard />
          <button onClick={handleLogout} className="py-3 text-sm font-medium text-gray-400 underline underline-offset-2">로그아웃</button>
        </main>
        <BottomMenuBar items={CHILD_MENU} isParent={false} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F5F8FB]">
      <div className="relative overflow-hidden bg-gradient-to-r from-parent-800 to-parent-600 px-4 py-5 text-white">
        <div className="flex items-center gap-3">
          <Avatar value={user.avatarEmoji} className="h-11 w-11 ring-2 ring-white/60 shadow-sm" textClassName="text-3xl" />
          <div>
            <p className="text-[11px] font-bold tracking-wide text-white/75">PARENT MODE</p>
            <p className="mt-0.5 font-extrabold">{user.name}님, 안녕하세요!</p>
            <p className="mt-1 text-xs text-white/80">아이의 금융 습관을 함께 만들어가요</p>
          </div>
        </div>
        <button onClick={() => navigate("/settings")} aria-label="설정" className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/12 text-white ring-1 ring-white/20 backdrop-blur"><IconSettings width={21} height={21} /></button>
      </div>
      <div className="flex flex-col gap-4 p-4 pb-28">
        <div><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-parent-500">Family Overview</p><h2 className="mt-0.5 font-extrabold text-[#263129]">우리 아이들</h2></div>
        <ParentDashboard />
        <button onClick={handleLogout} className="mt-2 py-3 text-sm font-medium text-gray-400 underline underline-offset-2">로그아웃</button>
      </div>
      <BottomMenuBar items={PARENT_MENU} isParent />
    </div>
  );
}
