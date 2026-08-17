export const toDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const parseDateKey = (value: string) => new Date(`${value}T00:00:00`);

export const formatShortDate = (value: string) =>
  new Intl.DateTimeFormat("es-AR", { day: "numeric", month: "short" }).format(
    parseDateKey(value),
  );

export const formatLongDate = (value: string) =>
  new Intl.DateTimeFormat("es-AR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(parseDateKey(value));

export const addDays = (date: Date, amount: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
};
