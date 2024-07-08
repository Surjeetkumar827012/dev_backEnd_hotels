const mongoose = require('mongoose');
require('dotenv').config();
// Define the MongoDB connection URL
//const mongoURL =process.env.MONGODB_URL_LOCAL // Replace with your MongoDB URL
const mongoURL= process.env.MONGODB_URL;
// Set up MongoDB connection
mongoose.connect(mongoURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // Other options if needed
})
.then(() => console.log('Connected to MongoDB server'))
.catch(err => console.error('Could not connect to MongoDB...', err));

// Get the default connection
const db = mongoose.connection;

// Define event listeners for database connection
db.on('connected', () => {
    console.log('Connected to MongoDB server');
});
db.on('error', (err) => {
    console.log('Error connecting to MongoDB server:', err);
});
db.on('disconnected', () => {
    console.log('Disconnected from MongoDB server');
});

module.exports = db;
