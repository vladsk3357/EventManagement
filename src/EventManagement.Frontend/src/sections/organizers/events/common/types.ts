import moment from "moment";

export type FormInputs = {
  name: string;
  startDate: moment.Moment;
  endDate: moment.Moment;
  description: string;
  venueType: VenueType;
  address?: OfflineVenue['address'] | null;
  url?: string | undefined;
  limit: string;
  limitNumber?: number;
  shouldBeApproved?: boolean | undefined;
}

export const enum VenueType {
  Online = 'Online',
  Offline = 'Offline'
}

export type OnlineVenue = {
  type: VenueType.Online;
  url: string;
};

export type OfflineVenue = {
  type: VenueType.Offline;
  address: {
    city: string;
    street: string;
    locationName: string;
    zipCode?: string;
  }
};

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
