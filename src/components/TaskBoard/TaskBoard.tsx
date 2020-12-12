import { useState } from 'react';

import CreateElement from './CreateElement';
import Board, { List } from '../../types/boards';

interface TaskBoardProps {
  taskboardData: Board;
}

const TaskBoard = (props: TaskBoardProps) => {
  const { title, lists } = props.taskboardData;
  const [isListInputCardShown, setListInputCardStatus] = useState<boolean>(false);
  const [listData, updateListData] = useState<List[]>(lists);

  const handleListCreation = (listName: string) => {
    if (!listName) {
      return;
    }

    updateListData([...listData, { name: listName, level: 4 }]);
  };

  return (
    <div className="col-mid col-mid--dashboard">
      <div className="title title--lg">{title}</div>
      <div className="flx mt--20">
        {listData.map((value: List) => (
          <div className="flx__col">
            <div className="card card--list">
              <div className="card__header">
                <div className="title title--lg">{value.name}</div>
              </div>
              <div className="card__footer">
                <button className="btn">+ Add card</button>
              </div>
            </div>
          </div>
        ))}
        {isListInputCardShown && (
          <div className="card card--list mr--20" style={{ padding: 20 }}>
            <CreateElement onSubmitHandler={handleListCreation} onCancelHandler={() => setListInputCardStatus(false)} />
          </div>
        )}
        <div className="flx__col">
          <button className="btn btn--primary" onClick={() => setListInputCardStatus(true)}>
            + Add more list
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
