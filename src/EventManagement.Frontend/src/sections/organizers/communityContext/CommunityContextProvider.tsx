import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";
import { useLocation, useNavigation, useParams } from "react-router-dom";
import { axios } from '../../../api';
import CommunityContext from "./CommunityContext";


type Props = {
  children: ReactNode;
};

const CommunityContextProvider = ({ children }: Props) => {
  const { data } = useCommunity();

  const contextValue = {
    community: data,
  }

  return (
    <CommunityContext.Provider value={contextValue}>
      {children}
    </CommunityContext.Provider>
  );
};

export default CommunityContextProvider;

const useCommunity = () => {
  const { communityId } = useParams();
  return useQuery({
    queryKey: ['organizers', 'community', communityId],
    queryFn: () => axios.get<GetCommunityQueryResultType>(`/api/organizers/communities/${communityId}`).then(res => res.data)
  });
}

type GetCommunityQueryResultType = {
  id: number;
  name: string;
  location: string;
  domain: string;
  shortDescription: string | null;
  description: string | null;
}
