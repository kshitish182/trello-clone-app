import { useState } from 'react';

import { List } from '../../types/board';
import CreateElement from './CreateElement';

interface ListProps {
  listItem: List;
}

const cardInitialState = {
  name: '',
  createdOn: '',
};

const ListItem = (props: ListProps) => {
  const [cardList, updateCardList] = useState<any>([cardInitialState]);
  const [isInputBlockShown, handleInputBlockVisibility] = useState<boolean>(false);

  const handleCardCreation = (cardName: string) => {
    if (!cardName) {
      return;
    }

    updateCardList([...cardList, { ...cardInitialState, name: cardName }]);
    handleInputBlockVisibility(false);
  };

  return (
    <div className="flx__col">
      <div className="card card--list">
        <div className="card__header">
          <div className="title title--lg">{props.listItem.name}</div>
        </div>
        {cardList.length > 1 ? (
          <div className="card__body">
            {cardList.map(
              (value: any) =>
                value.name && (
                  <div className="card">
                    <div className="card__header">
                      <div className="title">{value.name}</div>
                    </div>
                  </div>
                )
            )}
          </div>
        ) : (
          <></>
        )}
        <div className="card__footer">
          {isInputBlockShown ? (
            <div>
              <CreateElement
                onSubmitHandler={handleCardCreation}
                onCancelHandler={() => handleInputBlockVisibility(false)}
              />
            </div>
          ) : (
            <button className="btn" onClick={() => handleInputBlockVisibility(true)}>
              + Add card
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListItem;
