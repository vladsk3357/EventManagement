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

// --

type Props = {
  onSubmit: SubmitHandler<FormInputs>;
  // onError: (errors: {
  //   email?: string[];
  //   phoneNumber?: string[];
  //   name?: string[];
  //   userName?: string[];
  //   birthday?: string[];
  //   location?: string[];
  //   information?: string[];
  // }) => void;
  isPending: boolean;
  initialValues: {
    email: string;
    phoneNumber: string | null;
    name: string;
    userName: string;
    birthday: string | null;
    location: string | null;
    information: string | null;
  };
};


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

const Form = ({ initialValues, onSubmit, isPending }: Props) => {
  const { register, handleSubmit, setError } = useForm<FormInputs>(
    {
      resolver: yupResolver(schema),
      defaultValues: {
        email: initialValues?.email,
        phoneNumber: initialValues?.phoneNumber || undefined,
        name: initialValues?.name,
        userName: initialValues?.userName,
        birthday: initialValues?.birthday || undefined,
        location: initialValues?.location || undefined,
        information: initialValues?.information || undefined,
      }
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} mb={2}>
          <Stack spacing={3}>
            <TextField {...register("email")} label="Електронна пошта" />
            <TextField {...register("phoneNumber")} label="Телефон" />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} mb={2}>
          <Stack spacing={3}>
            <TextField {...register("name")} label="Ім'я" />
            {/* <DatePicker  {...register("birthday")} label="Дата народження" /> */}
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} mb={2}>
          <Stack spacing={3} >
            <TextField {...register("userName")} label="Логін" />
            <TextField {...register("location")} label="Ваша локація" />
          </Stack>
        </Grid>
        <Grid item xs={12} mb={2}>
          <TextField fullWidth {...register("information")} multiline rows={4} label="Інформація" />
        </Grid>
      </Grid>
      <LoadingButton size="large" type="submit" variant="contained" loading={isPending}>
        Зберегти зміни
      </LoadingButton>
    </form>
  );
};

export default Form;

