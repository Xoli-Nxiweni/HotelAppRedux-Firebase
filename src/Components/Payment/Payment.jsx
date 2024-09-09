import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button, Typography, Container, Paper, Box } from '@mui/material';

const stripePromise = loadStripe('pk_test_51Pw0PWH23g7ZtX12QkXjyxtCKNZsStiJUn2eJpykmWKLDR2dh9dCYooQCZhEgQjxRW08G0NXVDvOZ9QFuSIIoGwS00mSwX1Zhj');

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error('Stripe or Elements not loaded');
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error('Payment Error:', error);
      alert('Payment failed. Please try again.');
    } else {
      console.log('Payment Method:', paymentMethod);
      alert('Payment successful!');
    }
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
    </form>
  );
};

const Payment = () => {
  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={6} sx={{ padding: 4, textAlign: 'center', borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
          Secure Payment
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 3 }}>
          Please provide your payment details to complete the transaction. Your information is secure and will be processed safely.
        </Typography>
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      </Paper>
    </Container>
  );
};

export default Payment;
