import { TabPanel } from "@mui/lab";
import { DataGrid, GridActionsCellItem, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useParams, useSearchParams } from "react-router-dom";
import { axios } from '../../../../../api';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PagedList } from "../../../common";
import { useContext, useMemo } from "react";
import { UserContext } from "../../../../../components/user";
import { AttendeeStatus } from "../../common/types";
import { NoRowsOverlay, useDeleteEventAttendeeMutation } from "../common";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

type Props = {
  value: string;
}

const WaitingListPanel = ({ value }: Props) => {
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const page = Number(urlSearchParams.get('page')) || 1;
  const pageSize = Number(urlSearchParams.get('pageSize')) || 10;
  const { data, isLoading } = useEventAttendeesList(page, pageSize);
  const columns = useColumns();

  const paginationChangeHandle = (model: GridPaginationModel) => {
    setUrlSearchParams({ page: model.page.toString(), pageSize: model.pageSize.toString() });
  };

  return (
    <TabPanel value={value}>
      <div style={{ height: 400, width: '100%' }}>
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
          slots={{
            noRowsOverlay: NoRowsOverlay,
          }}
        />
      </div>
    </TabPanel >
  );
};

export default WaitingListPanel;

function useColumns(): GridColDef[] {
  const { communityId, eventId } = useParams();
  const { mutate: deleteAttendee } = useDeleteEventAttendeeMutation(communityId!, eventId!);
  const { mutate: confirmAttendee } = useChangeAttendeeStatusMutation();

  const { user } = useContext(UserContext);

  return [
    {
      field: 'name',
      type: 'string',
      headerName: 'Ім\'я',
      width: 200,
      sortable: false,
      filterable: false,
    },
    {
      field: 'userName',
      type: 'string',
      headerName: 'Логін',
      width: 200,
      sortable: false,
      filterable: false,
    },
    {
      field: 'joinDate',
      type: 'date',
      headerName: 'Дата приєднання',
      width: 200,
      sortable: false,
      valueGetter: ({ value }) => value && new Date(value),
      valueFormatter: ({ value }) => value.toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric' }),
      flex: 1,
      filterable: false,
      editable: false,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Дія',
      width: 100,
      hideable: false,
      getActions: ({ row }) => {
        const { mutate } = useChangeAttendeeStatusMutation();
        if (row.userId === user!.id)
          return [];

        return [
          <GridActionsCellItem
            icon={<CheckCircleIcon />}
            showInMenu
            label="Затвердити"
            onClick={() => confirmAttendee(row.id)}
          />,
          <GridActionsCellItem
            icon={<CancelIcon />}
            showInMenu
            label="Відхилити"
            onClick={() => deleteAttendee(row.id)}
          />,
        ];
      },
    },
  ];
}

function useEventAttendeesList(page: number, pageSize: number) {
  const { communityId, eventId } = useParams();
  const status = AttendeeStatus.Pending;
  return useQuery({
    queryKey: ['organizer', communityId, 'event', eventId, 'attendees', page, pageSize, status],
    queryFn: () => axios.get<GetEventAttendeesQueryResultType>(`/api/organizers/events/${eventId}/attendees`, {
      params: {
        status,
        page,
        pageSize,
      }
    }).then(res => res.data),
  });
}

type GetEventAttendeesQueryResultType = PagedList<Attendee>;

type Attendee = {
  id: number;
  userId: string;
  name: string;
  userName: string;
  joinDate: string;
}

function useChangeAttendeeStatusMutation() {
  const queryClient = useQueryClient();
  const { communityId, eventId } = useParams();

  return useMutation({
    mutationFn: (id: number) => axios.put(`/api/organizers/attendees/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['organizer', communityId, 'event', eventId, 'attendees'] }),
  });
}
