import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectTheme, toggleTheme } from "@/store/themeSlice";

export function ThemeToggle() {
  const dispatch = useAppDispatch();

  const theme = useAppSelector(selectTheme);

  const handleClick = () => {
    dispatch(toggleTheme());
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleClick}
      aria-pressed={theme === "dark"}
    >
      {theme === "dark" ? <Moon /> : <Sun />}
    </Button>
  );
}
