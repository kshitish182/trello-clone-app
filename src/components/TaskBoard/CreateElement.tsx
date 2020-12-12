import { useState } from 'react';

interface CreateElmProps {
  onSubmitHandler: (value: string) => void;
  onCancelHandler: () => void;
}

// Input compoenent for creating Lists and cards for the TaskBoard
const CreateElement = (props: CreateElmProps) => {
  const [inputChange, setInputChange] = useState<string>('');

  const handleElmCreation = () => {
    props.onSubmitHandler(inputChange);
    setInputChange('');
  };

  return (
    <>
      <div className="createElm__input">
        <input
          className="input"
          type="text"
          value={inputChange}
          onChange={(e: any) => setInputChange(e.target.value)}
        />
      </div>
      <div className="createElm__btn-wrapper">
        <button className="btn" onClick={handleElmCreation}>
          Add
        </button>
        <button className="btn" onClick={() => props.onCancelHandler()}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default CreateElement;
