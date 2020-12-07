import Icon from './common/Icons';

const Header = () => (
  <header>
    <div className="container">
      <div className="col-sides">
        <Icon name="home" viewBox="0 0 24 24" width="24" />
      </div>
      <div className="col-mid">
        <div className="title title--xl text--center">Trello</div>
      </div>
      <div className="col-sides" style={{ height: 1 }} />
    </div>
  </header>
);

export default Header;
