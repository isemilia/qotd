export enum RequestStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

export type UserRow = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
};

export type CurrentQuestion = {
  id: string;
  question: string;
  date: string;
  createdAt: string;
  answerCount: number;
};
