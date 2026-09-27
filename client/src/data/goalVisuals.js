// Title wins over older/default emoji values. No backend schema or data migration needed.
const categories = [
  { id: "console", label: "게임기", emoji: "🎮", terms: /닌텐도|스위치|게임기|콘솔|플레이\s*스테이션|nintendo|switch|playstation|\bps\s*5\b|xbox/i, frame: [0,0,536,512] },
  { id: "bicycle", label: "자전거", emoji: "🚲", terms: /자전거|bicycle|\bbike\b/i, frame: [536,0,488,512] },
  { id: "headphones", label: "헤드폰", emoji: "🎧", terms: /헤드폰|헤드셋|headphones?|headset/i, frame: [1024,0,512,512] },
  { id: "shoes", label: "운동화", emoji: "👟", terms: /운동화|신발|스니커즈|sneakers?|shoes?/i, frame: [0,512,536,512] },
  { id: "travel", label: "여행", emoji: "✈️", terms: /여행|항공|비행기|제주|여행가방|\b(?:travel|trip|flight)\b/i, frame: [536,512,488,512] },
  { id: "books", label: "책", emoji: "📚", terms: /독서|도서|전집|책\s*(?:읽|구입|구매|사기|세트)|책$|\bbooks?\b/i, frame: [1024,512,512,512] },
];
export const GOAL_VISUALS = categories;
export function resolveGoalVisual(title = "", emoji = "🎯") {
  const normalized = String(title).normalize("NFKC");
  const match = categories.find((item) => item.terms.test(normalized));
  if (match) return { ...match, matchedBy: "title" };
  const fallback = categories.find((item) => item.emoji.replace(/\uFE0F/g, "") === String(emoji).replace(/\uFE0F/g, ""));
  return fallback ? { ...fallback, matchedBy: "emoji" } : { id: "custom", label: title || "저축 목표", emoji: emoji || "🎯", matchedBy: "fallback" };
}
