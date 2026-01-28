export default function SettingsCard({
  focusMinutes,
  breakMinutes,
  onFocusMinus,
  onFocusPlus,
  onBreakMinus,
  onBreakPlus,
  onPreset,
}) {
  return (
    <section className="mx-auto mt-6 w-full max-w-xl rounded-3xl bg-white/35 p-6 shadow-lg backdrop-blur">
      <h2 className="text-sm font-bold opacity-80">⏱ Timer Settings</h2>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-[#f8d7d0] p-4">
          <div className="text-xs opacity-70">🎯 Focus</div>
          <div className="mt-2 flex justify-between items-center">
            <button onClick={onFocusMinus}>-</button>
            <span>{focusMinutes} min</span>
            <button onClick={onFocusPlus}>+</button>
          </div>
        </div>

        <div className="rounded-2xl bg-[#d8efe6] p-4">
          <div className="text-xs opacity-70">☕ Break</div>
          <div className="mt-2 flex justify-between items-center">
            <button onClick={onBreakMinus}>-</button>
            <span>{breakMinutes} min</span>
            <button onClick={onBreakPlus}>+</button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2 flex-wrap">
        <button onClick={() => onPreset(25, 5)}>25/5</button>
        <button onClick={() => onPreset(50, 10)}>50/10</button>
        <button onClick={() => onPreset(15, 3)}>15/3</button>
      </div>
    </section>
  );
}
