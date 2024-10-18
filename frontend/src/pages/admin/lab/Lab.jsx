import "../list/list.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import LabTable from "./LabTable"; // Import LabTable
import LabForm from "./LabForm"; // Import LabForm
import { useState, useEffect } from "react"; // Import useEffect for fetching data

const Lab = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [labs, setLabs] = useState([]); // State to hold lab data

  // Fetch labs data on mount
  useEffect(() => {
    const fetchLabs = async () => {
      const response = await fetch('http://localhost:8080/labs/'); // Replace with your actual API endpoint
      const result = await response.json();
      setLabs(result); // Update state with fetched labs
    };

    fetchLabs();
  }, []);

  const handleFormSubmit = async (data) => {
    // Handle form submission logic here
    console.log("Submitted data:", data);

    // If editing, update the lab details
    if (initialData) {
      // Send update request to API
      await fetch(`http://localhost:8080/labs/${initialData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Send the updated data
      });
      // Update local state with new lab data
      setLabs(prev =>
        prev.map(item => (item._id === initialData.id ? { ...item, ...data } : item))
      );
    } else {
      // Add new lab
      await fetch('http://localhost:8080/labs/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Send the new lab data
      });
      // Fetch updated labs to display the latest list
      const response = await fetch('http://localhost:8080/labs/');
      const result = await response.json();
      setLabs(result);
    }

    setIsFormVisible(false); // Hide the form after submission
    setInitialData(null); // Reset initial data
  };

  const handleEdit = (data) => {
    setInitialData(data); // Set the data to be edited
    setIsFormVisible(true); // Show the form for editing
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <button onClick={() => setIsFormVisible(true)} className="datatableTitle">Add New</button> 
        {isFormVisible && (
          <LabForm handleSubmit={handleFormSubmit} initialData={initialData} /> // Show LabForm conditionally
        )}
        <LabTable data={labs} onEdit={handleEdit} /> {/* Pass lab data to LabTable */}
      </div>
    </div>
  );
};

export default Lab;
