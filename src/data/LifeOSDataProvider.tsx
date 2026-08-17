import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import type { CalendarEvent, NewCalendarEvent } from "../models/event";
import type { NewTask, Task } from "../models/task";
import { initialEvents, initialTasks } from "./mockData";

type LifeOSData = {
  tasks: Task[];
  events: CalendarEvent[];
  addTask: (task: NewTask) => void;
  addEvent: (event: NewCalendarEvent) => void;
};

const LifeOSDataContext = createContext<LifeOSData | null>(null);
const createId = (prefix: string) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export function LifeOSDataProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);

  const value = useMemo<LifeOSData>(
    () => ({
      tasks,
      events,
      addTask: (task) =>
        setTasks((current) => [
          ...current,
          {
            ...task,
            id: createId("task"),
            createdAt: new Date().toISOString(),
          },
        ]),
      addEvent: (event) =>
        setEvents((current) => [
          ...current,
          {
            ...event,
            id: createId("event"),
            createdAt: new Date().toISOString(),
          },
        ]),
    }),
    [events, tasks],
  );

  return (
    <LifeOSDataContext.Provider value={value}>
      {children}
    </LifeOSDataContext.Provider>
  );
}

export function useLifeOSData() {
  const context = useContext(LifeOSDataContext);
  if (!context)
    throw new Error("useLifeOSData debe usarse dentro de LifeOSDataProvider.");
  return context;
}
