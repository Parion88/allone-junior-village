import atlas from "../../assets/village/friends-atlas.webp";
export const VILLAGE_FRIENDS = {
  hello: { position: "0% 0%", label: "손을 흔드는 노란 새" },
  learn: { position: "50% 0%", label: "책을 읽는 토끼" },
  save: { position: "100% 0%", label: "동전을 모으는 초록 새" },
  celebrate: { position: "0% 100%", label: "별 트로피를 든 노란 새" },
  bicycle: { position: "50% 100%", label: "자전거와 함께하는 토끼" },
  meal: { position: "100% 100%", label: "도시락을 든 초록 새" },
};
/** Six equal atlas cells; keep the whole character visible at every viewport. */
export default function VillageCharacter({ pose = "hello", size, className = "", label, decorative = false }) {
  const friend = VILLAGE_FRIENDS[pose] || VILLAGE_FRIENDS.hello;
  return <span role={decorative ? undefined : "img"} aria-label={decorative ? undefined : label || friend.label}
    aria-hidden={decorative || undefined} className={`village-character ${className}`}
    style={{ backgroundImage: `url(${atlas})`, backgroundPosition: friend.position, ...(size ? { width: size, height: size } : {}) }} />;
}
