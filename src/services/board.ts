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
  members: [],
};

export const postBoard = async (userId: string, boardTitle: string) => {
  try {
    const { data } = await http.post(appendToEndpoint('/createBoard', userId), { title: boardTitle });

    return data.data.boardId;
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

export const addUserInBoard = async (boardId: string, data: { _id: string }) => {
  const endpoint = appendToEndpoint('/addMembersInBoard', boardId);
  try {
    await http.post(endpoint, data);
    return true;
  } catch (err) {
    console.log(err.response.data);

    return false;
  }
};

export const updateBoardTitle = async (boardId: string, payload: { title: string }) => {
  const endPoint = `board/${boardId}/update`;
  try {
    await http.put(endPoint, payload);
    return true;
  } catch (err) {
    console.log(err.response.data);

    return false;
  }
};
