import './Home.css';
import Navbar from '../../components/Global/Navbar/Navbar';
import LineGenerator from '../../components/Global/Lines/LineGenerator.js';
import LogoutButton from '../../components/Global/Logout/LogoutButton.js';

export default function Home(){
  return (
    <main className="home-body">
      <h1 className="home-header">Index<span style={{ marginLeft: "10px" }}></span>Ed</h1>
      <div className="home-container">
        <div className="home-background">
        <LogoutButton className='home-logout' />
          <div className="red-line"></div>
          <LineGenerator amount={17} colorClass="blue-line" />
          <Navbar className="navbar-home"/>
        </div>
      </div>
      {/* <LogoutButton className='home-logout' /> */}
    </main>
  );
};