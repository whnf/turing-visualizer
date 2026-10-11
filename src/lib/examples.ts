import { BLANK, Move, Q0, type Machine } from "@/lib/machine";

export const examples: Record<string, Machine> = {
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
    tokens: [
      { id: BLANK, name: "_" },
      { id: "t0", name: "0" },
      { id: "t1", name: "1" },
    ],
    transitions: {
      [Q0]: {
        [BLANK]: { nextPhaseId: "carry", nextTokenId: BLANK, move: Move.Left },
        t0: { nextPhaseId: Q0, nextTokenId: "t0", move: Move.Right },
        t1: { nextPhaseId: Q0, nextTokenId: "t1", move: Move.Right },
      },
      carry: {
        [BLANK]: { nextPhaseId: "done", nextTokenId: "t1", move: Move.Stay },
        t0: { nextPhaseId: "done", nextTokenId: "t1", move: Move.Stay },
        t1: { nextPhaseId: "carry", nextTokenId: "t0", move: Move.Left },
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
    tokens: [
      { id: BLANK, name: "_" },
      { id: "t1", name: "1" },
    ],
    transitions: {
      [Q0]: {
        [BLANK]: { nextPhaseId: "b", nextTokenId: "t1", move: Move.Right },
        t1: { nextPhaseId: "h", nextTokenId: "t1", move: Move.Right },
      },
      b: {
        [BLANK]: { nextPhaseId: "c", nextTokenId: BLANK, move: Move.Right },
        t1: { nextPhaseId: "b", nextTokenId: "t1", move: Move.Right },
      },
      c: {
        [BLANK]: { nextPhaseId: "c", nextTokenId: "t1", move: Move.Left },
        t1: { nextPhaseId: Q0, nextTokenId: "t1", move: Move.Left },
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
      { id: BLANK, name: "_" },
      { id: "t0", name: "0" },
      { id: "t1", name: "1" },
      { id: "tx", name: "X" },
    ],
    transitions: {
      [Q0]: {
        [BLANK]: { nextPhaseId: "qa", nextTokenId: BLANK, move: Move.Stay },
        t0: { nextPhaseId: "q1", nextTokenId: "tx", move: Move.Right },
        t1: { nextPhaseId: "q2", nextTokenId: "tx", move: Move.Right },
        tx: { nextPhaseId: "qa", nextTokenId: "tx", move: Move.Stay },
      },
      q1: {
        [BLANK]: { nextPhaseId: "q3", nextTokenId: BLANK, move: Move.Left },
        t0: { nextPhaseId: "q1", nextTokenId: "t0", move: Move.Right },
        t1: { nextPhaseId: "q1", nextTokenId: "t1", move: Move.Right },
        tx: { nextPhaseId: "q3", nextTokenId: "tx", move: Move.Left },
      },
      q2: {
        [BLANK]: { nextPhaseId: "q4", nextTokenId: BLANK, move: Move.Left },
        t0: { nextPhaseId: "q2", nextTokenId: "t0", move: Move.Right },
        t1: { nextPhaseId: "q2", nextTokenId: "t1", move: Move.Right },
        tx: { nextPhaseId: "q4", nextTokenId: "tx", move: Move.Left },
      },
      q3: {
        [BLANK]: { nextPhaseId: "qa", nextTokenId: BLANK, move: Move.Stay },
        t0: { nextPhaseId: "q5", nextTokenId: "tx", move: Move.Left },
        t1: { nextPhaseId: "qr", nextTokenId: "t1", move: Move.Stay },
        tx: { nextPhaseId: "qa", nextTokenId: "tx", move: Move.Stay },
      },
      q4: {
        [BLANK]: { nextPhaseId: "qa", nextTokenId: BLANK, move: Move.Stay },
        t0: { nextPhaseId: "qr", nextTokenId: "t0", move: Move.Stay },
        t1: { nextPhaseId: "q5", nextTokenId: "tx", move: Move.Left },
        tx: { nextPhaseId: "qa", nextTokenId: "tx", move: Move.Stay },
      },
      q5: {
        [BLANK]: {
          nextPhaseId: Q0,
          nextTokenId: BLANK,
          move: Move.Right,
        },
        t0: { nextPhaseId: "q5", nextTokenId: "t0", move: Move.Left },
        t1: { nextPhaseId: "q5", nextTokenId: "t1", move: Move.Left },
        tx: { nextPhaseId: Q0, nextTokenId: "tx", move: Move.Right },
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
      { id: BLANK, name: "_" },
      { id: "t1", name: "1" },
      { id: "tx", name: "X" },
      { id: "ty", name: "Y" },
    ],
    transitions: {
      [Q0]: {
        [BLANK]: { nextPhaseId: "done", nextTokenId: BLANK, move: Move.Stay },
        t1: { nextPhaseId: "append", nextTokenId: "tx", move: Move.Right },
        ty: { nextPhaseId: "rewind", nextTokenId: "ty", move: Move.Left },
      },
      append: {
        [BLANK]: { nextPhaseId: "return", nextTokenId: "ty", move: Move.Left },
        t1: { nextPhaseId: "append", nextTokenId: "t1", move: Move.Right },
        ty: { nextPhaseId: "append", nextTokenId: "ty", move: Move.Right },
      },
      return: {
        t1: { nextPhaseId: "return", nextTokenId: "t1", move: Move.Left },
        tx: { nextPhaseId: Q0, nextTokenId: "tx", move: Move.Right },
        ty: { nextPhaseId: "return", nextTokenId: "ty", move: Move.Left },
      },
      rewind: {
        [BLANK]: {
          nextPhaseId: "convert",
          nextTokenId: BLANK,
          move: Move.Right,
        },
        tx: { nextPhaseId: "rewind", nextTokenId: "tx", move: Move.Left },
      },
      convert: {
        [BLANK]: { nextPhaseId: "done", nextTokenId: BLANK, move: Move.Left },
        tx: { nextPhaseId: "convert", nextTokenId: "t1", move: Move.Right },
        ty: { nextPhaseId: "convert", nextTokenId: "t1", move: Move.Right },
      },
    },
    cells: { 0: "t1", 1: "t1", 2: "t1" },
    head: 0,
  },
};
