import { FRIEND_SHEETS } from "../../data/friendCharacters";
export default function FriendCharacter({ name = "oli", pose = 0, size, className = "", label, decorative = false }) {
  const sheet = FRIEND_SHEETS[name] || FRIEND_SHEETS.oli;
  const index = Number.isInteger(pose) && pose >= 0 && pose < 3 ? pose : 0;
  const [start, end] = sheet.frames[index];
  return <svg viewBox={`${start - 3} -3 ${end - start + 6} ${sheet.height + 6}`} preserveAspectRatio="xMidYMid meet"
    role={decorative ? undefined : "img"} aria-hidden={decorative || undefined}
    aria-label={decorative ? undefined : label || `${sheet.name} · ${sheet.poses[index]}`}
    className={`friend-character ${className}`} style={size ? { width: size, height: size } : undefined}>
    <image href={sheet.src} width={sheet.width} height={sheet.height} />
  </svg>;
}
