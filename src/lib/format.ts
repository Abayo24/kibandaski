const kes = new Intl.NumberFormat("en-KE", { maximumFractionDigits: 0 });

/** 1300 -> "KES 1,300" */
export function formatKES(amount: number): string {
  return `KES ${kes.format(amount)}`;
}

/** "07:00" -> "7:00 AM" */
export function formatTime(hhmm: string): string {
  const [h = 0, m = 0] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}
