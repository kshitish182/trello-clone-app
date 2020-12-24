import React, { useState } from 'react';
import User from '../types/user';

import Home from './Home';
import Header from './Header';
import Authorization from './AuthComponents';

const App = () => {
  const [isUserLoggedIn, setloginStatus] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>();

  return (
    <>
      {!isUserLoggedIn || !userData ? (
        <Authorization setLoginStatus={setloginStatus} setUserData={setUserData} />
      ) : (
        <>
          <Header />
          <Home userData={userData} />
        </>
      )}
    </>
  );
};

export default App;
