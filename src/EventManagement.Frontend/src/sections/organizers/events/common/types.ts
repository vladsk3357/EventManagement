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

export const enum AttendeeStatus {
  Pending = 0,
  Confirmed = 1,
  Cancelled = 2,
}

export type Speaker = {
  id: number;
  name: string;
  title: string;
  company: string;
  bio: string;
}
