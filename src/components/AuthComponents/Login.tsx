import { useState } from 'react';
import { loginUser } from '../../services/auth';
interface LoginProps {
  handlePageChange: () => void;
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
      <div className="title title--lg mb--15">Login</div>
      <div className="form__elm">
        <label className="input__label">Email</label>
        <input type="email" className="input" value={loginData.email} onChange={(e) => handleInputChange(e, 'email')} />
      </div>
      <div className="form__elm">
        <label className="input__label">Password</label>
        <input
          type="password"
          className="input"
          value={loginData.password}
          onChange={(e) => handleInputChange(e, 'password')}
        />
      </div>
      <div className="form__elm">
        <button
          type="button"
          // onClick={() => props.handleLogin(loginData)}
          onClick={() => props.handleUserAuth(() => loginUser(loginData))}
        >
          Sign in
        </button>
        <button type="button" onClick={props.handlePageChange}>
          Register
        </button>
      </div>
    </>
  );
};

export default Login;
