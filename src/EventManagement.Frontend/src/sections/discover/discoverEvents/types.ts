import { Moment } from 'moment';
import { Venue } from '../../event/types';

export type CommunityEvent = {
  id: number;
  name: string;
  community: {
    id: number;
    name: string;
  };
  startDate: Moment;
  attendeesCount: number;
  venue: Venue;
  isCancelled: boolean;
};
