import { useId, useEffect, useState } from "react";
import "./App.css";
import CalendarDaySquare, { ContextMenu } from "./components/CalendarDaySquare";
import { CalendarDay, CalendarMonth } from "./ts/Interfaces";
import { contextMenuButtons, days, months } from "./lib/PlaceholderData";

function App() {
  const date = new Date();

  const [year, setYear] = useState(date.getFullYear());
  const [calendar, setCalendar] = useState<CalendarMonth[]>([]);
  const [clicked, setClicked] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);

  useEffect(() => {
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      setClicked(true);
    });

    document.addEventListener("click", () => {
      setClicked(false);
    });

    return () => {
      document.removeEventListener("contextmenu", () => {});
      document.removeEventListener("click", () => {});
    };
  }, []);
  const colorArr = ["bg-white", "bg-red-400", "bg-lime-600", "bg-indigo-400"];

  const yearCalendar: CalendarMonth[] = [];

  function getDaysInMonth(mm: number, dd: number, yy: number) {
    const numberOfDays: number = new Date(yy, mm, 0).getDate();

    let monthObj: CalendarMonth = {
      month: mm,
      days: [],
    };

    const monthAdded = yearCalendar.find((month) => month.month === mm);

    if (monthAdded) {
      return;
    }

    for (let i = 1; i < numberOfDays; i++) {
      const dayOfWeek = new Date(yy, mm - 1, i);
      const randomColor = Math.floor(Math.random() * colorArr.length);
      const day: CalendarDay = {
        day: dayOfWeek.getDay(),
        date: i,
        color: colorArr[randomColor],
        id: dayOfWeek.getDay() + i * 525 + "-" + mm + "-" + yy,
        category: 0,
      };
      monthObj.days.push(day);
    }

    yearCalendar.push(monthObj);
    setCalendar(yearCalendar);
  }

  useEffect(() => {
    setYear(date.getFullYear());
  }, []);

  useEffect(() => {
    for (let i = 1; i <= 12; i++) {
      getDaysInMonth(i, date.getDate(), year);
    }
  }, [year]);

  const handleCalendarClick = (category: number) => {
    if (selectedDay) {
      const updatedCalendar = calendar.map((month) => {
        const updatedDays = month.days.map((day) => {
          if (day.id === selectedDay.id) {
            return { ...day, category };
          }
          return day;
        });
        return { ...month, days: updatedDays };
      });
      setCalendar(updatedCalendar);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex items-center mb-6">
          <span onClick={() => setYear(year - 1)}>-</span>
          <h1 className="text-center text-2xl font-bold mx-6">{year}</h1>
          <span onClick={() => setYear(year + 1)}>+</span>
        </div>
        <div className="flex justify-center ">
          <div className="flex flex-col mx-1">
            <span className="text-xs mb-2 w-8 h-8">&nbsp;</span>
            {[...Array(5)].map((e, i) =>
              days.map((day, i) => (
                <div
                  key={day + i}
                  className={`${
                    day === "S" ? "bg-gray-100" : ""
                  } w-8 h-8 rounded mb-1  flex items-center justify-center text-xs`}
                >
                  <span>{day}</span>
                </div>
              ))
            )}
          </div>
          {calendar.map((month) => {
            const n = month.days[0].day === 0 ? 0 : month.days[0].day - 1;
            return (
              <div key={month.month} className="flex flex-col mx-1">
                <span className="text-xs mb-2 w-8 h-8">
                  {months[month.month - 1]}
                </span>
                {[...Array(n)].map((e, i) => (
                  <div
                    className={`w-8 h-8 rounded mb-1 bg-white flex items-center justify-center`}
                  ></div>
                ))}
                {month.days.map((d) => {
                  const { date, day, category, id } = d;
                  return (
                    <CalendarDaySquare
                      key={id}
                      id={id}
                      category={category}
                      colors={colorArr}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        setClicked(true);
                        setSelectedDay(d);
                        setPoints({ x: e.clientX, y: e.clientY });
                      }}
                    >
                      {date}
                    </CalendarDaySquare>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      {clicked && selectedDay && (
        <ContextMenu
          top={points.y}
          left={points.x}
          buttons={contextMenuButtons}
          handleCalendarClick={handleCalendarClick}
        />
      )}
    </>
  );
}

export default App;
