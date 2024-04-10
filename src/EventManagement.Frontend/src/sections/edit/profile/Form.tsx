import { Stack, TextField, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormContainer, SubmitHandler, TextareaAutosizeElement, TextFieldElement, useForm } from 'react-hook-form-mui';

type Props = {
  onSubmit: SubmitHandler<FormInputs>;
  isPending: boolean;
  initialValues: {
    email: string;
    name: string;
    userName: string;
    location: string | null;
    information: string | null;
  };
};


type FormInputs = {
  phoneNumber?: string;
  name: string;
  userName: string;
  birthday?: string;
  location?: string;
  information?: string;
};

const schema = yup
  .object({
    phoneNumber: yup.string(),
    name: yup.string()
      .required("Ім'я є обов'язковим"),
    userName: yup.string()
      .required("Логін є обов'язковим")
      .matches(/^[a-zA-Z0-9_]*$/, 'Логін може містити тільки латинські літери, цифри та символ "_"'),
    birthday: yup.string(),
    location: yup.string(),
    information: yup.string(),
  })
  .required()

const Form = ({ initialValues, onSubmit, isPending }: Props) => {
  const form = useForm<FormInputs>(
    {
      resolver: yupResolver(schema),
      defaultValues: {
        name: initialValues?.name,
        userName: initialValues?.userName,
        location: initialValues?.location || undefined,
        information: initialValues?.information || undefined,
      }
    });

  return (
    <FormContainer onSuccess={onSubmit} formContext={form}>
      <Grid container spacing={2}>
        <Grid item xs={12} mb={2}>
          <TextField
            value={initialValues?.email}
            disabled
            label="Електронна пошта"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6} mb={2}>
          <TextFieldElement fullWidth name="name" label="Ім'я" required />
        </Grid>
        <Grid item xs={12} md={6} mb={2}>
          <TextFieldElement name="userName" label="Логін" fullWidth required />
        </Grid>
        <Grid item xs={12} mb={2}>
          <TextFieldElement name="location" label="Ваша локація" fullWidth />
        </Grid>
        <Grid item xs={12} mb={2}>
          <TextareaAutosizeElement
            fullWidth
            name="information"
            rows={4}
            label="Інформація"
          />
        </Grid>
      </Grid>
      <LoadingButton
        size="large"
        type="submit"
        variant="contained"
        loading={isPending}
      >
        Зберегти зміни
      </LoadingButton>
    </FormContainer>
  );
};

export default Form;

