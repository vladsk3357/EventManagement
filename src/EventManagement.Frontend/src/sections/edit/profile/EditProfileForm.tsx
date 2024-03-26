import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, FormControlLabel, Grid, Snackbar, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axios } from '../../../api';
import { UserContext } from '../../../components/user';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Form from './Form';

// --

type FormInputs = {
  email: string;
  phoneNumber?: string;
  name: string;
  userName: string;
  birthday?: string;
  location?: string;
  information?: string;
};

const schema = yup
  .object({
    email: yup.string()
      .email("Електронна пошта не валідна")
      .required("Електронна пошта є обов'язковою"),
    phoneNumber: yup.string(),
    name: yup.string()
      .required("Ім'я є обов'язковим"),
    userName: yup.string()
      .required("Логін є обов'язковим"),
    birthday: yup.string(),
    location: yup.string(),
    information: yup.string(),
  })
  .required()

const EditProfileForm = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data, isFetching, isFetched } = useQuery({
    queryKey: ['user'],
    queryFn: () => axios.get<UserDetailsQueryResultType>('/api/profileinfo').then(res => res.data)
  });

  const { register, handleSubmit, setError } = useForm<FormInputs>(
    {
      resolver: yupResolver(schema),
      defaultValues: {
        email: data?.email,
        phoneNumber: data?.phoneNumber || undefined,
        name: data?.name,
        userName: data?.userName,
        birthday: data?.birthday || undefined,
        location: data?.location || undefined,
        information: data?.information || undefined,
      }
    });

  const { mutate, isPending } = useMutation<EditUserProfileMutationResult, Error, EditUserProfileMutationVariables>({
    mutationFn: variables => axios.put<EditUserProfileMutationResult>('/api/profileinfo', variables).then(res => res.data),
    onError: error => {
      if (axios.isAxiosError<EditUserProfileMutationError>(error)) {
        if (error.response?.status === 400) {
          Object.entries(error.response?.data.errors).forEach(([key, value]) => {
            setError(key as keyof FormInputs, {
              type: 'validate',
              message: value[0],
            });
          });
        }
      }
    },
    onSuccess: data => {
      setSnackbarOpen(true);
      queryClient.setQueryData(['user'], data);
    },
  });

  const handleClick: SubmitHandler<FormInputs> = async data => {
    mutate(data);
  };

  return (
    <>
      {isFetching && <div>Завантаження...</div>}
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
        message="Note archived"
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Profile information successfully updated!
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditProfileForm;

type EditUserProfileMutationResult = {
  id: string;
  email: string;
  phoneNumber: string | null;
  name: string;
  userName: string;
  birthday: string | null;
  location: string | null;
  information: string | null;
};

type EditUserProfileMutationError = {
  errors: {
    email?: string[];
    phoneNumber?: string[];
    name?: string[];
    userName?: string[];
    birthday?: string[];
    location?: string[];
    information?: string[];
  }
};

type EditUserProfileMutationVariables = {
  email: string;
  phoneNumber?: string;
  name: string;
  userName: string;
  birthday?: string;
  location?: string;
  information?: string;
};

type UserDetailsQueryResultType = {
  id: string;
  email: string;
  phoneNumber: string | null;
  name: string;
  userName: string;
  birthday: string | null;
  location: string | null;
  information: string | null;
};

