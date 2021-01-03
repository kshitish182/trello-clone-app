import { useState } from 'react';
import { Link } from 'react-router-dom';

import { postBoard } from '../services/board';

interface subBoardData {
  title: string;
  _id: string;
}
interface BoardsProps {
  userId: string;
  boardData: subBoardData[] | [];
}

const Boards = (props: BoardsProps) => {
  const [showAddBoard, setAddBoardStatus] = useState<boolean>(false);
  const [boardList, updateBoardList] = useState<(subBoardData | null)[]>(props.boardData);

  const addBoardHandler = async (e: any) => {
    if (e.keyCode !== 13 || !e.target.value) {
      return;
    }

    // post the board and update state if request is successful
    const result = await postBoard(props.userId, e.target.value);
    const boardData = { _id: result, title: e.target.value };
    console.log(result);
    if (!result) {
      return;
    }

    updateBoardList([...boardList, boardData]);
    setAddBoardStatus(false);
  };

  return (
    <div className="title title--xl">
      Your Boards
      <div className="flx flx--board-container mt--15">
        {boardList.length > 0 ? (
          boardList.map((value: any, idx: any) => {
            return (
              !!value.title && (
                <Link to={`/board/${value._id}`} className="card card--thumbnail" key={`board-no-${idx}`}>
                  <div className="title title--lg">{value.title}</div>
                </Link>
              )
            );
          })
        ) : (
          <></>
        )}
      </div>
      {showAddBoard && (
        <div className="card card--thumbnail">
          <input type="text" className="input input--board" autoFocus={true} onKeyDown={addBoardHandler} />
        </div>
      )}
      <button className="btn btn--icon" onClick={() => setAddBoardStatus(true)}>
        + Add board
      </button>
    </div>
  );
};

export default Boards;
