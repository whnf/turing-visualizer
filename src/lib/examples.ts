import type { SavedMachine } from "@/lib/storage";

import { BLANK, Q0 } from "@/store/tableSlice";

const blank = { id: BLANK, name: "_" };

export const blankMachine: SavedMachine = {
  id: "",
  title: "",
  description: "",
  updatedAt: 0,
  phases: [{ id: Q0, name: "q0" }],
  tokens: [blank],
  transitions: {},
  cells: {},
  head: 0,
};

export const examples: Record<string, SavedMachine> = {
  "binary-increment": {
    id: "binary-increment",
    title: "Binary increment",
    description: "Adds 1 to a binary number",
    updatedAt: 0,
    phases: [
      { id: Q0, name: "seek" },
      { id: "carry", name: "carry" },
      { id: "done", name: "done" },
    ],
    tokens: [blank, { id: "t0", name: "0" }, { id: "t1", name: "1" }],
    transitions: {
      [Q0]: {
        [BLANK]: { nextPhaseId: "carry", nextTokenId: BLANK, move: "L" },
        t0: { nextPhaseId: Q0, nextTokenId: "t0", move: "R" },
        t1: { nextPhaseId: Q0, nextTokenId: "t1", move: "R" },
      },
      carry: {
        [BLANK]: { nextPhaseId: "done", nextTokenId: "t1", move: "S" },
        t0: { nextPhaseId: "done", nextTokenId: "t1", move: "S" },
        t1: { nextPhaseId: "carry", nextTokenId: "t0", move: "L" },
      },
    },
    cells: { 0: "t1", 1: "t0", 2: "t1", 3: "t1" },
    head: 0,
  },
  "busy-beaver": {
    id: "busy-beaver",
    title: "Busy beaver",
    description: "3 states, halts after 14 steps with six 1s",
    updatedAt: 0,
    phases: [
      { id: Q0, name: "A" },
      { id: "b", name: "B" },
      { id: "c", name: "C" },
      { id: "h", name: "H" },
    ],
    tokens: [blank, { id: "t1", name: "1" }],
    transitions: {
      [Q0]: {
        [BLANK]: { nextPhaseId: "b", nextTokenId: "t1", move: "R" },
        t1: { nextPhaseId: "h", nextTokenId: "t1", move: "R" },
      },
      b: {
        [BLANK]: { nextPhaseId: "c", nextTokenId: BLANK, move: "R" },
        t1: { nextPhaseId: "b", nextTokenId: "t1", move: "R" },
      },
      c: {
        [BLANK]: { nextPhaseId: "c", nextTokenId: "t1", move: "L" },
        t1: { nextPhaseId: Q0, nextTokenId: "t1", move: "L" },
      },
    },
    cells: {},
    head: 0,
  },
  palindrome: {
    id: "palindrome",
    title: "Palindrome",
    description: "Accepts 0110, rejects 0101",
    updatedAt: 0,
    phases: [
      { id: Q0, name: "q0" },
      { id: "q1", name: "q1" },
      { id: "q2", name: "q2" },
      { id: "q3", name: "q3" },
      { id: "q4", name: "q4" },
      { id: "q5", name: "q5" },
      { id: "qa", name: "qa" },
      { id: "qr", name: "qr" },
    ],
    tokens: [
      blank,
      { id: "t0", name: "0" },
      { id: "t1", name: "1" },
      { id: "tx", name: "X" },
    ],
    transitions: {
      [Q0]: {
        [BLANK]: { nextPhaseId: "qa", nextTokenId: BLANK, move: "S" },
        t0: { nextPhaseId: "q1", nextTokenId: "tx", move: "R" },
        t1: { nextPhaseId: "q2", nextTokenId: "tx", move: "R" },
        tx: { nextPhaseId: "qa", nextTokenId: "tx", move: "S" },
      },
      q1: {
        [BLANK]: { nextPhaseId: "q3", nextTokenId: BLANK, move: "L" },
        t0: { nextPhaseId: "q1", nextTokenId: "t0", move: "R" },
        t1: { nextPhaseId: "q1", nextTokenId: "t1", move: "R" },
        tx: { nextPhaseId: "q3", nextTokenId: "tx", move: "L" },
      },
      q2: {
        [BLANK]: { nextPhaseId: "q4", nextTokenId: BLANK, move: "L" },
        t0: { nextPhaseId: "q2", nextTokenId: "t0", move: "R" },
        t1: { nextPhaseId: "q2", nextTokenId: "t1", move: "R" },
        tx: { nextPhaseId: "q4", nextTokenId: "tx", move: "L" },
      },
      q3: {
        [BLANK]: { nextPhaseId: "qa", nextTokenId: BLANK, move: "S" },
        t0: { nextPhaseId: "q5", nextTokenId: "tx", move: "L" },
        t1: { nextPhaseId: "qr", nextTokenId: "t1", move: "S" },
        tx: { nextPhaseId: "qa", nextTokenId: "tx", move: "S" },
      },
      q4: {
        [BLANK]: { nextPhaseId: "qa", nextTokenId: BLANK, move: "S" },
        t0: { nextPhaseId: "qr", nextTokenId: "t0", move: "S" },
        t1: { nextPhaseId: "q5", nextTokenId: "tx", move: "L" },
        tx: { nextPhaseId: "qa", nextTokenId: "tx", move: "S" },
      },
      q5: {
        [BLANK]: {
          nextPhaseId: Q0,
          nextTokenId: BLANK,
          move: "R",
        },
        t0: { nextPhaseId: "q5", nextTokenId: "t0", move: "L" },
        t1: { nextPhaseId: "q5", nextTokenId: "t1", move: "L" },
        tx: { nextPhaseId: Q0, nextTokenId: "tx", move: "R" },
      },
    },
    cells: { 0: "t0", 1: "t1", 2: "t1", 3: "t0" },
    head: 0,
  },
  "unary-double": {
    id: "unary-double",
    title: "Unary double",
    description: "Rewrites n ones as 2n ones",
    updatedAt: 0,
    phases: [
      { id: Q0, name: "mark" },
      { id: "append", name: "append" },
      { id: "return", name: "return" },
      { id: "rewind", name: "rewind" },
      { id: "convert", name: "convert" },
      { id: "done", name: "done" },
    ],
    tokens: [
      blank,
      { id: "t1", name: "1" },
      { id: "tx", name: "X" },
      { id: "ty", name: "Y" },
    ],
    transitions: {
      [Q0]: {
        [BLANK]: { nextPhaseId: "done", nextTokenId: BLANK, move: "S" },
        t1: { nextPhaseId: "append", nextTokenId: "tx", move: "R" },
        ty: { nextPhaseId: "rewind", nextTokenId: "ty", move: "L" },
      },
      append: {
        [BLANK]: { nextPhaseId: "return", nextTokenId: "ty", move: "L" },
        t1: { nextPhaseId: "append", nextTokenId: "t1", move: "R" },
        ty: { nextPhaseId: "append", nextTokenId: "ty", move: "R" },
      },
      return: {
        t1: { nextPhaseId: "return", nextTokenId: "t1", move: "L" },
        tx: { nextPhaseId: Q0, nextTokenId: "tx", move: "R" },
        ty: { nextPhaseId: "return", nextTokenId: "ty", move: "L" },
      },
      rewind: {
        [BLANK]: {
          nextPhaseId: "convert",
          nextTokenId: BLANK,
          move: "R",
        },
        tx: { nextPhaseId: "rewind", nextTokenId: "tx", move: "L" },
      },
      convert: {
        [BLANK]: { nextPhaseId: "done", nextTokenId: BLANK, move: "L" },
        tx: { nextPhaseId: "convert", nextTokenId: "t1", move: "R" },
        ty: { nextPhaseId: "convert", nextTokenId: "t1", move: "R" },
      },
    },
    cells: { 0: "t1", 1: "t1", 2: "t1" },
    head: 0,
  },
};
