import express from 'express';
import bodyParser from 'body-parser';
import { createTransport } from 'nodemailer';
import { collection, getDocs } from 'firebase/firestore';
import cors from 'cors';
import { db } from './src/Firebase/firebase.js';


const app = express();
const PORT = 5200;

// Middleware setup
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up nodemailer transporter
const transporter = createTransport({
    service: 'gmail', 
    auth: {
        user: 'eksnxiweni@gmail.com', 
        pass: 'vamv wynx yoyk xwve',
    },
});

// Function to send email
const sendEmail = async (bookingDetails) => {
    console.log('booking details', bookingDetails);
    
    const html = `
    <h3 style="color: #4A90E2;">🌟 Your Booking Request is Successful! 🌟</h3>
    <p>Dear ${bookingDetails.name},</p>
    <p>Thank you for choosing RestQuest to help you find the perfect hotel room! We’re excited to confirm that your booking request for the ${bookingDetails.room} room has been successfully received.</p>
    <p>Here’s a summary of your request:</p>
    <ul>
        <li><strong>Check-in Date:</strong> ${bookingDetails.checkInDate}</li>
        <li><strong>Check-out Date:</strong> ${bookingDetails.checkOutDate}</li>
        <li><strong>Number of Rooms:</strong> ${bookingDetails.numRooms}</li>
        <li><strong>Number of Guests:</strong> ${bookingDetails.numGuests}</li>
        <li><strong>Extras:</strong> ${bookingDetails.extras.join(', ') || 'None'}</li>
        <li><strong>Special Requests:</strong> ${bookingDetails.specialRequests || 'None'}</li>
    </ul>
    <p><strong>Total Price:</strong> R ${bookingDetails.price}</p>
    <p>Your official booking confirmation will be sent to you shortly. If you have any questions or need assistance in the meantime, feel free to reach out!</p>
    <p>We look forward to helping you enjoy a wonderful stay!</p>
    <p>Warm regards,<br>The RestQuest Team</p>
`;


    const info = await transporter.sendMail({
        from: 'RestQuest <xolilenxiweni2022@gmail.com>',
        to: bookingDetails.email,
        subject: 'RestQuest Booking Confirmation',
        html: html,
    });

    console.log('Message sent: ' + info.messageId);
};

// Booking route
// app.post('/api/book', async (req, res) => {
//     const {
//         displayName,
//         email,
//         roomDetails, 
//         checkInDate,
//         checkOutDate,
//         numRooms,
//         numGuests,
//         extras,
//         specialRequests,
//         totalAmount,
//     } = req.body;

//     // Validate required fields
//     if (!email || !displayName || !roomDetails.roomType || !totalAmount) {
//         return res.status(400).send('Missing required booking details');
//     }

//     try {
//         // Prepare booking details
//         const bookingDetails = {
//             name: displayName,
//             email: email, 
//             room: roomDetails.roomType,
//             checkInDate,
//             checkOutDate,
//             numRooms: numRooms || 1,
//             numGuests: numGuests || 1,
//             extras: extras || [],
//             specialRequests: specialRequests || '',
//             price: totalAmount,
//         };

//         // Send the email
//         await sendEmail(bookingDetails);

//         // Respond to client
//         res.status(200).send('Booking confirmed, email sent!');
//     } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).send('Error confirming booking');
//     }
// });

app.post('/bookings', async (req, res) => {
    const {
        uid,
        name, // instead of displayName
        email,
        room, // instead of roomDetails.roomType
        checkInDate,
        checkOutDate,
        numRooms,
        numGuests,
        extras,
        specialRequests,
        price, // instead of totalAmount
    } = req.body;

    // Validate required fields
    if (!email || !name || !room || !price || !uid) {
        return res.status(400).send('Missing required booking details');
    }

    try {
        // Prepare booking details
        const bookingDetails = {
            uid,
            name: name,
            email: email,
            room: room,
            checkInDate,
            checkOutDate,
            numRooms: numRooms || 1,
            numGuests: numGuests || 1,
            extras: extras || [],
            specialRequests: specialRequests || '',
            price: price,
        };

        // Send the email
        await sendEmail(bookingDetails);

        // Respond to client
        res.status(200).send('Booking confirmed, email sent!');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error confirming booking');
    }
});
app.get('/bookings', async (req, res) => {
    try {
        const bookingsRef = collection(db, 'bookings'); // Reference to 'bookings' collection
        const snapshot = await getDocs(bookingsRef); // Get all documents

        // Map snapshot documents to an array
        const bookings = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        console.log('Bookings:', bookings); // Optional: Log for debugging

        // Send bookings as response
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error retrieving bookings:', error);
        res.status(500).json({ message: 'Error retrieving bookings' });
    }
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

