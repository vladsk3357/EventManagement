import { useState, useEffect } from "react";
import UserContext, { Tokens, User } from "./UserContext";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../api";

type Props = {
  children: React.ReactNode;
};

const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<Tokens | null>(() => {
    if (!localStorage.getItem(ACCESS_TOKEN) || !localStorage.getItem(REFRESH_TOKEN))
      return null;

    return {
      accessToken: localStorage.getItem(ACCESS_TOKEN)!,
      refreshToken: localStorage.getItem(REFRESH_TOKEN)!,
    };
  });
  const queryClient = useQueryClient();

  const { data, isSuccess, refetch, isFetching, status, dataUpdatedAt } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axios.get<GetProfileShortInfoQueryResult>('/api/profileinfo');
      return res.data;
    },
    enabled: false,
  });

  useEffect(() => {
    if (tokens) {
      localStorage.setItem(ACCESS_TOKEN, tokens.accessToken);
      localStorage.setItem(REFRESH_TOKEN, tokens.refreshToken);
    } else {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
    }
  }, [tokens]);

  useEffect(() => {
    if (tokens) {
      refetch();
    } else {
      setUser(null);
    }
  }, [tokens]);

  useEffect(() => {
    if (status === 'success')
      setUser(data);
  }, [data, status, dataUpdatedAt]);

  const context = {
    user,
    isFetching,
    tokens,
    setUser: (user: User) => {
      setUser(user);
    },
    setTokens: (tokens: Tokens) => {
      setTokens(tokens);
    },
    remove: () => {
      setTokens(null);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      // setUser(null);
    },
    requestUser: () => refetch(),
  }

  return (
    <UserContext.Provider value={context}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;


type GetProfileShortInfoQueryResult = {
  id: string;
  email: string;
  name: string;
  userName: string;
  location: string | null;
  information: string | null;
  profileImageUrl: string | null;
};
