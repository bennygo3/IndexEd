import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth'
import StickyNote from '../StickyNote/StickyNote';

import './SignUp.css';

function SignUp(props){
    const [formState, setFormState] = useState({
        email: '',
        username: '',
        password: '',
    });
    const [addUser, { error, data }] = useMutation(ADD_USER);
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
        console.log(`this is the state of the form ${formState.email}`)
        

        try {
            const { data } = await addUser({
                variables: { ...formState },
            });

            Auth.login(data.addUser.token);
        } catch (err) {
            console.log(err);
        }
    }
    return (props.trigger) ? (
        <div className="signUpPopup">
            <StickyNote>
            <div className='popup-inner'>
                <form onSubmit={handleFormSubmit} >
                            <label id="formSignUp">
                                Email:
                                <input
                                value= {formState.email}
                                name= "email"
                                onChange={handleChange}
                                type="text"
                                />
                                <br></br>
                                Username:
                                <input 
                                 value= {formState.username}
                                 name= "username"
                                 onChange={handleChange}
                                 type="text"
                                />
                                <br></br>
                                Password:
                                <input 
                                value= {formState.password}
                                name= "password"
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
export default SignUp;





// const e = React.createElement;

// class SignUpButton extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { liked: false };
//     }

//     render() {
//         if (this.state.liked) {
//             return 'You liked this.';
//         }

//         return e(
//             'button',
//             { onClick: () => this.setState({ liked: true }) },
//             'Sign Up'
            
//         );
//     }
// } const domContainer = document.querySelector('#signUp');
// ReactDOM.render(e(SignUpButton), domContainer);
// }