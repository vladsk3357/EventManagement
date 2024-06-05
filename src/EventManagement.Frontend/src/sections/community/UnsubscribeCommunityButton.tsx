import { useQueryClient, useMutation } from "@tanstack/react-query";
import { axios } from '../../api';
import { useParams } from "react-router-dom";
import { GetCommunityDetailsQueryResult } from "./CommunityDetails";
import { LoadingButton } from "@mui/lab";

type Props = {
  communityId: number;
}

const UnsubscribeCommunityButton = ({ communityId }: Props) => {
  const { mutate, isPending } = useUnsubscribeToCommunity(communityId);

  return (
    <LoadingButton
      loading={isPending}
      variant='contained'
      color="error"
      onClick={() => mutate()}
    >
      Покинути спільноту
    </LoadingButton>
  );
};

export default UnsubscribeCommunityButton;

function useUnsubscribeToCommunity(communityId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => axios.post(`/api/communities/${communityId}/unsubscribe`),
    onSuccess: () => {
      queryClient.setQueryData(['community', { id: communityId }], (data: GetCommunityDetailsQueryResult) => {
        return { ...data, isSubscribed: false, subscriberCount: data.subscriberCount - 1 };
      });
    },
  });
}
