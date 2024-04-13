import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Controller, useFormContext } from "react-hook-form-mui";
import { Box, InputLabel, Typography } from "@mui/material";

type Props = {
  name: string;
  label: string;
  required?: boolean;
}

const RichTextEditorElement = ({ name, label, required }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Box>
          <InputLabel color={fieldState.error ? "error" : 'primary'} required={required}>
            {label}
          </InputLabel>
          <CKEditor
            editor={ClassicEditor}
            data={field.value}
            onChange={(event, editor) => {
              field.onChange(editor.getData());
            }}
            onBlur={field.onBlur}
          />
          {fieldState.error && (<Typography variant="caption" ml={2} color="#FF4842">{fieldState.error.message}</Typography>)}
        </Box>
      )}
    >
    </Controller>
  );
};

export default RichTextEditorElement;
