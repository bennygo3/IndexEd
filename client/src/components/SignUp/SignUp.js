import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.js';
import Auth from '../../utils/auth.js';
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
                                type="email"
                                name="email"
                                value={formState.email}                            
                                onChange={handleChange}
                                autoComplete="email"
                                required
                            />

                            <br />

                            Username:
                            <input
                                type="text"
                                name="username"
                                value={formState.username}                               
                                onChange={handleChange}
                                autoComplete="username"
                                required
                            />

                            <br />

                            Password:
                            <input
                                type="password"
                                name="password"
                                value={formState.password}
                                onChange={handleChange}
                                autoComplete="new-password"
                                minLength={8}
                                required                                
                            />

                            <br />

                            Confirm Password:
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formState.confirmPassword}
                                onChange={handleChange}
                                autoComplete="new-password"
                                minLength={8}
                                required
                            />

                            <button
                                type='submit'
                                className='submit-btn'
                            >
                                Enter
                            </button>
                        </label>
                    </form>

                </div>
            </StickyNote>
        </div>

    ) : "";
}