import { useEffect, useState } from 'react';

import TaskBoard from './TaskBoard';
import Board from '../../types/board';
import { getBoard } from '../../services/board';

interface TaskBoardWrapperProps {
  boardId: string;
}

const TaskBoardWrapper = (props: TaskBoardWrapperProps) => {
  const [isLoading, setLoadingStatus] = useState<boolean>(false);
  const [boardData, setBoardData] = useState<Board | null>();

  useEffect(() => {
    setLoadingStatus(true);
    getBoard(props.boardId)
      .then((data: Board) => {
        setBoardData(data);
        setLoadingStatus(false);
      })
      .catch((err) => {
        setLoadingStatus(false);
        setBoardData(null);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!boardData) {
    return <div>Something went wrong</div>;
  }

  return <TaskBoard boardData={boardData} />;
};

export default TaskBoardWrapper;
