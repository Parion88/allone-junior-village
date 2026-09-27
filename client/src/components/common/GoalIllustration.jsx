import atlas from "../../assets/village/goal-items.webp";
import { resolveGoalVisual } from "../../data/goalVisuals";
export default function GoalIllustration({ title, emoji, size, className = "", decorative = false }) {
  const item = resolveGoalVisual(title, emoji);
  const accessibility = decorative ? { "aria-hidden": true } : { role: "img", "aria-label": `${item.label} 목표 이미지` };
  const style = size ? { width: size, height: size } : undefined;
  return item.frame ? <svg {...accessibility} data-goal-visual={item.id} viewBox={item.frame.join(" ")} preserveAspectRatio="xMidYMid meet"
    className={`goal-illustration ${className}`} style={style}>
    <image href={atlas} width="1536" height="1024" />
  </svg> : <span {...accessibility} data-goal-visual="custom" className={`goal-illustration goal-emoji ${className}`} style={style}>{item.emoji}</span>;
}
