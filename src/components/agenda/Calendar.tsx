import type { CalendarEvent } from "../../models/event";
import type { Task } from "../../models/task";
import { toDateKey } from "../../utils/date";

type CalendarProps = { month: Date; tasks: Task[]; events: CalendarEvent[] };
const dayNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export function Calendar({ month, tasks, events }: CalendarProps) {
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  const offset = (firstDay.getDay() + 6) % 7;
  const gridStart = new Date(month.getFullYear(), month.getMonth(), 1 - offset);
  const days = Array.from(
    { length: 42 },
    (_, index) =>
      new Date(
        gridStart.getFullYear(),
        gridStart.getMonth(),
        gridStart.getDate() + index,
      ),
  );
  const todayKey = toDateKey(new Date());
  return (
    <div className="calendar" aria-label="Calendario mensual">
      <div className="calendar__weekdays">
        {dayNames.map((name) => (
          <span key={name}>{name}</span>
        ))}
      </div>
      <div className="calendar__grid">
        {days.map((day) => {
          const key = toDateKey(day);
          const dayEvents = events.filter((item) => item.startDate === key);
          const dayTasks = tasks.filter(
            (item) => item.date === key && item.status !== "completed",
          );
          return (
            <article
              className={`calendar-day${day.getMonth() !== month.getMonth() ? " is-outside" : ""}${key === todayKey ? " is-today" : ""}`}
              key={key}
            >
              <time dateTime={key}>{day.getDate()}</time>
              <div className="calendar-day__entries">
                {dayEvents.slice(0, 2).map((item) => (
                  <span className="calendar-entry event-entry" key={item.id}>
                    {item.startTime && `${item.startTime} `}
                    {item.title}
                  </span>
                ))}
                {dayTasks
                  .slice(0, Math.max(0, 2 - dayEvents.length))
                  .map((item) => (
                    <span
                      className={`calendar-entry task-entry priority-${item.priority}`}
                      key={item.id}
                    >
                      {item.title}
                    </span>
                  ))}
                {dayEvents.length + dayTasks.length > 2 && (
                  <small>+{dayEvents.length + dayTasks.length - 2} más</small>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
