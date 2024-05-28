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

export interface Category {
  id: number;
  text: string;
  color: string;
  created_at: string;
}
