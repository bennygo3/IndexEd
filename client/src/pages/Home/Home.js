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
  
  return(
    <div className={className}>
      {isLoggedIn ? (
        <>
          <UserIcon />
          <LogoutButton className= "home-logout" />
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
            Sign in
          </button>

          <button 
            id="signup-button"
            onClick={onOpenSignup}
            className={signupActive ? 'signup-button-active' : ''}
            aria-haspopup="dialog"
            aria-expanded={signupActive}
          >
            Sign up
          </button>
        </>
      )}
    </div>
  );
});

export default function Home() {
  const { isAuthChecked, isLoggedIn } = useAuthenticated();
  
  const [loginPopup, setLoginPopup] = useState(false);
  const [signUpPopup, setButtonPopup] = useState(false);

  // <AuthButtons /> memoized
  const openLogin = useCallback(() => setLoginPopup(true), []);
  const openSignup = useCallback(() => setButtonPopup(true), []);

  return (
    <main className="home-body">
      <header className="home-header">
        <h1 className="landing-header">Index-Ed</h1>
        <div className="red-line"></div>
       <LineGenerator amount={17} colorClass="blue-line" />
      </header>
      {/* <UserIcon /> */}
      <div className="home-background">
        <AuthButtons
          isAuthChecked={isAuthChecked}
          isLoggedIn={isLoggedIn}
          onOpenLogin={openLogin}
          onOpenSignup={openSignup}
          loginActive={loginPopup}
          signupActive={signUpPopup}
          className="buttons-container"
        />
        <div className="red-line"></div>
        <LineGenerator amount={17} colorClass="blue-line" />
        <Navbar className="navbar-home" />
      </div>

      <Login trigger={loginPopup} setTrigger={setLoginPopup} />
      <SignUp trigger={signUpPopup} setTrigger={setButtonPopup} />
    </main>

  );
};

// export default function Home() {
//   const { isAuthChecked, isLoggedIn } = useAuthenticated();
//   const [loginPopup, setLoginPopup] = useState(false);
//   const [signUpPopup, setButtonPopup] = useState(false);
//   return (

//     <main className="home-body">
//       <header className="home-header">
      
//       <h1 className="landing-header">Index-Ed</h1>
//        <div className="red-line"></div>
//        <LineGenerator amount={17} colorClass="blue-line" />
//       </header>
//       {/* <UserIcon /> */}
//       <div className="home-background">
//         <div className="buttons-container">
//           {isAuthChecked ? (
//             isLoggedIn ? (
//               <>
//                 <UserIcon />
//                 <LogoutButton className='home-logout' />
//               </>
//             ) : (
//               <>
//                 <button
//                   id="login-button"
//                   onClick={() => setLoginPopup(true)}
//                   className={loginPopup ? 'login-button-active' : ''}
//                 >
//                   Sign in
//                 </button>
//                 <Login trigger={loginPopup} setTrigger={setLoginPopup} />

//                 <button
//                   id="signup-button"
//                   onClick={() => setButtonPopup(true)}
//                   className={signUpPopup ? 'signup-button-active' : ''}
//                 >
//                   Sign up
//                 </button>
//                 <SignUp trigger={signUpPopup} setTrigger={setButtonPopup} />
//               </>
//             )
//           ) : null}
//         </div>
//         <div className="red-line"></div>
//         <LineGenerator amount={17} colorClass="blue-line" />
//         <Navbar className="navbar-home" />
//       </div>

//     </main>

//   );
// };

//  {/* <div className="buttons-container"> */}
        // {/* <button id="login-button" onClick={() => setLoginPopup(true)}
            // className={loginPopup ? 'login-button-active' : ''}>
            // Sign in
          // </button> */}
        // {/* <Login trigger={loginPopup} setTrigger={setLoginPopup} /> */}
        // {/* <button id="signup-button" onClick={() => setButtonPopup(true)}
        //     className={signUpPopup ? 'signup-button-active' : ''}>
        //     Sign up
        //   </button> */}
        // {/* <SignUp trigger={signUpPopup} setTrigger={setButtonPopup} /> */}

        // {/* <LogoutButton className='home-logout' /> */}
