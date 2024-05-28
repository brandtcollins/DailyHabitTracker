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
  { text: "0 Drinks", color: "bg-red-400", category_id: 1 },
  { text: "1 Drink", color: "bg-lime-600", category_id: 2 },
  { text: "2 Drinks", color: "bg-indigo-400", category_id: 3 },
  { text: "Clear Selection", color: "bg-white", category_id: 0 },
];

export const colorArr = [
  "bg-white",
  "bg-red-400",
  "bg-lime-600",
  "bg-indigo-400",
];
