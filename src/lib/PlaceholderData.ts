import { ContextMenuButtons } from "../ts/Interfaces";

export const months = [
  "J",
  "F",
  "M",
  "A",
  "M",
  "J",
  "J",
  "A",
  "S",
  "O",
  "N",
  "D",
];

export const days = ["S", "M", "T", "W", "T", "F", "S"];

export const contextMenuButtons: ContextMenuButtons[] = [
  { text: "0 Drinks", color: "bg-red-400", category: 1 },
  { text: "1 Drink", color: "bg-lime-600", category: 2 },
  { text: "2 Drinks", color: "bg-indigo-400", category: 3 },
  { text: "Clear Selection", color: "bg-white", category: 0 },
];
