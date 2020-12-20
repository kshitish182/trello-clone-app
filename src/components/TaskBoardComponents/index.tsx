import { useEffect } from 'react';
import TaskBoard from './TaskBoard';

interface TaskBoardWrapperProps {
  boardId: string;
}

const TaskBoardWrapper = (props: TaskBoardWrapperProps) => {
  useEffect(() => console.log(props.boardId));

  return <TaskBoard />;
};

export default TaskBoardWrapper;
