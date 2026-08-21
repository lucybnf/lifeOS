import type { CalendarEvent } from "../models/event";
import type { Task } from "../models/task";
import { addDays, toDateKey } from "../utils/date";

const now = new Date();
const isoNow = now.toISOString();

export const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Preparar entrega de la facultad",
    description: "Revisar consignas y adjuntar documentación.",
    date: toDateKey(addDays(now, 1)),
    time: "18:00",
    priority: "high",
    status: "in_progress",
    context: "faculty",
    reminder: "30 minutos antes",
    createdAt: isoNow,
  },
  {
    id: "task-2",
    title: "Organizar presupuesto semanal",
    description: "Actualizar gastos y próximos pagos.",
    date: toDateKey(addDays(now, 2)),
    priority: "medium",
    status: "pending",
    context: "personal",
    createdAt: isoNow,
  },
  {
    id: "task-3",
    title: "Ordenar espacio de trabajo",
    description: "",
    date: toDateKey(addDays(now, 4)),
    time: "10:30",
    priority: "low",
    status: "pending",
    context: "home",
    createdAt: isoNow,
  },
];

export const initialEvents: CalendarEvent[] = [
  {
    id: "event-1",
    title: "Clase de programación",
    description: "Clase práctica semanal.",
    startDate: toDateKey(addDays(now, 1)),
    startTime: "09:00",
    endDate: toDateKey(addDays(now, 1)),
    endTime: "11:00",
    allDay: false,
    location: "Aula 12",
    reminder: "1 hora antes",
    recurrence: "weekly",
    createdAt: isoNow,
  },
  {
    id: "event-2",
    title: "Reunión de proyecto",
    description: "Seguimiento de avances.",
    startDate: toDateKey(addDays(now, 3)),
    startTime: "15:30",
    endDate: toDateKey(addDays(now, 3)),
    endTime: "16:30",
    allDay: false,
    location: "Videollamada",
    reminder: "15 minutos antes",
    recurrence: "none",
    createdAt: isoNow,
  },
  {
    id: "event-3",
    title: "Día personal",
    description: "",
    startDate: toDateKey(addDays(now, 6)),
    endDate: toDateKey(addDays(now, 6)),
    allDay: true,
    recurrence: "none",
    createdAt: isoNow,
  },
];
