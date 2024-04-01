import { useQuery } from "@tanstack/react-query";
import { axios } from '../../api';

export function useGetForm(formId: number) {
  return useQuery({
    queryKey: ['form', formId],
    queryFn: async () => {
      const res = await axios.get<GetFormQueryResult>(`/api/forms/${formId}`);
      return res.data;
    },
  })
}

type GetFormQueryResult = {
  id: number;
  fields: FormField[];
};

type Field = {
  name: string;
  description?: string;
  isRequired: boolean;
  order: number;
}

export type OptionField = Field & {
  type: 'SingleOption' | 'MultipleOptions';
  options: string[];
}

export type TextField = Field & {
  type: 'ShortText' | 'LongText';
};

export type FormField = (OptionField | TextField);
