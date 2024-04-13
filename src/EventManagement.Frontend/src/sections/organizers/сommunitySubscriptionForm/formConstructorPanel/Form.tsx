import { LoadingButton } from "@mui/lab";
import { Box, Stack, Button } from "@mui/material";
import { useCallback } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FormContainer } from "react-hook-form-mui";
import { FormField, OptionField, TextField } from "../../types";
import FormFieldCard from "./FormFieldCard";
import { FormInputs } from "../types";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

const OptionFieldSchema: yup.ObjectSchema<OptionField> = yup.object({
  name: yup.string().required(),
  description: yup.string(),
  isRequired: yup.boolean().required(),
  order: yup.number().required(),
  type: yup.string().oneOf(['SingleOption', 'MultipleOptions']).required(),
  options: yup.array().of(yup.string().required('Варіант відповіді є обов\'язковим')).min(1, 'At least one option is required').required(),
});

const TextFieldSchema: yup.ObjectSchema<TextField> = yup.object({
  name: yup.string().required(),
  description: yup.string(),
  isRequired: yup.boolean().required(),
  order: yup.number().required(),
  type: yup.string().oneOf(['ShortText', 'LongText']).required(),
});

const FormFieldSchema: any = yup.lazy(value => {
  switch (value.type) {
    case 'SingleOption':
    case 'MultipleOptions':
      return OptionFieldSchema;
    case 'ShortText':
    case 'LongText':
      return TextFieldSchema;
    default:
      return yup.object();
  }
});

const schema: any = yup.object({
  fields: yup.array().of(FormFieldSchema).required(),
});

type Props = {
  formFields: FormField[];
  onSubmit: (data: FormInputs) => void;
  isPending: boolean;
}

const Form = ({ formFields, onSubmit, isPending }: Props) => {
  const form = useForm<FormInputs>({
    defaultValues: { fields: formFields },
    resolver: yupResolver(schema),
  });
  const { control, formState } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "fields",
  });

  const handleAddField = useCallback(() => {
    append({ type: 'ShortText', name: '', description: '', isRequired: false, order: fields.length + 1 });
  }, [append, fields.length]);

  const handleSubmit = useCallback((data: FormInputs) => {
    onSubmit({ fields: data.fields });
  }, [onSubmit]);

  return (
    <FormContainer formContext={form} onSuccess={handleSubmit} >
      <Box>
        <Stack direction="column" spacing={3}>
          {fields.map((field, index) => (
            <FormFieldCard key={field.id} index={index} field={field} onDelete={() => remove(index)} />
          ))}
          <Box>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={handleAddField}>
              Нове поле
            </Button>
          </Box>
          <Box>
            <LoadingButton
              variant="contained"
              color="primary"
              type="submit"
              loading={isPending}
              disabled={!formState.isDirty}
            >
              Зберегти
            </LoadingButton>
          </Box>
        </Stack>
      </Box >
    </FormContainer>
  );
};

export default Form;
