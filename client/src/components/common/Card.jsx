export default function Card({ children, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.target !== e.currentTarget) return; if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(e); } } : undefined}
      className={`village-card bg-gradient-to-b from-white to-gray-50/60 rounded-2xl shadow-card ring-1 ring-black/[0.03] p-4 ${
        onClick ? "cursor-pointer active:scale-[0.98] active:shadow-none transition-all" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
