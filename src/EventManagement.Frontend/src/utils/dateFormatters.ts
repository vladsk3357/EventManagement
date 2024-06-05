import moment from "moment";

type FormattableDate = moment.Moment | Date | string | undefined;

export function formatAsDateAndMonth(date: FormattableDate): string | undefined {
  return date && moment(date).format('DD MMM');
}

export function formatAsDateMonthYear(date: FormattableDate): string | undefined {
  return date && moment(date).format('LL');
}

export function formatAsTime(date: FormattableDate): string | undefined {
  return date && moment(date).format('LT');
}

export function formatAsDateMonthYearTime(date: FormattableDate): string | undefined {
  return date && moment(date).format('LLL');
}
