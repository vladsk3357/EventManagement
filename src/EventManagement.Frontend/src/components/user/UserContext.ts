import { createContext } from "react";

export type User = {
  id: string;
  email: string;
  phoneNumber: string | null;
  name: string;
  userName: string;
  birthday: string | null;
  location: string | null;
  information: string | null;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

type UserContextType = {
  user: User | null;
  isFetching: boolean;
  setUser: (user: User) => void;
  setTokens: (tokens: Tokens) => void;
  remove: () => void;
  requestUser: () => void;
  tokens: Tokens | null;
};

export default createContext<UserContextType>({} as UserContextType);
