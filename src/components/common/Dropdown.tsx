import React from 'react';
import classnames from 'classnames';

interface DropdownProps {
  className?: string;
  setDropdownStatus: (value: boolean) => void;
}

const Dropdown = (props: React.PropsWithChildren<DropdownProps>) => {
  const dropdownNode = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    document.addEventListener('click', handleDropdownClose);

    return () => document.removeEventListener('click', handleDropdownClose);
  }, []);

  const handleDropdownClose = (e: any) => {
    if (dropdownNode && dropdownNode.current && dropdownNode.current.contains(e.target)) {
      return;
    }

    console.log(dropdownNode.current, dropdownNode.current?.contains(e.target));
    props.setDropdownStatus(false);
  };

  const dropdownClass = classnames('dropdown', props.className);

  return (
    <div className={dropdownClass} ref={dropdownNode}>
      {props.children}
    </div>
  );
};

export default Dropdown;
