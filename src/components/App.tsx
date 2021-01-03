import User from '../types/user';
import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Header from './Header';
import Authorization from './AuthComponents';
import TaskBoardWrapper from './TaskBoardComponents';

const App = () => {
  const [userData, setUserData] = useState<User>();
  const [isUserLoggedIn, setloginStatus] = useState<boolean>(false);

  return (
    <>
      {!isUserLoggedIn || !userData ? (
        <Authorization setLoginStatus={setloginStatus} setUserData={setUserData} isUserLoggedIn={isUserLoggedIn} />
      ) : (
        <>
          <Header userData={userData} setLoginStatus={setloginStatus} />
          <Switch>
            <Route path="/home" render={() => <Home userData={userData} />} />
            <Route path="/board/:id" component={TaskBoardWrapper} />
          </Switch>
        </>
      )}
    </>
  );
};

export default App;
