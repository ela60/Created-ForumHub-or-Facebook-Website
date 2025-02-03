import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutFrom from './CheckoutFrom';


// TODO:add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    return (
        <div>
            <h2>Payment</h2>
            <p>Please pay to it</p>
            <div>
                <h2>Taka...</h2>
                <Elements stripe={stripePromise}>
                    <CheckoutFrom/>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;