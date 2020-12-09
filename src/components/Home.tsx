import { useState } from 'react';
import Board from '../types/boards';
import { initialBoardData } from '../services/board';

import Boards from './Boards';
import TaskBoard from './TaskBoard';

const Home = () => {
  const [showTaskBoard, setTaskboardStatus] = useState<boolean>(false);
  const [taskboardData, getTaskboardData] = useState<Board>(initialBoardData);

  return (
    <main className="container main-offset full-page">
      {!showTaskBoard ? (
        <>
          <div className="col-sides" />
          <div className="col-mid">
            <div style={{ padding: 15 }}>
              <Boards setTaskboardStatus={setTaskboardStatus} getTaskboardData={getTaskboardData} />
            </div>
          </div>
          <div className="col-sides" />
        </>
      ) : (
        <TaskBoard taskboardData={taskboardData} />
      )}
    </main>
  );
};

export default Home;
