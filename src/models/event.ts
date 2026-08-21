export type EventRecurrence = "none" | "daily" | "weekly" | "monthly";

export type CalendarEvent = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  startTime?: string;
  endDate: string;
  endTime?: string;
  allDay: boolean;
  location?: string;
  reminder?: string;
  recurrence?: EventRecurrence;
  createdAt: string;
};

export type NewCalendarEvent = Omit<CalendarEvent, "id" | "createdAt">;
