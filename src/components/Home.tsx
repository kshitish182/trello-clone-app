import { useState } from 'react';

import Boards from './Boards';
import User from '../types/user';
import Board from '../types/board';
import TaskBoardWrapper from '../components/TaskBoardComponents';
interface HomeProps {
  userData: User;
}

const Home = (props: HomeProps) => {
  const { userData } = props;
  const [showTaskBoard, setTaskboardStatus] = useState<boolean>(false);
  const [boardId, getBoardId] = useState<string>('');

  return (
    <>
      {!showTaskBoard ? (
        <main className="container main-offset full-page">
          <div className="col-sides" />
          <div className="col-mid">
            <div style={{ padding: 15 }}>
              <Boards userId={userData._id} boardData={userData.boards} />
            </div>
          </div>
          <div className="col-sides" />
        </main>
      ) : (
        false && <TaskBoardWrapper />
      )}
    </>
  );
};

export default Home;
