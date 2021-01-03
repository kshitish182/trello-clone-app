import { useState } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import User from '../../types/user';
interface AuthorizationProps {
  isUserLoggedIn: boolean;
  setUserData: (value: User) => void;
  setLoginStatus: (value: boolean) => void;
}

const Authorization = (props: AuthorizationProps) => {
  const [isLoginPage, setPageStatus] = useState<boolean>(true);
  const history = useHistory();

  const handleUserAuth = async (authHandler: () => Promise<any>) => {
    const result = await authHandler();

    if (!result) {
      return;
    }

    props.setUserData(result);
    props.setLoginStatus(true);
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
        {false &&
          (isLoginPage ? <Login handleUserAuth={handleUserAuth} /> : <Register handleUserAuth={handleUserAuth} />)}

        {/* Auth Routes */}
        <Switch>
          <Route exact path="/login" render={() => <Login handleUserAuth={handleUserAuth} />} />
          <Route exact path="/register" render={() => <Register handleUserAuth={handleUserAuth} />} />
          <Route
            path="/"
            render={() => {
              if (!props.isUserLoggedIn) {
                return <Redirect to="/login" />;
              }
            }}
          />
        </Switch>
      </form>
    </div>
  );
};

export default Authorization;
