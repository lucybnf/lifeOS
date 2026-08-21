import type { Task } from "../../models/task";
import { formatLongDate } from "../../utils/date";
import { MaterialIcon } from "../MaterialIcon";

const priorityLabels = { low: "Baja", medium: "Media", high: "Alta" } as const;
const contextLabels = {
  personal: "Personal",
  faculty: "Facultad",
  work: "Trabajo",
  home: "Hogar",
  project: "Proyecto",
} as const;

export function TaskList({
  tasks,
  emptyMessage = "No hay tareas pendientes.",
}: {
  tasks: Task[];
  emptyMessage?: string;
}) {
  if (!tasks.length) return <p className="empty-list">{emptyMessage}</p>;
  return (
    <div className="data-list">
      {tasks.map((task) => (
        <article className="data-item" key={task.id}>
          <span
            className={`status-dot priority-${task.priority}`}
            aria-hidden="true"
          />
          <div className="data-item__body">
            <h4>{task.title}</h4>
            <p>
              <MaterialIcon name="schedule" /> {formatLongDate(task.date)}
              {task.time ? ` · ${task.time}` : ""}
            </p>
            <div className="tag-row">
              <span>{contextLabels[task.context]}</span>
              <span className={`priority-tag priority-${task.priority}`}>
                {priorityLabels[task.priority]}
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
