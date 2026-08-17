import { useState, type FormEvent } from "react";
import type { EventRecurrence, NewCalendarEvent } from "../../models/event";
import { toDateKey } from "../../utils/date";

export function EventForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (event: NewCalendarEvent) => void;
  onCancel: () => void;
}) {
  const today = toDateKey(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(today);
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState(today);
  const [endTime, setEndTime] = useState("");
  const [allDay, setAllDay] = useState(false);
  const [location, setLocation] = useState("");
  const [reminder, setReminder] = useState("");
  const [recurrence, setRecurrence] = useState<EventRecurrence>("none");
  const [error, setError] = useState("");
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!title.trim() || !startDate) {
      setError("Completá el título y la fecha de inicio.");
      return;
    }
    const finalDate = endDate || startDate;
    if (finalDate < startDate) {
      setError("La fecha de finalización no puede ser anterior al inicio.");
      return;
    }
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      startDate,
      startTime: allDay ? undefined : startTime || undefined,
      endDate: finalDate,
      endTime: allDay ? undefined : endTime || undefined,
      allDay,
      location: location.trim() || undefined,
      reminder: reminder || undefined,
      recurrence,
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
        <span>Fecha de inicio *</span>
        <input
          type="date"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
            if (endDate < e.target.value) setEndDate(e.target.value);
          }}
          required
        />
      </label>
      <label className="field">
        <span>Hora de inicio</span>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          disabled={allDay}
        />
      </label>
      <label className="field">
        <span>Fecha de finalización</span>
        <input
          type="date"
          value={endDate}
          min={startDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </label>
      <label className="field">
        <span>Hora de finalización</span>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          disabled={allDay}
        />
      </label>
      <label className="check-field field--wide">
        <input
          type="checkbox"
          checked={allDay}
          onChange={(e) => setAllDay(e.target.checked)}
        />
        <span>Todo el día</span>
      </label>
      <label className="field">
        <span>Ubicación</span>
        <input value={location} onChange={(e) => setLocation(e.target.value)} />
      </label>
      <label className="field">
        <span>Recordatorio</span>
        <input
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
          placeholder="Ej. 15 minutos antes"
        />
      </label>
      <label className="field field--wide">
        <span>Repetición</span>
        <select
          value={recurrence}
          onChange={(e) => setRecurrence(e.target.value as EventRecurrence)}
        >
          <option value="none">No repetir</option>
          <option value="daily">Diariamente</option>
          <option value="weekly">Semanalmente</option>
          <option value="monthly">Mensualmente</option>
        </select>
      </label>
      <div className="form-actions">
        <button className="secondary-button" type="button" onClick={onCancel}>
          Cancelar
        </button>
        <button className="primary-button" type="submit">
          Crear evento
        </button>
      </div>
    </form>
  );
}
