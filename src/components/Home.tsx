import Boards from './Boards';
import User from '../types/user';
interface HomeProps {
  userData: User;
}

const Home = (props: HomeProps) => {
  const { userData } = props;

  return (
    <main className="container main-offset full-page">
      <div className="col-sides" />
      <div className="col-mid">
        <div style={{ padding: 15 }}>
          <Boards userId={userData._id} boardData={userData.boards} />
        </div>
      </div>
      <div className="col-sides" />
    </main>
  );
};

export default Home;
