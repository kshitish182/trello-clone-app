import React, { useState } from 'react';

import ListItem from './List';
import CreateElement from './CreateElement';
import Board, { List } from '../../types/board';
import { UserCoreType } from '../../types/user';
import { createList } from '../../services/list';

interface TaskBoardProps {
  boardData: Board;
  memberData: UserCoreType[];
}

const TaskBoard = (props: TaskBoardProps) => {
  const { boardData } = props;

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
            <ListItem listData={value} boardId={boardData._id} memberData={props.memberData} />
          </React.Fragment>
        ))}
        <div className="flx__col">
          {showInput ? (
            <div className="card card--list mr--20" style={{ padding: 20 }}>
              <CreateElement onSubmitHandler={handleListCreation} onCancelHandler={() => setInputBlockStatus(false)} />
            </div>
          ) : (
            <button className="btn btn--primary" onClick={() => setInputBlockStatus(true)}>
              + Add more list
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
