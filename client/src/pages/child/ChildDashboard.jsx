import FriendCharacter from "../../components/common/FriendCharacter";
import GoalIllustration from "../../components/common/GoalIllustration";
import { missionFriend } from "../../data/friendCharacters";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { fetchBalance, fetchTransactions } from "../../api/accounts";
import { fetchMissions } from "../../api/missions";
import { fetchSavingsGoals } from "../../api/savingsGoals";
import Card from "../../components/common/Card";
import BalanceCard from "../../components/common/BalanceCard";
import VillageCharacter from "../../components/common/VillageCharacter";

export default function ChildDashboard() {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const [balance, setBalance] = useState(null);
  const [missions, setMissions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [recentTx, setRecentTx] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    setLoading(true); setLoadError(false);
    Promise.allSettled([fetchBalance(user.id), fetchMissions(), fetchSavingsGoals(user.id), fetchTransactions(user.id)]).then((results) => {
      if (!active) return;
      const [b, m, g, t] = results;
      setBalance(b.status === "fulfilled" ? b.value.balance : null);
      setMissions(m.status === "fulfilled" ? m.value.filter((item) => item.status === "ACTIVE") : []);
      setGoals(g.status === "fulfilled" ? g.value : []);
      setRecentTx(t.status === "fulfilled" ? t.value.slice(0, 4) : []);
      setLoadError(results.some((r) => r.status === "rejected")); setLoading(false);
    });
    return () => { active = false; };
  }, [user.id, attempt]);
  const primaryGoal = goals[0];
  const goalPct = useMemo(() => primaryGoal?.targetAmount ? Math.max(0, Math.min(100, Math.round(primaryGoal.currentAmount / primaryGoal.targetAmount * 100))) : 0, [primaryGoal]);
  const challenges = [
    { tag: "오늘의 미션", title: missions[0]?.title || (loading ? "미션을 불러와요" : loadError ? "미션을 확인해요" : "어떤 미션이 기다릴까?"),
      meta: missions[0] ? `+${missions[0].rewardAmount.toLocaleString("ko-KR")}원` : "미션 보기", to: "/child/missions", pose: "save", tone: "mint" },
    { tag: "생활 계산", title: "돈 계산에 자신감을 더해요", meta: "게임 도전", to: "/child/game", pose: "hello", tone: "lemon" },
    { tag: "금융 퀴즈", title: "오늘의 퀴즈를 풀어봐요", meta: "퀴즈 풀기", to: "/child/education/quiz", pose: "celebrate", tone: "lavender" },
  ];
  return <div className="dashboard-sections">
    <BalanceCard balance={balance} loading={loading} />
    {loadError && <div role="alert" className="dashboard-error">일부 정보를 불러오지 못했어요. <button onClick={() => setAttempt((n) => n + 1)}>다시 불러오기</button></div>}
    <section className="weekly-section">
      <div className="section-heading"><div><span className="village-eyebrow">매일 조금씩, 즐겁게</span><h2>이번 주 미션</h2></div>
        <button onClick={() => navigate("/child/missions")} className="text-link">전체보기 ›</button></div>
      <p className="section-description">작은 도전을 모아 멋진 습관을 만들어요.</p>
      <div className="challenge-grid">{challenges.map((item) => <button key={item.tag} onClick={() => navigate(item.to)} className={`challenge-card scene-${item.tone}`}>
        <FriendCharacter {...(item.tag === "오늘의 미션" ? missionFriend(missions[0]?.title) : item.tag === "생활 계산" ? {name:"oli",pose:2} : {name:"woni",pose:2})} decorative /><span className="challenge-tag">{item.tag}</span><h3>{item.title}</h3><span className="challenge-meta">{item.meta}<b>›</b></span>
      </button>)}</div>
    </section>
    <button onClick={() => navigate("/child/education")} className="village-feature scene-sky">
      <div><span className="village-eyebrow">원이의 작은 도서관</span><h2>금융 교육</h2><p>재미있는 돈 이야기로<br/>똑똑한 습관을 배워요!</p><span className="feature-action">배우러 가기 ›</span></div>
      <FriendCharacter name="woni" pose={2} decorative />
    </button>
    <section className="savings-feature scene-mint">
      <div className="section-heading"><h2>나의 저축 목표</h2><button className="text-link" onClick={() => navigate("/child/savings")}>{primaryGoal ? "목표 보기" : "목표 만들기"} ›</button></div>
      <div className="savings-feature-body"><div>
        <h3>{primaryGoal ? primaryGoal.title : loading ? "목표를 불러오고 있어요" : loadError ? "저축 목표를 확인해요" : "어떤 꿈을 모아볼까요?"}</h3>
        {primaryGoal ? <><div className="savings-progress" role="progressbar" aria-label={primaryGoal.title} aria-valuenow={goalPct} aria-valuemin={0} aria-valuemax={100}><span style={{width: `${goalPct}%`}}/></div>
          <p>{primaryGoal.currentAmount.toLocaleString("ko-KR")} / {primaryGoal.targetAmount.toLocaleString("ko-KR")}원</p><strong className="savings-percent">{goalPct}%만큼 가까워졌어요</strong></> : <p>작은 저축부터 시작해봐요.<br/>친구들이 함께 응원할게요!</p>}
      </div>{primaryGoal ? <GoalIllustration title={primaryGoal.title} emoji={primaryGoal.emoji} /> : <FriendCharacter name="danji" pose={0} decorative />}</div>
    </section>
    <div className="home-quick-grid">
      <button onClick={() => navigate("/meal")} className="quick-card scene-peach"><VillageCharacter pose="meal" decorative/><span>우리 학교</span><h3>오늘 급식 ›</h3></button>
      <button onClick={() => navigate("/child/game")} className="quick-card scene-lavender"><VillageCharacter pose="celebrate" decorative/><span>머니 챌린지</span><h3>게임 한 판 ›</h3></button>
    </div>
    <Card><div className="section-heading"><div><span className="village-eyebrow">차곡차곡 용돈 기록</span><h2>최근 거래</h2></div><FriendCharacter name="dari" pose={1} size={52} decorative/></div>
      {recentTx.length ? <ul className="transaction-list">{recentTx.map((t) => { const income = t.toUserId === user.id; return <li key={t.id}><div><p>{t.memo || t.type}</p><small>{income ? "받은 용돈" : "사용한 금액"}</small></div><strong className={income ? "income" : ""}>{income ? "+" : "-"}{t.amount.toLocaleString("ko-KR")}원</strong></li>; })}</ul> : <p className="empty-record">{loading ? "용돈 기록을 불러오고 있어요." : loadError ? "용돈 기록을 불러오지 못했어요." : "아직 거래가 없어요. 첫 용돈을 기다려볼까요?"}</p>}
    </Card>
  </div>;
}
