import { formatTime } from "../utils/time";

export default function TimerCard({
  label,
  timeLeft,
  isRunning,
  onToggle,
  onReset,
}) {
  return (
    <section className="mx-auto mt-6 w-full max-w-xl rounded-3xl bg-white/35 p-8 shadow-lg backdrop-blur">
      <div className="mx-auto w-fit rounded-full bg-white/55 px-4 py-2 text-sm font-semibold text-[#d96f5d]">
        {label}
      </div>

      <div className="mt-6 text-center text-7xl font-extrabold tracking-tight text-[#d96f5d]">
        {formatTime(timeLeft)}
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={onToggle}
          className="grid h-12 w-12 place-items-center rounded-full bg-[#f3a59a] text-lg shadow transition hover:-translate-y-0.5 hover:shadow-lg"
          aria-label={isRunning ? "Pause" : "Start"}
          title={isRunning ? "Pause" : "Start"}
        >
          {isRunning ? "❚❚" : "▶"}
        </button>

        <button
          onClick={onReset}
          className="grid h-12 w-12 place-items-center rounded-full bg-white/70 text-lg shadow transition hover:-translate-y-0.5 hover:shadow-lg"
          aria-label="Reset"
          title="Reset"
        >
          ↺
        </button>
      </div>
    </section>
  );
}
