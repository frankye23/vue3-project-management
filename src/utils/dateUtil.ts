/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import moment from 'moment';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';
const DATE_FORMAT = 'YYYY-MM-DD';
const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const HOUR_FORMAT = 'MM-DD HH:mm';
const DAY_FORMAT = 'MM-DD';

export function formatToDateTime(
  date: moment.MomentInput = undefined,
  format = DATE_TIME_FORMAT,
): string {
  return moment(date).format(format);
}

export function formatToDateSecond(
  date: moment.MomentInput = undefined,
  format = TIME_FORMAT,
): string {
  return moment(date).format(format);
}

export function formatToHour(date: moment.MomentInput = undefined, format = HOUR_FORMAT): string {
  return moment(date).format(format);
}

export function formatToDay(date: moment.MomentInput = undefined, format = DAY_FORMAT): string {
  return moment(date).format(format);
}

export function formatToDate(date: moment.MomentInput = undefined, format = DATE_FORMAT): string {
  return moment(date).format(format);
}

export function formatTime(time: number) {
  const date = new Date(time * 1000);
  const datetime =
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1) +
    '-' +
    (date.getDate() < 10 ? '0' : '') +
    date.getDate() +
    ' ' +
    (date.getHours() < 10 ? '0' : '') +
    date.getHours() +
    ':' +
    (date.getMinutes() < 10 ? '0' : '') +
    date.getMinutes();
  return datetime;
}

export function hourFormat(data: any) {
  let days: any, hrs: any;
  if (data < 24) {
    days = 0;
    hrs = data;
  } else {
    days = parseInt((data / 24) as any);
    hrs = data - days * 24;
  }
  return days + ' 天 ' + hrs + ' 小时 ';
}

export const dateUtil = moment;
