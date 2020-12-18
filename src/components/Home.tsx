import { useState } from 'react';
import { initialBoardData } from '../services/board';

import Boards from './Boards';
import User from '../types/user';
import Board from '../types/board';
import TaskBoard from './TaskBoard';

interface HomeProps {
  userData: User;
}

const Home = (props: HomeProps) => {
  const { userData } = props;
  const [showTaskBoard, setTaskboardStatus] = useState<boolean>(false);
  const [taskboardData, getTaskboardData] = useState<Board>(initialBoardData);

  console.log(userData._id);

  return (
    <main className="container main-offset full-page">
      {!showTaskBoard ? (
        <>
          <div className="col-sides" />
          <div className="col-mid">
            <div style={{ padding: 15 }}>
              <Boards
                setTaskboardStatus={setTaskboardStatus}
                getTaskboardData={getTaskboardData}
                userId={userData._id}
                boardData={userData.boards}
              />
            </div>
          </div>
          <div className="col-sides" />
        </>
      ) : (
        // <TaskBoard taskboardData={taskboardData} />
        <></>
      )}
    </main>
  );
};

export default Home;
