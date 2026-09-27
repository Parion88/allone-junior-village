export default function CharacterBanner({
  title,
  description,
  actionLabel,
  onAction,
  imageSrc,
  imageAlt = "올리원 캐릭터",
  mood = "welcome",
  compact = false,
}) {
  const moods = {
    welcome: "from-[#E8F8EC] via-[#F6FCE8] to-[#FFF7D6]",
    cheer: "from-[#E8F8EC] via-[#EEFAF1] to-[#E6F4FF]",
    success: "from-[#FFF5C7] via-[#FFF9E4] to-[#E9F8EC]",
    info: "from-[#E6F4FF] via-[#F4FAFF] to-[#E8F8EC]",
  };

  return (
    <section
      className={`relative overflow-hidden rounded-[28px] bg-gradient-to-br ${moods[mood] || moods.welcome} shadow-card ring-1 ring-black/[0.03] ${
        compact ? "p-4" : "p-5"
      }`}
    >
      <div className="relative z-10 flex items-center gap-4">
        <div
          className={`shrink-0 overflow-hidden rounded-[24px] bg-white/85 shadow-sm ring-1 ring-white ${
            compact ? "h-16 w-16" : "h-20 w-20"
          }`}
        >
          {imageSrc ? (
            <img src={imageSrc} alt={imageAlt} className="h-full w-full object-contain p-1" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-4xl" aria-hidden="true">
              🌱
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className={`${compact ? "text-base" : "text-lg"} font-extrabold leading-snug text-[#223127]`}>{title}</p>
          {description ? <p className="mt-1 text-sm leading-5 text-[#617066]">{description}</p> : null}
          {actionLabel ? (
            <button
              type="button"
              onClick={onAction}
              className="mt-3 rounded-full bg-junior-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition active:scale-95"
            >
              {actionLabel}
            </button>
          ) : null}
        </div>
      </div>

      <div className="pointer-events-none absolute -right-7 -top-7 h-24 w-24 rounded-full bg-white/35" />
      <div className="pointer-events-none absolute -bottom-8 right-14 h-20 w-20 rounded-full bg-junior-200/35" />
      <div className="pointer-events-none absolute bottom-4 right-4 text-xl opacity-60" aria-hidden="true">
        ✨
      </div>
    </section>
  );
}
