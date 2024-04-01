import { TabPanel } from "@mui/lab";
import { CircularProgress } from "@mui/material";
import { useCallback } from "react";
import { FormField } from "../../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axios } from '../../../../api';
import { useParams } from "react-router-dom";
import Form from "./Form";

type Props = {
  value: string;
}

const FormConstructorPanel = ({ value }: Props) => {
  const { communityId: communityIdParam } = useParams();
  const communityId = Number(communityIdParam);
  const { data, isLoading, isFetched } = useGetCommunitySubscriptionForm(communityId);
  const { mutate, isPending } = useEditCommunitySubscriptionForm(communityId);

  const handleSubmit = useCallback((data: FormInputs) => {
    // mutate({
    //   fields: data.fields.map(f => {
    //     if (f.type === 'SingleOption' || f.type === 'MultipleOptions') {
    //       return {
    //         name: f.name,
    //         description: f.description,
    //         type: f.type,
    //         isRequired: f.isRequired,
    //         order: f.order,
    //         properties: { options: f.options },
    //       }
    //     }
    //     else {
    //       return {
    //         name: f.name,
    //         description: f.description,
    //         type: f.type,
    //         isRequired: f.isRequired,
    //         order: f.order,
    //       }
    //     }
    //   }), communityId
    // });
    mutate({ fields: data.fields, communityId });
  }, [mutate]);

  return (
    <TabPanel value={value}>
      {isLoading && <CircularProgress />}
      {isFetched && data && (
        <Form formFields={data.fields} onSubmit={handleSubmit} isPending={isPending} />
      )}
    </TabPanel >
  );
};

export default FormConstructorPanel;

type FormInputs = {
  fields: FormField[];
};

type GetCommunitySubscriptionFormQueryResult = {
  communityId: number;
  fields: FormFieldInput[];
};

function useGetCommunitySubscriptionForm(communityId: number) {
  return useQuery({
    queryKey: ['communitySubscriptionForm', { communityId }],
    queryFn: async () => {
      const res = await axios.get<GetCommunitySubscriptionFormQueryResult>(`/api/organizers/communities/${communityId}/subscription-form`);
      return res.data;
      // return {
      //   communityId: res.data.communityId,
      //   fields: res.data.fields.map(f => {
      //     if (f.type === "SingleOption" || f.type === "MultipleOptions") {
      //       return {
      //         name: f.name,
      //         description: f.description,
      //         isRequired: f.isRequired,
      //         order: f.order,
      //         type: f.type,
      //         options: f.properties.options,
      //       }
      //     }
      //     else {
      //       return {
      //         name: f.name,
      //         description: f.description,
      //         isRequired: f.isRequired,
      //         order: f.order,
      //         type: f.type,
      //       }
      //     }
      //   })
      // };
    }
  });
}

type FieldInput = {
  name: string;
  description?: string;
  isRequired: boolean;
  order: number;
}

export type OptionFieldInput = FieldInput & {
  type: 'SingleOption' | 'MultipleOptions';
  // properties: {
  // };
  options: string[];
}

export type TextFieldInput = FieldInput & {
  type: 'ShortText' | 'LongText';
};

export type FormFieldInput = (OptionFieldInput | TextFieldInput);

type UpdateCommunitySubscriptionFormInput = {
  communityId: number;
  fields: FormFieldInput[];
};

function useEditCommunitySubscriptionForm(communityId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: UpdateCommunitySubscriptionFormInput) => {
      const res = await axios.put(`/api/organizers/communities/${communityId}/subscription-form`, variables);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communitySubscriptionForm', { communityId }] });
    }
  })
}
