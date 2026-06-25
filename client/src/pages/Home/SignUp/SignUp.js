import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Auth from '../../../utils/auth.js';
import StickyNote from '../StickyNote/StickyNote.js';


export default function SignUp(props) {

    const [formState, setFormState] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();
    const { checkAuth } = useAuth();

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(`Form State: ${JSON.stringify(formState)}`)

        try {
            await Auth.register(
                formState.username,
                formState.email,
                formState.password,
                formState.confirmPassword
            );
            await checkAuth();
            props.setTrigger(false);
            navigate("/");
            console.log('Registration successful!')
        } catch (err) {
            console.error('Registration error:', err);
        }
    };

    const handleClose = () => {
        props.setTrigger(false);
        setFormState({ email: '', username: '', password: '', confirmPassword: '' });
    };

    return props.trigger ? (
        <div className="signUpPopup">
            <StickyNote>
                <div className='popup-inner'>
                    <h1 className="signup-header">Sign Up</h1>
                    <span className="close" onClick={handleClose}>
                        &times;
                    </span>
                    <form onSubmit={handleFormSubmit}>
                        <label id="formSignUp">
                            Email:
                            <input
                                value={formState.email}
                                name="email"
                                onChange={handleChange}
                                type="text"
                            />
                            <br></br>
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
                            Confirm Password:
                            <input
                                value={formState.confirmPassword}
                                name="confirmPassword"
                                onChange={handleChange}
                                type="password"
                            />

                            <button
                            type='submit'
                            className='submit-btn'>
                            Sign Up
                        </button>
                        </label>

                    </form>

                </div>
            </StickyNote>
        </div>

    ) : "";
}