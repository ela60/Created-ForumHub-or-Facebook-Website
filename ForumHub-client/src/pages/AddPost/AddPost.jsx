import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Helmet } from "react-helmet-async";

const AddPost = () => {
  const { user } = useContext(AuthContext);
  const [postCount, setPostCount] = useState(0);
  const [postData, setPostData] = useState({
    authorImage: user?.photoURL || "/default-avatar.png",
    authorName: user?.displayName || "",
    authorEmail: user?.email || "",
    postTitle: "",
    postDescription: "",
    tag: "",
    upVotes: 0,
    downVotes: 0,
  });
  const [tags, setTags] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const navigate = useNavigate();

  // Fetch tags from the backend
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get("https://bistro-boss-server-eight-cyan.vercel.app/api/tags");
        console.log("Fetched tags:", response.data);  
        const fetchedTags = response.data.map((tag) => ({
          value: tag.name, 
          label: tag.name, 
        }));
        setTags(fetchedTags); 
      } catch (err) {
        console.error("Error fetching tags:", err);
      }
    };
  
    fetchTags();
  }, []);
  

  useEffect(() => {
    if (user) {
      const fetchPostCount = async () => {
        try {
          const res = await axios.get(`https://bistro-boss-server-eight-cyan.vercel.app/posts?userEmail=${user.email}`);
          setPostCount(res.data.length);
          if (res.data.length >= 5) {
            setShowForm(false);
          }
        } catch (err) {
          console.error("Error fetching post count:", err);
        }
      };
      fetchPostCount();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      authorName: postData.authorName,
      authorEmail: postData.authorEmail,
      postTitle: postData.postTitle,
      postDescription: postData.postDescription,
      tag: postData.tag,
      upVotes: postData.upVotes,
      downVotes: postData.downVotes,
      authorImage: postData.authorImage,
      createdAt: new Date(),
    };

    try {
      await axios.post("https://bistro-boss-server-eight-cyan.vercel.app/posts", newPost);
      alert("Post added successfully!");
      setPostData({
        authorImage: user?.photoURL || "/default-avatar.png",
        authorName: user?.displayName || "",
        authorEmail: user?.email || "",
        postTitle: "",
        postDescription: "",
        tag: "",
        upVotes: 0,
        downVotes: 0,
      });
      setPostCount(postCount + 1);
      if (postCount + 1 >= 5) {
        setShowForm(false);
      }
    } catch (err) {
      console.error("Error adding post:", err);
    }
  };

  const handleBecomeMember = () => {
    navigate("/membership");
  };

  return (
    <div>
      <Helmet>
        <title>TAlkTrove | AddPost</title>
      </Helmet>
      <div className="add-post-container p-6 bg-purple-400 rounded-md shadow-md max-w-4xl mx-auto mt-12">
        {showForm ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-semibold text-center text-purple-800">---Add a New Post---</h2>
            <div className="flex items-center gap-4">
              <img src={postData.authorImage} alt="Author" className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-semibold">{postData.authorName}</p>
                <p className="text-gray-600">{postData.authorEmail}</p>
              </div>
            </div>
            <div>
              <label htmlFor="title" className="block text-gray-700 font-medium">Post Title</label>
              <input
                type="text"
                id="title"
                value={postData.postTitle}
                onChange={(e) => setPostData({ ...postData, postTitle: e.target.value })}
                className="w-full p-2 mt-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-gray-700 font-medium">Post Description</label>
              <textarea
                id="description"
                value={postData.postDescription}
                onChange={(e) => setPostData({ ...postData, postDescription: e.target.value })}
                className="w-full p-2 mt-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="tag" className="block text-gray-700 font-medium">Select Tag</label>
              <Select
                id="tag"
                value={tags.find((tag) => tag.value === postData.name)}
                onChange={(selectedOption) => setPostData({ ...postData, tag: selectedOption.value })}
                options={tags} // Dynamic tag options
                className="mt-2"
              />
            </div>
            <div className="flex gap-4">
              <div>
                <label htmlFor="upVote" className="block text-gray-700 font-medium">UpVote</label>
                <input
                  type="number"
                  id="upVote"
                  value={postData.upVotes}
                  onChange={(e) => setPostData({ ...postData, upVotes: parseInt(e.target.value) })}
                  className="w-full p-2 mt-2 border border-gray-300 rounded"
                  min="0"
                />
              </div>
              <div>
                <label htmlFor="downVote" className="block text-gray-700 font-medium">DownVote</label>
                <input
                  type="number"
                  id="downVote"
                  value={postData.downVotes}
                  onChange={(e) => setPostData({ ...postData, downVotes: parseInt(e.target.value) })}
                  className="w-full p-2 mt-2 border border-gray-300 rounded"
                  min="0"
                />
              </div>
            </div>
            <button type="submit" className="mt-4 bg-purple-800 text-white py-2 px-6 rounded hover:bg-yellow-600">
              Add Post
            </button>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-lg font-semibold">You have reached the maximum number of posts. Become a member to add more!</p>
            <button onClick={handleBecomeMember} className="mt-4 bg-yellow-500 text-white py-2 px-6 rounded hover:bg-yellow-600">
              Become a Member
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPost;
