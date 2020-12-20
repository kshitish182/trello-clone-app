export default interface Board {
  _id: string;
  title: string;
  isArchived?: boolean;
  lists: List[];
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
