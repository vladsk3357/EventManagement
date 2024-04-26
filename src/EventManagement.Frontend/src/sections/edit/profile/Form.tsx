import { TextField, Grid, Button, Avatar, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormContainer,
  SubmitHandler,
  TextFieldElement,
  useForm,
} from 'react-hook-form-mui';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import FileUploadFieldElement from '../../../components/organizers/fileUploadFieldElement';

type Props = {
  onSubmit: SubmitHandler<FormInputs>;
  isPending: boolean;
  initialValues: {
    email: string;
    name: string;
    userName: string;
    location: string | null;
    information: string | null;
    profileImageUrl: string | null;
  };
};


type FormInputs = {
  phoneNumber?: string;
  name: string;
  userName: string;
  birthday?: string;
  location?: string;
  information?: string;
  profileImage?: FileList | null;
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
  const form = useForm<FormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: initialValues.name,
      userName: initialValues.userName,
      location: initialValues?.location || undefined,
      information: initialValues?.information || undefined,
      profileImage: undefined,
    },
  });
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(initialValues?.profileImageUrl || null);
  const { watch } = form;
  const file = watch('profileImage');

  useEffect(() => {
    console.log(file);
  }, [file]);

  return (
    <FormContainer onSuccess={onSubmit} formContext={form}>
      <Grid container spacing={2}>
        <Grid item xs={12} mb={2}>
          <Avatar
            alt="profile image"
            src={profileImagePreview || undefined}
            sx={{ width: 120, height: 120, mb: 2 }} />

          <FileUploadFieldElement
            label="Завантажити картинку"
            name='profileImage'
            accept='image/*'
            onFileLoadEnd={result => setProfileImagePreview(result as string | null)}
          />
        </Grid>
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
          <TextFieldElement
            fullWidth
            multiline
            rows={5}
            name="information"
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

