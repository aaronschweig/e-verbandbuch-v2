const formatter = new Intl.DateTimeFormat("de-DE");
const formatterWithTime = new Intl.DateTimeFormat("de-DE", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: false,
  timeZone: "Europe/Berlin"
});
export function useDateFormatter(
  { withTime }: { withTime: boolean } = { withTime: true }
) {
  return withTime ? formatterWithTime : formatter;
}
