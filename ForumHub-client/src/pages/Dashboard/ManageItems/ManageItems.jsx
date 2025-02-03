import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2"; // Import SweetAlert
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItems = () => {
  const [menu, loading, refetch] = useMenu(); // Assuming useMenu() returns an array with menu data and refetch function
  const axiosSecure = useAxiosSecure();

  // Handle Update action
  const handleUpdateItem = (id) => {
    // Open a SweetAlert for updating
    Swal.fire({
      title: "Are you sure you want to update this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Update Item with ID:", id);
      }
    });
  };

  // Handle Delete action
  const handleDeleteItem = async (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this item?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/menu/${id}`);
          refetch();
          //   if (response.data.deletedCount > 0) {

          //     }
          console.log("data", response.data);
          if (response.status === 200) {
            Swal.fire("Deleted!", "Your item has been deleted.", "success");
          }
        } catch (error) {
          console.error("Error deleting item:", error);
          Swal.fire("Error", "There was an error deleting the item.", "error");
        }
      }
    });
  };

  return (
    <div>
      <SectionTitle heading="Manage All Items" subheading="Hurry Up" />

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* Table Head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Item Image</th>
              <th>Item Name</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* Table Rows */}
            {menu.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td>{item.name}</td>
                <td>
                  <Link to={`/dashboard/updateItem/${item._id}`}>
                    <button
                      onClick={() => handleUpdateItem(item._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaEdit />
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteItem(item._id)}
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
    </div>
  );
};

export default ManageItems;
