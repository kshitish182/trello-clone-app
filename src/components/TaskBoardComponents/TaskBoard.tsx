// import React, { useState } from 'react';

// import ListItem from './List';
// import CreateElement from './CreateElement';
// import Board, { List } from '../../types/board';

// interface TaskBoardProps {
//   taskboardData: Board;
// }

const TaskBoard = () => {
  // const { title, lists } = props.taskboardData;

  // const [isListInputCardShown, setListInputCardStatus] = useState<boolean>(false);

  // const [listData, updateListData] = useState<List[]>(lists);

  // const handleListCreation = (listName: string) => {
  //   if (!listName) {
  //     return;
  //   }

  //   // updateListData([...listData, { name: listName, level: 4 }]);
  // };

  return (
    <div>TaskBoard</div>
    // <div className="col-mid col-mid--dashboard">
    //   <div className="title title--lg">{title}</div>
    //   <div className="flx mt--20">
    //     {listData.map((value: List, index: number) => (
    //       <React.Fragment key={`list-name-${index}`}>
    //         <ListItem listItem={value} />
    //       </React.Fragment>
    //     ))}
    //     {isListInputCardShown && (
    //       <div className="card card--list mr--20" style={{ padding: 20 }}>
    //         <CreateElement onSubmitHandler={handleListCreation} onCancelHandler={() => setListInputCardStatus(false)} />
    //       </div>
    //     )}
    //     <div className="flx__col">
    //       <button className="btn btn--primary" onClick={() => setListInputCardStatus(true)}>
    //         + Add more list
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default TaskBoard;
