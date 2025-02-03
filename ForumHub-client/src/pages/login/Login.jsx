import React, { useContext, useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaGoogle } from "react-icons/fa"; 
import useAxiousPublic from "../../hooks/useAxiousPublic";

const Login = () => {
  const [disable, setDisable] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiousPublic();

  const from = location.state?.pathname || "/";

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log("Logged in successfully:", user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setErrorMessage("Login failed. Please check your credentials.");
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log("Google Sign-In successful:", user);

        
        const saveUser = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };

        axiosPublic.post("/users", saveUser)
          .then(() => {
            console.log("User saved to database");
            navigate(from, { replace: true });
          })
          .catch((error) => {
            console.error("Error saving user:", error);
          });
      })
      .catch((error) => {
        console.error("Google Sign-In error:", error);
        setErrorMessage("Google Sign-In failed. Please try again.");
      });
  };

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisable(false);
      alert("Captcha Verified!");
    } else {
      setDisable(true);
      alert("Invalid Captcha! Please try again.");
    }
  };

  return (
    <>
      <Helmet>
        <title>TalkTrove | Login</title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center md:w-1/2 lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
              a id nisi.
            </p>
          </div>
          <div className="card md:w-1/2 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>

              {/* Captcha Section */}
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  type="text"
                  onBlur={handleValidateCaptcha}
                  name="captcha"
                  placeholder="Type the captcha above"
                  className="input input-bordered"
                  required
                />
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
              )}

              <div className="form-control mt-6">
                <input
                  disabled={disable}
                  className="btn btn-primary"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>

            {/* Google Sign-In Button */}
            <div className="form-control mt-3 px-8">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="btn btn-outline btn-secondary flex items-center justify-center gap-2"
              >
                <FaGoogle /> Sign In with Google
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center my-4">
              <small>
                New Here? <Link to="/signup" className="text-blue-600">Create an account</Link>
              </small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
