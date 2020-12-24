import { useState, useEffect } from 'react';

export const useCreateElmHandler = (ref: any): [boolean, (value: boolean) => void] => {
  const [isInputPopupOpen, setInputPopupVisible] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener('click', handleCreateElement);

    return () => document.removeEventListener('click', handleCreateElement);
  }, []);

  const handleCreateElement = (e: any) => {
    if (ref && ref.current && ref.current.contains(e.target)) {
      return;
    }

    console.log('herre', ref.current.contains(e.target));

    setInputPopupVisible(false);
  };

  const handleStateChange = (value: boolean) => setInputPopupVisible(value);

  return [isInputPopupOpen, handleStateChange];
};
