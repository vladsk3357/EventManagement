import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { axios } from '../../../api';
import { DataGrid, GridColDef, type GridPaginationModel } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { ActionCellItemWithConfirmation, useSubscribersList } from "../common";
import { type PagedList } from "../../common/types";
import { UserContext } from "../../../components/user";
import { useContext } from "react";

const SubscribersList = () => {
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const { communityId: communityIdParam } = useParams();
  const page = Number(urlSearchParams.get('page')) || 1;
  const pageSize = Number(urlSearchParams.get('pageSize')) || 10;
  const communityId = Number(communityIdParam);
  const { data, isLoading } = useSubscribersList(communityId, page, pageSize);
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

export default SubscribersList;

function useColumns(): GridColDef[] {
  const { mutate: deleteSubscriber } = useDeleteSubscriberMutation();
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
      minWidth: 100,
      hideable: false,
      getActions: ({ row }) => {
        if (user && row.id === user.id)
          return [];

        return [
          <ActionCellItemWithConfirmation
            action={() => deleteSubscriber(row.id)}
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

function useDeleteSubscriberMutation() {
  const queryClient = useQueryClient();
  const { communityId } = useParams();

  return useMutation({
    mutationFn: (subscriberId: number) => axios.delete(`/api/organizers/communities/${communityId}/subscribers/subscriberId`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['organizer', communityId, 'subscribers'] }),
  });
}
