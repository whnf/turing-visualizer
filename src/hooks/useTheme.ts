import { useEffect, useState, useSyncExternalStore } from "react";

import { loadTheme, saveTheme } from "@/lib/storage";

const media = window.matchMedia("(prefers-color-scheme: dark)");

const subscribe = (onChange: () => void) => {
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};

export const useTheme = () => {
  const [stored, setStored] = useState(loadTheme);

  const systemDark = useSyncExternalStore(subscribe, () => media.matches);

  const theme = stored ?? (systemDark ? "dark" : "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";

    saveTheme(next);
    setStored(next);
  };

  return { theme, toggleTheme };
};
