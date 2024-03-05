import React from 'react';
// import { Link } from 'react-router-dom';
import highlighterLogin from '../../assets/highlighterLogin.png';
import highlighterSignUp from '../../assets/highlighterSignUp.png';

import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import { useState } from 'react';
import "./landing.css";

function Landing() {
    const [loginPopup, setLoginPopup] = useState(false);
    const [buttonPopup, setButtonPopup] = useState(false);

    return (
        <div>
            <div id="mainBackground">

                <h1 id="header"> Decked-Out</h1>

                <div id="highlightLogin">
                    <img id="highlit" alt="decorative" src={highlighterLogin} />
                    <div id="login" onClick={() => setLoginPopup(true)}> Login </div>
                    <Login trigger={loginPopup} setTrigger={setLoginPopup} />

                </div>



                <div id="highlightSignUp">
                    <img id="highlit" alt="decorative" src={highlighterSignUp} />
                    <div id="signUp" onClick={() => setButtonPopup(true)}> Sign Up </div>
                    <SignUp trigger={buttonPopup} setTrigger={setButtonPopup} />

                </div>
            </div>
        </div>
    );
}

export default Landing;