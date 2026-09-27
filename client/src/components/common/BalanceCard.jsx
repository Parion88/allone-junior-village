import Card from "./Card";

/** 자녀 화면 공통 잔액 카드. 금융앱의 신뢰감은 유지하면서 아이가 보기 쉬운 카드형 정보 구조로 표시한다. */
export default function BalanceCard({ balance, size = "lg" }) {
  return (
    <Card className="relative overflow-hidden !rounded-[28px] bg-gradient-to-br from-[#1F7A43] via-[#2FAE55] to-[#63CB7D] !p-5 text-white ring-0">
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-white/75">내 용돈 지갑</p>
            <p className="mt-1 text-sm font-semibold text-white/90">차곡차곡 모은 내 돈이에요</p>
          </div>
          <span className="rounded-full bg-white/16 px-3 py-1 text-[11px] font-extrabold text-white ring-1 ring-white/20">
            안전하게 보관 중
          </span>
        </div>

        <p className={`mt-5 font-black tracking-tight ${size === "lg" ? "text-[34px]" : "text-2xl"}`}>
          {balance.toLocaleString("ko-KR")}
          <span className="ml-1 text-lg font-extrabold">원</span>
        </p>

        <div className="mt-4 flex items-center gap-2 text-xs font-bold text-white/85">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">💚</span>
          <span>미션과 저축으로 좋은 금융 습관을 만들어봐요</span>
        </div>
      </div>

      <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-14 right-8 h-32 w-32 rounded-full bg-[#FFD54A]/18" />
      <div className="pointer-events-none absolute bottom-4 right-5 text-5xl opacity-20" aria-hidden="true">
        🪙
      </div>
    </Card>
  );
}
