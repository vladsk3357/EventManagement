import { Box, Card, CardContent, CircularProgress, Stack, Typography } from "@mui/material";
import { FormContainer, TextFieldElement, RadioButtonGroup, CheckboxButtonGroup } from "react-hook-form-mui";
import { useQuery } from "@tanstack/react-query";
import { axios } from '../../../../api';
import { useParams } from "react-router-dom";


const AnswerDetails = () => {
  const { data, isLoading, isFetched } = useGetFormAnswer();

  return (
    <Box>
      {isLoading && <CircularProgress />}
      {isFetched && data && (
        <>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Stack direction="row" spacing={2}>
                <Typography variant="body1">{data.name}</Typography>
                <Typography variant="body2">{data.userName}</Typography>
                <Typography variant="body2">{new Date(data.answerDate).toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</Typography>
              </Stack>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <FormContainer<FormInputs> values={data.fields.reduce((values, f) => ({ ...values, [f.name]: f.value }), {})}>
                <Stack spacing={2}>
                  {data.fields.map(field => {
                    switch (field.type) {
                      case 'ShortText':
                        return (
                          <TextFieldElement
                            key={field.name}
                            name={field.name}
                            label={field.name}
                            required={field.isRequired}
                            helperText={field.description}
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
                          />
                        );
                      default:
                        return null;
                    }
                  })}
                </Stack>
              </FormContainer>
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
};

export default AnswerDetails;

type FormInputs = Record<string, string | string[]>;

export function useGetFormAnswer() {
  const { communityId, answerId } = useParams();

  return useQuery({
    queryKey: ['formAnswer', answerId],
    queryFn: async () => {
      const res = await axios.get<GetFormAnswerQueryResult>(`/api/organizers/communities/${communityId}/subscription-form/answers/${answerId}`);
      return res.data;
    },
  })
}

type GetFormAnswerQueryResult = {
  communityId: number;
  answerId: number;
  userId: string;
  userName: string;
  name: string;
  answerDate: string;
  fields: FormField[];
};

type Field = {
  name: string;
  description?: string;
  isRequired: boolean;
  order: number;
}

export type SingleOption = Field & {
  type: 'SingleOption';
  options: string[];
  value: string;
}

export type MultipleOptions = Field & {
  type: 'MultipleOptions';
  options: string[];
  value: string[];
}

export type TextField = Field & {
  type: 'ShortText' | 'LongText';
  value: string;
};

export type FormField = (SingleOption | MultipleOptions | TextField);
