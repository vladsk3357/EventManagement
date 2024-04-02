import { axios } from '../../../../api';
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { EventForm, FormInputs, VenueType } from "../common";

const CreateEventForm = () => {
  const { communityId: communityIdParam } = useParams();
  const communityId = Number(communityIdParam);
  const { mutate, isPending } = useCreateEventMutation(communityId);

  const onSubmit = (data: FormInputs) => {
    const variables = createMutationVariables(data, communityId);
    mutate(variables);
  };

  return (
    <EventForm isSubmitting={isPending} onSubmit={onSubmit} />
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

type CreateEventMutationVariables = {
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

function useCreateEventMutation(communityId: number) {
  return useMutation<CreateEventMutationResult, CreateEventMutationError, CreateEventMutationVariables>({
    mutationFn: variables => axios.post<CreateEventMutationResult>(`/api/organizers/communities/${communityId}/events`, variables).then(res => res.data),
  });
}

function createMutationVariables(input: FormInputs, communityId: number): CreateEventMutationVariables {
  return {
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
