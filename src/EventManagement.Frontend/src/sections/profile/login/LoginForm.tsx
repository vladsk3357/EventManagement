import { useContext, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, FormControlLabel, Typography, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { axios } from '../../../api';
import { UserContext } from '../../../components/user';

type FormInputs = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string()
      .email("Електронна пошта не валідна")
      .required("Електронна пошта є обов'язковою"),

    password: yup.string()
      .required("Пароль є обов'язковим"),
  })
  .required()

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const { setTokens } = useContext(UserContext);

  const { register, handleSubmit, setError, formState: { errors }, watch } = useForm<FormInputs>({ resolver: yupResolver(schema) });

  const { mutate, isPending } = useMutation({
    mutationFn: async (variables: LoginUserMutationVariables) => {
      return await axios.post<LoginUserMutationResult>('/api/profileuser/login', variables);
    },
    onError: error => {
      if (axios.isAxiosError<LoginUserMutationError>(error)) {
        Object.entries(error.response!.data.errors).forEach(([key, value]) => {
          setError(key as keyof FormInputs, {
            type: 'validate',
            message: value[0],
          });
        });
      }
    },
    onSuccess: res => {
      setTokens(res.data);
      navigate('/');
    },
  });

  const handleClick: SubmitHandler<FormInputs> = async data => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(handleClick)}>

      <Stack spacing={3} sx={{ mb: 2 }}>
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
        {errors.root && <Typography color="red">Електронна пошта або пароль неправильні</Typography>}
      </Stack>
      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isPending}>
        Вхід
      </LoadingButton>
      <Box mt={2}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Ще не маєте облікового запису? {' '}
          <Link component={RouterLink} to="/register" variant="subtitle2" underline="hover">
            Зареєструватися
          </Link>
        </Typography>
      </Box>
    </form>
  );
}


type LoginUserMutationResult = {
  accessToken: string;
  refreshToken: string;
};

type LoginUserMutationError = {
  errors: {
    email: string[];
    password: string[];
  }
};

type LoginUserMutationVariables = {
  email: string;
  password: string;
};
