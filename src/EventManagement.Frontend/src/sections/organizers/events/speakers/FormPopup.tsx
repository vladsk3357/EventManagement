import { LoadingButton } from "@mui/lab";
import { Dialog, DialogTitle, DialogContent, Stack, DialogActions, Button } from "@mui/material";
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
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
  name: yup.string().required("Ім'я є обов'язковим"),
  title: yup.string().required("Посада є обов'язковою"),
  company: yup.string().required("Компанія є обов'язковим"),
  bio: yup.string().required("Біографія є обов'язковою"),
});

const FormPopup = ({ show, onClose, isPending, title, defaultValues, onSubmit }: Props) => {
  const form = useForm<FormInputs>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  return (
    <Dialog
      open={show}
      onClose={onClose}
      sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: 500 } }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <FormContainer<FormInputs> formContext={form} onSuccess={onSubmit}>
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
            <Button onClick={onClose} variant="contained" color="secondary">Закрити</Button>
            <LoadingButton type="submit" variant="contained" color="primary" loading={isPending}>Зберегти</LoadingButton>
          </Stack>
        </FormContainer>
      </DialogContent>
    </Dialog >
  );
};

export default FormPopup;
