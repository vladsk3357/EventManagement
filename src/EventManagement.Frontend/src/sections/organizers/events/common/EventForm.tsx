import { Grid, Stack, InputLabel } from "@mui/material";
import { DateTimePickerElement, FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import VenueFormGroup from "./VenueFormGroup";
import AttendanceFormGroup from "./AttendanceFormGroup";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import moment from "moment";
import { LoadingButton } from "@mui/lab";
import { FormInputs, VenueType } from "./types";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

type Props = {
  defaultValues?: Partial<FormInputs>;
  onSubmit: (data: FormInputs) => void;
  isSubmitting: boolean;
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
  location: yup.string().when('venueType', {
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
  location: undefined,
  limit: 'unlimited',
  limitNumber: undefined,
  shouldBeApproved: false,
};

const EventForm = ({ isSubmitting, onSubmit, defaultValues }: Props) => {
  const form = useForm<FormInputs>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: defaultValues || emptyDefaultValues,
  });
  const { setValue, watch } = form;

  return (
    <FormContainer<FormInputs> formContext={form} onSuccess={onSubmit} >
      <Grid container spacing={2}>
        <Grid item xs={12} mb={2}>
          <Stack spacing={3}>
            <TextFieldElement name="name" label="Назва події" required />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} mb={2}>
          <Stack spacing={3} direction="row">
            <DateTimePickerElement name="startDate" label="Дата початку" required ampm={false} />
            <DateTimePickerElement name="endDate" label="Дата закінчення" required ampm={false} />
          </Stack>
        </Grid>
        <Grid item xs={12} mb={2}>
          <Stack spacing={3}>
            <>
              <InputLabel>Опис</InputLabel>
              <CKEditor
                editor={ClassicEditor}
                data={watch('description')}
                onChange={(event, editor) => {
                  setValue('description', editor.getData());
                }}
              />
            </>
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
