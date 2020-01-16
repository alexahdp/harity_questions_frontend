import { User } from './user';

export interface Idea {
  id: string;
  created: Date;
  updated: Date;
  idea: string;
  author: User;
  upvotes?: number;
  downvotes?: number;
}

export type IdeaDTO = {
  idea: string;
}
