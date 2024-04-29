import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  CircularProgress,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm, FormContainer, CheckboxButtonGroup, RadioButtonGroup, DatePickerElement } from "react-hook-form-mui";
import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../api";
import moment from "moment";

const facetNameMap = new Map<string, string>([['location', 'Локація'], ['domain', 'Домен']]);

const Filters = () => {
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const sortBy = urlSearchParams.get('sortBy');
  const sortOrder = urlSearchParams.get('sortOrder');

  const form = useForm({
    defaultValues: {
      // location: urlSearchParams.get('location')?.split(','),
      // domain: urlSearchParams.get('domain')?.split(','),
      sortBy: urlSearchParams.get('sortBy') || 'startDate',
      sortOrder: urlSearchParams.get('sortOrder') || 'asc',
      startDate: urlSearchParams.get('startDate') && moment(urlSearchParams.get('startDate')) || moment().startOf('day'),
      endDate: urlSearchParams.get('endDate') && moment(urlSearchParams.get('endDate')),
    },
    mode: 'onChange',
    resolver: (data) => {
      const params = new URLSearchParams();
      if (data.sortBy !== 'startDate')
        params.set('sortBy', data.sortBy);

      if (data.sortOrder !== 'asc')
        params.set('sortOrder', data.sortOrder);

      if (data.startDate)
        params.set('startDate', data.startDate.format());

      if (data.endDate)
        params.set('endDate', data.endDate.format());

      // if (data.domain?.length)
      //   params.set('domain', data.domain.join(','));

      setUrlSearchParams(params);
      return { values: data, errors: {} };
    },
  });

  const { watch } = form;

  const { data, isLoading, isFetched } = useGetCommunitiesFacetedFilter();

  return (
    <FormContainer formContext={form}>
      <Grid container spacing={3}>
        {/* {isLoading && <CircularProgress />}
        {isFetched && data?.facets.map((facet, index) => (
          <Grid item xs={12} md={3} key={index}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                {facetNameMap.get(facet.name)}
              </AccordionSummary>
              <AccordionDetails>
                <CheckboxButtonGroup
                  name={facet.name}
                  options={facet.values.map(value => ({
                    id: value.value,
                    label: `${value.value} (${value.count})`
                  }))}
                />
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))} */}
        <Grid item xs={12} md={3}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              Дата
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <DatePickerElement
                  name="startDate"
                  label="Дата початку"
                  required
                  mb={2}
                />
                <DatePickerElement
                  name="endDate"
                  label="Дата кінця"
                  required
                  minDate={watch('startDate')}
                />
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12} md={3}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              Сортування
            </AccordionSummary>
            <AccordionDetails>
              <RadioButtonGroup
                label="Сортувати за:"
                name="sortOrder"
                options={[
                  {
                    id: 'asc',
                    label: 'За зростанням'
                  },
                  {
                    id: 'desc',
                    label: 'За спаданням'
                  },
                ]}
              />
              <Divider />
              <RadioButtonGroup
                name="sortBy"
                options={[
                  {
                    id: 'startDate',
                    label: 'За датою початку'
                  },
                  {
                    id: 'attendeesCount',
                    label: 'За кількістю учасників'
                  }
                ]}
              />
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </FormContainer>
  );
};

export default Filters;

function useGetCommunitiesFacetedFilter() {
  return useQuery({
    queryKey: ['communities-faceted-filter'],
    queryFn: async () => {
      const res = await axios.get<GetCommunitiesFacetedFilterQueryResult>('/api/search/communities-faceted-filter');
      return res.data;
    },
  });
}

type GetCommunitiesFacetedFilterQueryResult = {
  facets: {
    name: string;
    values: {
      value: string;
      count: number;
    }[]
  }[]
}
