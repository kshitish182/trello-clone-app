import { useEffect, useState } from 'react';
import classnames from 'classnames';

import Icon from '../common/Icons';
import Dropdown from '../common/Dropdown';
import CreateElement from './CreateElement';
import { List, Card } from '../../types/board';
import { UserCoreType } from '../../types/user';
import { createCard, updateCardOwner } from '../../services/card';
import UserThumbnail from '../common/UserThumbnail';

interface ListProps {
  listData: List;
  boardId: string;
  memberData: UserCoreType[];
  possibleCardMoveDirection: (List | null)[];
  moveCard: (newlistData: List, oldListData: List, cardData: any) => void;
  calculatePossibleCardMovePosition: (value: string) => void;
}

const ListItem = (props: ListProps) => {
  const { listData, boardId } = props;
  const [showInput, setInputBlockStatus] = useState<boolean>(false);
  const [showCardMenu, setCardMenuStatus] = useState<boolean>(false);
  const [cardList, updateCardList] = useState<(Card | null)[]>(listData.cards);

  const handleCardCreation = async (cardName: string) => {
    if (!cardName) {
      return;
    }

    const createdCardData: Card = {
      _id: '',
      title: cardName,
      ownedBy: listData._id,
      assignee: '',
      description: '',
    };

    const result = await createCard(boardId, { title: createdCardData.title, ownedBy: createdCardData.ownedBy });

    if (!result) {
      return;
    }

    updateCardList([...cardList, { ...createdCardData, _id: result._id, assignee: result.assignee }]);
    setInputBlockStatus(false);
  };

  useEffect(() => updateCardList(listData.cards), [listData]);

  const menuBtnClass = classnames('btn btn--icon ml--5 card__action', { active: showCardMenu });

  const handleMenuClick = (listId: string) => {
    setCardMenuStatus(!showCardMenu);
    props.calculatePossibleCardMovePosition(listId);
  };

  return (
    <div className="flx__col">
      <div className="card card--list">
        <div className="card__header">
          <div className="title title--lg">{listData.name}</div>
        </div>
        {cardList.length > 0 ? (
          <div className="card__body">
            {cardList.map((cardData: any, idx: number) => {
              const [assigneeData] = props.memberData.filter(
                (userData: UserCoreType) => userData._id === cardData.assignee
              );

              return (
                cardData.title && (
                  <div id={`cardNode-${idx}`} className="card">
                    <div className="card__header flx flx--algn-ctr">
                      <div className="title flx--algn-start">{cardData.title}</div>
                      <UserThumbnail className="ml--auto" userData={assigneeData} />
                      <Dropdown setDropdownStatus={setCardMenuStatus}>
                        <button className={menuBtnClass} onClick={() => handleMenuClick(listData._id)}>
                          <Icon name="dot-menu" width="20" className="icon--pull" viewBox="0 0 24 24" />
                        </button>
                        {showCardMenu && (
                          <ul className="dropdown__menu">
                            {!!props.possibleCardMoveDirection.length && (
                              <>
                                <li className="dropdown__item dropdown__title">Move to</li>
                                {props.possibleCardMoveDirection.map(
                                  (value: List | null) =>
                                    value?.name && (
                                      <li
                                        className="dropdown__item"
                                        onClick={async () => {
                                          setCardMenuStatus(false);
                                          props.moveCard(value, listData, cardData);

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
                      </Dropdown>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        ) : (
          <></>
        )}
        <div className="card__footer">
          {showInput ? (
            <div>
              <CreateElement onSubmitHandler={handleCardCreation} onCancelHandler={() => setInputBlockStatus(false)} />
            </div>
          ) : (
            <button className="btn" onClick={() => setInputBlockStatus(true)}>
              + Add card
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListItem;
