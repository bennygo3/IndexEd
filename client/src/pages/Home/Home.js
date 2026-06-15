import { useState, memo, useCallback } from 'react';
import './Home.css';
import { useAuthenticated } from '../../hooks/useAuthenticated';
import UserIcon from '../../components/UserIcon/UserIcon';
import Navbar from '../../components/Navbar/Navbar';
import LineGenerator from '../../components/Lines/LineGenerator.js';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import LogoutButton from '../../components/Logout/LogoutButton.js';

const AuthButtons = memo(function AuthButtons({
  isAuthChecked,
  isLoggedIn,
  onOpenLogin,
  onOpenSignup,
  loginActive = false,
  signupActive = false,
  className = 'buttons-container',
  // onLogout 
}) {
  if (!isAuthChecked) return null;

  return (
    <div className={className}>
      {isLoggedIn ? (
        <>
          <UserIcon />
          <LogoutButton className="home-logout" />
        </>

      ) : (
        <>
          <button
            id="login-button"
            onClick={onOpenLogin}
            className={loginActive ? 'login-button-active' : ''}
            aria-haspopup="dialog"
            aria-expanded={loginActive}
          >
            Sign In
          </button>

          <button
            id="signup-button"
            onClick={onOpenSignup}
            className={signupActive ? 'signup-button-active' : ''}
            aria-haspopup="dialog"
            aria-expanded={signupActive}
          >
            Sign Up
          </button>
        </>
      )}
    </div>
  );
});

export default function Home() {
  const { isAuthChecked, isLoggedIn } = useAuthenticated();

  const [activePopup, setActivePopup] = useState(null);

  const openLogin = useCallback(() => {
    setActivePopup(prev => (prev === "login" ? null : "login"));
  }, []);

  const openSignup = useCallback(() => {
    setActivePopup(prev => (prev === "signup" ? null : "signup"));
  }, []);

  const closePopup = useCallback(() => {
    setActivePopup(null);
  }, []);

  return (
    <main className="home-body">
      <div className="back-card">
        <LineGenerator amount={15} colorClass="blue-line" />
      </div>
      {/* <UserIcon /> */}
      <div className="home-background">
        <div className="home-top">
          <h1 className="landing-header">Index-Ed</h1>

          <AuthButtons
            isAuthChecked={isAuthChecked}
            isLoggedIn={isLoggedIn}
            onOpenLogin={openLogin}
            onOpenSignup={openSignup}
            loginActive={activePopup === "login"}
            signupActive={activePopup === "signup"}
          />

          <div className="home-creds">
            {activePopup === "login" && (
              <Login trigger={true} setTrigger={closePopup} />
            )}

            {activePopup === "signup" && (
              <SignUp trigger={true} setTrigger={closePopup} />
            )}

          </div>
        </div>

        <LineGenerator amount={15} colorClass="blue-line" />
        <Navbar className="navbar-home" />

      </div>

    </main>

  );
};