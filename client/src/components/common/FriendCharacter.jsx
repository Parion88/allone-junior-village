import alloneFriends from "../../assets/characters/allone-friends.png";

const CHARACTER_POSITION = {
  danji: "7% 86%",
  oli: "32% 88%",
  woni: "61% 88%",
  kori: "94% 86%",
  dari: "50% 4%",
};

/**
 * 올원프렌즈 단체 이미지를 캐릭터별로 크롭해 사용하는 컴포넌트.
 * 별도 이미지 파일이 없어도 단지/올리/원이/코리/달리를 각각 독립 캐릭터처럼 배치할 수 있다.
 */
export default function FriendCharacter({
  name = "oli",
  size = 72,
  className = "",
  label,
}) {
  const position = CHARACTER_POSITION[name] || CHARACTER_POSITION.oli;

  return (
    <span
      role="img"
      aria-label={label || name}
      className={`inline-block shrink-0 bg-no-repeat ${className}`}
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${alloneFriends})`,
        backgroundSize: "330% auto",
        backgroundPosition: position,
      }}
    />
  );
}
