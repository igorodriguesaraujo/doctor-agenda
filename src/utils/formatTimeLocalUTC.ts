import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc);

export function formatTimeLocalUTC(value: string) {
  return dayjs()
    .utc()
    .set("hour", parseInt(value.split(":")[0]))
    .set("minute", parseInt(value.split(":")[1]))
    .set("second", parseInt(value.split(":")[2]))
    .local();
}