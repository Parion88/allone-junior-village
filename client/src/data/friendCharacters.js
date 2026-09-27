import oli from "../assets/friends/oli-poses.png";
import woni from "../assets/friends/woni-poses.png";
import danji from "../assets/friends/danji-poses.png";
import dari from "../assets/friends/dari-poses.png";
import kori from "../assets/friends/kori-poses.png";

// Original PNGs remain intact. Each frame isolates one supplied pose, including its hands/props.
export const FRIEND_SHEETS = {
  oli: { src: oli, width: 422, height: 126, name: "올리", frames: [[0,123],[166,261],[315,422]], poses: ["인사", "응원", "금융 안내"] },
  woni: { src: woni, width: 427, height: 124, name: "원이", frames: [[0,116],[143,277],[304,427]], poses: ["인사", "축하", "학사모"] },
  danji: { src: danji, width: 389, height: 97, name: "단지", frames: [[0,69],[143,229],[294,388]], poses: ["하트", "인사", "꽃 선물"] },
  dari: { src: dari, width: 410, height: 126, name: "달리", frames: [[0,94],[165,244],[299,410]], poses: ["생각", "휴대폰", "여행"] },
  kori: { src: kori, width: 430, height: 113, name: "코리", frames: [[0,123],[152,275],[307,430]], poses: ["가방", "인사", "확성기"] },
};

export function missionFriend(title = "") {
  if (/독서|공부|학습|숙제|책\s*읽/.test(title)) return { name: "woni", pose: 2 };
  if (/저축|용돈|돈|은행|계산/.test(title)) return { name: "oli", pose: 2 };
  if (/가족|부모|사랑|감사|선물/.test(title)) return { name: "danji", pose: 0 };
  if (/운동|산책|여행|자전거/.test(title)) return { name: "dari", pose: 2 };
  return { name: "kori", pose: 2 };
}
