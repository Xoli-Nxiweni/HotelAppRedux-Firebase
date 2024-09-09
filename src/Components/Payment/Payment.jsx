// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
// import { Button, Box, Snackbar, Alert } from '@mui/material';
// import { bookRoom } from '../../Features/slices/bookingSlice'; // Adjust the path as necessary

// const PaymentForm = ({ bookingDetails }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const dispatch = useDispatch();
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const bookingStatus = useSelector(state => state.booking.bookingStatus);
//   const error = useSelector(state => state.booking.error);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       console.error('Stripe or Elements not loaded');
//       return;
//     }

//     // Check if bookingDetails is complete
//     const requiredFields = ['userId', 'selectedRoomId', 'checkInDate', 'checkOutDate', 'guestName', 'contactInfo', 'totalAmount'];
//     const isComplete = requiredFields.every(field => bookingDetails[field]);

//     if (!isComplete) {
//       console.error('Booking details are incomplete.');
//       alert('Booking details are incomplete. Please provide all required information.');
//       return;
//     }

//     const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: elements.getElement(CardElement),
//     });

//     if (paymentError) {
//       console.error('Payment Error:', paymentError);
//       alert(`Payment failed: ${paymentError.message}. Please try again.`);
//     } else {
//       console.log('Payment Method:', paymentMethod);

//       // Dispatch the booking action with payment method and booking details
//       dispatch(bookRoom({
//         ...bookingDetails,
//         paymentMethodId: paymentMethod.id
//       }));
//     }
//   };

//   useEffect(() => {
//     if (bookingStatus === 'succeeded') {
//       setOpenSnackbar(true);
//     }
//   }, [bookingStatus]);

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Box sx={{ mb: 3 }}>
//         <CardElement
//           options={{
//             style: {
//               base: {
//                 fontSize: '16px',
//                 color: '#333',
//                 '::placeholder': {
//                   color: '#888',
//                 },
//               },
//               invalid: {
//                 color: '#d32f2f',
//               },
//             },
//           }}
//         />
//       </Box>
//       <Button
//         type="submit"
//         variant="contained"
//         color="primary"
//         fullWidth
//         sx={{ py: 1.5, fontSize: '16px' }}
//         disabled={!stripe}
//       >
//         Pay Now
//       </Button>
//       <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
//         <Alert onClose={handleCloseSnackbar} severity="success">
//           Payment Successful!
//         </Alert>
//       </Snackbar>
//     </form>
//   );
// };

// export default PaymentForm;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bookRoom } from '../../Features/slices/bookingSlice';
import { Box, Button, Snackbar, Alert } from '@mui/material';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const Payment = () => {
  const dispatch = useDispatch();
  const stripe = useStripe(); // Get the stripe instance
  const elements = useElements(); // Get the elements instance
  const [paymentMethodId, setPaymentMethodId] = useState(null);
  const [formState, setFormState] = useState({
    checkInDate: '',
    checkOutDate: '',
    guestName: '',
    contactInfo: '',
    extras: [],
    specialRequests: '',
    review: '',
    numRooms: 1,
    numGuests: 1,
  });

  const user = useSelector((state) => state.auth.user);
  const selectedRoom = useSelector((state) => state.rooms.selectedRoom);
  
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    // Logic to initialize or fetch payment method ID if needed
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      alert("Stripe.js has not yet loaded.");
      return;
    }

    if (!paymentMethodId) {
      alert("Please complete payment details.");
      return;
    }

    if (!user || !user.uid) {
      console.error('User not logged in or user ID is missing');
      return;
    }

    if (!selectedRoom || !selectedRoom.id || !selectedRoom.discountedPrice) {
      console.error('Selected room details are missing');
      return;
    }

    const bookingData = {
      checkInDate: formState.checkInDate,
      checkOutDate: formState.checkOutDate,
      guestName: formState.guestName || user.displayName,
      contactInfo: formState.contactInfo,
      extras: formState.extras,
      specialRequests: formState.specialRequests,
      paymentMethodId: paymentMethodId,
      totalAmount: selectedRoom.discountedPrice,
      numRooms: formState.numRooms,
      numGuests: formState.numGuests,
      review: formState.review,
      userId: user.uid,
      selectedRoomId: selectedRoom.id
    };

    console.log('Booking Data:', bookingData);

    dispatch(bookRoom(bookingData));

    // Show success message
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 3 }}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#333',
                '::placeholder': {
                  color: '#888',
                },
              },
              invalid: {
                color: '#d32f2f',
              },
            },
          }}
        />
      </Box>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ py: 1.5, fontSize: '16px' }}
        disabled={!stripe}
      >
        Pay Now
      </Button>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          Payment Successful!
        </Alert>
      </Snackbar>
    </form>
  );
};

export default Payment;
