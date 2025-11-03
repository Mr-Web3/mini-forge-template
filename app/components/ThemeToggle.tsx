"use client";
import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className={
        compact
          ? "px-2 py-1 text-sm rounded-md border border-[#0b55e9] text-foreground/80 hover:text-foreground hover:bg-foreground/5"
          : "px-3 py-1.5 text-sm rounded-md border border-[#0b55e9] text-foreground/80 hover:text-foreground hover:bg-foreground/5"
      }
    >
      {theme === "dark" ? "Dark" : "Light"}
    </button>
  );
}


