import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useParams } from "react-router-dom";

const CommentsPage = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const feedbackOptions = ["Inappropriate Content", "Spam", "Harassment"];

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://bistro-boss-server-eight-cyan.vercel.app/comments/${id}`);
        setComments(res.data || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError("Failed to load comments.");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [id]);

  const handleFeedbackChange = (commentId, feedback) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment._id === commentId ? { ...comment, selectedFeedback: feedback } : comment
      )
    );
  };

  const handleReport = async (commentId, feedback) => {
    if (!feedback) {
      alert("Please select feedback before reporting.");
      return;
    }

    try {
      await axios.put(`https://bistro-boss-server-eight-cyan.vercel.app/api/comments/report/${commentId}`, { feedback });
      setComments((prev) =>
        prev.map((comment) =>
          comment._id === commentId ? { ...comment, isReported: true } : comment
        )
      );
      alert("Comment reported successfully.");
    } catch (error) {
      console.error("Error reporting comment:", error);
      alert("Failed to report comment.");
    }
  };

  const openModal = (comment) => {
    setSelectedComment(comment);
    setModalIsOpen(true);
  };

  const closeModal = () => setModalIsOpen(false);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-purple-800">--- Comments ---</h2>

      {loading && <p>Loading comments...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {comments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border text-sm sm:text-base">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-900 via-purple-800 to-black text-white">
                <th className="border p-1 sm:p-2">Email</th>
                <th className="border p-1 sm:p-2">Comment</th>
                <th className="border p-1 sm:p-2">Feedback</th>
                <th className="border p-1 sm:p-2">Report</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr key={comment._id} className="text-center hover:bg-gray-100">
                  <td className="border p-1 sm:p-2 break-words max-w-xs">{comment.email}</td>
                  <td className="border p-1 sm:p-2">
                    {comment.comment?.length > 20 ? (
                      <>
                        {comment.comment.slice(0, 20)}...
                        <button
                          onClick={() => openModal(comment)}
                          className="ml-1 sm:ml-2 px-1 sm:px-2 py-0.5 sm:py-1 bg-purple-800 text-white rounded"
                        >
                          Read More
                        </button>
                      </>
                    ) : (
                      comment.comment
                    )}
                  </td>
                  <td className="border p-1 sm:p-2">
                    <select
                      disabled={comment.isReported}
                      value={comment.selectedFeedback || ""}
                      onChange={(e) => handleFeedbackChange(comment._id, e.target.value)}
                      className="border p-1 rounded w-full"
                    >
                      <option value="">Select Feedback</option>
                      {feedbackOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border p-1 sm:p-2">
                    <button
                      disabled={comment.isReported || !comment.selectedFeedback}
                      onClick={() => handleReport(comment._id, comment.selectedFeedback)}
                      className={`w-full px-1 sm:px-3 py-0.5 sm:py-1 rounded text-xs sm:text-sm ${
                        comment.isReported
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                    >
                      {comment.isReported ? "Reported" : "Report"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No comments found.</p>
      )}

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="p-4 bg-white rounded-md shadow-lg max-w-sm sm:max-w-md mx-auto">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">Full Comment</h3>
        <p>{selectedComment?.comment}</p>
        <button
          onClick={closeModal}
          className="mt-4 px-3 py-1 bg-gray-500 text-white rounded"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default CommentsPage;
