import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import dayjs, { Dayjs } from "dayjs";
import { getMonth } from "@/lib/getTime";

interface ViewStoreType {
  selectedView: string;
  setView: (value: string) => void;
}

interface DateStoreType {
  userSelectedDate: Dayjs;
  setDate: (value: Dayjs) => void;
  twoDMonthArray: dayjs.Dayjs[][];
  selectedMonthIndex:number;
  setMonth: (index: number) => void;
}

export const useViewStore = create<ViewStoreType>()(
  devtools(
    persist(
      (set) => ({
        selectedView: "Week",
        setView: (value: string) => {
          set({ selectedView: value });
        },
      }),
      { name: "calendar_view", skipHydration: true } // Corrected key name and placement
    )
  )
);

export const useDateStore = create<DateStoreType>()(
  devtools(
    persist(
      (set) => ({
        userSelectedDate: dayjs(),
        setDate: (value: Dayjs) => {
          set({ userSelectedDate: value });
        },
        twoDMonthArray: getMonth(),
        selectedMonthIndex: dayjs().month(),
        setMonth: (index: number) => {
          set({twoDMonthArray: getMonth(index), selectedMonthIndex: index });
        },
      }),
      { name: "date_data", skipHydration: true } // Corrected key name and placement
    )
  )
)

export type CalendarEventType = {
  id: string;
  title: string;
  date: string;
  description: string;
}

type EventStore = {
  events: CalendarEventType[];
  isPopoverOpen: boolean;
  isEventSummaryOpen: boolean;
  selectedEvent: CalendarEventType | null;
  setEvents: (events: CalendarEventType[]) => void;
  openPopover: () => void;
  closePopover: () => void;
  openEventSummary: (event: CalendarEventType) => void;
  closeEventSummary: () => void;
}

export const useEventStore = create<EventStore>((set) => ({
  events: [],
  isPopoverOpen: false,
  isEventSummaryOpen: false,
  selectedEvent: null,
  setEvents: (events) => {
    set({ events });
  },
  openPopover: () => {
    set({ isPopoverOpen: true });
  },
  closePopover: () => {
    set({ isPopoverOpen: false });
  },
  openEventSummary: (event) => {
    set({ isEventSummaryOpen: true, selectedEvent: event });
  },
  closeEventSummary: () => {
    set({ isEventSummaryOpen: false, selectedEvent: null });
  },
}));