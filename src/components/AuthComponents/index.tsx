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
    <div className="full-page flx--ctr" style={{ position: 'relative' }}>
      <form className="form">
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
