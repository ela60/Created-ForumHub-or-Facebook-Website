import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight, FaTrash, FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Fetch Users
  const {
    data: users = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/users");
        return res.data;
      } catch (error) {
        console.error("Failed to fetch users:", error);
        throw new Error("Failed to load users");
      }
    },
  });

  // Handle Make Admin
  const handleMakeAdmin = (userId) => {
    const url = `/users/admin/${userId}`;
    console.log("Request URL:", url);
    axiosSecure
      .patch(url)
      .then((response) => {
        if (response.data.modifiedCount > 0) {
          Swal.fire("Success", "User has been promoted to Admin", "success");
          refetch();
        } else {
          Swal.fire("Error", "Failed to promote user to admin.", "error");
        }
      })
      .catch((error) => {
        Swal.fire("Error", "An error occurred while promoting the user.", "error");
        console.error("Admin promotion error:", error.response ? error.response.data : error);
      });
  };

  // Handle Delete User
  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/users/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "User has been deleted.", "success");
              refetch();
            }
          })
          .catch((error) => {
            Swal.fire("Error", "Failed to delete user.", "error");
            console.error("Delete error:", error);
          });
      }
    });
  };

  if (isLoading) {
    return <p className="text-center text-lg">Loading users...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Failed to load users.</p>;
  }

  // Get current users to display
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="p-8">
      <h2 className="text-3xl mb-4 text-center text-purple-700">---Manage Users---</h2>
      <h2 className="text-xl mb-6 text-purple-700">Total Users: {users.length}----</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-900 via-purple-800 to-black text-white ">
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Membership</th>
              <th className="border border-gray-300 px-4 py-2">Make admin</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user.id || user._id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">{user.membership}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => handleMakeAdmin(user.id || user._id)}
                    disabled={user.role === "admin"}
                    className="text-center"
                  >
                    {user.role === "admin" ? (
                      <span className="text-green-600">Admin</span>
                    ) : (
                      <FaUsers className="hover:text-orange-800" />
                    )}
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleDeleteUser(user.id || user._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-purple-500 text-white rounded"
        >
         <FaAngleLeft/>
        </button>
        {[...Array(totalPages).keys()].map((number) => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={`px-4 py-2 mx-2 rounded ${
              number + 1 === currentPage ? "bg-purple-800 text-white" : "bg-gray-300"
            }`}
          >
            {number + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 bg-purple-500 text-white rounded"
        >
          <FaAngleRight/>
        </button>
      </div>
    </div>
  );
};

export default AllUsers;
