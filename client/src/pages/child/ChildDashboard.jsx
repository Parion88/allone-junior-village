import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { fetchBalance, fetchTransactions } from "../../api/accounts";
import { fetchMissions } from "../../api/missions";
import { fetchSavingsGoals } from "../../api/savingsGoals";
import Card from "../../components/common/Card";
import BalanceCard from "../../components/common/BalanceCard";
import CharacterBanner from "../../components/common/CharacterBanner";

const QUICK_ACTIONS = [
  { label: "미션", emoji: "✅", to: "/child/missions", className: "bg-[#FFF4D7] text-[#8A5B00]" },
  { label: "저축", emoji: "🐷", to: "/child/savings", className: "bg-[#E8F8EC] text-[#1C6F37]" },
  { label: "배움", emoji: "💡", to: "/child/education", className: "bg-[#E7F3FF] text-[#2467A8]" },
  { label: "게임", emoji: "🎮", to: "/child/game", className: "bg-[#F2E9FF] text-[#6B3FA0]" },
];

export default function ChildDashboard() {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [missions, setMissions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [recentTx, setRecentTx] = useState([]);

  useEffect(() => {
    fetchBalance(user.id).then((d) => setBalance(d.balance));
    fetchMissions().then((list) => setMissions(list.filter((m) => m.status === "ACTIVE")));
    fetchSavingsGoals(user.id).then(setGoals);
    fetchTransactions(user.id).then((list) => setRecentTx(list.slice(0, 5)));
  }, [user.id]);

  const primaryGoal = goals[0];
  const goalPct = useMemo(() => {
    if (!primaryGoal || !primaryGoal.targetAmount) return 0;
    return Math.min(100, Math.round((primaryGoal.currentAmount / primaryGoal.targetAmount) * 100));
  }, [primaryGoal]);

  return (
    <div className="flex flex-col gap-4">
      <CharacterBanner
        title={`${user.name}님, 오늘도 금융 모험을 시작해볼까요?`}
        description="미션 하나, 퀴즈 하나만 해도 오늘의 금융 습관이 쑥쑥 자라요."
        actionLabel={missions.length > 0 ? "오늘 미션 보기" : "게임하러 가기"}
        onAction={() => navigate(missions.length > 0 ? "/child/missions" : "/child/game")}
      />

      <BalanceCard balance={balance} />

      <section>
        <div className="mb-2 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-junior-600">Quick Start</p>
            <h3 className="mt-0.5 text-base font-extrabold text-[#223127]">바로 시작하기</h3>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#617066] shadow-sm ring-1 ring-black/[0.04]">
            오늘도 한 걸음 ✨
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {QUICK_ACTIONS.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => navigate(item.to)}
              className="rounded-2xl bg-white px-2 py-3 text-center shadow-card ring-1 ring-black/[0.03] transition active:scale-95"
            >
              <span className={`mx-auto flex h-11 w-11 items-center justify-center rounded-2xl text-xl ${item.className}`}>{item.emoji}</span>
              <span className="mt-2 block text-xs font-extrabold text-[#344138]">{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      <Card className="!rounded-[26px] !p-0 overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
          <div>
            <p className="text-xs font-bold text-amber-600">오늘 할 일</p>
            <h3 className="mt-0.5 font-extrabold text-[#223127]">미션을 완료하고 용돈 받아요</h3>
          </div>
          <button type="button" onClick={() => navigate("/child/missions")} className="text-xs font-bold text-junior-700">
            전체보기
          </button>
        </div>

        <div className="p-4">
          {missions.length === 0 ? (
            <div className="rounded-2xl bg-[#F7FAF8] px-4 py-5 text-center">
              <div className="text-3xl" aria-hidden="true">🌿</div>
              <p className="mt-2 text-sm font-bold text-[#344138]">지금은 진행 중인 미션이 없어요.</p>
              <p className="mt-1 text-xs text-[#7A877E]">새 미션이 생기면 올리원이 알려줄게요!</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-2.5">
              {missions.slice(0, 3).map((m) => (
                <li key={m.id} className="flex items-center justify-between gap-3 rounded-2xl bg-[#FFF9EC] px-3.5 py-3 ring-1 ring-amber-100">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-extrabold text-[#344138]">{m.title}</p>
                    <p className="mt-0.5 text-xs text-[#8B7960]">완료하면 바로 보상을 받을 수 있어요</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-white px-3 py-1.5 text-xs font-extrabold text-amber-700 shadow-sm">
                    +{m.rewardAmount.toLocaleString("ko-KR")}원
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Card>

      <Card className="!rounded-[26px] bg-gradient-to-br from-white to-[#F1FAF3]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-junior-600">나의 저축 성장</p>
            <h3 className="mt-1 text-lg font-extrabold text-[#223127]">
              {primaryGoal ? `${primaryGoal.emoji || "🎯"} ${primaryGoal.title}` : "새로운 목표를 만들어봐요"}
            </h3>
          </div>
          {primaryGoal ? (
            <span className="rounded-full bg-junior-100 px-3 py-1 text-xs font-extrabold text-junior-700">{goalPct}%</span>
          ) : null}
        </div>

        {primaryGoal ? (
          <>
            <div className="mt-4 h-3.5 overflow-hidden rounded-full bg-white ring-1 ring-junior-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-junior-400 to-junior-600 transition-all"
                style={{ width: `${goalPct}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="font-bold text-[#617066]">{primaryGoal.currentAmount.toLocaleString("ko-KR")}원 모았어요</span>
              <span className="text-[#89938C]">목표 {primaryGoal.targetAmount.toLocaleString("ko-KR")}원</span>
            </div>
            <button
              type="button"
              onClick={() => navigate("/child/savings")}
              className="mt-4 w-full rounded-2xl bg-junior-600 py-3 text-sm font-extrabold text-white shadow-sm transition active:scale-[0.98]"
            >
              저금하러 가기
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => navigate("/child/savings")}
            className="mt-4 w-full rounded-2xl bg-junior-600 py-3 text-sm font-extrabold text-white shadow-sm transition active:scale-[0.98]"
          >
            저축 목표 만들기
          </button>
        )}
      </Card>

      <Card className="!rounded-[26px]">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-[#E17B36]">용돈 기록</p>
            <h3 className="mt-0.5 font-extrabold text-[#223127]">최근 거래</h3>
          </div>
          <span className="text-2xl" aria-hidden="true">💌</span>
        </div>

        {recentTx.length === 0 ? (
          <p className="rounded-2xl bg-[#F7FAF8] px-4 py-4 text-center text-sm text-[#89938C]">아직 받은 용돈이 없어요.</p>
        ) : (
          <ul className="flex flex-col divide-y divide-gray-100">
            {recentTx.map((t) => {
              const isIncome = t.toUserId === user.id;
              return (
                <li key={t.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#344138]">{t.memo || t.type}</p>
                    <p className="mt-0.5 text-xs text-[#99A29B]">{isIncome ? "받은 용돈" : "사용한 금액"}</p>
                  </div>
                  <span className={`shrink-0 text-sm font-extrabold ${isIncome ? "text-junior-600" : "text-[#7A877E]"}`}>
                    {isIncome ? "+" : "-"}{t.amount.toLocaleString("ko-KR")}원
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
}
