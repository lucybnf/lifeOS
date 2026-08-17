import type { CalendarEvent } from "../../models/event";
import { formatLongDate } from "../../utils/date";
import { MaterialIcon } from "../MaterialIcon";

export function EventList({
  events,
  emptyMessage = "No hay próximos eventos.",
}: {
  events: CalendarEvent[];
  emptyMessage?: string;
}) {
  if (!events.length) return <p className="empty-list">{emptyMessage}</p>;
  return (
    <div className="data-list">
      {events.map((event) => (
        <article className="data-item event-item" key={event.id}>
          <div className="event-date">
            <strong>{new Date(`${event.startDate}T00:00:00`).getDate()}</strong>
            <span>{formatLongDate(event.startDate).split(" ")[2]}</span>
          </div>
          <div className="data-item__body">
            <h4>{event.title}</h4>
            <p>
              <MaterialIcon name="schedule" />{" "}
              {event.allDay ? "Todo el día" : (event.startTime ?? "Sin hora")}
            </p>
            {event.location && (
              <p>
                <MaterialIcon name="location_on" /> {event.location}
              </p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
