import { convert } from "convert";

export function convertHourToSeconds(hours: number): number {
  return convert(hours, "hours").to("seconds");
}
