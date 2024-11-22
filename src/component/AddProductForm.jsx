import { useState } from "react";
import axios from "axios";

function AddProductForm() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [rentalPrice, setRentalPrice] = useState("");
  const [purchase, setPurchase] = useState("");

  const [stockQuantity, setStockQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name: productName,
      price: parseFloat(price),
      purchasePrice: parseFloat(purchase),
      rentalPrice: parseFloat(rentalPrice),
      stockQuantity: parseInt(stockQuantity),
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/inventory/add",
        productData
      );
      setMessage("Product added successfully!");
      setError("");
    } catch (err) {
      setMessage("");
      setError("Error adding product. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {/* <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div> */}
        <div>
          <label className="block text-gray-700">Rental Price</label>
          <input
            type="number"
            value={rentalPrice}
            onChange={(e) => setRentalPrice(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Purchase Price</label>
          <input
            type="number"
            value={purchase}
            onChange={(e) => setPurchase(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Add Product
        </button>
      </form>
      {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
    </div>
  );
}

export default AddProductForm;
