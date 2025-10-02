import { type ClassValue, clsx } from "clsx";
import { dayjs } from "@/lib/dayjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateDates() {
  const startDate = dayjs("2024-12-29")
  const today = new Date();

  const dates = [];
  let compareDate = startDate

  while (compareDate.isBefore(today)) {
    dates.push(compareDate.toDate());
    compareDate = compareDate.add(1, "day");
  }

  return dates;
}