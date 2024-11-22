import React, { useState, useEffect } from "react";
import axios from "axios";

const UnassignInventory = () => {
  const [users, setUsers] = useState([]); // State to store users
  const [selectedUserId, setSelectedUserId] = useState(""); // Selected user ID
  const [message, setMessage] = useState(""); // Success or error message
  const [error, setError] = useState(null); // Error message

  // Fetch users when the component loads
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/user/allUser")
      .then((response) => setUsers(response.data))
      .catch((error) => console.log("Error fetching users", error));
  }, []);

  const handleUserIdChange = (e) => setSelectedUserId(e.target.value);

  const handleUnassign = async () => {
    if (!selectedUserId) {
      setError("Please select a user.");
      return;
    }

    try {
      setError(null);
      setMessage("");

      const response = await axios.post(
        "http://localhost:3000/api/user/unAssign",
        { userId: selectedUserId }
      );

      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to unassign inventory.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Unassign Inventory</h1>

      {/* User selection dropdown */}
      <div className="mb-4">
        <label htmlFor="userId" className="block text-lg mb-2">
          Select User:
        </label>
        <select
          id="userId"
          value={selectedUserId}
          onChange={handleUserIdChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select a User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {/* Unassign Button */}
      <button
        onClick={handleUnassign}
        className="w-full bg-red-500 text-white p-2 rounded"
      >
        Unassign Inventory
      </button>

      {/* Success/Error Messages */}
      {message && <div className="mt-4 text-green-500">{message}</div>}
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
};

export default UnassignInventory;
