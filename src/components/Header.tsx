import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import User from '../types/user';
import Dropdown from './common/Dropdown';
import Icon from './common/Icons';
import UserThumbnail from './common/UserThumbnail';

interface HeaderProps {
  userData: User;
  setLoginStatus: (value: boolean) => void;
}

const Header = (props: HeaderProps) => {
  const history = useHistory();
  const [isMenuOpen, showMenu] = useState<boolean>(false);

  const handleLogout = () => {
    props.setLoginStatus(false);
    history.push('/login');
  };

  return (
    <header>
      <div className="container">
        <div className="col-sides">
          <Icon name="home" viewBox="0 0 24 24" width="24" />
        </div>
        <div className="col-mid">
          <div className="title title--xl text--center">
            <img
              src="https://a.trellocdn.com/prgb/dist/images/header-logo-2x.01ef898811a879595cea.png"
              alt="header-logo"
              className="header__logo"
            />
          </div>
        </div>
        <div className="col-sides">
          <Dropdown setDropdownStatus={showMenu} className="ds--in-block">
            <div className="clickable" onClick={() => showMenu(!isMenuOpen)}>
              <UserThumbnail
                showFullName
                userData={{
                  firstName: props.userData.firstName,
                  lastName: props.userData.lastName,
                  _id: props.userData._id,
                }}
              />
              {isMenuOpen && (
                <ul className="dropdown__menu">
                  <li className="dropdown__item" onClick={handleLogout}>
                    Logout
                  </li>
                </ul>
              )}
            </div>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};
export default Header;
