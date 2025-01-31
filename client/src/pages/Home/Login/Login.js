import { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { LOGIN_USER } from '../../../utils/mutations';
import Auth from '../../../utils/auth.js';
import StickyNote from '../StickyNote/StickyNote.js';


export default function Login(props) {
    const [formState, setFormState] = useState({
        username: '',
        password: '',
    });

    // const [loginUser] = useMutation(LOGIN_USER);

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
            await Auth.login(formState.username, formState.password);
            console.log('Login successful!')
        } catch (err) {
            console.error('Login error:', err);
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
            <h1 className="signin-header">Sign In</h1>
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
                            ENTER
                        </button>

                    </label>

                </form>

            </div>
            </StickyNote>
        </div>
    ) : "";
}