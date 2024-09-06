import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button, Typography, Container, Paper, Grid, Box } from '@mui/material';
import { CardElement, Elements as StripeElements } from '@stripe/react-stripe-js';

// Make sure to replace this with your own test or live key
const stripePromise = loadStripe('pk_test_51Pw0PWH23g7ZtX12QkXjyxtCKNZsStiJUn2eJpykmWKLDR2dh9dCYooQCZhEgQjxRW08G0NXVDvOZ9QFuSIIoGwS00mSwX1Zhj');

const PaymentForm = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 3 }}>
        <CardElement 
          options={{ 
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }} 
        />
      </Box>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Pay Now
      </Button>
    </form>
  );
};

const Payment = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Secure Payment
        </Typography>
        <Typography variant="body1" paragraph>
          Please provide your payment details to complete the transaction. Your information is secure and will be processed safely.
        </Typography>
        <StripeElements stripe={stripePromise}>
          <PaymentForm />
        </StripeElements>
      </Paper>
    </Container>
  );
};

export default Payment;
