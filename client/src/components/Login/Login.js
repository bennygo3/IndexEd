import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.js';
import Auth from '../../utils/auth.js';
import StickyNote from '../StickyNote/StickyNote.js';


export default function Login(props) {
    const [formState, setFormState] = useState({
        username: '',
        password: '',
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
            await Auth.login(
                formState.username,
                formState.password,
            );

            const loggedIn = await checkAuth();

            if (!loggedIn) {
                throw new Error(
                    'Check Login'
                );
            }

            props.setTrigger(false);
            navigate('/');
            
            console.log("Login, it's a success");
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
                            autoComplete="current-password"
                            required
                        />
                        
                        <br />

                        <button
                            type='submit'
                            className='login-btn'
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