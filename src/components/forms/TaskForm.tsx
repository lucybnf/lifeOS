import { useState, type FormEvent } from "react";
import type {
  NewTask,
  TaskContext,
  TaskPriority,
  TaskStatus,
} from "../../models/task";
import { toDateKey } from "../../utils/date";

export function TaskForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (task: NewTask) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(toDateKey(new Date()));
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [context, setContext] = useState<TaskContext>("personal");
  const [reminder, setReminder] = useState("");
  const [status, setStatus] = useState<TaskStatus>("pending");
  const [error, setError] = useState("");
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!title.trim() || !date) {
      setError("Completá el título y la fecha.");
      return;
    }
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      date,
      time: time || undefined,
      priority,
      context,
      reminder: reminder || undefined,
      status,
    });
  };
  return (
    <form className="entity-form" onSubmit={submit} noValidate>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <label className="field field--wide">
        <span>Título *</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
          required
        />
      </label>
      <label className="field field--wide">
        <span>Descripción</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </label>
      <label className="field">
        <span>Fecha *</span>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>
      <label className="field">
        <span>Hora</span>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </label>
      <label className="field">
        <span>Prioridad</span>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
        >
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
      </label>
      <label className="field">
        <span>Contexto</span>
        <select
          value={context}
          onChange={(e) => setContext(e.target.value as TaskContext)}
        >
          <option value="personal">Personal</option>
          <option value="faculty">Facultad</option>
          <option value="work">Trabajo</option>
          <option value="home">Hogar</option>
          <option value="project">Proyecto</option>
        </select>
      </label>
      <label className="field">
        <span>Recordatorio</span>
        <input
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
          placeholder="Ej. 30 minutos antes"
        />
      </label>
      <label className="field">
        <span>Estado</span>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
        >
          <option value="pending">Pendiente</option>
          <option value="in_progress">En progreso</option>
          <option value="completed">Completada</option>
        </select>
      </label>
      <div className="form-actions">
        <button className="secondary-button" type="button" onClick={onCancel}>
          Cancelar
        </button>
        <button className="primary-button" type="submit">
          Crear tarea
        </button>
      </div>
    </form>
  );
}
