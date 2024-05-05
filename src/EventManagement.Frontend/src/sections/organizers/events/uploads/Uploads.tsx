import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../../api";
import { useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { Masonry } from "@mui/lab";
import { FormContainer, useForm } from "react-hook-form-mui";
import FileUploadFieldElement from "../../../../components/organizers/fileUploadFieldElement";
import useImageViewer from "./useImageViewer";
import EventImage from "./EventImage";
import useResponsive from "../../../../hooks/useResponsive";

type FormInputs = {
  images: FileList;
}

const Uploads = () => {
  const { eventId: eventIdParam } = useParams();
  const eventId = Number(eventIdParam);
  const { data, isLoading, isFetched } = useGetEventImages(eventId);
  const { mutate } = useAddEventImages(eventId);
  const { open, viewer } = useImageViewer(data?.items.map((item) => item.url) || []);
  const isDesktop = useResponsive('up', 'lg');
  const form = useForm<FormInputs>({
    mode: 'onChange',
    resolver: (data) => {
      if (data.images.length === 0) {
        return { values: data, errors: {} };
      }

      mutate(data.images);

      return { values: data, errors: {} };
    },
  });
  return (
    <>
      <Box mb={3} display="flex" justifyContent="end">
        <FormContainer formContext={form}>
          <FileUploadFieldElement
            name="images"
            label="Завантажити картинки"
            multiple
            accept="image/*"
          />
        </FormContainer>
      </Box>
      {isLoading && <CircularProgress />}
      {isFetched && (
        <>
          <Masonry
            columns={isDesktop ? 2 : 1}
            spacing={2}
          >
            {data!.items.length === 0 && <p>Немає завантажених зображень</p>}
            {data!.items.map(({ id, url }, i) => (
              <EventImage key={id} id={id} url={url} />
            ))}
          </Masonry>
          {/* {viewer} */}
        </>
      )}
    </>
  );
};

export default Uploads;

function useGetEventImages(eventId: number) {
  return useQuery({
    queryKey: ['eventImages', eventId],
    queryFn: async () => {
      const response = await axios.get<GetEventImagesQueryResponse>(`/api/organizers/events/${eventId}/images`);
      return response.data;
    },
  });
}

type GetEventImagesQueryResponse = {
  items: {
    id: number;
    url: string;
  }[];
  totalCount: number
};

function useAddEventImages(eventId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (images: FileList) => {
      const formData = new FormData();
      formData.append('eventId', eventId.toString());

      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }

      const response = await axios.post(`/api/organizers/events/${eventId}/images`, formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['eventImages', eventId],
      });
    },
  });
}