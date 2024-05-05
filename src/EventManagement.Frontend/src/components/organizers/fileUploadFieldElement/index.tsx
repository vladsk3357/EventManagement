import { Button, styled } from "@mui/material";
import { ChangeEvent } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useForm, useFormContext } from "react-hook-form-mui";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

type Props = {
  name: string;
  label: string;
  required?: boolean;
  accept?: string;
  multiple?: boolean;
  onFileLoadEnd?: (result: string | ArrayBuffer | null) => void;
};

const FileUploadFieldElement = ({
  name,
  label,
  required,
  accept,
  multiple,
  onFileLoadEnd
}: Props) => {
  const { register } = useFormContext();

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = event.target.files?.[0];
    if (!file)
      return;
    reader.onloadend = () => {
      onFileLoadEnd?.(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      {label}
      <VisuallyHiddenInput
        {...register(name, { onChange: handleFileUpload })}
        type="file"
        accept={accept}
        required={!!required}
        multiple={!!multiple}
      />
    </Button>
  );
};

export default FileUploadFieldElement;
