import { useState } from "react";
import { Calendar } from "../components/agenda/Calendar";
import {
  NewItemMenu,
  type NewItemType,
} from "../components/agenda/NewItemMenu";
import { EventList } from "../components/data/EventList";
import { TaskList } from "../components/data/TaskList";
import { EventForm } from "../components/forms/EventForm";
import { TaskForm } from "../components/forms/TaskForm";
import { MaterialIcon } from "../components/MaterialIcon";
import { Modal } from "../components/Modal";
import { useLifeOSData } from "../data/LifeOSDataProvider";

export function AgendaPage() {
  const { tasks, events, addTask, addEvent } = useLifeOSData();
  const [month, setMonth] = useState(() => new Date());
  const [view, setView] = useState<"day" | "week" | "month">("month");
  const [creating, setCreating] = useState<NewItemType | null>(null);
  const moveMonth = (amount: number) =>
    setMonth(
      (current) =>
        new Date(current.getFullYear(), current.getMonth() + amount, 1),
    );
  const monthLabel = new Intl.DateTimeFormat("es-AR", {
    month: "long",
    year: "numeric",
  }).format(month);
  const pending = tasks
    .filter((task) => task.status !== "completed")
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);
  const upcoming = events
    .slice()
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .slice(0, 4);
  return (
    <section className="agenda-page">
      <header className="agenda-toolbar">
        <div>
          <p className="section-kicker">Planificación</p>
          <h3>Agenda</h3>
        </div>
        <div className="agenda-toolbar__actions">
          <button
            className="secondary-button"
            type="button"
            onClick={() => setMonth(new Date())}
          >
            Hoy
          </button>
          <div className="segmented-control" aria-label="Vista de agenda">
            {(["day", "week", "month"] as const).map((item) => (
              <button
                className={view === item ? "is-active" : ""}
                type="button"
                key={item}
                onClick={() => setView(item)}
              >
                {item === "day" ? "Día" : item === "week" ? "Semana" : "Mes"}
              </button>
            ))}
          </div>
          <NewItemMenu onSelect={setCreating} />
        </div>
      </header>
      {view !== "month" && (
        <p className="view-notice">
          La vista {view === "day" ? "Día" : "Semana"} está preparada
          visualmente; el calendario mensual continúa visible en esta primera
          versión.
        </p>
      )}
      <div className="agenda-layout">
        <section className="content-card calendar-card">
          <header className="calendar-heading">
            <button
              className="icon-button"
              type="button"
              onClick={() => moveMonth(-1)}
              aria-label="Mes anterior"
            >
              <MaterialIcon name="chevron_left" />
            </button>
            <h4>{monthLabel}</h4>
            <button
              className="icon-button"
              type="button"
              onClick={() => moveMonth(1)}
              aria-label="Mes siguiente"
            >
              <MaterialIcon name="chevron_right" />
            </button>
          </header>
          <Calendar month={month} tasks={tasks} events={events} />
        </section>
        <aside className="agenda-side">
          <section className="content-card">
            <header className="card-heading">
              <div>
                <p className="section-kicker">Por hacer</p>
                <h4>Tareas</h4>
              </div>
              <span className="count-badge">{pending.length}</span>
            </header>
            <TaskList tasks={pending} />
          </section>
          <section className="content-card">
            <header className="card-heading">
              <div>
                <p className="section-kicker">En agenda</p>
                <h4>Próximos eventos</h4>
              </div>
            </header>
            <EventList events={upcoming} />
          </section>
        </aside>
      </div>
      {creating === "task" && (
        <Modal title="Nueva tarea" onClose={() => setCreating(null)}>
          <TaskForm
            onCancel={() => setCreating(null)}
            onSubmit={(task) => {
              addTask(task);
              setCreating(null);
            }}
          />
        </Modal>
      )}
      {creating === "event" && (
        <Modal title="Nuevo evento" onClose={() => setCreating(null)}>
          <EventForm
            onCancel={() => setCreating(null)}
            onSubmit={(event) => {
              addEvent(event);
              setCreating(null);
            }}
          />
        </Modal>
      )}
    </section>
  );
}
