import VillageCharacter from "./VillageCharacter";
const scenes = {
  "나의 미션": ["오늘도 한 뼘 더 성장!", "작은 약속을 지키고 용돈도 모아봐요.", "celebrate", "lemon"],
  "저축 목표": ["내 꿈에 조금씩 가까이", "갖고 싶은 것을 정하고 차곡차곡 저축해요.", "bicycle", "mint"],
  "금융교육": ["궁금한 돈 이야기, 함께 배워요", "책 한 장, 퀴즈 하나로 자라는 금융 습관.", "learn", "sky"],
  "배움 콘텐츠": ["토끼와 함께하는 돈 이야기", "천천히 읽고, 다음 이야기로 넘어가요.", "learn", "sky"],
  "오늘의 퀴즈": ["오늘의 금융 탐험", "하루 세 문제! 생각하는 힘을 길러봐요.", "celebrate", "lemon"],
  "매달의 출석현황": ["꾸준히 쌓아가는 배움", "하루하루의 도전이 멋진 습관이 돼요.", "hello", "peach"],
  "급식메뉴": ["오늘은 어떤 맛있는 하루?", "우리 학교의 급식 메뉴를 확인해요.", "meal", "peach"],
  "설정": ["나만의 빌리지를 꾸며요", "내 캐릭터와 계정 정보를 관리해요.", "hello", "mint"],
  "미션 관리": ["작은 약속에서 시작하는 성장", "아이에게 맞는 미션과 보상을 정해주세요.", "celebrate", "sky"],
  "자녀 계정 관리": ["우리 가족, 함께 자라는 마을", "아이의 프로필과 학교를 관리해주세요.", "hello", "sky"],
  "알림함": ["우리 아이의 새로운 소식", "미션과 용돈 소식을 한곳에서 확인해요.", "save", "sky"],
  "심부름 지폐 계산": ["돈 계산, 놀이처럼 재미있게!", "금액 맞추기부터 장보기까지 도전해봐요.", "save", "lemon"],
};
export default function VillageIntro({ title, description, pose, tone, compact = false }) {
  const scene = scenes[title] || [title, description, pose || "hello", tone || "mint"];
  return <section className={`village-intro scene-${tone || scene[3]} ${compact ? "is-compact" : ""}`}>
    <div className="village-intro-copy"><span className="village-eyebrow">올원 주니어빌리지</span>
      <h2>{scene[0]}</h2><p>{description || scene[1]}</p></div>
    <VillageCharacter pose={pose || scene[2]} className="village-intro-friend" decorative />
  </section>;
}
