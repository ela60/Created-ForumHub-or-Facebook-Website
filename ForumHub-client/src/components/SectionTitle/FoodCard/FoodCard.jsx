import React from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios"; // Use axios if no specific secure axios is needed
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Use secure axios hook
import useCart from "../../../hooks/useCart";

const FoodCard = ({ item }) => {
  const { image, name, price, recipe, _id } = item; // Destructure _id for menuId
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure(); 
  const [, ,refetch] = useCart(); 

  const handleAddToCart = (food) => {
    if (user && user.email) {
      // Prepare cart item
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price,
      };
  
      // Send cart item to the database
      axiosSecure.post('http://localhost:5000/carts', cartItem)
        .then((res) => {
          if (res.data.insertedId) {
            // Show success alert
            Swal.fire({
              icon: 'success',
              title: 'Added to Cart!',
              text: `${name} has been added to your cart.`,
              timer: 1500,
              showConfirmButton: false,
            });
           
            refetch(); 
          }
        })
        .catch((error) => {
          // Handle error and show a message
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to add item to the cart. Please try again.',
          });
          console.error('Error adding to cart:', error);
        });
    } else {
      // If user is not logged in, show warning and redirect to login
      Swal.fire({
        icon: 'warning',
        title: 'Not Logged In!',
        text: 'Please log in to add items to your cart.',
        confirmButtonText: 'Login Now',
        showCancelButton: true,
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location.pathname } });  // Redirect to login page
        }
      });
    }
  };
  

  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img src={image} alt={name} />
        </figure>
        <p className="absolute right-0 bg-slate-800 mr-4 mt-4 px-4 text-white">$ {price}</p>
        <div className="card-body flex flex-col items-center">
          <h2 className="card-title">{name}</h2>
          <p>{recipe}</p>
          <div className="card-actions justify-end">
            <button
              onClick={() => handleAddToCart(item)}
              className="btn btn-outline border-0 border-b-4 mt-4 bg-slate-200 uppercase"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
