import Board, { List } from '../types/boards';

interface TaskBoardProps {
  taskboardData: Board;
}

const TaskBoard = (props: TaskBoardProps) => {
  const { title, lists } = props.taskboardData;

  return (
    <div className="col-mid col-mid--dashboard">
      <div className="title title--lg">{title}</div>
      <div className="flx mt--20">
        {lists.map((value: List) => (
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
      </div>
    </div>
  );
};

export default TaskBoard;
