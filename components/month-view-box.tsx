import React from "react";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";

const MonthViewBox = ({
  day,
  rowIndex,
}: {
  day:dayjs.Dayjs | null;
  rowIndex: number}) => {
  if (!day) {
    return <div className="h-12 w-full border md:w-full lg:h-full"></div>;
  }

  const isFirstDayOfMonth = day.date() === 1;
  const isToday = day.format("DD-MM-YY") === dayjs().format("DD-MM-YY");
  return (
    <div className={cn("group relative flex flex-col items-center gap-y-2 border-t border-b border-r",
      "transition-all hover:bg-violet-50")}>

      <div className="flex flex-col items-center">
        {rowIndex === 0 && (
        <h4 className={"text-xs text-gray-500"}> {day.format("ddd").toUpperCase()}</h4>)}
        <h4 className={
          cn("text-center text-sm", isToday &&
            "text-xl font-bold  text-[#8664A0]"
          ,)}>
          {isFirstDayOfMonth ? day.format("MMM D"): day.format("D")}


        </h4>
      </div>
    </div>
  );
};
export default MonthViewBox;
