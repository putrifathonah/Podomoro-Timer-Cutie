import ModeTabs from "./components/ModeTabs.jsx";
import TimerCard from "./components/TimerCard.jsxs";
import { usePomodoro } from "./hooks/usePomodoro.js";
import SettingsCard from "./components/SettingsCard.jsx";

export default function App() {
  const {
    mode,
    label,
    isRunning,
    timeLeft,
    sessions,
    setModeAndReset,
    toggleRun,
    reset,
  } = usePomodoro();

  return (
    <div className="min-h-screen bg-[#fbf3ef] text-[#4b3a34]">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold">🍓 Pomo Timer</h1>
          <p className="mt-2 text-sm opacity-70">
            Stay focused, take breaks! ✨
          </p>
        </header>

        <main className="mt-8">
          <ModeTabs mode={mode} onChange={setModeAndReset} />

          <TimerCard
            label={label}
            timeLeft={timeLeft}
            isRunning={isRunning}
            onToggle={toggleRun}
            onReset={reset}
          />

          <p className="mt-4 text-center text-sm opacity-70">
            Sessions completed: {sessions} 🎉
          </p>
        </main>

        <footer className="mt-10 text-center text-xs opacity-60">
          Made with 💖 for productivity
        </footer>
      </div>
    </div>
  );
}
