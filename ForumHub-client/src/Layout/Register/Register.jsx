import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import toast from 'react-hot-toast';
import { app } from '../../firebase/firebase.config';


const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: data.name,
          photoURL: 'badge-new-member.png' 
        });
        toast.success('Registered successfully!');
        navigate('/dashboard');
      })
      .catch((error) => toast.error(error.message));
  };

  const handleGoogleRegister = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success('Registered with Google!');
        navigate('/dashboard');
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="max-w-sm mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          {...register('name', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.name && <p className="text-red-500 text-sm">Name is required</p>}

        <input
          type="email"
          placeholder="Email"
          {...register('email', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.email && <p className="text-red-500 text-sm">Email is required</p>}

        <input
          type="password"
          placeholder="Password"
          {...register('password', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.password && <p className="text-red-500 text-sm">Password is required</p>}

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Register
        </button>
      </form>
      <button
        onClick={handleGoogleRegister}
        className="w-full p-2 bg-red-500 text-white rounded-md mt-4 hover:bg-red-600"
      >
        Register with Google
      </button>
      <p className="mt-4 text-center">
        Already have an account? <Link to="/join-us" className="text-blue-500">Login here</Link>
      </p>
    </div>
  );
};
