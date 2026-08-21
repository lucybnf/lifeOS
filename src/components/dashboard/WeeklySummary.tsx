import type { CSSProperties } from "react";
import type { CalendarEvent } from "../../models/event";
import type { Task } from "../../models/task";
import { addDays, toDateKey } from "../../utils/date";

export function WeeklySummary({
  tasks,
  events,
}: {
  tasks: Task[];
  events: CalendarEvent[];
}) {
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, index) => addDays(today, index));
  const formatter = new Intl.DateTimeFormat("es-AR", { weekday: "short" });
  return (
    <div className="weekly-summary">
      {days.map((day, index) => {
        const key = toDateKey(day);
        const count =
          tasks.filter(
            (task) => task.date === key && task.status !== "completed",
          ).length + events.filter((event) => event.startDate === key).length;
        return (
          <div
            className={`week-day${index === 0 ? " is-today" : ""}`}
            key={key}
          >
            <span>{formatter.format(day)}</span>
            <strong>{day.getDate()}</strong>
            <div
              className="activity-bar"
              style={
                {
                  "--activity": `${Math.min(100, count * 28)}%`,
                } as CSSProperties
              }
            />
            <small>
              {count} {count === 1 ? "actividad" : "actividades"}
            </small>
          </div>
        );
      })}
    </div>
  );
}
