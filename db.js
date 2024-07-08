const mongoose = require('mongoose');

// Define the MongoDB connection URL
const mongoURL = 'mongodb://127.0.0.1:27017/hotels'; // Replace with your MongoDB URL

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
