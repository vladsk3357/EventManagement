import moment from "moment";
import { axios } from '../../../../api';
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { EventForm, FormInputs, VenueType } from "../common";
import { Box, CircularProgress } from "@mui/material";

const EditEventForm = () => {
  const { eventId: eventIdParam, communityId: communityIdParam } = useParams();
  const eventId = Number(eventIdParam);

  const { data, isFetched, isLoading } = useGetEventQuery(eventId);
  const { mutate, isPending } = useEditEventMutation(eventId);

  const handleSubmit = (data: FormInputs) => {
    const variables = formInputToVariables(data, eventId, Number(communityIdParam));
    mutate(variables);
  };

  return (
    <Box>
      {isLoading && <CircularProgress />}
      {isFetched && data && <EventForm defaultValues={queryResultToFormInputs(data)} onSubmit={handleSubmit} isSubmitting={isPending} />}
    </Box>
  );
};

export default EditEventForm;

function useGetEventQuery(eventId: number) {
  return useQuery({
    queryKey: ['organizers', 'event', eventId],
    queryFn: async () => {
      const { data } = await axios.get<GetEventQueryResult>(`/api/organizers/events/${eventId}`);
      return data;
    }
  });
}

type GetEventQueryResult = {
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

type OnlineVenue = {
  type: VenueType.Online;
  url: string;
};

type OfflineVenue = {
  type: VenueType.Offline;
  location: string;
};

function queryResultToFormInputs(data: GetEventQueryResult): FormInputs {
  return {
    name: data.name,
    startDate: moment(data.startDate),
    endDate: moment(data.endDate),
    description: data.description,
    venueType: data.venue.type,
    location: data.venue.type === VenueType.Offline && data.venue.location || undefined,
    url: data.venue.type === VenueType.Online && data.venue.url || undefined,
    limit: data.attendance.limit ? 'limited' : 'unlimited',
    limitNumber: data.attendance.limit || undefined,
    shouldBeApproved: data.attendance.shouldBeApproved,
  };
}

function useEditEventMutation(eventId: number) {
  return useMutation<EditEventMutationResult, EditEventMutationError, EditEventMutationVariables>({
    mutationFn: variables => axios.put<EditEventMutationResult>(`/api/organizers/events/${eventId}`, variables).then(res => res.data),
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
      : { type: VenueType.Offline, location: input.location! },
    communityId,
  };
}