import { Card, CardContent, Stack, Button, Grid, Box } from "@mui/material";
import { TextFieldElement, ToggleButtonGroupElement, SwitchElement, useFormContext } from "react-hook-form-mui";
import DeleteIcon from '@mui/icons-material/Delete';
import { MouseEventHandler, useCallback } from "react";
import OptionsArrayField from "./OptionsArrayField";

type Props = {
  index: number;
  onDelete: () => void;
};

const FormFieldCard = ({ index, onDelete }: Props) => {
  const { watch } = useFormContext();
  const type = watch(`fields[${index}].type`);
  const handleDelete = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    onDelete();
  }, [index]);

  return (
    <Card>
      <CardContent>
        <Stack direction="column" spacing={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextFieldElement name={`fields[${index}].name`} label="Назва" fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <TextFieldElement name={`fields[${index}].description`} label="Опис" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <ToggleButtonGroupElement
                name={`fields[${index}].type`}
                label="Тип поля"
                exclusive
                required
                options={[
                  { id: 'ShortText', label: 'Короткий текст' },
                  { id: 'LongText', label: 'Довгий текст' },
                  { id: 'SingleOption', label: 'Один варіант' },
                  { id: 'MultipleOptions', label: 'Кілька варіантів' },
                ]} />
            </Grid>
            {(type === 'SingleOption' || type === 'MultipleOptions') && (
              <Grid item xs={12}>
                <OptionsArrayField name={`fields[${index}].options`} />
              </Grid>
            )}
            <Grid item xs={6}>
              <SwitchElement
                label="Обов'язкове?"
                labelPlacement="end"
                name={`fields[${index}].isRequired`}
              />
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ justifyContent: 'end', display: 'flex' }}>
                <Button color="error" onClick={handleDelete}><DeleteIcon /></Button>
              </Box>
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default FormFieldCard;
