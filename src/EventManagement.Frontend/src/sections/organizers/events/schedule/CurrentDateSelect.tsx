import { FormControl, Select, MenuItem } from "@mui/material";
import { useEffect, useMemo } from "react";
import moment from "moment";
import { formatAsDateMonthYear } from "../../../../utils/dateFormatters";

type Props = {
  value: moment.Moment | null;
  setValue: (date: moment.Moment) => void;
  startDate: string;
  endDate: string;
};

const CurrentDateSelect = ({ value, setValue, startDate, endDate }: Props) => {
  const dates = useMemo(() => getDateRange(startDate, endDate), [startDate, endDate]);

  useEffect(() => {
    if (dates.length)
      setValue(dates[0]);
  }, [dates]);

  if (!value)
    return null;

  return (
    <FormControl>
      <Select
        value={value.toISOString(true)}
        onChange={(e) => setValue(moment(e.target.value))}
      >
        {dates.map((date) => (
          <MenuItem value={date.toISOString(true)} key={date.toISOString(true)}>{formatAsDateMonthYear(date)}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CurrentDateSelect;

const getDateRange = (firstDate: string, lastDate: string) => {
  if (moment(firstDate).isSame(moment(lastDate), 'day'))
    return [moment(firstDate)];
  let date = moment(firstDate);
  const dates = [moment(date)];
  date = moment(date).set({ h: 0, m: 0 }).add(1, 'day');

  do {
    dates.push(date);
    date = moment(date).add(1, 'day');
  } while (date.isSameOrBefore(lastDate, 'day'));
  return dates;
};
