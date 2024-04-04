import React, { useState } from 'react';
import Login from '../../components/Login/Login.js';
import SignUp from '../../components/SignUp/SignUp.js';
import StickyNote from '../../components/StickyNote/StickyNote.js';
import "./landing.css";

function Landing() {
    const [loginPopup, setLoginPopup] = useState(false);
    const [buttonPopup, setButtonPopup] = useState(false);

    return (
        <div id="landing">
            <div className='landing-background'>
                <StickyNote />
                <h1 className="landing-header">IndexEd</h1>

                <div id="highlightLogin">
                    <div id="login" onClick={() => setLoginPopup(true)}> Login </div>
                    <Login trigger={loginPopup} setTrigger={setLoginPopup} />

                </div>
                <div id="highlightSignUp">
                    <div id="signUp" onClick={() => setButtonPopup(true)}>Sign Up</div>
                    <SignUp trigger={buttonPopup} setTrigger={setButtonPopup} />

                </div>
            </div>
        </div>
    );
}

export default Landing;