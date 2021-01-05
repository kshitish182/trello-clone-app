import User from '../types/user';
import { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './Home';
import Header from './Header';
import Authorization from './AuthComponents';
import { verifyToken } from '../services/auth';
import TaskBoardWrapper from './TaskBoardComponents';
import { getUserInfoFromStorage } from '../utils/token';

const App = () => {
  const [userData, setUserData] = useState<User>();
  const [isUserLoggedIn, setloginStatus] = useState<boolean>(false);
  const [isVerifying, setLoadingStatus] = useState<boolean>(true);
  const [isUserAuthenticated, setUserAuthStatus] = useState<boolean>(false);

  useEffect(() => {
    setLoadingStatus(true);
    const userInfo = getUserInfoFromStorage();
    if (!userInfo.email || !userInfo.token) {
      setLoadingStatus(false);
      return setUserAuthStatus(false);
    }

    verifyToken({ accessToken: userInfo.token, email: userInfo.email })
      .then((data) => {
        setUserData(data);
        setUserAuthStatus(true);
        setloginStatus(true);
        setLoadingStatus(false);
        return;
      })
      .catch(() => {
        setUserAuthStatus(false);
        setLoadingStatus(false);
        setloginStatus(false);

        return;
      });
  }, []);

  if (isVerifying) {
    return <></>;
  }

  return (
    <>
      {!userData || !isUserAuthenticated ? (
        <Authorization
          setLoginStatus={setloginStatus}
          setUserData={setUserData}
          isUserLoggedIn={isUserLoggedIn}
          setUserAuthStatus={setUserAuthStatus}
        />
      ) : (
        <>
          <Header userData={userData} setLoginStatus={setloginStatus} setUserAuthStatus={setUserAuthStatus} />
          <Switch>
            <Route exact path="/board/:id" component={TaskBoardWrapper} />
            <Route exact path="/home" render={() => <Home userData={userData} />} />
          </Switch>
        </>
      )}
      <Route
        exact
        path="/"
        render={() => (isUserAuthenticated ? <Redirect to={'/home'} /> : <Redirect to="/login" />)}
      />
    </>
  );
};

export default App;
