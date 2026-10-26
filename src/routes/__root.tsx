import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

import { Footer } from "@/components/Footer";

import { loadTheme } from "@/lib/storage";

import { selectTheme, setSystemTheme } from "@/redux/reducers/theme";
import { useAppDispatch, useAppSelector } from "@/redux/store";

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
    <div className="flex min-h-svh flex-col items-center">
      <main className="flex w-full flex-1 flex-col items-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
});
