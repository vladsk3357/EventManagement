import { Autocomplete, darken, lighten, styled, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { axios } from '../../api';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
  const [value, setValue] = useState('');
  const { data, mutate, isPending } = useSearchMutation(10);

  useEffect(() => {
    searchQuery && mutate(searchQuery);
  }, [searchQuery]);

  const getOptionLabel = (option: CommunitySearchSuggestion | EventSearchSuggestion | string) => {
    if (typeof option === 'string') {
      return '';
    }
    return option.name;
  };

  const options = [
    ...data?.communities.map(c => ({ ...c, type: 'Спільноти' } as CommunitySearchSuggestion)) || [],
    ...data?.events.map(c => ({ ...c, type: 'Події' } as EventSearchSuggestion)) || [],
  ];

  return (
    <Autocomplete
      id="grouped-demo"
      freeSolo
      filterOptions={x => x}
      options={options}
      groupBy={(option) => option.type}
      getOptionLabel={getOptionLabel}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Пошук" />}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>{params.group}</GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
      renderOption={(props, option, { inputValue }) => {
        return (
          <Link to={option.type === 'Спільноти' ? `/community/${option.id}` : `/community/${option.communityId}/${option.id}`}>
            <li {...props}>
              {option.name}
            </li>
          </Link>
        );
      }}
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

type CommunitySearchSuggestionResult = {
  id: number;
  name: string;
};

type EventSearchSuggestion = {
  type: 'Події';
  id: number;
  name: string;
  communityId: number;
};

type EventSearchSuggestionResult = {
  id: number;
  name: string;
  communityId: number;
}

type SearchSuggestionsMutationResult = {
  communities: CommunitySearchSuggestionResult[];
  events: EventSearchSuggestionResult[];
};

function useSearchMutation(pageSize: number) {
  return useMutation({
    mutationFn: async (q: string) => {
      const response = await axios.get<SearchSuggestionsMutationResult>(`/api/search/suggest?q=${q}&pageSize=${pageSize}`);
      return response.data;
    },
  })
}
