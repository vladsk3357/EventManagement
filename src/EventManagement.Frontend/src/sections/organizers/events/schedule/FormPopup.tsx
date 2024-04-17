import { LoadingButton } from "@mui/lab";
import { Dialog, DialogTitle, DialogContent, Stack, DialogActions, Button, Grid } from "@mui/material";
import { FormContainer, TextFieldElement, useForm, MultiSelectElement, TimePickerElement } from "react-hook-form-mui";
import { FormInputs } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import moment from "moment";
import { Speaker } from "../common/types";

type Props = {
  show: boolean;
  onClose: () => void;
  isPending: boolean;
  title?: string;
  defaultValues?: Partial<FormInputs>;
  onSubmit: (data: FormInputs) => void;
  speakers: Speaker[];
  startDate: moment.Moment;
  endDate: moment.Moment;
}

const schema: yup.ObjectSchema<FormInputs> = yup.object().shape({
  title: yup.string().required("Назва є обов'язковою"),
  startTime: yup.mixed((input): input is moment.Moment => moment.isMoment(input)).test({
    message: 'Дата початку повинна бути в майбутньому',
    test: function (value) {
      if (!value)
        return true;
      return moment(value).diff(moment()) > 0;
    }
  }).required('Це поле є обов\'язковим'),
  duration: yup.number().min(1, 'Мінімальне значення 1').required('Це поле є обов\'язковим'),
  description: yup.string().required('Це поле є обов\'язковим'),
  speakerIds: yup.array().of(yup.number().required()).required('Це поле є обов\'язковим'),
});

const FormPopup = ({ show, onClose, isPending, title, defaultValues, onSubmit, speakers, startDate, endDate }: Props) => {
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextFieldElement
                name="title"
                label="Назва"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TimePickerElement
                disablePast
                name="startTime"
                label="Початок"
                required
                ampm={false}
                minTime={startDate}
                maxTime={endDate}
                disableIgnoringDatePartForTimeValidation
              />
            </Grid>
            <Grid item xs={6}>
              <TextFieldElement
                name="duration"
                label="Тривалість (хвилини)"
                type="number"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldElement
                name="description"
                label="Опис"
                required
                fullWidth
                multiline
                rows={6}
              />
            </Grid>
            <Grid item xs={12}>
              <MultiSelectElement
                name="speakerIds"
                label="Спікери"
                required
                fullWidth
                itemKey="value"
                itemLabel="label"
                options={speakers.map(s => ({ value: s.id, label: s.name }))}
                showChips
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                onClick={onClose}
                variant="contained"
                color="secondary"
              >
                Закрити
              </Button>
            </Grid>
            <Grid item xs={6}>
              <LoadingButton
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                loading={isPending}
              >
                Зберегти
              </LoadingButton>
            </Grid>
          </Grid>
        </FormContainer>
      </DialogContent>
    </Dialog >
  );
};

const FormPopupWrapper = (props: Props) => {
  const { show } = props;
  return show ? <FormPopup {...props} /> : null;
};

export default FormPopupWrapper;
