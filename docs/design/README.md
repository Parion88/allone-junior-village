# 올원 주니어빌리지 테마 리디자인

2026-09-27. 사용자 제공 메인 예시의 파스텔 카드와 마을 테마를 로그인부터 부모 관리까지 적용했습니다.

## 화면 구성

| 화면 | 변경 내용 |
| --- | --- |
| 로그인 / PIN | 원본 마을 테마 배너, 프로필 카드, 둥근 키패드 |
| 자녀 홈 | 마을 풍경 → 인사 → 실제 잔액 → 미션·게임·퀴즈 → 교육 → 저축 목표 → 급식·게임 → 거래내역 |
| 미션 | 노란 새의 응원 장면, 공통 헤더와 카드 |
| 저축 | 자전거 토끼, 잔액·진행률·목표 생성 폼 |
| 금융교육 / 배움 / 퀴즈 / 출석 | 독서 토끼와 응원 캐릭터, 화면별 안내와 카드 |
| 게임 | 난이도별 캐릭터, 플레이·결과·랭킹 색상 통일, 플레이 중 안내 배너 생략 |
| 급식 / 설정 | 도시락 초록 새 / 인사 캐릭터, 새로운 프로필 6종 추가 |
| 부모 홈 / 미션 / 자녀 / 알림 | 같은 마을의 파란색 계열 안내, 관리 카드와 하단 메뉴 |

하단 메뉴는 자녀/부모 역할에 맞게 표시하고 현재 경로를 강조합니다. 화면 전환 시 스크롤을 위로 이동합니다. 기존 15개 캐릭터 ID와 이모지 프로필은 그대로 지원합니다. 잔액 및 보상은 실제 API 응답을 사용하며 예시 화면의 금액이나 포인트를 고정하지 않았습니다.

## 이미지

- `client/src/assets/village/village-theme.webp`: 사용자 제공 `KakaoTalk_20260927_221519369(1).png`를 픽셀 수정 없이 무손실 WebP로 변환.
- `client/src/assets/village/friends-atlas.webp`: 위 이미지를 참조해 built-in ImageGen으로 제작한 투명 3×2 아틀라스. 인사하는 노란 새 / 책 읽는 토끼 / 동전 초록 새 / 트로피 노란 새 / 자전거 토끼 / 도시락 초록 새. 생성 PNG를 무손실 WebP로 변환하고 알파를 보존.
- `VillageCharacter.jsx`가 동일 크기의 셀을 CSS 배경 위치로 표시합니다. 캐릭터와 글자는 그리드에서 별도 영역을 차지합니다.
- 로그인에서 읽을 수 없던 `allone-friends.png` 대신 검증된 새 마을 이미지를 사용합니다. 기존 개별 WebP 캐릭터 파일은 정상이며 계속 사용합니다.

### ImageGen prompt

> Create ONE transparent PNG sprite atlas asset for a children's finance app, using EXACT three character identities and glossy soft 3D storybook style in the reference: yellow chick with leaf tuft green hoodie, white rabbit with leaf bow green overalls, round green bird white face yellow crossbody bag. Atlas 1536x1024 landscape 3 columns x 2 rows of equally sized SQUARE cells. Each complete character and its small prop centered inside its own cell with generous transparent padding 12% all sides, no overlap between cells, consistent size, all feet and ears visible. Transparent background absolutely no white or checkerboard printed, no panels, no text no labels. Top row left: yellow chick waving hello; top middle: white rabbit reading a teal book; top right: green bird holding a gold coin. Bottom row left: yellow chick proudly holding a gold star trophy; bottom middle: white rabbit wearing small yellow bicycle helmet beside a tiny teal bicycle; bottom right: green bird holding a lunch basket. Preserve reference clothing and face details; soft contact shadow only under feet. This is a SINGLE cohesive six-cell atlas, not a UI mockup.

## 검증 범위

- `npm ci --ignore-scripts` 및 `npm run build --workspace client` 성공.
- Playwright + Chromium에서 모의 API로 로그인·자녀·부모 17개 화면 렌더링: 이미지 누락, 가로 넘침, JS 예외 없음.
- 메인과 설정: 320 / 360 / 390 / 480 / 1280px 너비 확인.
- 퀴즈 답변 피드백, 프로필 캐릭터 변경, 게임 난이도 선택·플레이 진입·랭킹, 저축 목표 폼·부모 미션 폼 확인.
- `git diff --check` 통과.
- 아래 미리보기는 실제 React 화면을 모의 데이터로 캡처한 것입니다. 운영 서버의 인증, 저장, 이체 및 배포는 검증 범위에 포함하지 않습니다.

## 미리보기

[메인](preview-home.png) · [미션](preview-missions.png) · [저축](preview-savings.png) · [교육](preview-education.png) · [부모 홈](preview-parent.png)
