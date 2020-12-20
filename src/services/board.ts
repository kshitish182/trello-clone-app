import Board from '../types/board';
import { http } from '../utils/http';
import { appendToEndpoint } from '../utils/string';

export const initialBoardData: Board = {
  _id: '',
  title: '',
  isArchived: false,
  lists: [
    {
      name: '',
      _id: '',
      level: 0,
      cards: [],
    },
  ],
};

export const postBoard = async (userId: string, payload: { title: string }) => {
  try {
    const { data } = await http.post(appendToEndpoint('/createBoard', userId), payload);

    if (data.status === 201) {
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getBoard = async (boardId: string) => {
  try {
    const result = await http.get(appendToEndpoint('getBoard', boardId));
    console.log(result.data);

    return result.data.data;
  } catch (err) {
    console.log(err.response.data.message);

    return null;
  }
};
