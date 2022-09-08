import { convert } from "convert";

export function convertHourToSeconds(hours: number): number {
  return convert(hours, "hours").to("seconds");
}

export function convertSecondsToMilliseconds(seconds: number): number {
  return convert(seconds, "seconds").to("milliseconds");
}
