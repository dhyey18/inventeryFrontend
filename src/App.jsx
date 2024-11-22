import UserForm from "./component/UserForm";
import ProductAssignment from "./component/ProductAssignment";
import RentalForm from "./component/RentalForm";
import AddProductForm from "./component/AddProductForm";
import ProcessPurchaseForm from "./component/ProcessPurchaseForm";
import GenerateBillForm from "./component/GenerateBillForm";
import UnassignInventory from "./component/UnassignInventory";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl text-center font-semibold mb-6">
        Inventory Management System
      </h1>
      <UserForm />
      <AddProductForm />
      <ProductAssignment />
      <RentalForm />
      <ProcessPurchaseForm />
      <UnassignInventory />
      <GenerateBillForm />
    </div>
  );
}

export default App;
