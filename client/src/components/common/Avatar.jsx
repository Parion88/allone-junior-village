import FriendCharacter from "./FriendCharacter";
import VillageCharacter from "./VillageCharacter";
import { AVATAR_CHARACTER_MAP } from "../../data/avatarCharacters";

/**
 * 유저의 avatarEmoji 값을 보여준다.
 * 캐릭터 id가 이미지 src를 가지면 이미지로, 그렇지 않으면 emoji fallback으로 표시한다.
 * 기존 데이터처럼 일반 이모지 문자열이 들어와도 그대로 표시한다.
 */
export default function Avatar({ value, className = "w-8 h-8", textClassName = "" }) {
  const character = AVATAR_CHARACTER_MAP.get(value);

  if (character?.friend) return <span className={`inline-flex rounded-full bg-white shrink-0 ${className}`}><FriendCharacter name={character.friend} pose={character.friendPose} className="avatar-friend" label={character.name} /></span>;

  if (character?.pose) return <span className={`inline-flex rounded-full bg-white shrink-0 ${className}`}><VillageCharacter pose={character.pose} className="avatar-friend" label={character.name} /></span>;

  if (character?.src) {
    return (
      <img
        src={character.src}
        alt={character.name}
        className={`inline-block rounded-full object-cover bg-white shrink-0 ${className}`}
      />
    );
  }

  if (character?.emoji) {
    return (
      <span
        role="img"
        aria-label={character.name}
        className={`inline-flex items-center justify-center rounded-full bg-white shrink-0 ${className} ${textClassName}`}
      >
        {character.emoji}
      </span>
    );
  }

  return <span className={textClassName}>{value || "🌱"}</span>;
}
