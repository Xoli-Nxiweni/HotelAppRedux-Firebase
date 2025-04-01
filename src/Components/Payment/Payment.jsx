import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bookRoom } from '../../Features/slices/bookingSlice'; // Import the action from your booking slice
import { Box, Button, Snackbar, Alert, CircularProgress } from '@mui/material';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { setLoader } from '../../Features/slices/loadingSlice'; // Import the setLoader action
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Payment = ({ onPayment }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe(); // Stripe instance
  const elements = useElements(); // Elements instance
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

  const isLoading = useSelector((state) => state.loading.isLoading);
  const user = useSelector((state) => state.auth.user);
  const selectedRoom = useSelector((state) => state.rooms.selectedRoom);
  
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      alert("Stripe.js has not yet loaded.");
      return;
    }

    dispatch(setLoader()); // Show loader

    const cardElement = elements.getElement(CardElement);

    // Create payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
      alert(error.message);
      dispatch(setLoader()); // Hide loader
      return;
    }

    setPaymentMethodId(paymentMethod.id);

    if (!user || !user.uid) {
      console.error('User not logged in or user ID is missing');
      dispatch(setLoader()); // Hide loader
      return;
    }

    if (!selectedRoom || !selectedRoom.id || !selectedRoom.discountedPrice) {
      console.error('Selected room details are missing');
      dispatch(setLoader()); // Hide loader
      return;
    }

    const bookingData = {
      checkInDate: formState.checkInDate,
      checkOutDate: formState.checkOutDate,
      guestName: formState.guestName || user.displayName,
      contactInfo: formState.contactInfo,
      extras: formState.extras,
      specialRequests: formState.specialRequests,
      paymentMethodId: paymentMethod.id,
      totalAmount: selectedRoom.discountedPrice,
      numRooms: formState.numRooms,
      numGuests: formState.numGuests,
      review: formState.review,
      userId: user.uid,
      selectedRoomId: selectedRoom.id,
      roomDetails: {
        roomType: selectedRoom.heading,
        guests: selectedRoom.guests,
      },
    };

    console.log('Booking Data:', bookingData);

    // Dispatch the booking action
    dispatch(bookRoom(bookingData));

    // Hide loader and show success message
    dispatch(setLoader());
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    navigate('/');
    window.location.reload();
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
        disabled={!stripe || isLoading}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Pay Now'}
      </Button>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={()=>{handleCloseSnackbar(); onPayment();}} severity="success">
          Payment Successful! Check your emails or spam folder for booking details!
          
        </Alert>
      </Snackbar>
      
    </form>
  );
};

export default Payment;
