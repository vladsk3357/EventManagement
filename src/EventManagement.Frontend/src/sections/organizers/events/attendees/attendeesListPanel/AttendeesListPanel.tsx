import { TabPanel } from "@mui/lab";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useParams, useSearchParams } from "react-router-dom";
import { axios } from '../../../../../api';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ActionCellItemWithConfirmation } from "../../../common";
import { useContext, useMemo } from "react";
import { UserContext } from "../../../../../components/user";
import DeleteIcon from '@mui/icons-material/Delete';
import { AttendeeStatus } from "../../common/types";
import { useDeleteEventAttendeeMutation } from "../common";
import { PagedList } from "../../../../common/types";
import moment from "moment";
import { formatAsDateMonthYear } from "../../../../../utils/dateFormatters";

type Props = {
  value: string;
}

const AttendeesListPanel = ({ value }: Props) => {
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
        />
      </div>
    </TabPanel >
  );
};

export default AttendeesListPanel;

function useColumns(): GridColDef[] {
  const { communityId, eventId } = useParams();
  const { mutate: deleteAttendee } = useDeleteEventAttendeeMutation(communityId!, eventId!);
  const { user } = useContext(UserContext);

  return [
    {
      field: 'name',
      type: 'string',
      headerName: 'Ім\'я',
      minWidth: 200,
      sortable: false,
      filterable: false,
    },
    {
      field: 'userName',
      type: 'string',
      headerName: 'Логін',
      minWidth: 200,
      sortable: false,
      filterable: false,
    },
    {
      field: 'joinDate',
      type: 'date',
      headerName: 'Дата приєднання',
      minWidth: 200,
      sortable: false,
      valueGetter: ({ value }) => value && moment(value),
      valueFormatter: ({ value }) => formatAsDateMonthYear(value),
      flex: 1,
      filterable: false,
      editable: false,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Дія',
      minWidth: 100,
      hideable: false,
      getActions: ({ row }) => {
        if (user && row.userId === user.id)
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

function useEventAttendeesList(page: number, pageSize: number) {
  const { communityId, eventId } = useParams();
  const status = AttendeeStatus.Confirmed;

  return useQuery({
    queryKey: ['organizer', communityId, 'event', eventId, 'attendees', page, pageSize],
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