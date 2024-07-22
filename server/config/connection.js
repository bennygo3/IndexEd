import mongoose from 'mongoose';
import config from '../../config.js';

mongoose.set('strictQuery', true);

mongoose.connect(
    // process.env.MONGODB_URI || 'mongodb://localhost:27017',
    config.MONGODB_URI || 'mongodb://localhost:27017',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

const connection = mongoose.connection;

connection.on('connected', () => {
    console.log('Mongoose successfully connected to the database.');
});

connection.on('error', (err) => {
    console.log('Mongoose connection error: ' + err);
});

connection.on('disconnected', () => {
    console.log('Mongoose disconnected.');
});

export default connection;