import { useEffect, useState } from 'react';
import { UserCoreType } from '../../types/user';
import { getAllNonMemberUsers } from '../../services/users';

interface AddMemberPopUp {
  boardId: string;
}

const AddMemberPopup = (props: AddMemberPopUp) => {
  const [isLoading, setLoadingStatus] = useState<boolean>(false);
  const [nonMemberUserData, setUserData] = useState<(UserCoreType | null)[]>();

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
                  <span>{value.firstName}</span>
                  <button className="btn btn--action btn--success btn--thin">Add</button>
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
