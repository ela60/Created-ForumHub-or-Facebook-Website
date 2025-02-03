import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from '../Dashboard/Payment/CheckoutFrom';
import { FaLock } from 'react-icons/fa';

// Stripe public key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const MembershipPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen  bg-gradient-to-r from-indigo-600 via-purple-400 to-black text-white p-4">
            <div className="bg-white shadow-2xl rounded-xl p-8 max-w-md w-full">
                <div className="text-center mb-6">
                    <FaLock className="text-purple-800 text-5xl mx-auto mb-2" />
                    <h2 className="text-3xl font-bold text-gray-800">Secure Payment</h2>
                    <p className="text-gray-500 mt-2">Subscribe to our premium membership</p>
                </div>


                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>

                <p className="text-xs text-gray-400 text-center mt-4">
                    Payments are securely processed with Stripe. No sensitive data is stored.
                </p>
            </div>
        </div>
    );
};

export default MembershipPage;
