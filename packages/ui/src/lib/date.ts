import { format } from "date-fns";

export function formatDateTime(date: Date) {
  return format(date, "EEEE MMM do, h:mm a");
}

type DateFormat = "short" | "long" | "date-time";

export function formatDate({
  date,
  format,
}: {
  date: string;
  format: DateFormat;
}) {
  const dateFormats: Record<DateFormat, Intl.DateTimeFormatOptions> = {
    short: {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
    long: {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
    "date-time": {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  };
  return new Date(date).toLocaleDateString("en-US", dateFormats[format]);
}

export function formatTimeAgo(date: string | null) {
  if (!date) return "Never";

  const lastSignIn = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - lastSignIn.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}
