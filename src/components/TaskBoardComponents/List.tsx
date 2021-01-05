import { useEffect, useState } from 'react';
import classnames from 'classnames';

import Icon from '../common/Icons';
import Dropdown from '../common/Dropdown';
import CreateElement from './CreateElement';
import { List, Card } from '../../types/board';
import { UserCoreType } from '../../types/user';
import UserThumbnail from '../common/UserThumbnail';
import { createCard, updateCardOwner, updateCard } from '../../services/card';

interface ListProps {
  listData: List;
  boardId: string;
  listSize: number;
  handlePositionChange: (pos: 'right' | 'left', value: List) => void;
  memberData: UserCoreType[];
  possibleCardMoveDirection: (List | null)[];
  moveCard: (newlistData: List, oldListData: List, cardData: any) => void;
  calculatePossibleCardMovePosition: (value: string) => void;
}

// TODO: Breakdown into multiple components

const ListItem = (props: ListProps) => {
  const { listData, boardId } = props;
  const [showModal, setModalStatus] = useState<boolean>(false);
  const [showInput, setInputBlockStatus] = useState<boolean>(false);
  const [showCardMenu, setCardMenuStatus] = useState<boolean>(false);
  const [cardValue, updateCardData] = useState<Card>();
  const [assignableMember, setAssignableMember] = useState<UserCoreType[]>();
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

  const handleAssignMember = async (card: any, assignee: string) => {
    const result = await updateCard(card._id, { title: card.title, assignee: assignee, description: card.description });
    const updatedCard = { ...card, assignee: assignee };

    if (!result) {
      return;
    }

    updateCardList([
      ...cardList.slice(0, cardList.indexOf(card)),
      updatedCard,
      ...cardList.slice(cardList.indexOf(card) + 1),
    ]);
    setModalStatus(false);
  };

  return (
    <div className="flx__col">
      <div className="card card--list">
        <div className="card__header flx flx--algn-ctr">
          <div className="title title--lg">{listData.name}</div>
          <div className="ml--auto card__action">
            {listData.level !== 0 && (
              <button className="btn btn--icon" onClick={() => props.handlePositionChange('left', listData)}>
                <Icon className="icon--pull" name="chevron" width="20" viewBox="0 0 24 24" />
              </button>
            )}
            {props.listSize !== listData.level + 1 && (
              <button className="btn btn--icon" onClick={() => props.handlePositionChange('right', listData)}>
                <span className="rotate--180">
                  <Icon className="icon--pull" name="chevron" width="20" viewBox="0 0 24 24" />
                </span>
              </button>
            )}
          </div>
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
                            <li
                              className="dropdown__item clickable"
                              onClick={() => {
                                setModalStatus(true);
                                updateCardData(cardData);
                                setAssignableMember(
                                  props.memberData.filter((value: UserCoreType) => value._id !== cardData.assignee)
                                );
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
      {showModal && (
        <div className="modal card">
          <div className="card__header flx">
            <div className="title title--lg">Assign to</div>
            <button className="btn ml--auto" onClick={() => setModalStatus(false)}>
              X
            </button>
          </div>
          <div className="card__body">
            {!assignableMember || !assignableMember.length ? (
              <div>No members to assign</div>
            ) : (
              <ul className="list">
                {assignableMember.map((value: UserCoreType) => (
                  <li className="list__item flx flx--algn-ctr">
                    <span>{value.firstName}</span>
                    <button
                      className="btn btn--thin btn--success ml--auto"
                      onClick={() => handleAssignMember(cardValue, value._id)}
                    >
                      Add
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListItem;
