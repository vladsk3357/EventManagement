// @mui
import { TextField, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

type Props = {
  onSubmit: SubmitHandler<FormInputs>;
  isPending: boolean;
};

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

const Form = ({ onSubmit, isPending }: Props) => {
  const { register, handleSubmit, setError } = useForm<FormInputs>(
    {
      resolver: yupResolver(schema),
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

export default Form;

