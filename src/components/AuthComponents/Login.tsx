const Login = () => {
  return (
    <form className="form">
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
        <button type="button">Submit</button>
      </div>
    </form>
  );
};

export default Login;
