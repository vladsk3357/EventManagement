import { TabPanel } from "@mui/lab";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { axios } from '../../../../api';
import { useQuery } from "@tanstack/react-query";
import { PagedList } from "../../common";
import { useMemo } from "react";
import { Button } from "@mui/material";

type Props = {
  value: string;
}

const AnswersPanel = ({ value }: Props) => {
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const page = Number(urlSearchParams.get('page')) || 1;
  const pageSize = Number(urlSearchParams.get('pageSize')) || 10;
  const { data, isLoading } = useSubscriptionFormAnswersList(page, pageSize);
  const columns = useColumns();

  const paginationChangeHandle = (model: GridPaginationModel) => {
    setUrlSearchParams({ page: model.page.toString(), pageSize: model.pageSize.toString() });
  };

  return (
    <TabPanel value={value}>
      <DataGrid
        rows={data?.items || []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page, pageSize },
          },
        }}
        pageSizeOptions={[10, 15]}
        loading={isLoading}
        onPaginationModelChange={paginationChangeHandle}
      >
      </DataGrid>
    </TabPanel>
  );
};

export default AnswersPanel;

function useColumns(): GridColDef<FormAnswer>[] {
  const { communityId } = useParams();
  return useMemo<GridColDef<FormAnswer>[]>(() => {
    const cols: GridColDef<FormAnswer>[] =
      [
        {
          field: 'name',
          headerName: 'Ім\'я',
          width: 150,
          type: 'string',
          sortable: false,
          filterable: false,
        },
        {
          field: 'userName',
          headerName: 'Логін',
          width: 150,
          type: 'string',
          sortable: false,
          filterable: false,
          flex: 1,
        },
        {
          field: 'answerDate',
          headerName: 'Дата відповіді',
          type: 'date',
          width: 250,
          sortable: false,
          filterable: false,
          valueGetter: ({ value }) => value && new Date(value),
          valueFormatter: ({ value }: { value: Date }) => value.toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        },
        {
          field: 'actions',
          headerName: '',
          sortable: false,
          filterable: false,
          width: 150,
          renderCell: ({ row }) => <Link to={`/organizers/${communityId}/registrations/${row.id}`}><Button variant="contained" color="secondary">Відповіді</Button></Link>
        }
      ];
    return cols;
  }, []);
}

function useSubscriptionFormAnswersList(page: number, pageSize: number) {
  const { communityId } = useParams();

  return useQuery({
    queryKey: ['organizer', communityId, 'communitySubscriptionFormAnswers', page, pageSize],
    queryFn: () => axios.get<GetCommunitySubscribersQueryResultType>(`/api/organizers/communities/${communityId}/subscription-form/answers`, {
      params: {
        page,
        pageSize,
      }
    }).then(res => res.data),
  });
}

type GetCommunitySubscribersQueryResultType = PagedList<FormAnswer>;

type FormAnswer = {
  id: number;
  userId: string;
  userName: string;
  name: string;
  answerDate: string;
}
