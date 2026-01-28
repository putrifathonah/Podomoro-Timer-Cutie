export default function ModeTabs({ mode, onChange }) {
  return (
    <div className="mx-auto flex w-fit gap-2 rounded-full bg-white/40 p-1 shadow-sm backdrop-blur">
      <button
        onClick={() => onChange("focus")}
        className={[
          "rounded-full px-6 py-2 text-sm font-semibold transition",
          mode === "focus"
            ? "bg-[#f3a59a] shadow"
            : "opacity-70 hover:bg-white/50",
        ].join(" ")}
      >
        ⏳ Focus
      </button>

      <button
        onClick={() => onChange("break")}
        className={[
          "rounded-full px-6 py-2 text-sm font-semibold transition",
          mode === "break"
            ? "bg-white/70 shadow"
            : "opacity-70 hover:bg-white/50",
        ].join(" ")}
      >
        ☕ Break
      </button>
    </div>
  );
}
