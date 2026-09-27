import { FRIEND_SHEETS } from "./friendCharacters";

export const AVATAR_CHARACTERS = [
  ...Object.entries({ hello: "노란 새 · 인사", learn: "토끼 · 독서", save: "초록 새 · 저축", celebrate: "노란 새 · 응원", bicycle: "토끼 · 자전거", meal: "초록 새 · 도시락" }).map(([pose, name]) => ({ id: `village-${pose}`, pose, name })),
  ...Object.entries(FRIEND_SHEETS).flatMap(([friend, sheet]) => sheet.poses.map((poseName, index) => ({
    id: `${friend}-${index + 1}`, friend, friendPose: index, name: `${sheet.name} · ${poseName}`,
  }))),
];

export const DEFAULT_CHILD_AVATAR = AVATAR_CHARACTERS[0].id;
export const AVATAR_CHARACTER_MAP = new Map(AVATAR_CHARACTERS.map((c) => [c.id, c]));
