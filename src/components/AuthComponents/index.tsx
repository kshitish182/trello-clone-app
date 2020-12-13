import { useState } from 'react';

import Login from './Login';
import Register from './Register';

const Authorization = () => {
  const [isLoginPage, setPageStatus] = useState<boolean>(true);

  return (
    <div className="full-page flx--ctr" style={{ position: 'relative' }}>
      <form className="form">
        {isLoginPage ? (
          <Login handlePageChange={() => setPageStatus(false)} />
        ) : (
          <Register handlePageChange={() => setPageStatus(true)} />
        )}
      </form>
    </div>
  );
};

export default Authorization;
