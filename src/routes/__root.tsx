import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

import { loadTheme } from "@/lib/storage";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectTheme, setSystemTheme } from "@/store/themeSlice";

function RootLayout() {
  const dispatch = useAppDispatch();

  const theme = useAppSelector(selectTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      if (!loadTheme()) {
        dispatch(setSystemTheme(e.matches ? "dark" : "light"));
      }
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [dispatch]);

  return (
    <main className="flex flex-col items-center">
      <Outlet />
    </main>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
});
