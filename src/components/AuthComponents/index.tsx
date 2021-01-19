import { useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import User from '../../types/user';
interface AuthorizationProps {
  isUserLoggedIn: boolean;
  setUserData: (value: User) => void;
  setLoginStatus: (value: boolean) => void;
  setUserAuthStatus: (value: boolean) => void;
}

const Authorization = (props: AuthorizationProps) => {
  const history = useHistory();
  const [err, setError] = useState<boolean>(false);
  const [isLoading, setLoadingStatus] = useState<boolean>(false);
  const handleUserAuth = async (authHandler: () => Promise<any>) => {
    setLoadingStatus(true);
    const result = await authHandler();

    if (!result) {
      setLoadingStatus(false);
      return setError(true);
    }

    setLoadingStatus(false);
    props.setUserData(result);
    props.setLoginStatus(true);
    props.setUserAuthStatus(true);
    history.push('/home');
  };

  return (
    <div className="full-page" style={{ position: 'relative' }}>
      <div className="header--login">
        <img
          src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/76ceb1faa939ede03abacb6efacdde16/trello-logo-blue.svg"
          className="main-logo"
          alt="main-logo"
        />
      </div>

      <form className="form form--auth">
        {/* Auth Routes */}
        <Switch>
          <Route path="/login" render={() => <Login handleUserAuth={handleUserAuth} err={err} isLoading={isLoading} />} />
          <Route path="/register" render={() => <Register handleUserAuth={handleUserAuth} isLoading={isLoading} />}/>
        </Switch>
      </form>
    </div>
  );
};

export default Authorization;
