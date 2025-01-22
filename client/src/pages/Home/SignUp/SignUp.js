import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../../../utils/mutations';
import Auth from '../../../utils/auth';
import StickyNote from '../StickyNote/StickyNote';
import './SignUp.css';

export default function SignUp(props) {
    const [formState, setFormState] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [addUser, { error, data }] = useMutation(REGISTER_USER);
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
        console.log(`Form State: ${JSON.stringify(formState)}`)

        try {
            const { data } = await addUser({
                variables: {
                    registerInput: {
                        email: formState.email,
                        username: formState.username,
                        password: formState.password,
                        confirmPassword: formState.confirmPassword,
                    },
                },
            });

            Auth.login(data.register.token);
        } catch (err) {
            console.log(err);
        }
    };


    const handleClose = () => {
        props.setTrigger(false);
        setFormState({ email: '', username: '', password: '', confirmPassword: '', });
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