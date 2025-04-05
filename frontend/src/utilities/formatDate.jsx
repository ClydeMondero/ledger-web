import { formatDistanceToNow } from "date-fns";

export function formatDate(dateString) {
  const date = new Date(dateString);
  return formatDistanceToNow(date);
}

export function formatToMMDDYYYY(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function formatToMonthYear(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}
