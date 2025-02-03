import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import useAxiousPublic from '../../hooks/useAxiousPublic';
import Swal from 'sweetalert2';
import { FaGoogle } from 'react-icons/fa';
import { updateProfile } from 'firebase/auth'; 

const SignUp = () => {
  const axiosPublic = useAxiousPublic();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🔥 Updated SignUp Logic
  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;

        
        updateProfile(loggedUser, {
          displayName: data.name,
          photoURL: data.photoURL
        })
        .then(() => {
         
          axiosPublic.post('/users', {
            name: data.name,
            email: data.email,
            photoURL: data.photoURL
          })
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'User Created',
              text: 'Your account has been created successfully!'
            });
            navigate('/');
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Profile Update Failed',
            text: error.message
          });
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message
        });
      });
  };


  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        Swal.fire({
          icon: 'success',
          title: 'Signed In',
          text: 'Successfully signed in with Google!'
        });
        navigate('/');
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message
        });
      });
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Sign Up</title>
      </Helmet>

      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign up!</h1>
            <p className="py-6">Join us to explore amazing features. Sign up now to get started!</p>
          </div>

          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register('name', { required: true })}
                  placeholder="Write your name"
                  className="input input-bordered"
                />
                {errors.name && <span className="text-red-600">Name is required</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  {...register('photoURL', { required: true })}
                  placeholder="Photo URL"
                  className="input input-bordered"
                />
                {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register('email', { required: true })}
                  placeholder="Email"
                  className="input input-bordered"
                />
                {errors.email && <span className="text-red-600">Email is required</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register('password', {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
                  })}
                  placeholder="Password"
                  className="input input-bordered"
                />
                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be at least 6 characters</p>}
                {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                {errors.password?.type === 'pattern' && (
                  <p className="text-red-600">
                    Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character
                  </p>
                )}
              </div>

              <div className="form-control mt-6">
                <input className="btn btn-primary" type="submit" value="Sign Up" />
              </div>

              <div className="form-control mt-3">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="btn btn-outline btn-secondary flex items-center justify-center gap-2"
                >
                  <FaGoogle /> Sign Up with Google
                </button>
              </div>
            </form>

            <p className="p-2 text-blue-700">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
