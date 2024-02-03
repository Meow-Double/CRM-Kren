import dayjs from 'dayjs';

export const getNowDate = () => {
  const dateYear = dayjs().get('year');
  const dateMonth = dayjs().get('month');
  const dateDay = dayjs().get('date');
  const dateHour = dayjs().get('hour');
  const dateMinute = dayjs().get('minute');
  const dateSecond = dayjs().get('second');

  const date = `${dateYear}-${dateMonth + 1}-${dateDay}T${dateHour}:${dateMinute}:${dateSecond}`;

  return { dateYear, dateMonth, dateDay, dateHour, dateMinute, dateSecond, date };
};
