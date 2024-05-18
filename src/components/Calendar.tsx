import { FunctionComponent, useEffect, useState } from "react";
import { CalendarDay, CalendarMonth, CalendarYear } from "../ts/Interfaces";
import {
  colorArr,
  contextMenuButtons,
  days,
  months,
} from "../lib/PlaceholderData";
import CalendarDaySquare from "./CalendarDaySquare";
import { ContextMenu } from "./ContextMenus";

interface CalendarProps {}

const Calendar: FunctionComponent<CalendarProps> = () => {
  const date = new Date();

  const [selectedYear, setSelectedYear] = useState(date.getFullYear());
  const [yearArr, setYearArr] = useState<CalendarYear[]>([]);
  const [calendar, setCalendar] = useState<CalendarMonth[]>([]);
  const [clicked, setClicked] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);

  const yearCalendar: CalendarMonth[] = [];

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

  useEffect(() => {
    setSelectedYear(date.getFullYear());
  }, []);

  useEffect(() => {
    const yearObj: CalendarYear = {
      year: selectedYear,
      months: yearCalendar,
    };

    const getYearFromArr = yearArr.find((year) => year.year === selectedYear);

    if (getYearFromArr) {
      setCalendar(getYearFromArr.months);
      return;
    }

    for (let i = 1; i <= 12; i++) {
      getDaysInMonth(i, date.getDate(), selectedYear);
      yearObj.months = yearCalendar;
    }

    saveYear(selectedYear, yearCalendar);
  }, [selectedYear]);

  useEffect(() => {
    console.log("yearArr", yearArr);
  }, [yearArr]);

  const saveYear = (y: number, c: CalendarMonth[]) => {
    const findYear = yearArr.find((year) => year.year === selectedYear);

    if (findYear) {
      const updateCurrentYear = yearArr.map((year) => {
        if (year.year === selectedYear) {
          return { ...year, months: c };
        }
        return year;
      });
      setYearArr(updateCurrentYear);
      return;
    }
    setYearArr([...yearArr, { year: y, months: c }]);
  };

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

  const handleCalendarContextMenu = (category: number, id: string) => {
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
      saveYear(selectedYear, updatedCalendar);
    }
  };

  const handleCalendarClick = (d: CalendarDay) => {
    const updatedCalendar = calendar.map((month) => {
      const updatedDays = month.days.map((day) => {
        if (day.id === d.id) {
          return {
            ...day,
            category: day.category === 3 ? 0 : day.category + 1,
          };
        }
        return day;
      });
      return { ...month, days: updatedDays };
    });
    setCalendar(updatedCalendar);
    saveYear(selectedYear, updatedCalendar);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex items-center mb-6">
          <span onClick={() => setSelectedYear(selectedYear - 1)}>-</span>
          <h1 className="text-center text-2xl font-bold mx-6">
            {selectedYear}
          </h1>
          <span onClick={() => setSelectedYear(selectedYear + 1)}>+</span>
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
                    key={i}
                    className={`w-8 h-8 rounded mb-1 bg-white flex items-center justify-center`}
                  ></div>
                ))}
                {month.days.map((d) => {
                  return (
                    <CalendarDaySquare
                      key={d.id}
                      day={d}
                      colors={colorArr}
                      onClick={() => handleCalendarClick(d)}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        setClicked(true);
                        setSelectedDay(d);
                        setPoints({ x: e.clientX, y: e.clientY });
                      }}
                    >
                      {d.date}
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
          handleCalendarClick={(category) =>
            handleCalendarContextMenu(category, selectedDay.id)
          }
        />
      )}
    </>
  );
};

export default Calendar;
