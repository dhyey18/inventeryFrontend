import { useState } from "react";
import axios from "axios";

function GenerateBillForm() {
  const [userId, setUserId] = useState("");
  const [productId, setProductId] = useState("");
  const [transactionType, setTransactionType] = useState("rental"); // default to rental
  const [rentalDuration, setRentalDuration] = useState(0);
  const [billDetails, setBillDetails] = useState(null);
  const [error, setError] = useState("");

  // Handle form submission to generate the bill
  const handleSubmit = async (e) => {
    e.preventDefault();

    const billData = { userId, productId, transactionType, rentalDuration };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/transaction/generate-bill",
        billData
      );
      setBillDetails(response.data.billDetails);
      setError("");
    } catch (err) {
      setBillDetails(null);
      setError("Error generating the bill. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center">Generate Bill</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* User Selection */}
        <div>
          <label className="block text-gray-700">Select User</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter User ID"
            required
          />
        </div>

        {/* Product Selection */}
        <div>
          <label className="block text-gray-700">Select Product</label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter Product ID"
            required
          />
        </div>

        {/* Transaction Type */}
        <div>
          <label className="block text-gray-700">Transaction Type</label>
          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="rental">Rental</option>
            <option value="purchase">Purchase</option>
          </select>
        </div>

        {/* Rental Duration (only for rental) */}
        {transactionType === "rental" && (
          <div>
            <label className="block text-gray-700">
              Rental Duration (Days)
            </label>
            <input
              type="number"
              value={rentalDuration}
              onChange={(e) => setRentalDuration(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Generate Bill
        </button>
      </form>

      {/* Display Bill Details */}
      {billDetails && (
        <div className="mt-4 p-4 bg-gray-100 border rounded">
          <h3 className="text-lg font-semibold">Bill Details</h3>
          <p>{billDetails.message}</p>
        </div>
      )}

      {/* Display Error */}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
    </div>
  );
}

export default GenerateBillForm;
