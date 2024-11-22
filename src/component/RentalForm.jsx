import React, { useState, useEffect } from "react";
import axios from "axios";

const RentalForm = () => {
  const [users, setUsers] = useState([]); // State to store users
  const [products, setProducts] = useState([]); // State to store products
  const [selectedUserId, setSelectedUserId] = useState(""); // Selected user ID
  const [rentalDuration, setRentalDuration] = useState(1);
  const [error, setError] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [transactionDetails, setTransactionDetails] = useState(null);

  useEffect(() => {
    // Fetch the list of users
    axios
      .get("http://localhost:3000/api/user/allUser")
      .then((response) => setUsers(response.data))
      .catch((error) => console.log("Error fetching users", error));

    // Fetch the list of products (optional, assuming products are needed)
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.log("Error fetching products", error));
  }, []);

  const handleUserIdChange = (e) => setSelectedUserId(e.target.value);
  const handleRentalDurationChange = (e) => setRentalDuration(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setTransactionDetails(null);
    setTotalAmount(null);

    // Make the API call to process the rental
    try {
      const response = await fetch(
        "http://localhost:3000/api/transaction/rental",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: selectedUserId, rentalDuration }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error);
        return;
      }

      const data = await response.json();
      setTransactionDetails(data.transaction);
      setTotalAmount(data.totalAmount);
    } catch (err) {
      setError("Failed to process the rental. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Process Rental</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* User selection dropdown */}
        <div>
          <label htmlFor="userId" className="block text-lg">
            Select User:
          </label>
          <select
            id="userId"
            value={selectedUserId}
            onChange={handleUserIdChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select a User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {/* Rental duration input */}
        <div>
          <label htmlFor="rentalDuration" className="block text-lg">
            Rental Duration (in days):
          </label>
          <input
            type="number"
            id="rentalDuration"
            value={rentalDuration}
            onChange={handleRentalDurationChange}
            className="w-full p-2 border border-gray-300 rounded"
            min="1"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
        >
          Process Rental
        </button>
      </form>

      {error && <div className="text-red-500 mt-4">{error}</div>}

      {transactionDetails && totalAmount && (
        <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded">
          <h3 className="font-bold">Transaction Details</h3>
          <p>Rental Amount: ₹{transactionDetails.rentalAmount}</p>
          <p>GST (18%): ₹{transactionDetails.gstAmount}</p>
          <p>Total Amount: ₹{totalAmount}</p>
        </div>
      )}
    </div>
  );
};

export default RentalForm;
