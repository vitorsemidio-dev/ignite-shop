import { convertSecondsToMilliseconds } from "./convert-time.util";

export async function delayInSeconds(timeoutInSeconds: number) {
  const timeout = convertSecondsToMilliseconds(timeoutInSeconds);
  await new Promise((resolve) => setTimeout(resolve, timeout));
}
