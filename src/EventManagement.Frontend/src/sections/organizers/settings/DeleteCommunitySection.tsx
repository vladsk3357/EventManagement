import { useQueryClient, useMutation } from "@tanstack/react-query";
import { axios } from '../../../api';
import { useNavigate, useParams } from "react-router-dom";
import { Community } from "../types";
import { LoadingButton } from "@mui/lab";
import { Card, CardContent, Grid, Typography, Button, Dialog, DialogTitle, DialogContent, Stack, DialogActions } from "@mui/material";
import { useState } from "react";

type Props = {
  communityId: number;
}

const DeleteCommunitySection = ({ communityId }: Props) => {
  const [show, setShow] = useState(false);
  const { mutate, isPending } = useDeleteCommunityMutation(communityId);

  const handleClose = () => setShow(false);

  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography variant="subtitle1">Видалити спільноту</Typography>
              <Typography variant="body2">
                Видалення спільноти незворотній процес. Після видалення ви вже не зможете відновити спільноту. Всю інформацію про спільноту буде видалено.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Button variant="outlined" color="error" fullWidth onClick={() => setShow(true)}>
                Видалити спільноту
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Dialog
        open={show}
        onClose={handleClose}
        sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: 500 } }}
      >
        <DialogTitle>Видалити спільноту</DialogTitle>
        <DialogContent>
          <Typography>Ви впевнені, що хочете видалити спільноту?</Typography>

          <DialogActions>
            <Button onClick={handleClose} color="primary" variant="contained">
              Скасувати
            </Button>
            <LoadingButton
              loading={isPending}
              onClick={() => mutate()}
              variant="contained"
              color="error"
            >
              Видалити
            </LoadingButton>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteCommunitySection;

function useDeleteCommunityMutation(communityId: number) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => axios.delete(`/api/organizers/communities/${communityId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community', communityId] });
      navigate('/organizers');
    },
  });
}
