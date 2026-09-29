import { AnswerCardColor } from '@/features/answers/components/answer-card';
import { UserRole } from '@/features/auth/model/types';

export enum RequestStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

export type PublicUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: string;
  createdAt: string;
  answerCount: number;
};

export type PublicUserShort = {
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

export type Answer = {
  id: string;
  question: {
    id: string;
    question: string;
    date: string;
  };
  answer: string;
  color: AnswerCardColor;
  createdAt: string;
  likeCount: number;
  isLiked: boolean;
};
