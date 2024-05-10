import { Venue } from "../event/types";

export type Event = {
  id: number;
  name: string;
  startDate: moment.Moment;
  venue: Venue;
  attendeesCount: number;
  community: {
    id: number;
    name: string;
  };
  isPast: boolean;
  isCancelled: boolean;
}
