export function minutesToTimeSpanString(minutes: number): string {
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${days}.${hours}:${mins}:00`;
}
