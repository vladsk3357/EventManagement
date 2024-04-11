import { useQueryClient, useMutation } from "@tanstack/react-query";
import { axios } from '../../api';
import { GetCommunityDetailsQueryResult } from "./CommunityDetails";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { useGetForm } from "../common/queries";
import Form from "./Form";

type Props = {
  communityId: number;
  isShowForm?: boolean;
  formId: number;
}

const SubscribeCommunityButton = ({ communityId, isShowForm, formId }: Props) => {
  const { mutate, isPending } = useSubscribeToCommunity(communityId);
  const [openModal, setOpenModal] = useState(false);
  const { data, isLoading, isFetched } = useGetForm(formId);

  const handleClick = () => {
    if (isShowForm) {
      setOpenModal(true);
    } else {
      mutate(undefined);
    }
  };

  const handleSubmitForm = (data: Record<string, string | string[]>) => {
    mutate(data);
  };

  return (
    <>
      <LoadingButton
        loading={isPending}
        variant='contained'
        onClick={handleClick}
      >
        Стати учасником
      </LoadingButton>
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <DialogTitle>Форма учасника</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Для того щоб стати учасником спільноти, заповніть форму.
          </DialogContentText>
          {isFetched && !isLoading && data && <Form fields={data.fields} onSubmit={handleSubmitForm} isSubmitting={isPending} />}
        </DialogContent>
        <DialogActions>
          <LoadingButton variant="contained" loading={isPending}>Стати учасником</LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SubscribeCommunityButton;

type FormInputs = Record<string, string | string[]>;

function useSubscribeToCommunity(communityId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (answers?: Record<string, string | string[]>) => {
      if (!answers) {
        const res = await axios.post(`/api/communities/${communityId}/subscribe`)
        return res.data;
      }

      const fieldAnswers = [];

      for (const fieldName in answers) {
        fieldAnswers.push({ name: fieldName, value: answers[fieldName] });
      }

      const res = await axios.post(`/api/communities/${communityId}/subscribe`, {
        formAnswer: { fieldAnswers },
        communityId,
      });
      return await res.data;
    },
    onSuccess: () => {
      queryClient.setQueryData(['community', { id: communityId }], (data: GetCommunityDetailsQueryResult) => {
        return { ...data, isSubscribed: true };
      });
    },
  });
}
