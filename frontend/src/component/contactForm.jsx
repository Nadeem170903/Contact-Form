import React, { useState } from 'react';
import axios from 'axios';
import './ContactForm.css'; // Import the new CSS file

const ContactForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [responseMessage, setResponseMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/contact', formData)
            .then((response) => {
                setResponseMessage(response.data.message);
                setIsError(false);
                setFormData({ name: '', email: '', message: '' }); // Clear the form on success
            })
            .catch((error) => {
                setResponseMessage(error.response ? error.response.data.message : 'Something went wrong!');
                setIsError(true);
            });
    };

    return (
        <div className="container">
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required />

                <button type="submit">Submit</button>
            </form>

            {responseMessage && (
                <div className={`response-message ${isError ? 'response-error' : 'response-success'}`}>
                    {responseMessage}
                </div>
            )}
        </div>
    );
};

export default ContactForm;
