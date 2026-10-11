import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

import { selectTheme, toggleTheme } from "@/redux/reducers/theme";
import { useAppDispatch, useAppSelector } from "@/redux/store";

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
