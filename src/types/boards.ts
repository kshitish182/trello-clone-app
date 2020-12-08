export default interface Board {
  _id?: String;
  title: String;
  createdOn?: String;
  isArchived: boolean;
  lists: List[];
}

export interface List {
  _id?: String;
  name: String;
  createdOn?: String;
  level: number;
}
