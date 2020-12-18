export default interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
  boards:
    | [
        {
          title: string;
          _id: string;
        }
      ]
    | [];
}
