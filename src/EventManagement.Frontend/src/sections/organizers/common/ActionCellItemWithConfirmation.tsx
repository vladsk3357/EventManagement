import { useState } from 'react';
import {
  GridActionsCellItem,
  GridActionsCellItemProps,
} from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

type Props = GridActionsCellItemProps & {
  action: () => void;
  dialogTitle: string;
  dialogContent: string;
  actionButtonLabel: string;
};

const ActionCellItemWithConfirmation = ({
  action,
  dialogTitle,
  dialogContent,
  actionButtonLabel,
  ...props
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <GridActionsCellItem {...props} onClick={() => setOpen(true)} />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Відмінити</Button>
          <Button
            onClick={() => {
              setOpen(false);
              action();
            }}
            color="warning"
            autoFocus
          >
            {actionButtonLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ActionCellItemWithConfirmation;
