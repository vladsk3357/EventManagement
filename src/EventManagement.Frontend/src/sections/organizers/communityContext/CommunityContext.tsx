import { createContext, useContext } from "react";
import { Community } from "../types";

type CommunityContext = {
  community: Community | undefined;
};

const defaultValue: CommunityContext = {
  community: undefined,
}

const CommunityContext = createContext<CommunityContext>(defaultValue);

export default CommunityContext;

export const useCommunityContext = () => {
  return useContext(CommunityContext);
};
