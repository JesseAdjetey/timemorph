import React from 'react'
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Image from "next/image";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import dayjs from 'dayjs';
import { useDateStore, useViewStore } from "@/lib/store";

const HeaderLeft = () => {
  const todaysDate = dayjs();
  const {userSelectedDate, setDate, setMonth, selectedMonthIndex} = useDateStore();
  const {selectedView} = useViewStore();

  const handleTodayClick = () => {
    switch (selectedView) {
      case "Month":
        setMonth(dayjs().month());
        break;
      case "Week":
        setDate(todaysDate);
        break;
      case "Day":
        setDate(todaysDate);
        setMonth(dayjs().month());
        break;
      default:
        break;
    }
  };
  const handlePrevClick = () => {
    switch (selectedView){
      case "Month":
        setMonth(selectedMonthIndex - 1);
        break;
      case "Week":
        setDate(userSelectedDate.subtract(1, "week"));
        break;
      case "Day":
        setDate(userSelectedDate.subtract(1, "day"));
        break;
      default:
        break;
    }
  };

  const handleNextClick = () => {
    switch (selectedView){
      case "Month":
        setMonth(selectedMonthIndex + 1);
        break;
      case "Week":
        setDate(userSelectedDate.add(1, "week"));
        break;
      case "Day":
        setDate(userSelectedDate.add(1, "day"));
        break;
      default:
        break;
    }
  };

    return (

        <div className={"flex items-center gap-3"}>
          <div>

          </div>
          {/*  Current Month and Year Display*/}
          <h1 className={"hidden text-xl lg:block"}>
            {dayjs(new Date(dayjs().year(), selectedMonthIndex)).format("MMMM YYYY")}

          </h1>
{/* Sidebar Toggle and Calendar Icon*/}
<div className="hidden items-center lg:flex">
  <Button variant={"ghost"} className={"rounded-full p-2"}>
  </Button>

</div>
        {/*Today Button*/}
<Button variant="outline"  onClick={handleTodayClick} className={"border-[#8664A0]"}>Today</Button>
          {/*Navigation Controls*/}
<div className="flex items-center gap-3">
  <MdKeyboardArrowLeft className={"size-6 cursor-pointer font-bold"} onClick={handlePrevClick}>

  </MdKeyboardArrowLeft>
  <MdKeyboardArrowRight className={"size-6 cursor-pointer font-bold"} onClick={handleNextClick}>

  </MdKeyboardArrowRight>
</div>

        </div>
    )
}
export default HeaderLeft
