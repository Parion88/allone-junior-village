import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { logoutApi } from "../api/auth";
import ParentDashboard from "./parent/ParentDashboard";
import ChildDashboard from "./child/ChildDashboard";
import alloneFriends from "../assets/characters/allone-friends.png";
import { IconMission, IconBell, IconFamily, IconBook, IconGame, IconPiggyBank, IconMeal, IconSettings } from "../components/common/icons";
import Avatar from "../components/common/Avatar";

const TILE_TONES = {
  parent: { icon: "bg-gradient-to-br from-parent-400 to-parent-600", text: "text-parent-700" },
  junior: { icon: "bg-gradient-to-br from-junior-400 to-junior-600", text: "text-junior-700" },
  mission: { icon: "bg-gradient-to-br from-amber-400 to-amber-600", text: "text-amber-700" },
  learn: { icon: "bg-gradient-to-br from-violet-400 to-violet-600", text: "text-violet-700" },
  meal: { icon: "bg-gradient-to-br from-rose-400 to-rose-600", text: "text-rose-700" },
};

function BottomMenuBar({ items, isParent }) {
  const navigate = useNavigate();
  return (
    <nav className="fixed bottom-0 inset-x-0 z-20 pointer-events-none">
      <div className="max-w-[480px] mx-auto bg-white/95 backdrop-blur border-t border-gray-100 shadow-[0_-8px_24px_rgba(15,30,20,0.08)] pb-[env(safe-area-inset-bottom)] pointer-events-auto">
        <div className="flex items-stretch">
          {items.map((item) => {
            const t = TILE_TONES[item.tone] || TILE_TONES.junior;
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.to)}
                className="flex-1 min-w-0 flex flex-col items-center justify-center gap-1.5 py-2.5 active:scale-95 transition-transform"
              >
                <span className={`w-9 h-9 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-sm ${t.icon}`}>
                  <item.Icon width={17} height={17} />
                </span>
                <span className={`text-[11px] font-extrabold whitespace-nowrap ${isParent ? t.text : "text-[#56635A]"}`}>{item.label}</span>
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
  { Icon: IconMission, label: "미션", tone: "mission", to: "/child/missions" },
  { Icon: IconPiggyBank, label: "저축목표", tone: "mission", to: "/child/savings" },
  { Icon: IconMeal, label: "급식메뉴", tone: "meal", to: "/meal" },
  { Icon: IconBook, label: "금융교육", tone: "learn", to: "/child/education" },
  { Icon: IconGame, label: "게임", tone: "learn", to: "/child/game" },
];

export default function Home() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const isParent = user.role === "PARENT";

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (e) {
      // 네트워크 오류가 있어도 클라이언트 상태는 로그아웃 처리
    }
    logout();
    navigate("/");
  };

  return (
    <div className={`flex min-h-screen flex-col ${isParent ? "bg-[#F5F8FB]" : "bg-[#F6FAF7]"}`}>
      <div className={`relative overflow-hidden ${isParent ? "bg-gradient-to-r from-parent-800 to-parent-600" : "bg-gradient-to-br from-[#E8F8EC] via-[#F5FBE8] to-[#FFF6CC]"}`}>
        <div className="flex min-h-[150px] items-center justify-between gap-3 px-4 py-4">
          <div className={`${isParent ? "text-white" : "text-[#223127]"} min-w-0 flex-1`}>
            <div className="flex items-center gap-3">
              <Avatar
                value={user.avatarEmoji}
                className={`w-11 h-11 shadow-sm ${isParent ? "ring-2 ring-white/60" : "ring-2 ring-white"}`}
                textClassName="text-3xl"
              />
              <div className="min-w-0">
                <p className={`text-[11px] font-bold tracking-wide ${isParent ? "text-white/75" : "text-junior-700"}`}>
                  {isParent ? "PARENT MODE" : "JUNIOR VILLAGE"}
                </p>
                <p className="mt-0.5 truncate font-extrabold leading-tight">{user.name}님, 안녕하세요!</p>
                <p className={`mt-1 text-xs ${isParent ? "text-white/80" : "text-[#617066]"}`}>
                  {isParent ? "아이의 금융 습관을 함께 만들어가요" : "올원프렌즈와 오늘도 재미있게 배우고 모아봐요"}
                </p>
              </div>
            </div>
          </div>

          {!isParent ? (
            <img
              src={alloneFriends}
              alt="올원프렌즈"
              className="h-[105px] w-[150px] shrink-0 object-contain object-right drop-shadow-sm"
            />
          ) : null}

          <button
            onClick={() => navigate("/settings")}
            aria-label="설정"
            className={`tap-target absolute right-3 top-3 flex items-center justify-center rounded-2xl ${
              isParent ? "bg-white/12 text-white ring-1 ring-white/20" : "bg-white/80 text-junior-700 ring-1 ring-black/[0.04]"
            } backdrop-blur`}
          >
            <IconSettings width={21} height={21} />
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-4 pb-28">
        <div className="flex items-end justify-between mt-1">
          <div>
            <p className={`text-[11px] font-bold uppercase tracking-[0.16em] ${isParent ? "text-parent-500" : "text-junior-600"}`}>
              {isParent ? "Family Overview" : "My Village"}
            </p>
            <h2 className="mt-0.5 font-extrabold text-[#263129]">{isParent ? "우리 아이들" : "나의 오늘"}</h2>
          </div>
        </div>

        {isParent ? <ParentDashboard /> : <ChildDashboard />}

        <button onClick={handleLogout} className="text-gray-400 text-sm font-medium py-3 mt-2 underline underline-offset-2">
          로그아웃
        </button>
      </div>

      <BottomMenuBar items={isParent ? PARENT_MENU : CHILD_MENU} isParent={isParent} />
    </div>
  );
}
