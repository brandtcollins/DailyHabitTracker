import { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { CalendarDay, ContextMenuButtons } from "../ts/Interfaces";

interface CalendarDaySquareProps {
  colors: string[];
  children: number | string | ReactElement;
  onContextMenu?: (e: React.MouseEvent) => void;
  category: any;
}

interface ConextMenuProps {
  buttons?: ContextMenuButtons[];
  top: number;
  left: number;
  handleCalendarClick: (leftClick: boolean, category: number) => void;
}

export const ContextMenu: FunctionComponent<ConextMenuProps> = ({
  top,
  left,
  buttons,
  handleCalendarClick,
}) => {
  return (
    <div
      style={{
        display: "block",
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
      }}
    >
      <div className="bg-white w-60 border border-gray-300 rounded-lg flex flex-col text-sm py-4 px-2 text-gray-500 shadow-lg">
        {buttons?.map((button) => (
          <div
            className="flex hover:bg-gray-100 py-1 px-2 rounded items-center"
            id={button.text}
            key={button.text}
            onClick={() => handleCalendarClick(false, button.category)}
          >
            <div className={`w-4 h-4 rounded-sm ${button.color}`}></div>
            <div className="ml-2">{button.text}</div>
          </div>
        ))}
        {/* <hr className="my-3 border-gray-300" />
        <div className="flex hover:bg-gray-100 py-1 px-2 rounded">
          <div className="w-8 text-gray-900 font-bold">B</div>
          <div>*Bold*</div>
        </div>
        <div className="flex hover:bg-gray-100 py-1 px-2 rounded">
          <div className="w-8 text-gray-900 italic">i</div>
          <div>**Italic**</div>
        </div> */}
      </div>
    </div>
  );
};

const CalendarDaySquare: FunctionComponent<CalendarDaySquareProps> = ({
  colors,
  children,
  onContextMenu,
  category,
  handleCalendarClick,
}) => {
  //   const handleClick = () => {
  //     setCount(count + 1);
  //     if (count >= 3) {
  //       setCount(0);
  //     }
  //   };

  return (
    <>
      <div
        className={`w-8 h-8 rounded mb-1 ${colors[category]} flex items-center justify-center`}
        onContextMenu={onContextMenu}
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
