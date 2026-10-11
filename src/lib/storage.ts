import type { Machine } from "@/lib/machine";

const read = <T>(key: string, fallback: T): T => {
  const raw = localStorage.getItem(key);

  return raw === null ? fallback : JSON.parse(raw);
};

const write = (key: string, value: unknown): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

const MACHINES_KEY = "turing-visualizer:machines";

const readMachines = () => read<Record<string, Machine>>(MACHINES_KEY, {});

export const loadMachines = (): Machine[] => {
  return Object.values(readMachines()).sort(
    (a, b) => b.updatedAt - a.updatedAt,
  );
};

export const loadMachine = (id: string): Machine | undefined => {
  return readMachines()[id];
};

export const saveMachine = (machine: Machine): void => {
  write(MACHINES_KEY, { ...readMachines(), [machine.id]: machine });
};

export const deleteMachine = (id: string): void => {
  const machines = readMachines();
  delete machines[id];
  write(MACHINES_KEY, machines);
};

const SPEED_KEY = "turing-visualizer:speed";

export const loadSpeed = (): number => read(SPEED_KEY, 1);

export const saveSpeed = (speed: number): void => {
  write(SPEED_KEY, speed);
};

const THEME_KEY = "turing-visualizer:theme";

export type Theme = "light" | "dark";

export const loadTheme = (): Theme | null => read(THEME_KEY, null);

export const saveTheme = (theme: Theme): void => {
  write(THEME_KEY, theme);
};
