import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { axios } from '../../../api';
import { DataGrid, GridActionsCellItem, GridColDef, type GridPaginationModel } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';
import { ActionCellItemWithConfirmation, useEventsList } from "../common";
import { Link as RouterLink } from 'react-router-dom';
import { Chip } from "@mui/material";
import { Box } from "@mui/material";
import { TabPanel } from "@mui/lab";

type Props = {
  value: string;
}

const PastEventsListPanel = ({ value }: Props) => {
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const { communityId: communityIdParam } = useParams();
  const page = Number(urlSearchParams.get('page')) || 1;
  const pageSize = Number(urlSearchParams.get('pageSize')) || 10;
  const communityId = Number(communityIdParam);
  const { data, isLoading } = useEventsList(communityId, page, pageSize, true);
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
    </TabPanel>
  );
};

export default PastEventsListPanel;

function useColumns(): GridColDef[] {
  const { communityId } = useParams();
  const { mutate: deleteEvent } = useDeleteEventMutation();
  const navigate = useNavigate();

  return [
    {
      field: 'name',
      type: 'string',
      headerName: 'Подія',
      width: 400,
      sortable: false,
      filterable: false,
      renderCell: ({ value, row }) => (
        <RouterLink to={`/organizers/${communityId}/events/${row.id}/details`}>
          {value}
        </RouterLink>
      ),
    },
    {
      field: 'venue',
      type: 'string',
      headerName: 'Локація',
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: ({ value, row }) => (
        <Chip label={value.type === 'Online' ? 'Онлайн' : value.address.locationName} />
      ),
    },
    {
      field: 'attendeesCount',
      type: 'number',
      headerName: 'Учасники',
      width: 200,
      sortable: false,
      filterable: false,
    },
    {
      field: 'startDate',
      type: 'date',
      headerName: 'Дата',
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
      getActions: ({ row }) => [
        <GridActionsCellItem
          label="Редагувати подію"
          showInMenu
          icon={<EditIcon />}
          onClick={() => navigate(`/organizers/${communityId}/events/${row.id}`)}
        />,
        <ActionCellItemWithConfirmation
          action={() => { }}
          icon={<BlockIcon />}
          showInMenu
          dialogTitle="Відмінити подію"
          dialogContent="Ви впевнені, що хочете відмінити подію?"
          actionButtonLabel="Відмінити подію"
          label="Відмінити подію"
          closeMenuOnClick={false}
        />,
        <ActionCellItemWithConfirmation
          action={() => deleteEvent(row.id)}
          icon={<DeleteIcon />}
          showInMenu
          dialogTitle="Ви впевнені, що хочете видалити подію?"
          dialogContent="Зверніть увагу, що при видаленні дію не можна відмінити. Всю інформацію події буде видалено."
          actionButtonLabel="Так, видалити"
          label="Видалити подію"
          closeMenuOnClick={false}
        />,
      ]
    },
  ];
}

function useDeleteEventMutation() {
  const queryClient = useQueryClient();
  const { communityId } = useParams();

  return useMutation({
    mutationFn: (eventId: number) => axios.delete(`/api/organizers/events/${eventId}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['organizer', communityId, 'events'] }),
  });
}
