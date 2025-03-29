import React, { useEffect, useState } from "react";
import { getHours, getWeekDays, isCurrentDay } from "@/lib/getTime";
import { useDateStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { ScrollArea } from "@/components/ui/scroll-area";

const WeekView = () => {
  const [currentTime, setCurrentTime] = useState(dayjs());
  // const { openPopover, events } = useEventStore(); // const { openPopover, events } = useEventStore();

  const { userSelectedDate, setDate } = useDateStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr_1fr_1fr] place-items-center px-4 py-2">
        <div className="w-16  border-gray-300">
          <div className="relative h-16">
            <div className="absolute top-2 text-[17px] text-gray-600">GMT</div>
          </div>
        </div>

        {/* Week View Header */}

        {getWeekDays(userSelectedDate).map(({ currentDate, today }, index) => (
          <div key={index} className="flex flex-col items-center">

            <div
              className={cn(
                "h-16 w-16 rounded-full p-2 text-5xl font-semibold text-[#AEACAC]",
                today && " text-[#8664A0]"
              )}
            >
              {currentDate.format("DD")}{" "}
            </div>
            <div className={cn("text-xs", today && "text-[#8664A0]")}>
              {currentDate.format("ddd")}
            </div>
          </div>
        ))}
      </div>

      {/* Time Column & Corresponding Boxes of time per each date  */}

      <ScrollArea className="h-[80vh]">
        <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr_1fr_1fr] px-4 py-2">
          {/* Time Column */}
          <div className="w-16  border-r border-gray-300">
            {getHours.map((hour, index) => (
              <div key={index} className="relative h-20">
                <div className="absolute -top-2 text-[15px] text-gray-600 font-semibold">
                  {hour.format("h A")}
                </div>
              </div>
            ))}
          </div>

          {/* Week Days Corresponding Boxes */}

          {getWeekDays(userSelectedDate).map(
            ({ isCurrentDay, today }, index) => {
              const dayDate = userSelectedDate
                .startOf("week")
                .add(index, "day");

              return (
                <div key={index} className="relative  border-gray-300 ">
                  {getHours.map((hour, i) => (
                    <div
                      key={i}
                      className="relative flex h-20 cursor-pointer flex-col items-center gap-y-2 border-t border-b  border-gray-300 hover:bg-gray-100 " >
              </div>
            ))}
          {/*  Current Time indicator*/}
            {isCurrentDay(dayDate) && today && (
              <div
                className={cn("absolute h-1 w-full bg-[#8664A0]")}
                style={{
                  top: `${(currentTime.hour() / 24) * 100}%`,
                }}
              />
            )}
          </div>
        );
      },
    )}
      </div>
  </ScrollArea>
    </>
);
};
export default WeekView;
