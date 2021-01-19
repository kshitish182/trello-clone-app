import { http } from '../utils/http';
import { appendToEndpoint } from '../utils/string';

export const createCard = async (boardId: string, data: { title: string; ownedBy: string }) => {
  try {
    const result = await http.post(appendToEndpoint('createCard', boardId), data);
    return result.data.data;
  } catch (err) {
    console.log(err.response.data);

    return null;
  }
};

export const updateCardOwner = async (boardId: string, data: { _id: string; ownedBy: string }) => {
  try {
    const result = await http.put(appendToEndpoint('updateCardOwner', boardId), data);
    return result.data;
  } catch (err) {
    console.log(err.response.data);

    return null;
  }
};

export const updateCard = async (cardId: string, payload: { title: string; assignee: string; description: string }) => {
  try {
    const result = await http.put(`card/${cardId}/update`, payload);

    return result.data;
  } catch (err) {
    console.log(err.response.data);
  }
};
