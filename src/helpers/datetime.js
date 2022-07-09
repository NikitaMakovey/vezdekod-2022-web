import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/ru";
dayjs.extend(isToday);
dayjs.extend(utc);
dayjs.locale('ru');

export function convertDateTimeToLocalTimezone(datetime) {
    const localDateTime = dayjs.utc(datetime).local().format("YYYY-MM-DD HH:mm:ss");
    const preview = dayjs(localDateTime).isToday() ?
        dayjs(localDateTime).format("HH:mm") :
        dayjs(localDateTime).format("D MMM");
    const source = dayjs(localDateTime).format("MMMM D, YYYY HH:mm");
    return {preview, source};
}