export const enum AttendeeStatus {
  Pending = 0,
  Confirmed = 1,
}

export type Schedule = {
  date: moment.Moment;
  sessions: Session[];
};

export type Session = {
  id: number;
  title: string;
  description: string;
  startTime: moment.Moment;
  endTime: moment.Moment;
  speakers: Speaker[];
}

export type Speaker = {
  id: number;
  name: string;
  title: string;
  company: string;
  bio: string;
}

export type Venue = {
  type: 'Online';
  url: string;
} | {
  type: 'Offline';
  address: {
    city: string;
    street: string;
    locationName: string;
    zipCode?: string;
  }
};
