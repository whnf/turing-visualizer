import { type SavedMachine } from "@/lib/storage";
import { type ID, BLANK_ID, INITIAL_ID } from "@/store/tableSlice";

const blank = { id: BLANK_ID, name: "_" };

export const blankMachine: SavedMachine = {
  id: "",
  title: "",
  description: "",
  updatedAt: 0,
  phases: [{ id: INITIAL_ID, name: "q0" }],
  tokens: [blank],
  transitions: {},
  cells: {},
  head: 0,
};

export const examples: Record<ID, SavedMachine> = {
  "binary-increment": {
    id: "binary-increment",
    title: "Binary increment",
    description: "Adds 1 to a binary number",
    updatedAt: 0,
    phases: [
      { id: INITIAL_ID, name: "seek" },
      { id: "carry", name: "carry" },
      { id: "done", name: "done" },
    ],
    tokens: [blank, { id: "t0", name: "0" }, { id: "t1", name: "1" }],
    transitions: {
      [INITIAL_ID]: {
        [BLANK_ID]: { nextPhaseId: "carry", nextTokenId: BLANK_ID, move: "L" },
        t0: { nextPhaseId: INITIAL_ID, nextTokenId: "t0", move: "R" },
        t1: { nextPhaseId: INITIAL_ID, nextTokenId: "t1", move: "R" },
      },
      carry: {
        [BLANK_ID]: { nextPhaseId: "done", nextTokenId: "t1", move: "S" },
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
      { id: INITIAL_ID, name: "A" },
      { id: "b", name: "B" },
      { id: "c", name: "C" },
      { id: "h", name: "H" },
    ],
    tokens: [blank, { id: "t1", name: "1" }],
    transitions: {
      [INITIAL_ID]: {
        [BLANK_ID]: { nextPhaseId: "b", nextTokenId: "t1", move: "R" },
        t1: { nextPhaseId: "h", nextTokenId: "t1", move: "R" },
      },
      b: {
        [BLANK_ID]: { nextPhaseId: "c", nextTokenId: BLANK_ID, move: "R" },
        t1: { nextPhaseId: "b", nextTokenId: "t1", move: "R" },
      },
      c: {
        [BLANK_ID]: { nextPhaseId: "c", nextTokenId: "t1", move: "L" },
        t1: { nextPhaseId: INITIAL_ID, nextTokenId: "t1", move: "L" },
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
      { id: INITIAL_ID, name: "q0" },
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
      [INITIAL_ID]: {
        [BLANK_ID]: { nextPhaseId: "qa", nextTokenId: BLANK_ID, move: "S" },
        t0: { nextPhaseId: "q1", nextTokenId: "tx", move: "R" },
        t1: { nextPhaseId: "q2", nextTokenId: "tx", move: "R" },
        tx: { nextPhaseId: "qa", nextTokenId: "tx", move: "S" },
      },
      q1: {
        [BLANK_ID]: { nextPhaseId: "q3", nextTokenId: BLANK_ID, move: "L" },
        t0: { nextPhaseId: "q1", nextTokenId: "t0", move: "R" },
        t1: { nextPhaseId: "q1", nextTokenId: "t1", move: "R" },
        tx: { nextPhaseId: "q3", nextTokenId: "tx", move: "L" },
      },
      q2: {
        [BLANK_ID]: { nextPhaseId: "q4", nextTokenId: BLANK_ID, move: "L" },
        t0: { nextPhaseId: "q2", nextTokenId: "t0", move: "R" },
        t1: { nextPhaseId: "q2", nextTokenId: "t1", move: "R" },
        tx: { nextPhaseId: "q4", nextTokenId: "tx", move: "L" },
      },
      q3: {
        [BLANK_ID]: { nextPhaseId: "qa", nextTokenId: BLANK_ID, move: "S" },
        t0: { nextPhaseId: "q5", nextTokenId: "tx", move: "L" },
        t1: { nextPhaseId: "qr", nextTokenId: "t1", move: "S" },
        tx: { nextPhaseId: "qa", nextTokenId: "tx", move: "S" },
      },
      q4: {
        [BLANK_ID]: { nextPhaseId: "qa", nextTokenId: BLANK_ID, move: "S" },
        t0: { nextPhaseId: "qr", nextTokenId: "t0", move: "S" },
        t1: { nextPhaseId: "q5", nextTokenId: "tx", move: "L" },
        tx: { nextPhaseId: "qa", nextTokenId: "tx", move: "S" },
      },
      q5: {
        [BLANK_ID]: {
          nextPhaseId: INITIAL_ID,
          nextTokenId: BLANK_ID,
          move: "R",
        },
        t0: { nextPhaseId: "q5", nextTokenId: "t0", move: "L" },
        t1: { nextPhaseId: "q5", nextTokenId: "t1", move: "L" },
        tx: { nextPhaseId: INITIAL_ID, nextTokenId: "tx", move: "R" },
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
      { id: INITIAL_ID, name: "mark" },
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
      [INITIAL_ID]: {
        [BLANK_ID]: { nextPhaseId: "done", nextTokenId: BLANK_ID, move: "S" },
        t1: { nextPhaseId: "append", nextTokenId: "tx", move: "R" },
        ty: { nextPhaseId: "rewind", nextTokenId: "ty", move: "L" },
      },
      append: {
        [BLANK_ID]: { nextPhaseId: "return", nextTokenId: "ty", move: "L" },
        t1: { nextPhaseId: "append", nextTokenId: "t1", move: "R" },
        ty: { nextPhaseId: "append", nextTokenId: "ty", move: "R" },
      },
      return: {
        t1: { nextPhaseId: "return", nextTokenId: "t1", move: "L" },
        tx: { nextPhaseId: INITIAL_ID, nextTokenId: "tx", move: "R" },
        ty: { nextPhaseId: "return", nextTokenId: "ty", move: "L" },
      },
      rewind: {
        [BLANK_ID]: {
          nextPhaseId: "convert",
          nextTokenId: BLANK_ID,
          move: "R",
        },
        tx: { nextPhaseId: "rewind", nextTokenId: "tx", move: "L" },
      },
      convert: {
        [BLANK_ID]: { nextPhaseId: "done", nextTokenId: BLANK_ID, move: "L" },
        tx: { nextPhaseId: "convert", nextTokenId: "t1", move: "R" },
        ty: { nextPhaseId: "convert", nextTokenId: "t1", move: "R" },
      },
    },
    cells: { 0: "t1", 1: "t1", 2: "t1" },
    head: 0,
  },
};
