import { http } from '../utils/http';
import Board from '../types/board';

export const initialBoardData: Board = {
  _id: '',
  title: '',
  isArchived: false,
  createdOn: '',
  lists: [
    {
      name: '',
      _id: '',
      level: 0,
      createdOn: '',
    },
  ],
};

export const postBoard = async (userId: string, payload: { title: string }) => {
  const endPoint = `/createBoard/${userId}`;

  try {
    const { data } = await http.post(endPoint, payload);

    if (data.status === 201) {
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
