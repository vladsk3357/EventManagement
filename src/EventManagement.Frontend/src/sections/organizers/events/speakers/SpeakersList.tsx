import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axios } from "../../../../api";
import { Speaker } from "../common/types";
import { Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, Stack, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { FormContainer } from "react-hook-form-mui";
import { LoadingButton } from "@mui/lab";
import AddSpeakerButton from "./AddSpeakerButton";
import EditSpeakerButton from "./EditSpeakerButton";
import DeleteSpeakerButton from "./DeleteSpeakerButton";
import { useSpeakersList } from "../common";

const SpeakersList = () => {
  const { eventId } = useParams();
  const { data, isLoading, isFetched } = useSpeakersList(eventId!);

  return (
    <Box>
      <Box mb={3}>
        <AddSpeakerButton />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ім'я</TableCell>
              <TableCell>Посада</TableCell>
              <TableCell>Компанія</TableCell>
              <TableCell align="right">Дія</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4} align="center"><CircularProgress /></TableCell>
              </TableRow>
            )}
            {isFetched && data && (data.speakers.length ? data.speakers.map((speaker) => (
              <TableRow
                key={speaker.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {speaker.name}
                </TableCell>
                <TableCell>{speaker.title}</TableCell>
                <TableCell>{speaker.company}</TableCell>
                <TableCell align="right" sx={{ display: 'flex', justifyContent: 'end' }}>
                  <Stack spacing={2} direction="row" >
                    <EditSpeakerButton speaker={speaker} />
                    <DeleteSpeakerButton speaker={speaker} />
                  </Stack>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={4} align="center">Спікерів ще не додано</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SpeakersList;

