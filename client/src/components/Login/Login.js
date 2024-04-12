import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import StickyNote from '../StickyNote/StickyNote';
import './Login.css';

function Login(props) {
    const [formState, setFormState] = useState({
        username: '',
        password: '',
    });

    const [loginUser] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await loginUser({
                variables: { ...formState },
            });

            Auth.login(data.login.token);
        } catch (err) {
            console.log(err);
        }
    };

    const handleClose = () => {
        props.setTrigger(false);
        setFormState({ username: '', password: '' });
    };

    return (props.trigger) ? (
        <div className="loginPopup">
            <StickyNote>
            <div className='loginPopup-inner'>
            <span className="close" onClick={handleClose}>&times;</span>
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
            </StickyNote>
        </div>
    ) : "";
}

export default Login;