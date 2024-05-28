import { Database } from "./supabase";

export interface CalendarYear {
  year: number;
  months: CalendarMonth[];
}
export interface CalendarMonth {
  month: number;
  days: CalendarDay[];
}

export interface CalendarDay {
  day: number;
  date: number;
  color: string;
  id: string;
  category: number;
}

export interface ContextMenuButtons {
  text: string;
  color: string;
  category_id: number;
}

// export interface CategoryGroup {
//   id: number;
//   text: string;
//   created_at: string;
//   user_id: number;
// }

export type CategoryGroup =
  Database["public"]["Tables"]["category_groups"]["Row"];
