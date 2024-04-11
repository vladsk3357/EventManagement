export type Community = {
  id: number;
  name: string;
  location: string;
  domain: string;
  shortDescription: string | null;
  description: string | null;
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
