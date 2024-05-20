import { useQuery } from "@tanstack/react-query";
import { axios } from '../../../api';
import { Card, CardActionArea, CardContent, CircularProgress, Stack, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
import { ReactNode } from "react";

type Props = {
  communityId: number;
}

const enum FormType {
  communitySubscription = 0,
  eventAttendanceForm = 1,
  communityForm = 2
}

const formTypeLabels: Record<FormType, ReactNode> = {
  [FormType.communitySubscription]: <Typography color="green" variant="subtitle2">Спільнота</Typography>,
  [FormType.eventAttendanceForm]: <Typography color="orange" variant="subtitle2">Подія</Typography>,
  [FormType.communityForm]: <Typography color="blue" variant="subtitle2">Опитування</Typography>,
};

const FormConstructorSection = ({ communityId }: Props) => {
  const { data, isLoading, isFetched } = useGetForms(communityId);
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <EditIcon />
          <Typography variant="h4">Конструктор форм</Typography>
        </Stack>
        {isLoading && <CircularProgress />}
        <Stack direction="column" spacing={2} mb={2}>
          {isFetched && data && data.items.map(form => (
            <Card key={form.id}>
              <Link to={`/organizers/${communityId}/registrations`}>
                <CardActionArea>
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={3}>
                      <Typography variant="body1">{form.name}</Typography>
                      {formTypeLabels[form.type]}
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default FormConstructorSection;

function useGetForms(communityId: number) {
  return useQuery({
    queryKey: ['organizers', communityId, 'all-forms'],
    queryFn: async () => {
      const { data } = await axios.get<GetFormsQueryResult>(`/api/organizers/communities/${communityId}/all-forms`);
      return data;
    }
  });
}

type GetFormsQueryResult = {
  items: {
    id: number;
    name: string;
    type: FormType;
  }[];
};

