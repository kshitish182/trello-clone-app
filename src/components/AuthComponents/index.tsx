import { useState } from 'react';

import Login from './Login';
import Register from './Register';
import User from '../../types/user';
interface AuthorizationProps {
  setLoginStatus: (value: boolean) => void;
  setUserData: (value: User) => void;
}

const Authorization = (props: AuthorizationProps) => {
  const [isLoginPage, setPageStatus] = useState<boolean>(true);

  const handleUserAuth = async (authHandler: () => Promise<any>) => {
    const result = await authHandler();

    if (!result) {
      return;
    }

    props.setUserData(result);
    props.setLoginStatus(true);
  };

  return (
    <div className="full-page" style={{ position: 'relative' }}>
      <div className="header--login">
        <img
          src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/76ceb1faa939ede03abacb6efacdde16/trello-logo-blue.svg"
          className="main-logo"
        />
      </div>
      <form className="form form--auth">
        {isLoginPage ? (
          <Login handlePageChange={() => setPageStatus(false)} handleUserAuth={handleUserAuth} />
        ) : (
          <Register handlePageChange={() => setPageStatus(true)} handleUserAuth={handleUserAuth} />
        )}
      </form>
    </div>
  );
};

export default Authorization;
