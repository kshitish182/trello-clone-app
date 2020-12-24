import { http } from '../utils/http';
import { appendToEndpoint } from '../utils/string';

export const createCard = async (boardId: string, data: { title: string; ownedBy: string }) => {
  try {
    const result = await http.post(appendToEndpoint('createCard', boardId), data);
    return true;
  } catch (err) {
    console.log(err.response.data);

    return false;
  }
};
