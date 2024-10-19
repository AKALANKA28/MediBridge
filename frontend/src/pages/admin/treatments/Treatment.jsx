import "../list/list.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import TreatmentTable from "./TreatmentTable";
import TreatmentForm from "./TreatmentForm";
import { useState, useEffect } from "react"; // Import useEffect for fetching data

const Treatment = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [treatments, setTreatments] = useState([]); // State to hold treatment data

  // Fetch treatments data on mount
  useEffect(() => {
    const fetchTreatments = async () => {
      const response = await fetch('http://localhost:8080/treatments/'); // Replace with your actual API endpoint
      const result = await response.json();
      setTreatments(result); // Update state with fetched treatments
    };

    fetchTreatments();
  }, []);

  const handleFormSubmit = async (data) => {
    // Handle form submission logic here
    console.log("Submitted data:", data);

    // If editing, update the treatment details
    if (initialData) {
      // Send update request to API
      await fetch(`http://localhost:8080/treatments/${initialData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Send the updated data
      });
      // Update local state with new treatment data
      setTreatments(prev =>
        prev.map(item => (item._id === initialData.id ? { ...item, ...data } : item))
      );
    } else {
      // Add new treatment (you might want to implement this part)
      await fetch('http://localhost:8080/treatments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Send the new treatment data
      });
      // Fetch updated treatments to display the latest list
      const response = await fetch('http://localhost:8080/treatments/');
      const result = await response.json();
      setTreatments(result);
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
          <TreatmentForm handleSubmit={handleFormSubmit} initialData={initialData} /> 
        )}
        <TreatmentTable data={treatments} onEdit={handleEdit} /> {/* Pass treatment data to TreatmentTable */}
      </div>
    </div>
  );
};

export default Treatment;
