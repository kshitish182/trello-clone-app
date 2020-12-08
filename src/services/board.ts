import { http } from '../utils/http';
import Board from '../types/boards';

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

export const postBoard = async (endPoint: string, data: Pick<Board, 'title' | 'isArchived'>) => {
  try {
    const result = await http.post(endPoint, data);

    if (result.data.payload) {
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getAllBoard = async (endPoint: string) => {
  try {
    const result = await http.get(endPoint);
    console.log(result);

    return result.data;
  } catch (err) {
    console.log(err);

    return '';
  }
};
