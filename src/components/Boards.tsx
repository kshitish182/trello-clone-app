import { useState } from 'react';

const Boards = () => {
  const [showBoardInput, setBoardInputStatus] = useState<boolean>(false);
  const [boardTitle, setBoardTitle] = useState<string>('');
  const [boardList, updateBoardList] = useState<string[]>([]);

  const handleKeydown = (e: any) => {
    if (e.keyCode !== 13) {
      return;
    }

    updateBoardList([...boardList, boardTitle]);
    setBoardInputStatus(false);
    setBoardTitle('');
  };

  return (
    <div style={{ padding: 15 }}>
      <div className="title title--xl">Your Boards</div>
      <div className="flx flx--board-container mt--15">
        {!!boardList.length ? (
          boardList.map((value: string) => (
            <div className="card card--thumbnail">
              <div className="title title--lg">{value}</div>
            </div>
          ))
        ) : (
          <></>
        )}
        {showBoardInput && (
          <div className="card card--thumbnail">
            <input
              type="text"
              className="input input--board"
              autoFocus={true}
              value={boardTitle}
              onChange={(e: any) => setBoardTitle(e.target.value)}
              onKeyDown={handleKeydown}
            />
          </div>
        )}
      </div>
      <button className="btn btn--icon" onClick={() => setBoardInputStatus(true)}>
        + Add board
      </button>
    </div>
  );
};

export default Boards;
