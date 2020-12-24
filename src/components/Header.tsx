import Icon from './common/Icons';

const Header = () => (
  <header>
    <div className="container">
      <div className="col-sides">
        <Icon name="home" viewBox="0 0 24 24" width="24" />
      </div>
      <div className="col-mid">
        <div className="title title--xl text--center">
          <img
            src="https://a.trellocdn.com/prgb/dist/images/header-logo-2x.01ef898811a879595cea.png"
            alt="header-logo"
            className="header__logo"
          />
        </div>
      </div>
      <div className="col-sides" style={{ height: 1 }} />
    </div>
  </header>
);

export default Header;
