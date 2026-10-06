import type { Phase, Token, Transition } from "@/store/tableSlice";

export type SavedMachine = {
  id: string;
  title: string;
  description: string;
  updatedAt: number;
  phases: Phase[];
  tokens: Token[];
  transitions: Record<string, Record<string, Transition>>;
  cells: Record<number, string>;
  head: number;
};

const KEY = "turing-visualizer:machines";

const read = (): Record<string, SavedMachine> =>
  JSON.parse(localStorage.getItem(KEY) ?? "{}");

const write = (machines: Record<string, SavedMachine>): void => {
  localStorage.setItem(KEY, JSON.stringify(machines));
};

export const listMachines = (): SavedMachine[] => {
  return Object.values(read()).sort((a, b) => b.updatedAt - a.updatedAt);
};

export const getMachine = (id: string): SavedMachine | undefined => {
  return read()[id];
};

export const saveMachine = (machine: SavedMachine): void => {
  write({ ...read(), [machine.id]: machine });
};

export const deleteMachine = (id: string): void => {
  const machines = read();
  delete machines[id];
  write(machines);
};
