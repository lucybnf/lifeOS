import { EventList } from "../components/data/EventList";
import { TaskList } from "../components/data/TaskList";
import { WeeklySummary } from "../components/dashboard/WeeklySummary";
import { useLifeOSData } from "../data/LifeOSDataProvider";

export function HomePage() {
  const { tasks, events } = useLifeOSData();
  const pendingTasks = tasks
    .filter((task) => task.status !== "completed")
    .sort((a, b) =>
      `${a.date}${a.time ?? ""}`.localeCompare(`${b.date}${b.time ?? ""}`),
    )
    .slice(0, 4);
  const upcomingEvents = events
    .slice()
    .sort((a, b) =>
      `${a.startDate}${a.startTime ?? ""}`.localeCompare(
        `${b.startDate}${b.startTime ?? ""}`,
      ),
    )
    .slice(0, 4);
  return (
    <section className="dashboard-page">
      <header className="page-heading">
        <div>
          <p className="section-kicker">Tu día en orden</p>
          <h3>Hola, este es tu LifeOS.</h3>
          <p>Un resumen de lo que necesita tu atención.</p>
        </div>
        <time>
          {new Intl.DateTimeFormat("es-AR", {
            weekday: "long",
            day: "numeric",
            month: "long",
          }).format(new Date())}
        </time>
      </header>
      <div className="dashboard-grid">
        <section className="content-card">
          <header className="card-heading">
            <div>
              <p className="section-kicker">Prioridades</p>
              <h4>Tareas pendientes</h4>
            </div>
            <span className="count-badge">{pendingTasks.length}</span>
          </header>
          <TaskList tasks={pendingTasks} />
        </section>
        <section className="content-card">
          <header className="card-heading">
            <div>
              <p className="section-kicker">Calendario</p>
              <h4>Próximos eventos</h4>
            </div>
            <span className="count-badge">{upcomingEvents.length}</span>
          </header>
          <EventList events={upcomingEvents} />
        </section>
        <section className="content-card content-card--wide">
          <header className="card-heading">
            <div>
              <p className="section-kicker">Próximos 7 días</p>
              <h4>Resumen semanal</h4>
            </div>
          </header>
          <WeeklySummary tasks={tasks} events={events} />
        </section>
      </div>
    </section>
  );
}
