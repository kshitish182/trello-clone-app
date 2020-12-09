import Board, { List } from '../types/boards';
import { useState, useEffect } from 'react';
import { postBoard, initialBoardData, getAllBoard } from '../services/board';

interface BoardsProps {
  getTaskboardData: (value: Board) => void;
  setTaskboardStatus: (value: boolean) => void;
}

const Boards = (props: BoardsProps) => {
  const [showBoardInput, setBoardInputStatus] = useState<boolean>(false);
  const [boardList, updateBoardList] = useState<Board[]>([initialBoardData]);

  const handleKeydown = async (e: any) => {
    if (e.keyCode !== 13 || !e.target.value) {
      return;
    }

    const boardData = { ...initialBoardData, title: e.target.value };
    const result = await postBoard('/board', { title: boardData.title, isArchived: boardData.isArchived });
    if (!result) {
      setBoardInputStatus(true);
      return updateBoardList([...boardList, initialBoardData]);
    }

    setBoardInputStatus(false);
    return updateBoardList([...boardList, boardData]);
  };

  const fetchAllBoard = async () => {
    const result = await getAllBoard('/board');
    updateBoardList(result);
  };

  useEffect(() => {
    fetchAllBoard();
  }, []);

  const _handleBoardClick = (data: Board) => {
    props.getTaskboardData(data);
    props.setTaskboardStatus(true);
  };

  return (
    <div className="title title--xl">
      Your Boards
      <div className="flx flx--board-container mt--15">
        {!!boardList.length ? (
          boardList.map((value: Board, idx: number) => {
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
      {showBoardInput && (
        <div className="card card--thumbnail">
          <input type="text" className="input input--board" autoFocus={true} onKeyDown={handleKeydown} />
        </div>
      )}
      <button className="btn btn--icon" onClick={() => setBoardInputStatus(true)}>
        + Add board
      </button>
    </div>
  );
};

export default Boards;
