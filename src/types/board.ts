export default interface Board {
  _id: String;
  title: String;
  isArchived?: boolean;
  lists: List[];
}

export interface List {
  _id: String;
  name: String;
  level: number;
  cards:
    | [
        {
          title: string;
          ownedBy: string;
        }
      ]
    | [];
}
