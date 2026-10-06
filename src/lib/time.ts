const units = [
  ["year", 365 * 24 * 60 * 60],
  ["month", 30 * 24 * 60 * 60],
  ["day", 24 * 60 * 60],
  ["hour", 60 * 60],
  ["minute", 60],
  ["second", 1],
] as const;

const format = new Intl.RelativeTimeFormat("en", { style: "short" });

export const timeAgo = (timestamp: number) => {
  const seconds = Math.round((Date.now() - timestamp) / 1000);
  const [unit, size] =
    units.find(([, size]) => seconds >= size) ?? units.at(-1)!;

  return format.format(-Math.round(seconds / size), unit);
};
