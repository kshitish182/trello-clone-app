import classnames from 'classnames';
import { useEffect, useState } from 'react';

import { UserCoreType } from '../../types/user';
import UserThumbnail from '.././common/UserThumbnail';
import { addUserInBoard } from '../../services/board';
import { getAllNonMemberUsers } from '../../services/users';

interface AddMemberPopUp {
  boardId: string;
  handleMemberAddition: (value: UserCoreType) => void;
}

const AddMemberPopup = (props: AddMemberPopUp) => {
  const [isLoading, setLoadingStatus] = useState<boolean>(false);
  const [isAdding, setAddMemberStatus] = useState<boolean>(false);
  const [nonMemberUserData, setUserData] = useState<(UserCoreType | null)[]>();

  const addButtonClass = classnames('btn btn--action btn--success btn--thin', { disabled: isAdding });

  // TODO: Provide info in UI if action was successful or failed

  const handleAddBtnAction = async (value: UserCoreType) => {
    setAddMemberStatus(true);
    const result = await addUserInBoard(props.boardId, { _id: value._id });
    setAddMemberStatus(false);
    if (!result) {
      return;
    }
    props.handleMemberAddition(value);
  };

  useEffect(() => {
    setLoadingStatus(true);
    getAllNonMemberUsers(props.boardId)
      .then((data) => {
        setUserData(data);
        setLoadingStatus(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingStatus(false);
      });
  }, [props.boardId]);

  const DropdownContent = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!nonMemberUserData || !nonMemberUserData.length) {
      return <div>No users found</div>;
    }

    return (
      <>
        {nonMemberUserData.length > 0 ? (
          nonMemberUserData.map(
            (value: UserCoreType | null) =>
              value && (
                <li className="dropdown__item dropdown__item--w-actions">
                  <UserThumbnail userData={value} showFullName={true} />
                  <button className={addButtonClass} onClick={() => handleAddBtnAction(value)}>
                    Add
                  </button>
                </li>
              )
          )
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <ul className="dropdown__menu">
      <DropdownContent />
    </ul>
  );
};

export default AddMemberPopup;
