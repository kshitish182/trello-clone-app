import { useState } from 'react';

import CreateElement from './CreateElement';
import { createCard } from '../../services/card';
import { List, Card } from '../../types/board';

interface ListProps {
  listData: List;
  boardId: string;
}

const ListItem = (props: ListProps) => {
  const { listData, boardId } = props;
  const [cardList, updateCardList] = useState<(Card | null)[]>(listData.cards);
  const [showInput, setInputBlockStatus] = useState<boolean>(false);

  const handleCardCreation = async (cardName: string) => {
    if (!cardName) {
      return;
    }

    const createdCardData: Card = {
      _id: '',
      title: cardName,
      ownedBy: listData._id,
      description: '',
    };

    const result = await createCard(boardId, { title: createdCardData.title, ownedBy: createdCardData.ownedBy });

    if (!result) {
      return;
    }

    console.log(result);

    updateCardList([...cardList, { ...createdCardData }]);
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
            {cardList.map(
              (value: any) =>
                value.title && (
                  <div className="card">
                    <div className="card__header">
                      <div className="title">{value.title}</div>
                    </div>
                  </div>
                )
            )}
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
