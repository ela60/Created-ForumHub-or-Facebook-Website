import React, { useEffect } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { useLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAxiosPublic from '../../../hooks/useAxiousPublic';
import { FaUtensils } from 'react-icons/fa';

const UpdateItem = () => {
    const { name, category, recipe, price,_id } = useLoaderData();
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const image_hosting_Api = "YOUR_IMAGE_HOSTING_API_URL"; // Define the image hosting API URL

    useEffect(() => {
        
        reset({
            name: name,
            category: category,
            price: price,
            details: recipe,
        });
    }, [name, category, price, recipe, reset]);

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
            const menuRes = await axiosSecure.patch(`/menu/${item._id}`, menuItem);
            console.log('Server Response:', menuRes.data);
      
            if (menuRes.data.modifiedCount > 0) {
              alert(`Recipe "${data.name}" updated!`);
              reset(); 
            }
          }
        } catch (error) {
          console.error("Error:", error);
          alert("Failed to upload the image or update the item.");
        }
      };

    return (
        <div>
            <SectionTitle heading="Update an Item" subheading="Refresh Info"></SectionTitle>
            <div className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded-lg">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Recipe Name */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Recipe Name*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Recipe Name"
                            {...register("name", { required: true })}
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
                            <option value="salad" selected={category === "salad"}>Salad</option>
                            <option value="pizza" selected={category === "pizza"}>Pizza</option>
                            <option value="soup" selected={category === "soup"}>Soup</option>
                            <option value="dessert" selected={category === "dessert"}>Dessert</option>
                            <option value="drink" selected={category === "drink"}>Drinks</option>
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
                            defaultValue={price}
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
                            {...register("image")}
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
                        Update menu Items <FaUtensils />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;
