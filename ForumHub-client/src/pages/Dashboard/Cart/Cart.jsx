import React from "react";
import useCart from "../../../hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2"; 
import useAxiosSecure from "../../../hooks/useAxiosSecure"; 

const Cart = () => {
  const [cart, , refetch] = useCart();  
  const axiosSecure = useAxiosSecure();  

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  // ✅ Handle Delete with SweetAlert2 confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();  //
              Swal.fire(
                'Deleted!',
                'Your item has been removed.',
                'success'
              );
            }
          })
          .catch(() => {
            Swal.fire(
              'Error!',
              'Something went wrong. Please try again.',
              'error'
            );
          });
      }
    });
  };

  return (
    <div>
      <h6 className="text-orange-600 text-center py-3">---My Cart---</h6>
      <h2 className="text-4xl uppercase m-3 font-bold text-center py-5">
        Wanna add more?
      </h2>
      <div className="flex justify-evenly mb-4">
        <h2 className="text-3xl">Items: {cart.length}</h2>
        <h2 className="text-3xl">Total Price: ${totalPrice.toFixed(2)}</h2>
        <button className="btn">PAY</button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={item.image} alt={item.name} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-ghost btn-lg text-red-600"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
