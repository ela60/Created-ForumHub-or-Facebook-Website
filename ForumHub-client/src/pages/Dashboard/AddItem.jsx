import React from "react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiousPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_Api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddItem = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        console.log("Form Data:", data);
      
        try {
          // Upload image using FormData
          const formData = new FormData();
          formData.append('image', data.image[0]);
      
          const res = await axiosPublic.post(image_hosting_Api, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
      
          console.log('Image Upload Response:', res.data);
      
          if (res.data.success) {
            const menuItem = {
              name: data.name,
              category: data.category,
              price: parseFloat(data.price),
              recipe: data.details, 
              image: res.data.data.display_url,
            };
      
            // Send item data to server
            const menuRes = await axiosSecure.post('/menu', menuItem);
            console.log('Server Response:', menuRes.data);
      
            if (menuRes.data.insertedId) {
              alert(`Recipe "${data.name}" submitted!`);
              reset(); 
            }
          }
        } catch (error) {
          console.error("Error:", error);
          alert("Failed to upload the image or submit the item.");
        }
      };
      

  return (
    <div className="p-8">
      <SectionTitle heading="Add an Item" subheading="What's new?" />

      <div className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Recipe Name */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Recipe Name*</span>
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Enter recipe name"
              className="input input-bordered w-full"
            />
          </div>

          {/* Category */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Category*</span>
            </label>
            <select
              {...register("category", { required: true })}
              className="select select-bordered w-full"
            >
              <option disabled selected>Select a category</option>
              <option value="salad">Salad</option>
              <option value="pizza">Pizza</option>
              <option value="soup">Soup</option>
              <option value="dessert">Dessert</option>
              <option value="drink">Drinks</option>
            </select>
          </div>

          {/* Price */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Price ($)*</span>
            </label>
            <input
              {...register("price", { required: true, min: 0 })}
              type="number"
              placeholder="Enter price"
              className="input input-bordered w-full"
              step="0.01"
            />
          </div>

          {/* Recipe Details */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Recipe Details*</span>
            </label>
            <textarea
              {...register("details", { required: true })}
              placeholder="Describe the recipe..."
              className="textarea textarea-bordered w-full"
              rows="4"
            ></textarea>
          </div>

          {/* File Upload */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Upload Image*</span>
            </label>
            <input
              {...register("image", { required: true })}
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full bg-orange-500 hover:bg-orange-600 text-white"
          >
           Add Items <FaUtensils></FaUtensils>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
