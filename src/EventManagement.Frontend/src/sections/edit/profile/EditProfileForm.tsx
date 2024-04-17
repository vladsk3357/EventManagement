import { useState } from 'react';
import { Snackbar, Alert, CircularProgress } from '@mui/material';
import { SubmitHandler } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axios } from '../../../api';
import Form from './Form';

type FormInputs = {
  name: string;
  userName: string;
  location?: string;
  information?: string;
};

const EditProfileForm = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { data, isLoading, isFetched } = useGetUserDetailsQuery();
  const { mutate, isPending } = useEditUserProfileMutation(() => setSnackbarOpen(true));

  const handleClick: SubmitHandler<FormInputs> = async data => {
    mutate(data);
  };

  return (
    <>
      {isLoading && <CircularProgress />}
      {isFetched &&
        <Form
          initialValues={data!}
          isPending={isPending}
          onSubmit={handleClick}
        />
      }
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Профіль успішно оновлено
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditProfileForm;

type EditUserProfileMutationResult = {
  id: string;
  email: string;
  name: string;
  userName: string;
  location: string | null;
  information: string | null;
};

type EditUserProfileMutationError = {
  errors: {
    name?: string[];
    userName?: string[];
    location?: string[];
    information?: string[];
  }
};

type EditUserProfileMutationVariables = {
  name: string;
  userName: string;
  location?: string;
  information?: string;
};

function useEditUserProfileMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation<EditUserProfileMutationResult, Error, EditUserProfileMutationVariables>({
    mutationFn: variables => axios.put<EditUserProfileMutationResult>('/api/profileinfo', variables).then(res => res.data),
    onError: error => {
      if (axios.isAxiosError<EditUserProfileMutationError>(error)) {
        if (error.response?.status === 400) {
          throw error.response.data;
        }
      }
    },
    onSuccess: data => {
      queryClient.setQueriesData({
        queryKey: ['user'],
      }, (oldData: any) => ({ ...oldData, ...data }));
      onSuccess && onSuccess();
    },
  });
}

type UserDetailsQueryResultType = {
  id: string;
  email: string;
  name: string;
  userName: string;
  location: string | null;
  information: string | null;
};

function useGetUserDetailsQuery() {
  return useQuery<UserDetailsQueryResultType>({
    queryKey: ['user'],
    queryFn: () => axios.get<UserDetailsQueryResultType>('/api/profileinfo').then(res => res.data)
  });
}
