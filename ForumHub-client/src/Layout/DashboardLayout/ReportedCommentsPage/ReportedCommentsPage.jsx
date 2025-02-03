import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ReportedCommentsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get("https://bistro-boss-server-eight-cyan.vercel.app/admin/reported-comments");
      setReports(res.data);
    } catch (err) {
      Swal.fire("Error!", "Failed to load reports.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This comment will be deleted permanently!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });
  
      if (result.isConfirmed) {

        await axios.delete(`https://bistro-boss-server-eight-cyan.vercel.app/admin/comments/${id}`);
        setReports((prevReports) => prevReports.filter((report) => report.id !== id));
        fetchReports();
  
        Swal.fire("Deleted!", "The comment has been deleted.", "success");
      }
    } catch (err) {
      Swal.fire("Error!", "Failed to delete comment.", "error");
      console.error("Delete error:", err);
      fetchReports();
    }
  };
  
  const handleDismiss = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Dismiss Report?",
        text: "This report will be marked as dismissed.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, dismiss it!",
      });

      if (result.isConfirmed) {
        await axios.put(`https://bistro-boss-server-eight-cyan.vercel.app/admin/comments/dismiss/${id}`);
        fetchReports();
        Swal.fire("Dismissed!", "The report has been dismissed.", "success");
      }
    } catch (err) {
      Swal.fire("Error!", "Failed to dismiss report.", "error");
    }
  };

  const handleWarn = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Warn the user?",
        text: "A warning will be sent to the user.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yes, warn!",
      });

      if (result.isConfirmed) {
        await axios.post(`https://bistro-boss-server-eight-cyan.vercel.app/admin/comments/warn/${id}`);
        Swal.fire("Warned!", "The user has been warned.", "success");
      }
    } catch (err) {
      Swal.fire("Error!", "Failed to warn the user.", "error");
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:text-left  text-purple-700">---Reported Comments---</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : reports.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border text-sm md:text-base">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Comment</th>
                <th className="p-2 border">Reason</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report._id} className="hover:bg-gray-100">
                  <td className="p-2 border text-center">{report.comment}</td>
                  <td className="p-2 border text-center">{report.reportReason}</td>
                  <td className="p-2 border text-center">{report.reportStatus}</td>
                  <td className="p-2 border text-center flex flex-col md:flex-row justify-center items-center gap-2">
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                      onClick={() => handleWarn(report._id)}
                    >
                      Warn
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(report._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      onClick={() => handleDismiss(report._id)}
                    >
                      Dismiss
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">No reported comments.</p>
      )}
    </div>
  );
};

export default ReportedCommentsPage;
