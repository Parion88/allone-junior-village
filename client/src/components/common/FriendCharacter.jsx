import oli from "../../assets/characters/oli.webp";
import woni from "../../assets/characters/woni.webp";
import danji from "../../assets/characters/danji.webp";
import dari from "../../assets/characters/dari.webp";
import kori from "../../assets/characters/kori.webp";

const CHARACTER_ASSETS = { oli, woni, danji, dari, kori };

/**
 * 분리된 올원프렌즈 캐릭터 이미지를 직접 표시한다.
 * 스프라이트 크롭 방식이 아니라 실제 개별 파일을 사용해 화면 크기와 관계없이 안정적으로 보인다.
 */
export default function FriendCharacter({ name = "oli", size = 72, className = "", label }) {
  const src = CHARACTER_ASSETS[name] || CHARACTER_ASSETS.oli;

  return (
    <img
      src={src}
      alt={label || name}
      className={`inline-block shrink-0 object-contain drop-shadow-sm ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
