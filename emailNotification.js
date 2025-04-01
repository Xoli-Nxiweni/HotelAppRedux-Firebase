/* eslint-disable no-undef */
import express from 'express';
import bodyParser from 'body-parser';
import { createTransport } from 'nodemailer';
import { collection, getDocs } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import cors from 'cors';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  // Your Firebase config should be imported from environment variables
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const app = express();
const PORT = process.env.PORT || 5200;

// Middleware setup
app.use(cors({ origin: '*' }));
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
    <p>Thank you for choosing RestQuest to help you find the perfect hotel room! We're excited to confirm that your booking request for the ${bookingDetails.room} room has been successfully received.</p>
    <p>Here's a summary of your request:</p>
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

// Function to authenticate with Firebase
const authenticateFirebase = async () => {
    try {
        // Use environment variables for credentials
        // If not available, use hardcoded values (not recommended for production)
        const email = process.env.FIREBASE_SERVICE_EMAIL || 'your-service-email@example.com';
        const password = process.env.FIREBASE_SERVICE_PASSWORD || 'your-service-password';
        
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Successfully authenticated with Firebase');
        return true;
    } catch (error) {
        console.error('Firebase authentication error:', error.code, error.message);
        return false;
    }
};

// Basic health check endpoint
app.get('/', (req, res) => {
    res.status(200).send('Server is running');
});

// Endpoint to handle booking submissions
app.post('/bookings', async (req, res) => {
    const {
        uid,
        name,
        email,
        room,
        checkInDate,
        checkOutDate,
        numRooms,
        numGuests,
        extras,
        specialRequests,
        price,
    } = req.body;

    // Validate required fields
    if (!email || !name || !room || !price || !uid) {
        return res.status(400).json({ message: 'Missing required booking details' });
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
        res.status(200).json({ message: 'Booking confirmed, email sent!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error confirming booking', error: error.message });
    }
});

// Endpoint to get all bookings
app.get('/bookings', async (req, res) => {
    try {
        // Check if authenticated
        if (!auth.currentUser) {
            console.log('Not authenticated with Firebase, attempting to authenticate...');
            const authSuccess = await authenticateFirebase();
            if (!authSuccess) {
                return res.status(403).json({ 
                    message: 'Unable to authenticate with Firebase. Please check your credentials.' 
                });
            }
        }

        console.log('Attempting to retrieve bookings...');
        const bookingsRef = collection(db, 'bookings');
        const snapshot = await getDocs(bookingsRef);
        
        // Map snapshot documents to an array
        const bookings = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
    
        console.log(`Successfully retrieved ${bookings.length} bookings`);
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error retrieving bookings:', error.code, error.message);
        res.status(500).json({ 
            message: 'Error retrieving bookings', 
            error: error.message,
            code: error.code
        });
    }
});

// Authenticate with Firebase first, then start the server
authenticateFirebase()
    .then(success => {
        if (success) {
            // Start the server
            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
            });
        } else {
            console.error('Failed to authenticate with Firebase. Server will start but may have limited functionality.');
            // Start server anyway
            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT} with limited functionality`);
            });
        }
    })
    .catch(error => {
        console.error('Error during startup:', error);
    });

// Set up authentication state monitoring
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('Firebase authentication state: Signed in');
    } else {
        console.log('Firebase authentication state: Signed out');
        // Try to re-authenticate
        authenticateFirebase().catch(error => {
            console.error('Re-authentication failed:', error);
        });
    }
});