import { useState } from 'react';
import { registerUser } from '../../services/auth';
interface RegisterProps {
  handlePageChange: () => void;
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
      <div className="title title--lg mb--15">Register</div>
      <div className="form__elm">
        <label className="input__label">First Name</label>
        <input
          type="text"
          className="input"
          value={registrationData.firstName}
          required
          onChange={(e: any) => handleInputChange(e, 'firstName')}
        />
      </div>
      <div className="form__elm">
        <label className="input__label">Last Name</label>
        <input
          type="text"
          className="input"
          value={registrationData.lastName}
          required
          onChange={(e: any) => handleInputChange(e, 'lastName')}
        />
      </div>
      <div className="form__elm">
        <label className="input__label">Email</label>
        <input
          type="email"
          className="input"
          value={registrationData.email}
          required
          onChange={(e: any) => handleInputChange(e, 'email')}
        />
      </div>
      <div className="form__elm">
        <label className="input__label">Password</label>
        <input
          type="password"
          className="input"
          value={registrationData.password}
          required
          onChange={(e: any) => handleInputChange(e, 'password')}
        />
      </div>
      <div className="form__elm">
        <label className="input__label">Re-enter the password</label>
        <input
          type="password"
          className="input"
          value={registrationData.rePassword}
          required
          onChange={(e: any) => handleInputChange(e, 'rePassword')}
        />
        {showError && <div className="text--err">Password did not match</div>}
      </div>
      <div className="form__elm">
        <button type="button" onClick={handleRegistration}>
          Regsister
        </button>
        <button type="button" onClick={props.handlePageChange}>
          Sign in
        </button>
      </div>
    </>
  );
};

export default Register;
