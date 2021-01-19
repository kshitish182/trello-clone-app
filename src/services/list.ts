import { List } from '../types/board';
import { http } from '../utils/http';
import { appendToEndpoint } from '../utils/string';

export const createList = async (boardId: string, data: { name: String; level: number }) => {
  try {
    const result = await http.post(appendToEndpoint('createList', boardId), data);
    return result.data.data;
  } catch (err) {
    console.log(err.response.data);

    return '';
  }
};

export const updateList = async (boardId: string, payload: List[]) => {
  try {
    const result = await http.put(`list/${boardId}/update`, payload);
    return result.data;
  } catch (err) {
    console.log(err.response.data);

    return null;
  }
};
