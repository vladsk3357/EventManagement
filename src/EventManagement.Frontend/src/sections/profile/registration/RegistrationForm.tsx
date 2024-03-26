import { useContext, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Box, Typography, Link } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from '@tanstack/react-query';
import { axios } from '../../../api';
import { UserContext } from '../../../components/user';

// ----------------------------------------------------------------------

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

const schema = yup
  .object({
    name: yup.string()
      .required("Ім'я є обов'язковим")
      .test({ name: 'no white space', message: 'Ім\'я не може містити пробіли', test: value => /\S+/.test(value) }),

    email: yup.string()
      .email("Електронна пошта не валідна")
      .required("Електронна пошта є обов'язковою"),

    password: yup.string()
      .required("Пароль є обов'язковим"),
  })
  .required()

export default function RegistrationForm() {
  const navigate = useNavigate();
  const { setTokens } = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, setError, formState: { errors } } = useForm<FormInputs>({ resolver: yupResolver(schema) });

  const { mutate } = useMutation<RegisterUserMutationResult, Error, RegisterUserMutationVariables>({
    mutationFn: variables => axios.post<RegisterUserMutationResult>('/api/profileuser/register', variables).then(res => res.data),
    onError: error => {
      if (axios.isAxiosError<RegisterUserMutationError>(error)) {
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
      setTokens(data);
      navigate('/dashboard');
    },
  });

  // const onError = (errors: RegistrationFormErrors) => {
  //   Object.entries(errors).forEach(([key, value]) => {
  //     setError(key as keyof FormInputs, {
  //       type: 'validate',
  //       message: value[0],
  //     });
  //   });
  // };

  const onSuccess = ({ accessToken, refreshToken }: RegisterUserMutationResult) => {
    setTokens({ accessToken, refreshToken });
    navigate('/dashboard');
  };

  // const { mutate } = useRegister(onSuccess, onError);

  const handleClick: SubmitHandler<FormInputs> = variables => {
    mutate(variables);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleClick)}>
        <Stack spacing={3} sx={{ mb: 2 }}>
          <TextField
            {...register("name")}
            label="Ваше ім'я"
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            {...register("email")}
            label="Електронна пошта"
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            {...register("password")}
            label="Пароль"
            type={showPassword ? 'text' : 'password'}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Зареєструватися
        </LoadingButton>
        <Box mt={2}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Вже маєте обліковий запис? {' '}
            <Link component={RouterLink} to="/login" variant="subtitle2" underline="hover">
              Увійти
            </Link>
          </Typography>
        </Box>
      </form>
    </>
  );
}

function useRegister(onSuccess: (token: RegisterUserMutationResult) => void, onError: (error: RegistrationFormErrors) => void) {
  return useMutation<RegisterUserMutationResult, RegisterUserMutationError, RegisterUserMutationVariables>({
    mutationFn: registerUserMutationVariables => axios('/api/profileuser/register', {
      data: registerUserMutationVariables,
      method: 'POST',
    }).then(res => res.data).catch(res => res.response.data),
    onError: error => onError(error.errors),
    onSuccess: data => onSuccess(data),
  });
};

type RegisterUserMutationVariables = {
  name: string;
  email: string;
  password: string;
};

type RegisterUserMutationResult = {
  accessToken: string;
  refreshToken: string;
};

type RegisterUserMutationError = {
  errors: RegistrationFormErrors;
};

type RegistrationFormErrors = {
  name?: string[];
  email?: string[];
  password?: string[];
};
