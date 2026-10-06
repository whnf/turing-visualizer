import {
  type ID,
  type Phase,
  type Token,
  type Transition,
} from "@/store/tableSlice";

export type SavedMachine = {
  id: ID;
  title: string;
  description: string;
  updatedAt: number;
  phases: Phase[];
  tokens: Token[];
  transitions: Record<ID, Record<ID, Transition>>;
  cells: Record<number, ID>;
  head: number;
};

const KEY = "turing-visualizer:machines";

const read = (): Record<ID, SavedMachine> =>
  JSON.parse(localStorage.getItem(KEY) ?? "{}");

const write = (machines: Record<ID, SavedMachine>): void => {
  localStorage.setItem(KEY, JSON.stringify(machines));
};

export const listMachines = (): SavedMachine[] => {
  return Object.values(read()).sort((a, b) => b.updatedAt - a.updatedAt);
};

export const getMachine = (id: ID): SavedMachine | undefined => {
  return read()[id];
};

export const saveMachine = (machine: SavedMachine): void => {
  write({ ...read(), [machine.id]: machine });
};

export const deleteMachine = (id: ID): void => {
  const machines = read();
  delete machines[id];
  write(machines);
};
