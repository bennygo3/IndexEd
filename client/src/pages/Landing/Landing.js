import React, { useState } from 'react';
import Login from '../../components/Login/Login.js';
import SignUp from '../../components/SignUp/SignUp.js';
import LineGenerator from '../../components/Lines/LineGenerator.js';
import "./landing.css";

export default function Landing() {
    const [loginPopup, setLoginPopup] = useState(false);
    const [signUpPopup, setButtonPopup] = useState(false);

    return (
        <>
            <h1 className="landing-header">IndexEd</h1>
            {/* <span className="emoji">🤓</span> */}
            <div id="landing">
                <div className='landing-background'>
                    {/* added container to control corresponding popup */}
                    <div className="login-container">
                        <div id="login" onClick={() => setLoginPopup(true)}
                            className={loginPopup ? 'login-active' : ''}> 
                            Login 
                        </div>
                        <Login trigger={loginPopup} setTrigger={setLoginPopup} />
                    </div>
                    <div className="signUp-container">
                        <div id="signUp" onClick={() => setButtonPopup(true)}
                            className={signUpPopup ? 'signup-active' : ''}>
                            Sign Up
                        </div>
                        <SignUp trigger={signUpPopup} setTrigger={setButtonPopup} />
                    </div>
                </div>
                <hr className="landing-redLine"></hr>
                <div className="landing-lines">
                    <LineGenerator amount={20} colorClass="blue-line" />
                </div>
            </div>

        </>
    );
}