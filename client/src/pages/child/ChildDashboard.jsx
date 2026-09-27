import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { fetchBalance, fetchTransactions } from "../../api/accounts";
import { fetchMissions } from "../../api/missions";
import { fetchSavingsGoals } from "../../api/savingsGoals";
import Card from "../../components/common/Card";
import BalanceCard from "../../components/common/BalanceCard";
import FriendCharacter from "../../components/common/FriendCharacter";

const MISSION_TONES = [
  { bg: "from-[#EAF9E8] to-[#F7FFF0]", tag: "bg-[#2FB35A]", text: "text-[#17623C]", character: "oli" },
  { bg: "from-[#FFF7CC] to-[#FFFDF0]", tag: "bg-[#F4B515]", text: "text-[#805900]", character: "woni" },
  { bg: "from-[#EFE8FF] to-[#FAF7FF]", tag: "bg-[#8B62DF]", text: "text-[#5E42A0]", character: "kori" },
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
    fetchTransactions(user.id).then((list) => setRecentTx(list.slice(0, 4)));
  }, [user.id]);

  const primaryGoal = goals[0];
  const goalPct = useMemo(() => {
    if (!primaryGoal || !primaryGoal.targetAmount) return 0;
    return Math.min(100, Math.round((primaryGoal.currentAmount / primaryGoal.targetAmount) * 100));
  }, [primaryGoal]);

  const weeklyCards = [
    missions[0]
      ? {
          title: missions[0].title,
          tag: "오늘의 미션",
          helper: "완료하고 용돈 받아요!",
          meta: `+${missions[0].rewardAmount.toLocaleString("ko-KR")}원`,
          to: "/child/missions",
        }
      : {
          title: "새 미션을 기다려요",
          tag: "오늘의 미션",
          helper: "부모님이 미션을 만들면 보여요!",
          meta: "준비 중",
          to: "/child/missions",
        },
    {
      title: "어려운 금액과 거스름돈에 도전!",
      tag: "생활 계산",
      helper: "게임으로 돈 계산 연습",
      meta: "게임 도전",
      to: "/child/game",
    },
    {
      title: "영수증의 수량까지 계산해봐!",
      tag: "장보기 마스터",
      helper: "한 단계 더 어려운 계산",
      meta: "레벨 UP",
      to: "/child/game",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <BalanceCard balance={balance} />

      <section className="rounded-[30px] bg-white p-4 shadow-card ring-1 ring-black/[0.03]">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-black tracking-[0.12em] text-junior-600">WEEKLY CHALLENGE</p>
            <h2 className="mt-1 text-[22px] font-black text-[#17382A]">🌱 이번 주 미션</h2>
            <p className="mt-1 text-xs font-semibold text-[#75827A]">미션과 게임을 완료하며 금융 감각을 키워봐요!</p>
          </div>
          <button type="button" onClick={() => navigate("/child/missions")} className="shrink-0 rounded-full bg-[#E9F7EF] px-3 py-2 text-xs font-extrabold text-[#247A51]">
            전체보기 ›
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {weeklyCards.map((item, index) => {
            const tone = MISSION_TONES[index];
            return (
              <button
                key={item.tag}
                type="button"
                onClick={() => navigate(item.to)}
                className={`relative min-h-[205px] overflow-hidden rounded-[24px] bg-gradient-to-b ${tone.bg} p-3 text-left ring-1 ring-black/[0.03] transition active:scale-[0.98]`}
              >
                <div className="flex h-[60px] items-center justify-center">
                  {index === 2 ? (
                    <span className="text-[44px] drop-shadow-sm" aria-hidden="true">👑</span>
                  ) : (
                    <FriendCharacter name={tone.character} size={70} label={item.tag} />
                  )}
                </div>
                <span className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-[10px] font-black text-white ${tone.tag}`}>{item.tag}</span>
                <p className="mt-2 line-clamp-3 text-[12px] font-black leading-[1.45] text-[#24352C]">{item.title}</p>
                <p className="mt-1 line-clamp-2 text-[10px] font-semibold leading-4 text-[#7A867F]">{item.helper}</p>
                <div className={`absolute bottom-3 left-3 text-[11px] font-black ${tone.text}`}>● {item.meta}</div>
                <span className={`absolute bottom-2.5 right-3 text-lg font-black ${tone.text}`}>›</span>
              </button>
            );
          })}
        </div>
      </section>

      <button
        type="button"
        onClick={() => navigate("/child/education")}
        className="relative min-h-[185px] overflow-hidden rounded-[30px] bg-gradient-to-br from-[#DDF3FF] via-[#EAF8FF] to-[#CFEFFF] p-5 text-left shadow-card ring-1 ring-[#CDE9F8] transition active:scale-[0.99]"
      >
        <div className="relative z-10 max-w-[58%]">
          <p className="text-[11px] font-black tracking-[0.12em] text-[#3279BA]">MONEY SCHOOL</p>
          <h2 className="mt-1 text-[24px] font-black text-[#174F7C]">🎓 금융 교육</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-[#4E7090]">재미있는 금융 상식으로<br />똑똑한 어린이가 되어봐요!</p>
          <span className="mt-4 inline-flex rounded-full bg-[#4C9BEF] px-4 py-2 text-xs font-black text-white shadow-sm">바로가기 ›</span>
        </div>
        <div className="absolute -bottom-3 right-2 z-10">
          <FriendCharacter name="woni" size={132} label="금융 교육을 알려주는 원이" />
        </div>
        <div className="absolute bottom-5 right-[105px] text-3xl" aria-hidden="true">📚</div>
        <div className="absolute right-8 top-5 text-3xl" aria-hidden="true">💡</div>
        <div className="absolute left-[52%] top-8 text-xl" aria-hidden="true">⭐</div>
      </button>

      <Card className="relative overflow-hidden !rounded-[30px] bg-gradient-to-br from-[#F4FBEF] via-white to-[#E8F8DD] !p-5 ring-1 ring-[#DBEDD3]">
        <div className="relative z-10 pr-24">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-black tracking-[0.12em] text-junior-600">MY SAVINGS</p>
              <h2 className="mt-1 text-[22px] font-black text-[#195B3D]">🎯 나의 저축 목표</h2>
            </div>
          </div>

          {primaryGoal ? (
            <>
              <p className="mt-4 text-base font-black text-[#263B30]">{primaryGoal.emoji || "🎯"} {primaryGoal.title}</p>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#E5ECE7]">
                <div className="h-full rounded-full bg-gradient-to-r from-[#4AB765] to-[#85D359]" style={{ width: `${goalPct}%` }} />
              </div>
              <p className="mt-2 text-xs font-bold text-[#6F7E74]">
                {primaryGoal.currentAmount.toLocaleString("ko-KR")}원 / {primaryGoal.targetAmount.toLocaleString("ko-KR")}원 ({goalPct}%)
              </p>
            </>
          ) : (
            <>
              <p className="mt-4 text-base font-black text-[#263B30]">갖고 싶은 것을 정해볼까요?</p>
              <p className="mt-1 text-xs font-semibold text-[#7B897F]">작은 목표부터 시작하면 저축이 더 재미있어요.</p>
            </>
          )}

          <button type="button" onClick={() => navigate("/child/savings")} className="mt-4 rounded-full border border-[#BBDDBD] bg-white/80 px-4 py-2 text-xs font-black text-[#2B7650]">
            {primaryGoal ? "목표 보기 ›" : "목표 만들기 ›"}
          </button>
        </div>
        <div className="absolute -bottom-2 right-0">
          <FriendCharacter name="oli" size={120} label="저축을 응원하는 올리" />
        </div>
        <div className="absolute right-16 top-12 rotate-[-9deg] text-[11px] font-black text-[#348553]">조금씩<br />더 가까이!</div>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <button type="button" onClick={() => navigate("/meal")} className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#EEF7FF] to-white p-4 text-left shadow-card ring-1 ring-[#DCECF8]">
          <p className="text-xs font-black text-[#3E81B3]">🏫 우리 학교</p>
          <p className="mt-1 text-sm font-black text-[#2A3B45]">오늘 급식 보기</p>
          <div className="absolute -bottom-3 right-0"><FriendCharacter name="kori" size={72} label="학교 안내 코리" /></div>
        </button>
        <button type="button" onClick={() => navigate("/child/game")} className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#FFF5EA] to-white p-4 text-left shadow-card ring-1 ring-[#F5E3D1]">
          <p className="text-xs font-black text-[#B67238]">🎮 머니 게임</p>
          <p className="mt-1 text-sm font-black text-[#2A3B45]">한 판 더 도전!</p>
          <div className="absolute -bottom-3 right-0"><FriendCharacter name="dari" size={72} label="미션 도전 달리" /></div>
        </button>
      </div>

      {recentTx.length > 0 ? (
        <Card className="!rounded-[28px]">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-xs font-black text-[#DE6F97]">단지의 용돈 기록</p>
              <h3 className="mt-0.5 font-black text-[#223127]">최근 거래</h3>
            </div>
            <FriendCharacter name="danji" size={52} label="용돈 기록 단지" />
          </div>
          <ul className="flex flex-col divide-y divide-gray-100">
            {recentTx.map((t) => {
              const isIncome = t.toUserId === user.id;
              return (
                <li key={t.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#344138]">{t.memo || t.type}</p>
                    <p className="mt-0.5 text-xs text-[#99A29B]">{isIncome ? "받은 용돈" : "사용한 금액"}</p>
                  </div>
                  <span className={`shrink-0 text-sm font-black ${isIncome ? "text-junior-600" : "text-[#7A877E]"}`}>
                    {isIncome ? "+" : "-"}{t.amount.toLocaleString("ko-KR")}원
                  </span>
                </li>
              );
            })}
          </ul>
        </Card>
      ) : null}
    </div>
  );
}
