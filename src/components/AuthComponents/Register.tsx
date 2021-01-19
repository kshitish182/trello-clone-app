import { useState } from 'react';
import { Link } from 'react-router-dom';

import { registerUser } from '../../services/auth';
interface RegisterProps {
  isLoading: boolean;
  handleUserAuth: (value: () => Promise<any>) => void;
}

const initialRegistrationData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  rePassword: '',
};

const Register = (props: RegisterProps) => {
  const [registrationData, updateRegistrationData] = useState(initialRegistrationData);
  const [showError, setErrorStatus] = useState<boolean>(false);

  const handleRegistration = () => {
    if (registrationData.password !== registrationData.rePassword) {
      return setErrorStatus(true);
    }

    setErrorStatus(false);
    props.handleUserAuth(() => registerUser(registrationData));
  };

  const handleInputChange = (event: any, key: string) => {
    updateRegistrationData({ ...registrationData, [key]: event.target.value });
  };

  return (
    <>
      <div className="title title--lg text--center text--gray-1 mb--25">Register</div>
      <div className="form__elm">
        <input
          type="text"
          className="input input--thick"
          value={registrationData.firstName}
          required
          placeholder="First Name"
          onChange={(e: any) => handleInputChange(e, 'firstName')}
        />
      </div>
      <div className="form__elm">
        <input
          type="text"
          className="input input--thick"
          value={registrationData.lastName}
          required
          placeholder="Last Name"
          onChange={(e: any) => handleInputChange(e, 'lastName')}
        />
      </div>
      <div className="form__elm">
        <input
          type="email"
          className="input input--thick"
          value={registrationData.email}
          required
          placeholder="Email"
          onChange={(e: any) => handleInputChange(e, 'email')}
        />
      </div>
      <div className="form__elm">
        <input
          type="password"
          className="input input--thick"
          value={registrationData.password}
          required
          placeholder="Password"
          onChange={(e: any) => handleInputChange(e, 'password')}
        />
      </div>
      <div className="form__elm">
        <input
          type="password"
          className="input input--thick"
          value={registrationData.rePassword}
          required
          placeholder="Re-Enter Password"
          onChange={(e: any) => handleInputChange(e, 'rePassword')}
        />
        {showError && <div className="text--err">Password did not match</div>}
      </div>
      <div className="form__elm mt--25">
        <button type="button" className="btn btn--action btn--success btn--full" onClick={handleRegistration}>
          Regsister
        </button>
      </div>
      <div className="flex__elm flx--ctr">
        <Link to="login" className="btn btn--link">
          Sign in
        </Link>
      </div>
    </>
  );
};

export default Register;
