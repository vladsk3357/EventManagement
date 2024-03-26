import { useState, useEffect } from "react";
import UserContext, { Tokens, User } from "./UserContext";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";
import { useQuery } from "@tanstack/react-query";
import { axios } from "../../api";

type Props = {
  children: React.ReactNode;
};

const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  const { data, isSuccess, refetch, isFetching } = useQuery({
    queryKey: ['shortInfo'],
    queryFn: () => {
      return axios.get<GetProfileShortInfoQueryResult>('/api/profileinfo/short').then(res => res.data);
    },
    enabled: false
  });

  useEffect(() => {
    if (isSuccess)
      setUser(data);
  }, [data]);

  const context = {
    user,
    isFetching,
    setUser: (user: User) => {
      setUser(user);
    },
    setTokens: ({ accessToken, refreshToken }: Tokens) => {
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
    },
    remove: () => {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      setUser(null);
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
  name: string;
  email: string;
  userName: string;
  location: string | null;
};
