import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useDateStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getHours, isCurrentDay } from "@/lib/getTime";

const DayView = () => {
  const [currentTime, setCurrentTime] = useState(dayjs());
  // const { openPopover, events } = useEventStore(); // const { openPopover, events } = useEventStore();

  const { userSelectedDate, setDate } = useDateStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const isToday = userSelectedDate.format("DD-MM-YY") === dayjs().format("DD-MM-YY");
  return (
    <>
      <div className={"grid grid-cols-[auto_auto_1fr] px-4"}>
      <div className={"w-16  border-gray-300 text-[17px] text-gray-600"}>  <br></br>GMT</div>
        <div className={"flex w-16 flex-col items-center"}>
          <div
            className={cn("h-16 w-16 rounded-full p-2 text-5xl font-semibold text-[#AEACAC]",
              isToday && " text-[#8664A0]")}
          >{userSelectedDate.format("DD")}{" "}
          </div>
          <div className={cn("text-xs", isToday && "text-[#8664A0]")}>
            {userSelectedDate.format("ddd")}{" "}
          </div>
          {""}

        </div>
        <div></div>
      </div>
      <ScrollArea className={"h-[80vh]"}>
        <div className={"grid grid-cols-[auto_1fr] p-4"}>
          {/*Time Column*/}
          <div className="w-16 border-r border-gray-300">
            {getHours.map((hour, index) => (
              <div key={index} className="relative h-20">
                <div className="absolute -top-2 text-[15px] text-gray-600 font-semibold">
                  {hour.format("h A")}
                </div>
              </div>
            ))}
          </div>
          {/*Day/Boxes Column*/}
          <div className={"relative border-r border-gray-300"}>
            {getHours.map((hour, i) => (
              <div
                key={i}
                className="relative flex h-20 cursor-pointer flex-col items-center gap-y-2 border-t border-b border-gray-300 hover:bg-gray-100"></div>))}
          {/*Current time indicator*/}
            {isCurrentDay(userSelectedDate) && (
              <div className={cn("absolute h-0.5 w-full bg-[#8664A0]")}
              style={{top:`${(currentTime.hour()/24)*100}%`,
              }}>

              </div>
            )}
          </div>

        </div>
      </ScrollArea>
    </>
  );
};
export default DayView;
