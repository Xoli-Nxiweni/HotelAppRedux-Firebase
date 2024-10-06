import express from 'express';
import nodeMailer from 'nodemailer';
import bodyParser from 'body-parser';
import { store } from './src/App/store.js'; // Import your Redux store

const app = express();
app.use(bodyParser.json());

// Set up nodemailer transporter
const transporter = nodeMailer.createTransport({
    host: 'mail.openjavascript.info',
    port: 465,
    secure: true,
    auth: {
        user: 'xolilenxiweni2022@gmail.com',
        pass: 'Nxiweni97' // Change this to 'pass'
    }
});

// Function to send email
const sendEmail = async (email) => {
    const html = `
        <h1>Hello User</h1>
        <p>This is to notify you that your booking has been received. Thank you for choosing us. A response is expected to be sent to you for the status of your booking in a short moment.</p>
    `;

    const info = await transporter.sendMail({
        from: 'OpenJavaScript <xolilenxiweni2022@gmail.com>',
        to: email,
        subject: 'RestQuest Booking',
        html: html
    });

    console.log('Message sent: ' + info.messageId);
};

// Booking route
app.post('/api/book', async (req, res) => {
    // Assuming you're sending user ID with the booking request
    const state = store.getState();
    const email = state.auth.user.email; // Ensure this path is correct and that the email exists

    if (!email) {
        return res.status(400).send('Email not found in state');
    }

    try {
        // Call the email function
        await sendEmail(email);
        res.status(200).send('Booking confirmed, email sent!');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error confirming booking');
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
