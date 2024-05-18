import { FunctionComponent } from "react";
import { ContextMenuButtons } from "../ts/Interfaces";

interface ConextMenuProps {
  buttons?: ContextMenuButtons[];
  top: number;
  left: number;
  handleCalendarClick: (category: number) => void;
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
            onClick={() => handleCalendarClick(button.category)}
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
