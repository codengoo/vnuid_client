import { format, getHours } from "date-fns";
import { vi } from "date-fns/locale";

export function formatTimeRange(start: Date | string, end: Date | string) {
  const startHour = getHours(new Date(start));
  const endHour = getHours(new Date(end));
  return `${startHour}h - ${endHour}h`;
}

export function formatCurrentDate() {
  const now = new Date();
  const dayOfWeek = format(now, "EEEE", { locale: vi });
  const formattedDate = `${dayOfWeek}, ngày ${format(now, "dd - MM - yyyy")}`;

  return formattedDate;
}

export function formatTime(date: Date | string) {
  return format(date, "HH:mm");
}
