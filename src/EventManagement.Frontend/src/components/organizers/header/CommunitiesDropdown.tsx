import { FormControl, Select, MenuItem, Link } from "@mui/material";
import { useEffect, useState } from "react";
import { useOrganizerCommunitiesList } from "../../../sections/organizers/communitiesList/hooks";
import { useParams, useNavigate } from "react-router-dom";

const CommunitiesDropdown = () => {
  const { communityId } = useParams();
  const navigate = useNavigate();
  const { data, isFetched } = useOrganizerCommunitiesList();
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | undefined>(undefined);

  useEffect(() => {
    setSelectedCommunityId(communityId);
  }, [communityId]);

  useEffect(() => {
    if (selectedCommunityId) {
      navigate(`/organizers/${selectedCommunityId}/dashboard`);
    }
  }, [selectedCommunityId]);

  if (!isFetched)
    return null;

  return (
    <FormControl>
      <Select
        labelId="communities-dropdown-label"
        value={selectedCommunityId}
        onChange={e => setSelectedCommunityId(e.target.value as string)}
      >
        {data?.items.map(community => (
          <MenuItem value={community.id}>{community.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CommunitiesDropdown;
