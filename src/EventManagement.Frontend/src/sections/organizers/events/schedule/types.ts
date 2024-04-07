import moment from "moment";

export type FormInputs = {
  title: string;
  startTime: moment.Moment;
  duration: number;
  description: string;
  speakerIds: number[];
}

export type Session = {
  id: number;
  title: string;
  description: string;
  startTime: moment.Moment;
  endTime: moment.Moment;
  duration: number;
  speakers: SessionSpeaker[];
};

type SessionSpeaker = {
  id: number;
  name: string;
}