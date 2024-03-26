import { Button, Grid, Stack } from "@mui/material";
import { DateTimePickerElement, FormContainer, RadioButtonGroup, TextFieldElement } from "react-hook-form-mui";
import VenueFormGroup from "./VenueFormGroup";
import AttendanceFormGroup from "./AttendanceFormGroup";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import moment from "moment";
import { axios } from '../../../../api';
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";


const VENUE_TYPE_OPTIONS = ['online', 'offline'] as const;

type FormInputs = {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  venueType: string;
  location?: string | undefined;
  url?: string | undefined;
  limit: string;
  limitNumber?: number;
  shouldBeApproved?: boolean | undefined;
}

// type FormInputsOffline = {
//   name: string;
//   startDate: string;
//   endDate: string;
//   description: string;
//   venueType: 'offline';
//   location: string;
//   limit: string;
//   limitNumber?: number;
//   shouldBeApproved: string;
// }

// type FormInputs = FormInputsOnline | FormInputsOffline;

const schema: yup.ObjectSchema<FormInputs> = yup.object({
  // const schema = yup.object({
  name: yup.string().required('Це поле є обов\'язковим'),
  startDate: yup.string().test({
    message: 'Дата початку повинна бути в майбутньому',
    test: function (value) {
      if (!value)
        return true;
      // return new Date(value) < new Date(endDate);
      return moment(value).diff(moment()) > 0;
    }
  }).required('Це поле є обов\'язковим'),
  endDate: yup.string()
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
  // venueType: yup.string<'online' | 'offline'>().required('Це поле є обов\'язковим'),
  // venueType: yup.mixed<typeof VENUE_TYPE_OPTIONS>().oneOf(['online', 'offline'] as const).required('Це поле є обов\'язковим'),
  venueType: yup.string().required('Це поле є обов\'язковим'),
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
  // limitNumber: yup.number().required('Це поле є обов\'язковим').when('limit', {
  //   is: 'limited',
  //   then: yup.number().min(1, 'Мінімальне значення 1'),
  // }),
  shouldBeApproved: yup.boolean(),
}).required();

const CreateEventForm = () => {
  const { communityId } = useParams();
  const { mutate } = useCreateEventMutation();

  const onSubmit = (data: FormInputs) => {
    const variables = createMutationVariables(data, Number(communityId));
    mutate(variables);
  };

  return (
    <FormContainer<FormInputs>
      reValidateMode="onBlur"
      onSuccess={onSubmit}
      defaultValues={{
        name: undefined,
        startDate: undefined,
        endDate: undefined,
        description: undefined,
        venueType: 'online',
        url: undefined,
        limit: 'unlimited',
        limitNumber: undefined,
        shouldBeApproved: undefined,
      }}
      resolver={yupResolver(schema)}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} mb={2}>
          <Stack spacing={3}>
            <TextFieldElement name="name" label="Назва події" required />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} mb={2}>
          <Stack spacing={3} direction="row">
            <DateTimePickerElement name="startDate" label="Дата початку" required />
            <DateTimePickerElement name="endDate" label="Дата закінчення" required />
          </Stack>
        </Grid>
        <Grid item xs={12} mb={2}>
          <Stack spacing={3}>
            <TextFieldElement name="description" label="Опис" multiline required />
            <VenueFormGroup />
            <AttendanceFormGroup />
          </Stack>
        </Grid>
        <Grid item xs={12} mb={2}>
          <Button variant="contained" type="submit">Опублікувати зараз</Button>
        </Grid>
      </Grid>
    </FormContainer >
  );
};

export default CreateEventForm;

type CreateEventMutationError = {
  name?: string[];
  startDate?: string[];
  endDate?: string[];
  description?: string[];
  venueType?: string[];
  location?: string[];
  url?: string[];
  limit?: string[];
  limitNumber?: string[];
  shouldBeApproved?: string[];
}

type CreateEventMutationResult = {

}

type OnlineVenue = {
  venueType: 'online';
  url: string;
}

type OfflineVenue = {
  venueType: 'offline';
  location: string;
}

type Venue = OnlineVenue | OfflineVenue;

type LimitedAttendance = {
  limit: 'limited';
  limitNumber: number;
}

type UnlimitedAttendance = {
  limit: 'unlimited';
}

type Attendance = LimitedAttendance | UnlimitedAttendance;

type CreateEventMutationVariables = {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  attendance: {
    limit: number | null;
    shouldBeApproved: boolean;
  },
  location: {
    venueType: string;
    location?: string;
    url?: string;
  };
  communityId: number;
};

function useCreateEventMutation() {
  const { communityId } = useParams();

  return useMutation<CreateEventMutationResult, CreateEventMutationError, CreateEventMutationVariables>({
    mutationFn: variables => axios.post<CreateEventMutationResult>(`/api/organizers/communities/${communityId}/events`, variables).then(res => res.data),
  });
}

function createMutationVariables(input: FormInputs, communityId: number): CreateEventMutationVariables {
  return {
    name: input.name,
    startDate: moment(input.startDate).format('YYYY-MM-DDTHH:mm:ss'),
    endDate: moment(input.endDate).format('YYYY-MM-DDTHH:mm:ss'),
    description: input.description,
    attendance: {
      limit: input.limit === 'limited' ? input.limitNumber as number : null,
      shouldBeApproved: !!input.shouldBeApproved,
    },
    location: {
      venueType: input.venueType,
      location: input.location,
      url: input.url,
    },
    communityId,
    // ...(input.venueType === 'online' ? { venueType: 'online', url: input.url! } : { venueType: 'offline', location: input.location! }),
    // ...(input.limit === 'limited' ? { limit: 'limited', limitNumber: input.limitNumber! } : { limit: 'unlimited' }),
  };
}
