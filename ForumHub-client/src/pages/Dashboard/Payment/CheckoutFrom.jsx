import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';  // For alert messages

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [clientSecret, setClientSecret] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const membershipPrice = 10; // Fixed price for membership

  // Fetch client secret for Stripe payment
  useEffect(() => {
    if (membershipPrice > 0) {
      axiosSecure.post('/create-payment-intent', { price: membershipPrice })
        .then(res => {
          if (res.data?.clientSecret) {
            setClientSecret(res.data.clientSecret);
          } else {
            Swal.fire('Error', 'Failed to initialize payment.', 'error');
          }
        })
        .catch(err => {
          console.error('Error creating payment intent:', err);
          Swal.fire('Error', 'Server error while creating payment intent.', 'error');
        });
    }
  }, [axiosSecure, membershipPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) {
      Swal.fire('Error', 'Card information is incomplete.', 'error');
      return;
    }

    setIsProcessing(true);

    // Create payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
      billing_details: {
        email: user?.email || 'anonymous',
        name: user?.displayName || 'anonymous',
      }
    });

    if (error) {
      Swal.fire('Payment Failed', error.message, 'error');
      setIsProcessing(false);
      return;
    }

    // Confirm payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id
    });

    if (confirmError) {
      Swal.fire('Payment Failed', confirmError.message, 'error');
      setIsProcessing(false);
      return;
    }

    // Payment successful
    if (paymentIntent?.status === 'succeeded') {
      setTransactionId(paymentIntent.id);

      // Save payment and update user membership
      const paymentData = {
        email: user.email,
        transactionId: paymentIntent.id,
        price: membershipPrice,
        date: new Date(),
        membership: 'Gold'
      };

      axiosSecure.post('/payments', paymentData)
        .then(res => {
          if (res.data?.insertedId) {
            Swal.fire('Payment Successful!', 'You are now a Gold Member!', 'success');
          } else {
            Swal.fire('Error', 'Payment succeeded but membership update failed.', 'error');
          }
        })
        .catch(err => {
          console.error('Payment saving error:', err);
          Swal.fire('Error', 'Failed to save payment information.', 'error');
        });
    }

    setIsProcessing(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 shadow-lg rounded-md bg-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">Become a Gold Member</h2>
      <p className="text-center mb-6 text-gray-600">Pay $10 to unlock unlimited posting and get a Gold Badge!</p>

      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': { color: '#aab7c4' },
              },
              invalid: { color: '#9e2146' },
            },
          }}
        />

        <button
          type="submit"
          disabled={!stripe || !clientSecret || isProcessing}
          className={`btn mt-4 w-full text-white ${isProcessing ? 'bg-gray-400' : 'bg-gradient-to-r from-indigo-900 via-purple-800 to-black text-white hover:bg-yellow-600'}`}
        >
          {isProcessing ? 'Processing...' : 'Pay $10'}
        </button>
      </form>

      {transactionId && (
        <p className="text-green-600 mt-4 text-center">
          Payment Successful! Transaction ID: {transactionId}
        </p>
      )}
    </div>
  );
};

export default CheckoutForm;
