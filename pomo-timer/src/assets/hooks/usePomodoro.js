import { useEffect, useRef, useState } from "react";
import { clamp } from "../utils/time";

const STORAGE_KEY = "pomo_settings_v1";

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // ignore
  }
}

export function usePomodoro() {
  const saved = loadSettings();

  const [mode, setMode] = useState(saved?.mode ?? "focus"); // "focus" | "break"
  const [focusMinutes, setFocusMinutes] = useState(
    clamp(saved?.focusMinutes ?? 25, 1, 120),
  );
  const [breakMinutes, setBreakMinutes] = useState(
    clamp(saved?.breakMinutes ?? 5, 1, 60),
  );

  const [timeLeft, setTimeLeft] = useState(() => {
    const m = saved?.mode ?? "focus";
    const f = clamp(saved?.focusMinutes ?? 25, 1, 120);
    const b = clamp(saved?.breakMinutes ?? 5, 1, 60);
    return (m === "focus" ? f : b) * 60;
  });

  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(saved?.sessions ?? 0);

  const intervalRef = useRef(null);

  // Simpan setting ke localStorage
  useEffect(() => {
    saveSettings({ mode, focusMinutes, breakMinutes, sessions });
  }, [mode, focusMinutes, breakMinutes, sessions]);

  // Beresin interval kalau component dibuang
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Start / stop interval
  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isRunning]);

  // Kalau timer sampai 0, otomatis pindah mode
  useEffect(() => {
    if (timeLeft !== 0) return;

    setIsRunning(false);

    if (mode === "focus") {
      setSessions((s) => s + 1);
      setMode("break");
      setTimeLeft(breakMinutes * 60);
    } else {
      setMode("focus");
      setTimeLeft(focusMinutes * 60);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  function setModeAndReset(nextMode) {
    setIsRunning(false);
    setMode(nextMode);
    setTimeLeft((nextMode === "focus" ? focusMinutes : breakMinutes) * 60);
  }

  function toggleRun() {
    setIsRunning((r) => !r);
  }

  function reset() {
    setIsRunning(false);
    setTimeLeft((mode === "focus" ? focusMinutes : breakMinutes) * 60);
  }

  function adjustFocus(delta) {
    setFocusMinutes((m) => {
      const next = clamp(m + delta, 1, 120);
      if (mode === "focus" && !isRunning) setTimeLeft(next * 60);
      return next;
    });
  }

  function adjustBreak(delta) {
    setBreakMinutes((m) => {
      const next = clamp(m + delta, 1, 60);
      if (mode === "break" && !isRunning) setTimeLeft(next * 60);
      return next;
    });
  }

  function applyPreset(focusM, breakM) {
    setIsRunning(false);
    setFocusMinutes(clamp(focusM, 1, 120));
    setBreakMinutes(clamp(breakM, 1, 60));
    setTimeLeft((mode === "focus" ? focusM : breakM) * 60);
  }

  const label = mode === "focus" ? "Focus Time" : "Break Time";

  return {
    mode,
    label,
    isRunning,
    timeLeft,
    focusMinutes,
    breakMinutes,
    sessions,
    setModeAndReset,
    toggleRun,
    reset,
    adjustFocus,
    adjustBreak,
    applyPreset,
  };
}
