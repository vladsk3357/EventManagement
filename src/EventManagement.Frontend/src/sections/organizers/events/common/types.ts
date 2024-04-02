import moment from "moment";

export type FormInputs = {
  name: string;
  startDate: moment.Moment;
  endDate: moment.Moment;
  description: string;
  venueType: VenueType;
  location?: string | undefined;
  url?: string | undefined;
  limit: string;
  limitNumber?: number;
  shouldBeApproved?: boolean | undefined;
}

export const enum VenueType {
  Online = 'Online',
  Offline = 'Offline'
}
