export const Q0: string = "q0";
export const BLANK: string = "blank";

export type Phase = {
  id: string;
  name: string;
};

export type Token = {
  id: string;
  name: string;
};

export enum Move {
  Left = "L",
  Stay = "S",
  Right = "R",
}

export type Transition = {
  nextPhaseId?: string;
  nextTokenId?: string;
  move: Move;
};

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
