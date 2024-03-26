import { useState } from 'react';
import { TextField, Grid, Snackbar, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { axios } from '../../../api';
import { useNavigate } from 'react-router-dom';

type FormInputs = {
  name: string;
  location: string;
  domain: string;
};

const schema = yup
  .object({
    name: yup.string()
      .required("Ім'я є обов'язковим"),
    location: yup.string()
      .required("Локація є обов'язковою"),
    domain: yup.string()
      .required("Домен є обов'язковим"),
  })
  .required()

const CreateCommunityForm = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, setError } = useForm<FormInputs>(
    {
      resolver: yupResolver(schema),
    });

  const { mutate, isPending } = useMutation<CreateCommunityMutationResult, Error, CreateCommunityMutationVariables>({
    mutationFn: variables => axios.post<CreateCommunityMutationResult>('/api/organizers/communities', variables).then(res => res.data),
    onError: error => {
      if (axios.isAxiosError<CreateCommunityMutationError>(error)) {
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
      navigate(`/organizers/${data.id}`)
    },
  });

  const handleClick: SubmitHandler<FormInputs> = async data => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(handleClick)}>
      <Grid container spacing={2}>
        <Grid item xs={12} mb={2}>
          <TextField {...register("name")} label="Назва" fullWidth />
        </Grid>
        <Grid item xs={12} mb={2}>
          <TextField {...register("location")} label="Локація" fullWidth />
        </Grid>
        <Grid item xs={12} mb={2}>
          <TextField {...register("domain")} label="Домен" fullWidth />
        </Grid>
      </Grid>
      <LoadingButton size="large" type="submit" variant="contained" loading={isPending}>
        Створити
      </LoadingButton>
    </form>
  );
};

export default CreateCommunityForm;

type CreateCommunityMutationResult = {
  id: string;
};

type CreateCommunityMutationError = {
  errors: {
    name?: string[];
    location?: string[];
    domain?: string[];
  }
};

type CreateCommunityMutationVariables = {
  name: string;
  location: string;
  domain: string;
};
