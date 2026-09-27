// 자녀 계정 대표 캐릭터 목록.
// 공식 캐릭터 이미지 파일이 프로젝트에 포함되지 않은 환경에서도 앱이 실행되도록
// 이미지 import 대신 안전한 이모지 fallback을 사용한다.
export const AVATAR_CHARACTERS = [
  { id: "oli-1", emoji: "🌱", name: "올리" },
  { id: "oli-2", emoji: "🍀", name: "올리" },
  { id: "oli-3", emoji: "🌿", name: "올리" },
  { id: "woni-1", emoji: "🐥", name: "원이" },
  { id: "woni-2", emoji: "⭐", name: "원이" },
  { id: "woni-3", emoji: "🌟", name: "원이" },
  { id: "danji-1", emoji: "🐰", name: "단지" },
  { id: "danji-2", emoji: "🎀", name: "단지" },
  { id: "danji-3", emoji: "🌸", name: "단지" },
  { id: "dari-1", emoji: "🐶", name: "달리" },
  { id: "dari-2", emoji: "🏃", name: "달리" },
  { id: "dari-3", emoji: "💚", name: "달리" },
  { id: "kori-1", emoji: "🐻", name: "코리" },
  { id: "kori-2", emoji: "🧸", name: "코리" },
  { id: "kori-3", emoji: "🍯", name: "코리" },
];

export const DEFAULT_CHILD_AVATAR = AVATAR_CHARACTERS[0].id;

export const AVATAR_CHARACTER_MAP = new Map(AVATAR_CHARACTERS.map((c) => [c.id, c]));
