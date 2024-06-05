import { FormControl, Select, MenuItem, Link } from "@mui/material";
import { useEffect, useState } from "react";
import { useOrganizerCommunitiesList } from "../../../sections/organizers/communitiesList/hooks";
import { useParams, useNavigate } from "react-router-dom";

const CommunitiesDropdown = () => {
  const { communityId } = useParams();
  const navigate = useNavigate();
  const { data, isFetched } = useOrganizerCommunitiesList();

  if (!isFetched || !communityId)
    return null;

  return (
    <FormControl>
      <Select
        labelId="communities-dropdown-label"
        value={communityId}
        onChange={e => navigate(`/organizers/${e.target.value as string}/dashboard`)}
        size="small"
      >
        {data?.items.map(community => (
          <MenuItem key={community.id} value={community.id}>{community.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CommunitiesDropdown;
