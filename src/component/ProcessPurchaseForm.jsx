import { useState, useEffect } from "react";
import axios from "axios";

function ProcessPurchaseForm() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState("");
  const [productId, setProductId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch users and products when the component mounts
  useEffect(() => {
    // Fetch users from backend
    axios
      .get("http://localhost:3000/api/user/allUser")
      .then((response) => setUsers(response.data))
      .catch((error) => console.log("Error fetching users", error));

    axios
      .get("http://localhost:3000/api/inventory/getInventory")
      .then((response) => setProducts(response.data))
      .catch((error) => console.log("Error fetching products", error));
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const purchaseData = { userId, productId };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/transaction/purchase",
        purchaseData
      );
      setMessage(response.data.message);
      setError("");
    } catch (err) {
      setMessage("");
      setError("Error processing purchase. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center">Process Purchase</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* User Selection */}
        <div>
          <label className="block text-gray-700">Select User</label>
          <select
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} (ID: {user._id})
              </option>
            ))}
          </select>
        </div>

        {/* Product Selection */}
        <div>
          <label className="block text-gray-700">Select Product</label>
          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name} (Price: ₹{product.purchasePrice})
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Process Purchase
        </button>
      </form>

      {/* Display message or error */}
      {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
    </div>
  );
}

export default ProcessPurchaseForm;
