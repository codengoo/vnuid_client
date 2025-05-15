import { format, getHours } from "date-fns";
import { vi } from "date-fns/locale";
import { RRule } from "rrule";
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

export function formatTime(date: Date | string = new Date()) {
  return format(date, "HH:mm");
}

export function formatDateTimeForInput(date: Date | string = new Date()) {
  try {
    const datetime = new Date(date);
    const result = format(datetime, "yyyy-MM-dd'T'hh:mm");
    return result;
  } catch (error) {
    return null;
  }
}

export function formatDateTime(date: Date | string = new Date()) {
  try {
    const datetime = new Date(date);
    const result = format(datetime, "dd-MM-yyyy hh:mm");
    return result;
  } catch (error) {
    return null;
  }
}

export function isRunningNow(start: Date | string, duration: number): boolean {
  const now = new Date();

  const rule = new RRule({
    freq: RRule.WEEKLY,
    interval: 1,
    dtstart: new Date(start),
  });

  const previousOccurrence = rule.before(now, true);
  if (!previousOccurrence) return false;

  const time_now = now.getTime();
  const time_start = previousOccurrence.getTime();
  const time_end = previousOccurrence.getTime() + duration * 60000;

  return time_now >= time_start && time_now <= time_end;
}
