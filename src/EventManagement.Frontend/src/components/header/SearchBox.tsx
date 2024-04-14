import { Autocomplete, darken, lighten, styled, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { axios } from '../../api';
import { useEffect, useState } from "react";

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === 'light'
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled('ul')({
  padding: 0,
});

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, mutate, isPending } = useSearchMutation(10);

  useEffect(() => {
    searchQuery && mutate(searchQuery);
  }, [searchQuery]);

  return (
    <Autocomplete
      id="grouped-demo"
      freeSolo
      filterOptions={x => x}
      options={data?.communities || []}
      groupBy={(option) => option.type}
      getOptionLabel={(option) => typeof (option) === "string" ? option : option.name}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Пошук" />}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>{params.group}</GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
      onInputChange={(event, value) => setSearchQuery(value)}
      inputValue={searchQuery}
    />
  );
}

export default SearchBox;

type CommunitySearchSuggestion = {
  type: 'Спільноти';
  id: number;
  name: string;
};

type SearchSuggestionsMutationResult = {
  communities: CommunitySearchSuggestion[];
};

function useSearchMutation(pageSize: number) {
  return useMutation({
    mutationFn: async (q: string) => {
      const response = await axios.get<SearchSuggestionsMutationResult>(`/api/search/suggest?q=${q}&pageSize=${pageSize}`);
      return response.data;
    },
  })
}
