import classnames from 'classnames';
import { useState } from 'react';

import UserThumbnail from '../common/UserThumbnail';
import { List, Card } from '../../types/board';
import { UserCoreType } from '../../types/user';
import Icon from '../common/Icons';

import { updateCardOwner } from '../../services/card';

interface CardProps {
  assignee: UserCoreType;
  listData: List;
  boardId: string;
  cardList: Card;
  possibleCardMoveDirection: (List | null)[];
  memberData: UserCoreType[];
  calculatePossibleCardMovePosition: (value: string) => void;
  updateCardData: (value: Card) => void;
  moveCard: (newlistData: List, oldListData: List, cardData: any) => void;
  setModalStatus: (value: boolean) => void;
  setAssignableMember: (value: UserCoreType[]) => void;
}

const CardComponent = (props: CardProps) => {
  const {
    cardList: cardData,
    assignee: assigneeData,
    memberData,
    calculatePossibleCardMovePosition,
    listData,
    boardId,
    moveCard,
    updateCardData,
    setModalStatus,
    setAssignableMember,
  } = props;
  const [showCardMenu, setCardMenuStatus] = useState<boolean>(false);

  const handleMenuClick = (listId: string) => {
    setCardMenuStatus(!showCardMenu);
    calculatePossibleCardMovePosition(listId);
  };

  const menuBtnClass = classnames('btn btn--icon ml--5 card__action', { active: showCardMenu });
  console.log(showCardMenu);

  return (
    <>
      <div className="card">
        <div className="card__header flx flx--algn-ctr">
          <div className="title flx--algn-start">{cardData.title}</div>
          <UserThumbnail className="ml--auto" userData={assigneeData} />
          <div className="dropdown right">
            <button className={menuBtnClass} onClick={() => handleMenuClick(listData._id)}>
              <Icon name="dot-menu" width="20" className="icon--pull" viewBox="0 0 24 24" />
            </button>
            {showCardMenu && (
              <ul className="dropdown__menu sm">
                <li
                  className="dropdown__item clickable"
                  onClick={() => {
                    setModalStatus(true);
                    updateCardData(cardData);
                    setAssignableMember(memberData.filter((value: UserCoreType) => value._id !== cardData.assignee));
                    setCardMenuStatus(false);
                  }}
                >
                  Assign to
                </li>
                {!!props.possibleCardMoveDirection.length && (
                  <>
                    <li className="dropdown__item dropdown__title">Move to</li>
                    {props.possibleCardMoveDirection.map(
                      (value: List | null) =>
                        value?.name && (
                          <li
                            className="dropdown__item clickable"
                            onClick={async () => {
                              setCardMenuStatus(false);
                              moveCard(value, listData, cardData);

                              const result = await updateCardOwner(boardId, {
                                _id: cardData._id,
                                ownedBy: value._id,
                              });

                              if (result) {
                                return;
                              }

                              console.log('There was an error while updating list');
                            }}
                          >
                            {value.name}
                          </li>
                        )
                    )}
                  </>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardComponent;
