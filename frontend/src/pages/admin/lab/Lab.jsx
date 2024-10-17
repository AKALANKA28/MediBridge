import "../list/list.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import LabTable from "./LabTable"; // Import LabTable instead of TreatmentTable
import LabForm from "./LabForm"; // Import LabForm instead of TreatmentForm
import { useState } from "react"; // Import useState for managing form visibility

const Lab = () => {
  const [isFormVisible, setIsFormVisible] = useState(false); // State to toggle form visibility
  const [initialData, setInitialData] = useState(null); // State to hold initial data for editing

  const handleFormSubmit = (data) => {
    // Handle form submission logic here
    console.log("Submitted data:", data);
    // You can add logic to save data or close the form after submission
    setIsFormVisible(false); // Hide the form after submission
  };

  const handleEdit = (data) => {
    // Logic to set data for editing
    setInitialData(data); // Set the data to be edited
    setIsFormVisible(true); // Show the form for editing
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <button onClick={() => setIsFormVisible(true)} className="datatableTitle">Add New</button> {/* Button to show form */}
        {isFormVisible && (
          <LabForm handleSubmit={handleFormSubmit} initialData={initialData} /> // Show LabForm conditionally
        )}
        <LabTable onEdit={handleEdit} /> {/* Pass edit handler to LabTable */}
      </div>
    </div>
  );
};

export default Lab;
