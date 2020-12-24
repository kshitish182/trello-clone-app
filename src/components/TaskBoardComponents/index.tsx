import { useEffect, useState } from 'react';

import TaskBoard from './TaskBoard';
import Board from '../../types/board';
import Dropdown from '../common/Dropdown';
import AddMemberPopup from './AddMemberPopUp';
import { getBoard } from '../../services/board';
import { UserCoreType } from '../../types/user';

interface TaskBoardWrapperProps {
  boardId: string;
}

const TaskBoardWrapper = (props: TaskBoardWrapperProps) => {
  const [boardData, setBoardData] = useState<Board | null>();
  const [isLoading, setLoadingStatus] = useState<boolean>(false);
  const [memberData, setMemberData] = useState<UserCoreType[]>([]);
  const [showAddTeamMemberDropdown, setAddTeamMemberDropdownStatus] = useState<boolean>(false);
  const [showViewTeamMemberDropdown, setViewTeamMemberDropdownStatus] = useState<boolean>(false);

  useEffect(() => {
    setLoadingStatus(true);
    getBoard(props.boardId)
      .then((data: Board) => {
        setBoardData(data);
        setMemberData(data.members);
        setLoadingStatus(false);
      })
      .catch((err) => {
        setLoadingStatus(false);
        setBoardData(null);
      });
  }, [props.boardId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!boardData) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="container full-page">
      <div className="board page-offset">
        <div className="col-mid col-mid--dashboard">
          <div className="action-bar flx flx--algn-ctr">
            <div className="title title--lg">{boardData.title}</div>
            <Dropdown className="ml--15" setDropdownStatus={setAddTeamMemberDropdownStatus}>
              <button
                className="btn btn--primary"
                onClick={() => setAddTeamMemberDropdownStatus(!showAddTeamMemberDropdown)}
              >
                + Add Team Members
              </button>
              {showAddTeamMemberDropdown && (
                <AddMemberPopup
                  boardId={props.boardId}
                  handleMemberAddition={(value: UserCoreType) => setMemberData([...memberData, value])}
                />
              )}
            </Dropdown>
            <Dropdown className="ml--15" setDropdownStatus={setViewTeamMemberDropdownStatus}>
              <button
                className="btn btn--primary"
                onClick={() => setViewTeamMemberDropdownStatus(!showViewTeamMemberDropdown)}
              >
                View Members
              </button>
              {showViewTeamMemberDropdown && (
                <ul className="dropdown__menu">
                  {!memberData.length ? (
                    <div>No members added</div>
                  ) : (
                    memberData.map((value: UserCoreType) => <li className="dropdown__item">{value.firstName}</li>)
                  )}
                </ul>
              )}
            </Dropdown>
          </div>
          <TaskBoard boardData={boardData} />
        </div>
      </div>
    </div>
  );
};

export default TaskBoardWrapper;
