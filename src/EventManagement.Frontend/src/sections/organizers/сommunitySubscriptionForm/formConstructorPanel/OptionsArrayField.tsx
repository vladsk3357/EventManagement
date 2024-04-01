import { Box, Button, Grid, Stack } from "@mui/material";
import { TextFieldElement, useFieldArray, useFormContext } from "react-hook-form-mui";
import DeleteIcon from '@mui/icons-material/Delete';
import { Fragment } from "react";

type Props = {
  name: string;
}

const OptionsArrayField = ({ name }: Props) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <Grid container gap={2}>
      {fields.map((field, index) => (
        <Fragment key={field.id}>
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={2}>
              <TextFieldElement
                name={`${name}[${index}]`}
                label="Варіант"
                required
                fullWidth
              />
              <Button color="error" onClick={() => remove(index)}><DeleteIcon /></Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} />
        </Fragment>
      ))}
      <Grid item xs={12}>
        <Button onClick={() => append('')}>Додати варіант</Button>
      </Grid>
    </Grid>
  );
};

export default OptionsArrayField;
