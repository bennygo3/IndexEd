import { useState } from 'react';
import './Home.css';
import UserIcon from '../../components/UserIcon/UserIcon';
import Navbar from '../../components/Navbar/Navbar';
import LineGenerator from '../../components/Lines/LineGenerator.js';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import LogoutButton from '../../components/Logout/LogoutButton.js';

export default function Home() {
  const [loginPopup, setLoginPopup] = useState(false);
  const [signUpPopup, setButtonPopup] = useState(false);
  return (
    
    <main className="home-body">
      <h1 className="landing-header">Index-Ed</h1>
      <UserIcon />
      <div className="home-background">
        <div className="buttons-container">
          <button id="login-button" onClick={() => setLoginPopup(true)}
            className={loginPopup ? 'login-button-active' : ''}>
            Sign in
          </button>
          <Login trigger={loginPopup} setTrigger={setLoginPopup} />
          <button id="signup-button" onClick={() => setButtonPopup(true)}
            className={signUpPopup ? 'signup-button-active' : ''}>
            Sign up
          </button>
          <SignUp trigger={signUpPopup} setTrigger={setButtonPopup} />
          <LogoutButton className='home-logout' />
        </div>
        <div className="red-line"></div>
        <LineGenerator amount={17} colorClass="blue-line" />
        <Navbar className="navbar-home" />
      </div>

    </main>
    
  );
};

/* <h1 className="home-header">Index<span style={{ marginLeft: "10px" }}></span>Ed</h1> */
