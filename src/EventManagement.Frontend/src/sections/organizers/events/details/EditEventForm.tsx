import moment from "moment";
import { axios } from '../../../../api';
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { EventForm, FormInputs, GetEventQueryResult, OfflineVenue, OnlineVenue, useGetEventQuery, VenueType } from "../common";
import { Alert, Box, CircularProgress, Snackbar } from "@mui/material";
import { useState } from "react";

const EditEventForm = () => {
  const { eventId: eventIdParam, communityId: communityIdParam } = useParams();
  const eventId = Number(eventIdParam);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { data, isFetched, isLoading } = useGetEventQuery(eventId);
  const { mutate, isPending } = useEditEventMutation(eventId, () => setSnackbarOpen(true));

  const handleSubmit = (data: FormInputs) => {
    const variables = formInputToVariables(data, eventId, Number(communityIdParam));
    mutate(variables);
  };

  return (
    <>
      <Box>
        {isLoading && <CircularProgress />}
        {isFetched && data && data.isCancelled && (
          <Alert severity="error" sx={{ mb: 3 }}>
            Ця подія була скасована
          </Alert>
        )}
        {isFetched && data && <EventForm
          defaultValues={queryResultToFormInputs(data)}
          onSubmit={handleSubmit}
          isSubmitting={isPending}
          sessionsEndDate={moment(data.sessionsEndDate)}
          sessionsStartDate={moment(data.sessionsStartDate)}
        />}
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Подію успішно оновлено
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditEventForm;

function queryResultToFormInputs(data: GetEventQueryResult): FormInputs {
  return {
    name: data.name,
    startDate: moment(data.startDate),
    endDate: moment(data.endDate),
    description: data.description,
    venueType: data.venue.type,
    address: data.venue.type === VenueType.Offline && data.venue.address || undefined,
    url: data.venue.type === VenueType.Online && data.venue.url || undefined,
    limit: data.attendance.limit ? 'limited' : 'unlimited',
    limitNumber: data.attendance.limit || undefined,
    shouldBeApproved: data.attendance.shouldBeApproved,
  };
}

function useEditEventMutation(eventId: number, onSuccess?: () => void) {
  return useMutation<EditEventMutationResult, EditEventMutationError, EditEventMutationVariables>({
    mutationFn: variables => axios.put<EditEventMutationResult>(`/api/organizers/events/${eventId}`, variables).then(res => res.data),
    onSuccess: () => onSuccess?.(),
  });
}

type EditEventMutationResult = {};
type EditEventMutationError = {};
type EditEventMutationVariables = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  attendance: {
    limit: number | null;
    shouldBeApproved: boolean;
  },
  venue: OnlineVenue | OfflineVenue;
  communityId: number;
};

function formInputToVariables(input: FormInputs, eventId: number, communityId: number): EditEventMutationVariables {
  return {
    id: eventId,
    name: input.name,
    startDate: input.startDate.format('YYYY-MM-DDTHH:mm:ss'),
    endDate: input.endDate.format('YYYY-MM-DDTHH:mm:ss'),
    description: input.description,
    attendance: {
      limit: input.limit === 'limited' ? input.limitNumber as number : null,
      shouldBeApproved: !!input.shouldBeApproved,
    },
    venue: input.venueType === VenueType.Online
      ? { type: VenueType.Online, url: input.url! }
      : { type: VenueType.Offline, address: input.address! },
    communityId,
  };
}
