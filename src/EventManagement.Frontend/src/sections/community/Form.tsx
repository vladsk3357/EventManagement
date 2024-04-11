import { Box, Stack } from "@mui/material";
import { TextFieldElement, RadioButtonGroup, CheckboxButtonGroup, FormContainer, useForm } from "react-hook-form-mui";
import { FormField } from "../common/queries";
import { LoadingButton } from "@mui/lab";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo } from "react";

type Props = {
  fields: FormField[];
  onSubmit: (data: FormInputs) => void;
  isSubmitting: boolean;
};

const Form = ({ fields, onSubmit, isSubmitting }: Props) => {
  const schema: yup.ObjectSchema<FormInputs> = useMemo(() => yup.object().shape(
    fields.reduce((acc, field) => {
      switch (field.type) {
        case 'ShortText':
        case 'LongText':
          let textFieldSchema = field.type === 'ShortText'
            ? yup.string().max(255, 'Максимальна довжина тексту 255 символів')
            : yup.string().max(1000, 'Максимальна довжина тексту 1000 символів');

          if (field.isRequired)
            textFieldSchema = textFieldSchema.required('Це поле є обов\'язковим');

          return {
            ...acc,
            [field.name]: textFieldSchema,
          };
        case 'SingleOption':
          let singleOptionFieldSchema = yup.string();
          if (field.isRequired)
            singleOptionFieldSchema = singleOptionFieldSchema.required('Це поле є обов\'язковим');
          return {
            ...acc,
            [field.name]: singleOptionFieldSchema,
          };
        case 'MultipleOptions':
          let multipleOptionsFieldSchema = yup.array().of(yup.string());
          if (field.isRequired)
            multipleOptionsFieldSchema = multipleOptionsFieldSchema.min(1, "Це поле є обов\'язковим").required('Це поле є обов\'язковим');
          return {
            ...acc,
            [field.name]: multipleOptionsFieldSchema,
          };
        default:
          return acc;
      }
    }, {}),
  ), [yup, fields]);

  return (
    <Box>
      <FormContainer<FormInputs> onSuccess={onSubmit} resolver={yupResolver(schema)}>
        <Stack spacing={2}>
          {fields.map(field => {
            switch (field.type) {
              case 'ShortText':
                return (
                  <TextFieldElement
                    key={field.name}
                    name={field.name}
                    label={field.name}
                    required={field.isRequired}
                    helperText={field.description}
                  />
                );
              case 'LongText':
                return (
                  <TextFieldElement
                    key={field.name}
                    name={field.name}
                    label={field.name}
                    required={field.isRequired}
                    helperText={field.description}
                    multiline
                  />
                );
              case 'SingleOption':
                return (
                  <RadioButtonGroup
                    key={field.name}
                    name={field.name}
                    label={field.name}
                    required={field.isRequired}
                    options={field.options.map(o => ({ id: o, label: o }))}
                  />
                );
              case 'MultipleOptions':
                return (
                  <CheckboxButtonGroup
                    key={field.name}
                    name={field.name}
                    label={field.name}
                    required={field.isRequired}
                    options={field.options.map(o => ({ id: o, label: o }))}
                  />
                );
              default:
                return null;
            }
          })}
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>Стати учасником</LoadingButton>
        </Stack>
      </FormContainer>
    </Box>
  );
};

export default Form;

type FormInputs = Record<string, string | string[]>;
