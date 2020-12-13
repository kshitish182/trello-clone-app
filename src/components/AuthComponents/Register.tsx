interface RegisterProps {
  handlePageChange: () => void;
}

const Register = (props: RegisterProps) => {
  return (
    <>
      <div className="title title--lg mb--15">Register</div>
      <div className="form__elm">
        <label className="input__label">Name</label>
        <input type="email" className="input" />
      </div>
      <div className="form__elm">
        <label className="input__label">Email</label>
        <input type="email" className="input" />
      </div>
      <div className="form__elm">
        <label className="input__label">Password</label>
        <input type="password" className="input" />
      </div>
      <div className="form__elm">
        <label className="input__label">Re-enter the password</label>
        <input type="password" className="input" />
      </div>
      <div className="form__elm">
        <button>Regsister</button>
        <button onClick={props.handlePageChange}>Sign in</button>
      </div>
    </>
  );
};

export default Register;
