import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

const MakeAnnouncement = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("/api/announcements", data);
      toast.success("Announcement created successfully!");
      reset();  // Clear form
    } catch (error) {
      toast.error("Failed to create announcement.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Make an Announcement</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Author Image */}
        <div>
          <label className="block font-medium">Author Image URL</label>
          <input
            type="url"
            {...register("authorImage", { required: "Image URL is required" })}
            placeholder="Enter image URL"
            className="w-full p-2 border rounded"
          />
          {errors.authorImage && <p className="text-red-500 text-sm">{errors.authorImage.message}</p>}
        </div>

        {/* Author Name */}
        <div>
          <label className="block font-medium">Author Name</label>
          <input
            type="text"
            {...register("authorName", { required: "Author name is required" })}
            placeholder="Enter author name"
            className="w-full p-2 border rounded"
          />
          {errors.authorName && <p className="text-red-500 text-sm">{errors.authorName.message}</p>}
        </div>

        {/* Title */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            placeholder="Enter announcement title"
            className="w-full p-2 border rounded"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            placeholder="Write your announcement here..."
            className="w-full p-2 border rounded h-32"
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Publish Announcement
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
