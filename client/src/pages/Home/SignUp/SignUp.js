import React, { useState } from 'react';
import Auth from '../../../utils/auth.js';
import StickyNote from '../StickyNote/StickyNote.js';
import './SignUp.css';

export default function SignUp(props) {
    const [formState, setFormState] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

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
                        </label>

                        <button type="submit" className='submit-btn'>Submit</button>
                    </form>

                </div>
            </StickyNote>
        </div>

    ) : "";
}