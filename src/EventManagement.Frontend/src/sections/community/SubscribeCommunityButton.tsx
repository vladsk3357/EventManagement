import { useQueryClient, useMutation } from "@tanstack/react-query";
import { axios } from '../../api';
import { useParams } from "react-router-dom";
import { GetCommunityDetailsQueryResult } from "./CommunityDetails";
import { LoadingButton } from "@mui/lab";

type Props = {
  communityId: number;
}

const SubscribeCommunityButton = ({ communityId }: Props) => {
  const { mutate, isPending } = useSubscribeToCommunity(communityId);

  return (
    <LoadingButton
      loading={isPending}
      variant='contained'
      onClick={() => mutate()}
    >
      Стати учасником
    </LoadingButton>
  );
};

export default SubscribeCommunityButton;

function useSubscribeToCommunity(communityId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => axios.post(`/api/communities/${communityId}/subscribe`),
    onSuccess: () => {
      queryClient.setQueryData(['community', { id: communityId }], (data: GetCommunityDetailsQueryResult) => {
        return { ...data, isSubscribed: true };
      });
    },
  });
}
