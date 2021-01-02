import { useState } from 'react';

import CreateElement from './CreateElement';
import { List, Card } from '../../types/board';
import { UserCoreType } from '../../types/user';
import { createCard } from '../../services/card';
import UserThumbnail from '../common/UserThumbnail';

interface ListProps {
  listData: List;
  boardId: string;
  memberData: UserCoreType[];
}

const ListItem = (props: ListProps) => {
  const { listData, boardId } = props;
  const [showInput, setInputBlockStatus] = useState<boolean>(false);
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
                    <div className="card__header flx">
                      <div className="title flx--algn-start">{cardData.title}</div>
                      <UserThumbnail className="ml--auto" userData={assigneeData} />
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
