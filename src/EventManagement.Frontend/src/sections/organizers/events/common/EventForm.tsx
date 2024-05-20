import { Grid, Stack, Typography } from "@mui/material";
import { DateTimePickerElement, FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import VenueFormGroup from "./VenueFormGroup";
import AttendanceFormGroup from "./AttendanceFormGroup";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import moment from "moment";
import { LoadingButton } from "@mui/lab";
import { FormInputs, VenueType } from "./types";
import { RichTextEditorElement } from "../../../common/primitives";
import { start } from "repl";
import { useMemo } from "react";

type Props = {
  defaultValues?: Partial<FormInputs>;
  onSubmit: (data: FormInputs) => void;
  isSubmitting: boolean;
  sessionsStartDate?: moment.Moment | null;
  sessionsEndDate?: moment.Moment | null;
};

const schema: yup.ObjectSchema<FormInputs> = yup.object({
  name: yup.string().required('Це поле є обов\'язковим'),
  startDate: yup.mixed((input): input is moment.Moment => moment.isMoment(input)).test({
    message: 'Дата початку повинна бути в майбутньому',
    test: function (value) {
      if (!value)
        return true;
      return moment(value).diff(moment()) > 0;
    }
  }).required('Це поле є обов\'язковим'),
  endDate: yup.mixed((input): input is moment.Moment => moment.isMoment(input))
    .test({
      message: 'Дата кінця повинна бути пізніше дати початку',
      test: function (value) {
        const startDate = this.parent.startDate;
        if (!value || !startDate)
          return true;

        return moment(value).diff(moment(startDate)) > 0;
      }
    }).required('Це поле є обов\'язковим'),
  description: yup.string().required('Це поле є обов\'язковим'),
  venueType: yup.string().oneOf([VenueType.Online, VenueType.Offline]).required('Це поле є обов\'язковим'),
  url: yup.string().url('Введіть валідний URL').when('venueType', {
    is: 'online',
    then: schema => schema.required('Це поле є обов\'язковим'),
  }),
  address: yup.object().notRequired().default(undefined).shape({
    city: yup.string().required('Це поле є обов\'язковим'),
    street: yup.string().required('Це поле є обов\'язковим'),
    locationName: yup.string().required('Це поле є обов\'язковим'),
    zipCode: yup.string(),
  }).when('venueType', {
    is: 'offline',
    then: schema => schema.required('Це поле є обов\'язковим'),
  }),
  limit: yup.string().required('Це поле є обов\'язковим'),
  limitNumber: yup.number().when('limit', {
    is: 'limited',
    then: schema => schema.min(1, 'Мінімальне значення 1').required('Це поле є обов\'язковим'),
  }),
  shouldBeApproved: yup.boolean(),
}).required();

const emptyDefaultValues: Partial<FormInputs> = {
  name: undefined,
  startDate: undefined,
  endDate: undefined,
  description: undefined,
  venueType: VenueType.Online,
  url: undefined,
  address: undefined,
  limit: 'unlimited',
  limitNumber: undefined,
  shouldBeApproved: false,
};

const EventForm = ({ isSubmitting, onSubmit, defaultValues, sessionsEndDate, sessionsStartDate }: Props) => {
  const form = useForm<FormInputs>({
    resolver: async function (...args) {
      console.log(args);
      const a = await yupResolver(schema)(...args);
      console.log(a);
      return a;
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: defaultValues || emptyDefaultValues,
  });
  const { watch } = form;

  const maxStartDate = useMemo(() => {
    const endDate = watch('endDate');
    if (endDate && sessionsStartDate)
      return endDate < sessionsStartDate ? endDate : sessionsStartDate;
    if (endDate && !sessionsStartDate)
      return endDate;
    else
      return undefined;
  }, [watch, sessionsStartDate]);

  const minEndDate = useMemo(() => {
    const startDate = watch('startDate');
    if (startDate && sessionsEndDate)
      return startDate < sessionsEndDate ? sessionsEndDate : startDate;
    if (startDate && !sessionsEndDate)
      return startDate;
    else
      return undefined;
  }, [watch, sessionsEndDate]);

  return (
    <FormContainer<FormInputs> formContext={form} onSuccess={onSubmit} >
      <Grid container spacing={2}>
        <Grid item xs={12} mb={2}>
          <Stack spacing={3}>
            <TextFieldElement name="name" label="Назва події" required />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} mb={2}>
          <Stack spacing={1} direction="column">
            <DateTimePickerElement
              name="startDate"
              label="Дата початку"
              required
              ampm={false}
              maxDateTime={maxStartDate}
              disablePast
            />
            {sessionsStartDate && <Typography variant="caption" color="textSecondary">Максимальна дата початку: {sessionsStartDate?.format('DD.MM.YYYY HH:mm')}. Змініть програму, щоб обрати іншу дату початку.</Typography>}
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} mb={2}>
          <Stack spacing={1} direction="column">
            <DateTimePickerElement
              name="endDate"
              label="Дата закінчення"
              required
              ampm={false}
              minDateTime={minEndDate}
              disablePast
            />
            {sessionsEndDate && <Typography variant="caption" color="textSecondary">Мінімальна дата кінця: {sessionsEndDate?.format('DD.MM.YYYY HH:mm')}. Змініть програму, щоб обрати іншу дату кінця.</Typography>}
          </Stack>
        </Grid>
        <Grid item xs={12} mb={2}>
          <Stack spacing={3}>
            <RichTextEditorElement name="description" label="Опис події" required />
            <VenueFormGroup />
            <AttendanceFormGroup />
          </Stack>
        </Grid>
        <Grid item xs={12} mb={2}>
          <LoadingButton loading={isSubmitting} variant="contained" type="submit">Опублікувати зараз</LoadingButton>
        </Grid>
      </Grid>
    </FormContainer >
  );
};

export default EventForm;
