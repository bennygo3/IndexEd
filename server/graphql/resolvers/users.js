import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 
import UserInputError from '@apollo/server';

import validateLoginInput from '../../utils/validators';
import validateRegisterInput from '../../utils/validators';
import { SECRET_KEY } from '../../../config';
import Users from '../../models/Users';

export {
    Mutation: {
        async register(
            _, 
            { 
              registerInput: username, password, confirmPassword, email 
            }, 
        ) {
            const { valid, errors } = validateRegisterInput(username, password, confirmPassword, email);
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            const user = await User.findOne({ username });
            if(user) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                })
            }
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                username,
                password,
                email,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username
            }, SECRET_KEY, { expiresIn: '3h' });

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}