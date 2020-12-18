import Board from '../types/board';
import { useState } from 'react';
import { postBoard, initialBoardData } from '../services/board';

interface subBoardData {
  title: string;
  _id: string;
}
interface BoardsProps {
  userId: string;
  boardData: subBoardData[] | [];
  getTaskboardData: (value: Board) => void;
  setTaskboardStatus: (value: boolean) => void;
}

const Boards = (props: BoardsProps) => {
  const [showAddBoard, setAddBoardStatus] = useState<boolean>(false);
  const [boardList, updateBoardList] = useState<(subBoardData | null)[]>(props.boardData);

  const initialBoardData = {
    title: '',
    _id: '',
  };

  const addBoardHandler = async (e: any) => {
    if (e.keyCode !== 13 || !e.target.value) {
      return;
    }

    console.log('userId', props.userId);

    const boardData = { ...initialBoardData, title: e.target.value };
    // post the board and update state if request is successful
    const result = await postBoard(props.userId, boardData);
    console.log(result);
    if (!result) {
      return;
    }

    updateBoardList([...boardList, boardData]);
    setAddBoardStatus(false);
  };

  const _handleBoardClick = (data: {}) => {
    // props.getTaskboardData(data);
    // props.setTaskboardStatus(true);
    console.log(data);
  };

  console.log(boardList);

  return (
    <div className="title title--xl">
      Your Boards
      <div className="flx flx--board-container mt--15">
        {boardList.length > 0 ? (
          boardList.map((value: any, idx: any) => {
            console.log(value);

            return (
              !!value.title && (
                <div className="card card--thumbnail" key={`board-no-${idx}`} onClick={() => _handleBoardClick(value)}>
                  <div className="title title--lg">{value.title}</div>
                </div>
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
