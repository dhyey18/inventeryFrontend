import { useState, useEffect } from "react";
import axios from "axios";

function ProductAssignment() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch users and products (adjust API URLs as needed)
    axios
      .get("http://localhost:3000/api/user/allUser")
      .then((response) => setUsers(response.data))
      .catch((error) => console.log("Error fetching users", error));

    axios
      .get("http://localhost:3000/api/inventory/getInventory")
      .then((response) => setProducts(response.data))
      .catch((error) => console.log("Error fetching products", error));
  }, []);

  const handleAssignProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/inventory/assign", {
        userId: selectedUser,
        productId: selectedProduct,
      });
      setMessage("Product assigned successfully!");
    } catch (error) {
      setMessage("Error assigning product");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center">
        Assign Product to User
      </h2>
      <form onSubmit={handleAssignProduct} className="space-y-4">
        <div>
          <label className="block text-gray-700">Select User</label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Select Product</label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Product</option>
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
          Assign Product
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
}

export default ProductAssignment;
