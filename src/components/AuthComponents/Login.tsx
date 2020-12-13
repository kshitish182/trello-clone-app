interface LoginProps {
  handlePageChange: () => void;
}

const Login = (props: LoginProps) => {
  return (
    <>
      <div className="title title--lg mb--15">Login</div>
      <div className="form__elm">
        <label className="input__label">Email</label>
        <input type="email" className="input" />
      </div>
      <div className="form__elm">
        <label className="input__label">Password</label>
        <input type="password" className="input" />
      </div>
      <div className="form__elm">
        <button>Sign in</button>
        <button onClick={props.handlePageChange}>Register</button>
      </div>
    </>
  );
};

export default Login;
