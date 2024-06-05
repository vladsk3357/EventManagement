import { LoadingButton } from "@mui/lab";
import { Dialog, DialogTitle, DialogContent, Stack, DialogActions, Button } from "@mui/material";
import { FormContainer, SubmitHandler, TextFieldElement, useForm } from "react-hook-form-mui";
import { FormInputs } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

type Props = {
  show: boolean;
  onClose: () => void;
  isPending: boolean;
  title?: string;
  defaultValues?: Partial<FormInputs>;
  onSubmit: (data: FormInputs) => void;
}

const schema: yup.ObjectSchema<FormInputs> = yup.object().shape({
  name: yup.string().required("Ім'я є обов'язковим")
    .max(100, "Ім'я повинно містити максимум 100 символів"),
  title: yup.string().required("Посада є обов'язковою")
    .max(100, "Посада повинна містити максимум 100 символів"),
  company: yup.string().required("Компанія є обов'язковим")
    .max(100, "Компанія повинна містити максимум 100 символів"),
  bio: yup.string().required("Біографія є обов'язковою")
    .max(500, "Біографія повинна містити максимум 500 символів")
});

const FormPopup = ({ show, onClose, isPending, title, defaultValues, onSubmit }: Props) => {
  const form = useForm<FormInputs>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const successHandler: SubmitHandler<FormInputs> = data => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Dialog
      open={show}
      onClose={onClose}
      sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: 500 } }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <FormContainer<FormInputs> formContext={form} onSuccess={successHandler}>
          <Stack spacing={2}>
            <TextFieldElement
              name="name"
              label="Ім'я"
              required
              fullWidth
            />
            <TextFieldElement
              name="title"
              label="Посада"
              required
              fullWidth
            />
            <TextFieldElement
              name="company"
              label="Компанія"
              required
              fullWidth
            />
            <TextFieldElement
              name="bio"
              label="Біографія"
              multiline
              rows={6}
              required
              fullWidth
            />
            <Button onClick={onClose} variant="outlined" color="secondary">Закрити</Button>
            <LoadingButton type="submit" variant="contained" color="primary" loading={isPending}>Зберегти</LoadingButton>
          </Stack>
        </FormContainer>
      </DialogContent>
    </Dialog >
  );
};

export default FormPopup;
