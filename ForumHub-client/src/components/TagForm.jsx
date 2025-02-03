import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';
import toast from 'react-hot-toast';

const TagForm = () => {
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);

  const fetchTags = async () => {
    const tagSnapshot = await getDocs(collection(db, 'tags'));
    setTags(tagSnapshot.docs.map(doc => doc.data().name));
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tag.trim() === '') {
      toast.error('Tag cannot be empty');
      return;
    }
    await addDoc(collection(db, 'tags'), { name: tag });
    toast.success('Tag added successfully');
    setTag('');
    fetchTags();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Add New Tag</h3>
      <form onSubmit={handleSubmit} className="flex space-x-4">
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Enter tag name"
          className="flex-1 p-2 border rounded-md"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Tag
        </button>
      </form>

      {/* Display Tags */}
      <div className="mt-4">
        <h4 className="font-semibold">Existing Tags:</h4>
        <ul className="list-disc ml-6">
          {tags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TagForm;
