import { FunctionComponent, ReactElement } from "react";
import { CalendarDay } from "../ts/Interfaces";

interface CalendarDaySquareProps {
  colors: string[];
  children: number | string | ReactElement;
  onContextMenu?: (e: React.MouseEvent) => void;
  category: any;
  onClick?: () => void;
  day: CalendarDay;
}

const CalendarDaySquare: FunctionComponent<CalendarDaySquareProps> = ({
  colors,
  children,
  onContextMenu,
  category,
  onClick,
  day,
}) => {
  return (
    <>
      <div
        className={`w-8 h-8 rounded mb-1 ${colors[category]} flex items-center justify-center`}
        onContextMenu={onContextMenu}
        onClick={onClick}
      >
        <span
          className={`${category === 0 ? "text-black" : "text-white"} text-xs`}
        >
          {children}
        </span>
      </div>
    </>
  );
};

export default CalendarDaySquare;
