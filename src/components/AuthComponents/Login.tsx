import { useState } from 'react';
import { Link } from 'react-router-dom';

import Loader from '../common/Loader';
import { loginUser } from '../../services/auth';
interface LoginProps {
  err: boolean;
  isLoading: boolean;
  handleUserAuth: (value: () => Promise<any>) => void;
}

const initialLoginState = {
  email: '',
  password: '',
};

const Login = (props: LoginProps) => {
  const [loginData, updateLoginData] = useState(initialLoginState);

  const handleInputChange = (event: any, key: string) => updateLoginData({ ...loginData, [key]: event.target.value });

  return (
    <>
      <div className="title title--lg text--gray-1 text--center mb--25">Login</div>
      <div className="form__elm">
        <input
          type="email"
          className="input input--thick"
          value={loginData.email}
          placeholder="Enter your email"
          onChange={(e) => handleInputChange(e, 'email')}
        />
      </div>
      <div className="form__elm">
        <input
          type="password"
          className="input input--thick"
          value={loginData.password}
          onChange={(e) => handleInputChange(e, 'password')}
          placeholder="Enter your password"
        />
      </div>
      {props.err && <div className="text--err">Could'nt log in - Incorrect Username or password</div>}
      <div className="form__elm mt--25">
        <button
          type="button"
          onClick={() => props.handleUserAuth(() => loginUser(loginData))}
          className="btn btn--full btn--success btn--action flx--ctr btn--auth"
          disabled={props.isLoading}
        >
          {!props.isLoading ? "Sign in" : <Loader />}
        </button>
      </div>
      <div className="form__elm flx--ctr">
        <Link to="register" className="btn btn--link">
          Register
        </Link>
      </div>
    </>
  );
};

export default Login;
