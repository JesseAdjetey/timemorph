import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Create from "@/components/sidebar/create";
import MyCalendars from "@/components/sidebar/my-calendars";
import ToDoBox from "@/components/ToDoBox";

const SideBar = () => {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [isTwoColumn, setIsTwoColumn] = useState(false);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentRect.width > 700) {
          setIsTwoColumn(true);
        } else {
          setIsTwoColumn(false);
        }
      }
    });

    if (sidebarRef.current) {
      resizeObserver.observe(sidebarRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        "w-full h-full flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out border-t py-3 px-2 bg-[#2F2E2E] overflow-y-auto"
      )}
    >
      <Create />
      <MyCalendars />

      {/* To-Do Boxes Grid */}
      <div className={cn("gap-4", isTwoColumn ? "grid grid-cols-2" : "flex flex-col")}>
        <ToDoBox
          title="This Week"
          initialItems={[
            "Learn for networks quiz",
            "Talk to Head of Logistics",
            "Finish Hardware assignment",
            "Piano practice",
          ]}
        />
        <ToDoBox title="This Month" />
        <ToDoBox title="Personal" initialItems={["Gym", "Read", "Take a walk"]} />
        <ToDoBox title="Random" initialItems={["Watch Oppenheimer", "Tele"]} />
      </div>
    </aside>
  );
};

export default SideBar;
