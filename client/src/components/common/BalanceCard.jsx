import VillageCharacter from "./VillageCharacter";
export default function BalanceCard({ balance, size = "lg", loading = false }) {
  return <section className={`balance-card ${size === "sm" ? "balance-small" : ""}`} aria-label="내 잔액">
    <div><p className="balance-label">내 잔액</p><p className="balance-amount">{balance == null ? "—" : balance.toLocaleString("ko-KR")}<span>원</span></p>
      <p className="balance-caption">{loading ? "잔액을 불러오고 있어요" : balance == null ? "잠시 후 다시 확인해주세요" : "차곡차곡 모이는 나의 가능성"}</p></div>
    <VillageCharacter pose="save" decorative />
  </section>;
}
