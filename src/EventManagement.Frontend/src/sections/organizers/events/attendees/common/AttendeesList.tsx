import { TabPanel } from "@mui/lab";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useParams, useSearchParams } from "react-router-dom";
import { axios } from '../../../../../api';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ActionCellItemWithConfirmation, PagedList } from "../../../common";
import { useContext, useMemo } from "react";
import { UserContext } from "../../../../../components/user";
import DeleteIcon from '@mui/icons-material/Delete';
import { AttendeeStatus } from "../../common/types";

type Props = {
  attendeeStatus: AttendeeStatus;
}

const AttendeesList = ({ attendeeStatus }: Props) => {
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const page = Number(urlSearchParams.get('page')) || 1;
  const pageSize = Number(urlSearchParams.get('pageSize')) || 10;
  const { data, isLoading } = useEventAttendeesList(attendeeStatus, page, pageSize);
  const columns = useColumns();

  const paginationChangeHandle = (model: GridPaginationModel) => {
    setUrlSearchParams({ page: model.page.toString(), pageSize: model.pageSize.toString() });
  };

  return (
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
      />
    </div>
  );
};

export default AttendeesList;

function useColumns(): GridColDef[] {
  const { mutate: deleteAttendee } = useDeleteEventAttendeeMutation();
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
        if (row.id === user!.id)
          return [];

        return [
          <ActionCellItemWithConfirmation
            action={() => deleteAttendee(row.id)}
            icon={<DeleteIcon />}
            showInMenu
            dialogTitle="Дія видалення не може бути відмінена."
            dialogContent="Ви впевнені, що хочете видалити цього учасника?"
            actionButtonLabel="Так, видалити"
            label="Видалити учасника"
            closeMenuOnClick={false}
          />
        ];
      },
    },
  ];
}

function useEventAttendeesList(attendeeStatus: AttendeeStatus, page: number, pageSize: number) {
  const { communityId, eventId } = useParams();

  return useQuery({
    queryKey: ['organizer', communityId, 'event', eventId, 'attendees', attendeeStatus, page, pageSize],
    queryFn: () => axios.get<GetEventAttendeesQueryResultType>(`/api/organizers/events/${eventId}/attendees`, {
      params: {
        attendeeStatus,
        page,
        pageSize,
      }
    }).then(res => res.data),
  });
}

type GetEventAttendeesQueryResultType = PagedList<Attendee>;

type Attendee = {
  id: number;
  name: string;
  userName: string;
  joinDate: string;
}

function useDeleteEventAttendeeMutation() {
  const queryClient = useQueryClient();
  const { communityId, eventId } = useParams();

  return useMutation({
    mutationFn: (id: number) => axios.delete(`/api/organizers/attendees/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['organizer', communityId, 'event', eventId, 'attendees'] }),
  });
}
