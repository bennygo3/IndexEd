import React, { useState } from 'react';
import './Login.css';
import xicon from '../../assets/xicon.png'
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

import Auth from '../../utils/auth'

function Login(props) {
    const [formState, setFormState] = useState({
        username: '',
        password: '',
    });

    const [loginUser, { error, data }] = useMutation(LOGIN_USER);
    console.log(error, data);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(`this is the state of the form ${formState.username}`)

        try {
            const { data } = await loginUser({
                variables: { ...formState },
            });
            console.log(data);
            Auth.login(data.login.token);
        } catch (err) {
            console.log(err);
        }
        setFormState({
            username: '',
            password: '',
        });
    };
    return (props.trigger) ? (
        <div className="loginPopup">
            <div className='loginPopup-inner'>
                <h2 id="loginHead">Login</h2>
                <button id='xbut' type="button"
                    onClick={() => props.trigger = props.setTrigger(false)}>
                    <img src={xicon} alt="x button"></img>
                </button>
                <form onSubmit={handleFormSubmit} >
                    <label id="formLogin">
                        Username:
                        <input
                            value={formState.username}
                            name="username"
                            onChange={handleChange}
                            type="text"
                        />
                        <br></br>
                        Password:
                        <input
                            value={formState.password}
                            name="password"
                            onChange={handleChange}
                            type="password"
                        />
                        <br></br>

                        <button
                            type='submit'
                            className='login-btn'>
                            Enter
                        </button>

                    </label>

                </form>

            </div>
        </div>

    ) : "";


}
export default Login;