import oli from "../assets/characters/oli.webp";
import woni from "../assets/characters/woni.webp";
import danji from "../assets/characters/danji.webp";
import dari from "../assets/characters/dari.webp";
import kori from "../assets/characters/kori.webp";

export const AVATAR_CHARACTERS = [
  { id: "oli-1", src: oli, name: "올리" },
  { id: "oli-2", src: oli, name: "올리" },
  { id: "oli-3", src: oli, name: "올리" },
  { id: "woni-1", src: woni, name: "원이" },
  { id: "woni-2", src: woni, name: "원이" },
  { id: "woni-3", src: woni, name: "원이" },
  { id: "danji-1", src: danji, name: "단지" },
  { id: "danji-2", src: danji, name: "단지" },
  { id: "danji-3", src: danji, name: "단지" },
  { id: "dari-1", src: dari, name: "달리" },
  { id: "dari-2", src: dari, name: "달리" },
  { id: "dari-3", src: dari, name: "달리" },
  { id: "kori-1", src: kori, name: "코리" },
  { id: "kori-2", src: kori, name: "코리" },
  { id: "kori-3", src: kori, name: "코리" },
];

export const DEFAULT_CHILD_AVATAR = AVATAR_CHARACTERS[0].id;
export const AVATAR_CHARACTER_MAP = new Map(AVATAR_CHARACTERS.map((c) => [c.id, c]));
