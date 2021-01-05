import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { updateBoardTitle } from '../../services/board';

import TaskBoard from './TaskBoard';
import Board from '../../types/board';
import Dropdown from '../common/Dropdown';
import CreateElement from './CreateElement';
import AddMemberPopup from './AddMemberPopUp';
import { getBoard } from '../../services/board';
import { UserCoreType } from '../../types/user';
import UserThumbnail from '../common/UserThumbnail';

const BoardTitleComponent = (props: { title: string; boardId: string }) => {
  const [isEditing, setEditStatus] = useState<boolean>(false);
  const [boardTitle, setBoardTitle] = useState<string>(props.title);
  const [showTitleEditView, setTitleEditViewStatus] = useState<boolean>(false);

  const handleTitleUpdate = async (updatedTitle: string) => {
    setEditStatus(true);
    const result = await updateBoardTitle(props.boardId, { title: updatedTitle });
    if (!result) {
      return setEditStatus(false);
    }
    setBoardTitle(updatedTitle);
    setEditStatus(false);
    setTitleEditViewStatus(false);
  };

  return !showTitleEditView ? (
    <div className="title title--lg clickable" onClick={() => setTitleEditViewStatus(true)}>
      {boardTitle}
    </div>
  ) : (
    <CreateElement
      isLoading={isEditing}
      onSubmitHandler={handleTitleUpdate}
      onCancelHandler={() => setTitleEditViewStatus(false)}
      className="createElm--inline createElm--card"
      defaultValue={boardTitle}
    />
  );
};

const TaskBoardWrapper = () => {
  const param: { id: string } = useParams();
  const [boardData, setBoardData] = useState<Board | null>();
  const [isLoading, setLoadingStatus] = useState<boolean>(false);
  const [memberData, setMemberData] = useState<UserCoreType[]>([]);
  const [showAddTeamMemberDropdown, setAddTeamMemberDropdownStatus] = useState<boolean>(false);
  const [showViewTeamMemberDropdown, setViewTeamMemberDropdownStatus] = useState<boolean>(false);

  useEffect(() => {
    setLoadingStatus(true);
    if (!param.id) {
      return;
    }

    getBoard(param.id)
      .then((data: Board) => {
        setBoardData(data);
        setMemberData(data.members);
        setLoadingStatus(false);
      })
      .catch((err) => {
        setLoadingStatus(false);
        setBoardData(null);
      });
  }, [param.id]);

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
            <BoardTitleComponent title={boardData.title} boardId={param.id} />
            <Dropdown className="ml--15" setDropdownStatus={setAddTeamMemberDropdownStatus}>
              <button
                className="btn btn--primary"
                onClick={() => setAddTeamMemberDropdownStatus(!showAddTeamMemberDropdown)}
              >
                + Add Team Members
              </button>
              {showAddTeamMemberDropdown && (
                <AddMemberPopup
                  boardId={param.id}
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
                    memberData.map((value: UserCoreType) => (
                      <li className="dropdown__item">
                        <UserThumbnail userData={value} showFullName />
                      </li>
                    ))
                  )}
                </ul>
              )}
            </Dropdown>
          </div>
          <TaskBoard boardData={boardData} memberData={memberData} />
        </div>
      </div>
    </div>
  );
};

export default TaskBoardWrapper;
