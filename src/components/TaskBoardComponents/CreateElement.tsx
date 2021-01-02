import { useState } from 'react';
import classnames from 'classnames';

interface CreateElmProps {
  className?: string;
  isLoading?: boolean;
  defaultValue?: string;
  setInputValue?: () => void;
  onCancelHandler: () => void;
  onSubmitHandler: (value: string) => void;
}

// Input compoenent for handling create and edit actions
// TODO: Change component name

const CreateElement = (props: CreateElmProps) => {
  const { defaultValue = '', isLoading } = props;
  const [inputChange, setInputChange] = useState<string>(defaultValue);

  const handleElmCreation = () => {
    props.onSubmitHandler(inputChange);
    setInputChange('');
  };

  const createElmWrapperClass = classnames('createElm', props.className);
  const btnClassName = classnames('btn btn--action btn--success btn--thin', { disabled: isLoading });

  return (
    <div className={createElmWrapperClass}>
      <div className="createElm__input">
        <input
          className="input"
          type="text"
          value={inputChange}
          onChange={(e: any) => setInputChange(e.target.value)}
        />
      </div>
      <div className="createElm__btn-wrapper">
        <button className={btnClassName} disabled={isLoading} onClick={handleElmCreation}>
          Add
        </button>
        <button className="btn" onClick={() => props.onCancelHandler()} disabled={isLoading}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateElement;
