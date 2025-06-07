import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export function formatDate(
  dateInput: string | Date,
  format: string = "YYYY-MM-DD HH:mm:ss",
): string {
  const rawDate =
    typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const date = dayjs(rawDate);

  if (!date.isValid()) {
    return "-";
  }

  return date.tz("Asia/Seoul").format(format);
}

export function formatPriceWithComma(price: number) {
  if (price === 0) return null;
  return Number(price).toLocaleString();
}
