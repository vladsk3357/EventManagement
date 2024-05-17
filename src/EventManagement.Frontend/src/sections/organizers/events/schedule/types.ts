import moment from "moment";

export type FormInputs = {
  title: string;
  startTime: moment.Moment;
  duration: number;
  description: string;
  speakerIds: number[];
  level: string;
}

export type Session = {
  id: number;
  title: string;
  description: string;
  startTime: moment.Moment;
  endTime: moment.Moment;
  duration: number;
  speakers: SessionSpeaker[];
  level: string;
};

type SessionSpeaker = {
  id: number;
  name: string;
}