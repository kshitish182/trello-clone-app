import { http } from '../utils/http';
import { appendToEndpoint } from '../utils/string';

// takes in boardId and returns all non memeber users for that board
export const getAllNonMemberUsers = async (boardId: string) => {
  const endPoint = appendToEndpoint('/getNonMemberUsers', boardId);

  try {
    const result = await http.get(endPoint);
    return result.data.data;
  } catch (err) {
    console.log(err.response.data);

    return null;
  }
};
