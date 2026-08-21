import { useState } from "react";
import { MaterialIcon } from "../MaterialIcon";

export type NewItemType = "task" | "event";
export function NewItemMenu({
  onSelect,
}: {
  onSelect: (type: NewItemType) => void;
}) {
  const [open, setOpen] = useState(false);
  const choose = (type: NewItemType) => {
    setOpen(false);
    onSelect(type);
  };
  return (
    <div className="new-item-menu">
      <button
        className="primary-button"
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <MaterialIcon name="add" /> Nuevo
      </button>
      {open && (
        <div className="new-item-dropdown">
          <button type="button" onClick={() => choose("task")}>
            <MaterialIcon name="task_alt" />
            <span>
              <strong>Nueva tarea</strong>
              <small>Algo que necesitás completar</small>
            </span>
          </button>
          <button type="button" onClick={() => choose("event")}>
            <MaterialIcon name="event" />
            <span>
              <strong>Nuevo evento</strong>
              <small>Una actividad con fecha</small>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
