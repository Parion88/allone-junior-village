import Card from "./Card";
import FriendCharacter from "./FriendCharacter";

/** 자녀 화면 공통 잔액 카드. 밝고 부드러운 올원 주니어 톤으로 표시한다. */
export default function BalanceCard({ balance, size = "lg" }) {
  return (
    <Card className="relative overflow-hidden !rounded-[30px] bg-gradient-to-br from-white via-[#FCFFF8] to-[#EFF9DC] !p-5 ring-1 ring-[#DCEFD2]">
      <div className="relative z-10 pr-20">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#E9F7D8] text-lg">👛</span>
          <p className="text-sm font-extrabold text-[#176844]">내 잔액</p>
        </div>

        <p className={`mt-3 font-black tracking-tight text-[#16352A] ${size === "lg" ? "text-[36px]" : "text-2xl"}`}>
          {balance.toLocaleString("ko-KR")}
          <span className="ml-1 text-lg font-extrabold">원</span>
        </p>
        <p className="mt-2 text-xs font-semibold text-[#6C7C72]">미션하고 저축하며 좋은 금융 습관을 만들어요.</p>
      </div>

      <div className="absolute -bottom-2 right-1 z-10 opacity-95">
        <FriendCharacter name="oli" size={92} label="잔액을 응원하는 올리" />
      </div>
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#FFF5B8]/45" />
      <div className="pointer-events-none absolute -bottom-12 left-10 h-24 w-24 rounded-full bg-[#BDE7A1]/25" />
    </Card>
  );
}
