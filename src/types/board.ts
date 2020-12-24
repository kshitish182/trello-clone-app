import { UserCoreType } from './user';
export default interface Board {
  _id: string;
  title: string;
  isArchived?: boolean;
  lists: List[];
  members: UserCoreType[] | [];
}
export interface TeamMembers {
  firstName: string;
  lastName: string;
  // initial: string;
}
export interface Card {
  _id: string;
  title: string;
  ownedBy: string;
  description: string;
}
export interface List {
  _id: string;
  name: string;
  level: number;
  cards: Card[] | [];
}
