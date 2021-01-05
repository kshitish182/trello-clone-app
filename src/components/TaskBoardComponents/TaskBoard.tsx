import React, { useState } from 'react';

import ListItem from './List';
import CreateElement from './CreateElement';
import Board, { List } from '../../types/board';
import { UserCoreType } from '../../types/user';
import { createList, updateList } from '../../services/list';

interface TaskBoardProps {
  boardData: Board;
  memberData: UserCoreType[];
}

const TaskBoard = (props: TaskBoardProps) => {
  const { boardData } = props;

  const [showInput, setInputBlockStatus] = useState<boolean>(false);
  const [possibleCardMoveDirection, setCardMoveDirection] = useState<(List | null)[]>([]);

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

  const calculatePossibleCardMoveDirection = (listId: string) => {
    const filteredList = listData.filter((value: List) => value._id !== listId);
    setCardMoveDirection(filteredList);
  };

  const moveCard = async (newParentlist: List, oldParentList: List, cardData: any) => {
    const updatedList = listData.map((value: List) => {
      if (value._id === oldParentList._id) {
        const filteredArray = value.cards.filter(() => cardData.ownedBy !== value._id);

        return { ...value, cards: filteredArray };
      }

      if (value._id === newParentlist._id) {
        return { ...value, cards: [...value.cards, { ...cardData, ownedBy: newParentlist._id }] };
      }

      return value;
    });

    updateListData(updatedList);
  };

  const handlePositionChange = async (pos: 'right' | 'left', movedList: List) => {
    const movedListIndex = listData.indexOf(movedList);
    const updatedList = listData.map((listValue: List, idx: number) => {
      console.log(movedListIndex);
      if (pos === 'right') {
        if (movedListIndex === idx) {
          return { ...listValue, level: listValue.level + 1 };
        }

        if (movedListIndex + 1 === idx) {
          return { ...listValue, level: listValue.level - 1 };
        }
      }

      if (pos === 'left') {
        if (movedListIndex === idx) {
          return { ...listValue, level: listValue.level - 1 };
        }

        if (movedListIndex - 1 === idx) {
          return { ...listValue, level: listValue.level + 1 };
        }
      }

      return listValue;
    });

    updateListData(updatedList);

    const result = await updateList(boardData._id, updatedList);

    if (result) {
      return;
    }

    console.log("There was an error - could'nt update list");
  };

  return (
    <div>
      <div className="flx board__content">
        {listData
          .sort((value: List, nextValue: List) => value.level - nextValue.level)
          .map((value: List, index: number) => (
            <React.Fragment key={`list-name-${index}`}>
              <ListItem
                listData={value}
                listSize={listData.length}
                boardId={boardData._id}
                moveCard={moveCard}
                memberData={props.memberData}
                handlePositionChange={handlePositionChange}
                possibleCardMoveDirection={possibleCardMoveDirection}
                calculatePossibleCardMovePosition={calculatePossibleCardMoveDirection}
              />
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
