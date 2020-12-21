import React, { useState } from 'react';

import ListItem from './List';
import CreateElement from './CreateElement';
import { createList } from '../../services/list';
import Board, { List } from '../../types/board';

interface TaskBoardProps {
  boardData: Board;
}

const TaskBoard = (props: TaskBoardProps) => {
  const { boardData } = props;
  console.log(boardData.lists);

  const [showInput, setInputBlockStatus] = useState<boolean>(false);

  const [listData, updateListData] = useState<List[]>(boardData.lists);

  const handleListCreation = async (listName: string) => {
    if (!listName) {
      return;
    }

    const createdListData: List = {
      _id: '',
      name: listName,
      level: boardData.lists.length,
      cards: [],
    };

    const result = await createList(boardData._id, { name: createdListData.name, level: createdListData.level });
    if (!result) {
      return;
    }

    updateListData([...listData, { ...createdListData, _id: result }]);
    setInputBlockStatus(false);
  };

  return (
    <div>
      <div className="flx board__content">
        {listData.map((value: List, index: number) => (
          <React.Fragment key={`list-name-${index}`}>
            <ListItem listData={value} boardId={boardData._id} />
          </React.Fragment>
        ))}
        {showInput && (
          <div className="card card--list mr--20" style={{ padding: 20 }}>
            <CreateElement onSubmitHandler={handleListCreation} onCancelHandler={() => setInputBlockStatus(false)} />
          </div>
        )}
        <div className="flx__col">
          <button className="btn btn--primary" onClick={() => setInputBlockStatus(true)}>
            + Add more list
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
