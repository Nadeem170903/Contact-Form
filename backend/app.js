// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your front-end's origin
    methods: ['POST'],
    allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

// Simple in-memory storage for demonstration (replace with a database in production)
const submissions = [];

// API Endpoint to handle contact form submissions
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email format.' });
    }

    // Save the submission (here, we push to an array; in production, save to a database)
    submissions.push({ name, email, message, date: new Date() });

    console.log(`New submission from ${name} (${email}): ${message}`);

    // Respond to the client
    res.status(200).json({ success: true, message: 'Form submitted successfully!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
